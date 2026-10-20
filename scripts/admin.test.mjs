import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,mkdir,cp,writeFile,rm,access} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

test('Administration : GitHub autorisé, aucun accès local ou anonyme, aucun secret',async()=>{
 const c=JSON.parse(await readFile('public/admin/config.json'));
 assert.equal(c.backend.name,'github');assert.equal(c.backend.repo,'josuetk73-cell/Silo-trading-quipment');assert.equal(c.backend.branch,'main');assert.equal(c.backend.open_authoring,false);assert.equal(c.backend.base_url,'https://api.netlify.com');assert.equal(c.local_backend,undefined);
 const text=JSON.stringify(c);assert(!text.includes('client_secret'));assert(!text.includes('access_token'));
 for(const file of c.collections[0].files){const data=JSON.parse(await readFile(file.file));for(const field of file.fields)assert(field.name in data,field.name);}
});

test('Publication depuis les données : ajout, modification, suppression, médias et HTML échappé',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'siloe-content-'));
 try{
  await mkdir(path.join(dir,'scripts'));await mkdir(path.join(dir,'public/images'),{recursive:true});await cp('src',path.join(dir,'src'),{recursive:true});await cp('scripts/build.mjs',path.join(dir,'scripts/build.mjs'));
  const json=async(file,data)=>writeFile(path.join(dir,file),JSON.stringify(data));
  const c=JSON.parse(await readFile('src/company.json'));const content=JSON.parse(await readFile('src/content.json'));
  const malicious='<img src=x onerror=alert(1)>';
  content.services=[{title:'Caméra de test',description:malicious,image:'/images/test.png',price:'120 USD'}];
  content.equipment=[{title:'Équipement témoin',description:'Texte équipement',price:'Sur devis',image:'/images/test.png'}];
  content.agents=[{title:'Agent témoin',description:'Photo de test',image:'/images/test.png'}];
  content.home.heading='Titre modifié depuis le CMS';
  content.pages=[{slug:'contact',title:'Contact modifié',heading:'Contact personnalisé',intro:'Présentation modifiée'}];
  c.logo='/images/test.png';c.projects=[{title:'Réalisation témoin',image:'/images/test.png'}];c.whatsappMessage='Bonjour, devis pour {service}';c.whatsappButton='Contacter notre équipe';
  await writeFile(path.join(dir,'public/images/test.png'),Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jhB8AAAAASUVORK5CYII=','base64'));
  await json('src/company.json',c);await json('src/content.json',content);
  const build=()=>execFileSync(process.execPath,['scripts/build.mjs'],{cwd:dir,stdio:'pipe'});build();
  let html=await readFile(path.join(dir,'dist/services/index.html'),'utf8');assert(html.includes('120 USD'));assert(html.includes('Équipement témoin'));assert(html.includes('&lt;img src=x onerror=alert(1)&gt;'));assert(!html.includes(malicious));assert(html.includes('Contacter notre équipe'));
  const link=html.match(/href="(https:\/\/wa.me\/[^\"]+)"/)[1].replaceAll('&amp;','&');assert.equal(new URL(link).searchParams.get('text'),'Bonjour, devis pour Caméra de test');
  assert((await readFile(path.join(dir,'dist/index.html'),'utf8')).includes('Titre modifié depuis le CMS'));
  assert((await readFile(path.join(dir,'dist/contact/index.html'),'utf8')).includes('Contact personnalisé'));
  assert((await readFile(path.join(dir,'dist/realisations/index.html'),'utf8')).includes('Agent témoin'));
  await access(path.join(dir,'dist/images/test.png'));
  content.services=[];content.equipment=[];content.agents=[];c.projects=[];c.logo='';await json('src/company.json',c);await json('src/content.json',content);await rm(path.join(dir,'public/images/test.png'));build();
  html=await readFile(path.join(dir,'dist/services/index.html'),'utf8');assert(!html.includes('Caméra de test'));assert(!html.includes('Équipement témoin'));await assert.rejects(access(path.join(dir,'dist/images/test.png')));
  c.logo='/images/manquante.png';await json('src/company.json',c);assert.throws(build);
 }finally{await rm(dir,{recursive:true,force:true});}
});
