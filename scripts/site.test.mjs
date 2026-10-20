import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import path from 'node:path';
import './build.mjs';
const routes=['','a-propos','services','realisations','devis','contact','confidentialite'];
test('Toutes les pages et leurs liens internes existent',async()=>{
 for(const route of routes){const html=await readFile(path.join('dist',route,'index.html'),'utf8');assert.match(html,/<html lang="fr">/);assert.equal((html.match(/<h1>/g)||[]).length,1);assert.match(html,/name="description"/);for(const [,link]of html.matchAll(/(?:href|src)="(\/[^"?]*)/g)){let file=link;if(file.endsWith('/'))file+='index.html';await access(path.join('dist',file));}}
});
test('Les services publiés proposent des messages WhatsApp adaptés',async()=>{
 const html=await readFile('dist/services/index.html','utf8');
 const cards=[...html.matchAll(/<article class="card">([\s\S]*?)<\/article>/g)];
 const content=JSON.parse(await readFile('src/content.json'));assert.equal(cards.length,content.services.length);
 const c=JSON.parse(await readFile('src/company.json'));
 for(const [i,[,card]] of cards.entries()){
  if(c.whatsapp){const link=card.match(/href="(https:[^"]+)"/)[1].replaceAll('&amp;','&');const u=new URL(link);assert.equal(u.pathname,'/'+c.whatsapp);assert(u.searchParams.get('text').includes(content.services[i].title));}
  else assert.match(card,/href="\/devis\/\?service=/);
 }
});
test('Aucun faux contact et aucune indexation avant configuration',async()=>{const c=JSON.parse(await readFile('src/company.json'));const html=await readFile('dist/devis/index.html','utf8');assert.match(html,/name="message"[^>]*required/);if(!c.whatsapp&&!c.email){assert.equal((html.match(/value="(?:email|whatsapp)" disabled/g)||[]).length,2);assert.match(html,/envoi est actuellement indisponible/);}if(!c.url)assert.match(html,/noindex,nofollow/);else{assert.match(html,/rel="canonical"/);assert(!(await readFile('dist/sitemap.xml','utf8')).includes('/admin/'));}});
