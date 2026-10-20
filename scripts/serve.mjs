import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import './build.mjs';
const root=path.resolve('dist');
http.createServer(async(req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(p.endsWith('/'))p+='index.html';const file=path.resolve(root,'.'+p);if(!file.startsWith(root+path.sep))throw Error();const data=await readFile(file);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.xml':'application/xml','.json':'application/json','.wasm':'application/wasm'})[path.extname(file)]||'application/octet-stream');res.end(data);}catch{res.writeHead(404);res.end('Page introuvable');}}).listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('Serveur prêt sur le port '+(process.env.PORT||3000)));
