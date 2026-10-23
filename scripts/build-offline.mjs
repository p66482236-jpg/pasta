import {readFileSync,writeFileSync,readdirSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';

const root=fileURLToPath(new URL('..',import.meta.url));
execFileSync('npm',['run','build'],{cwd:root,stdio:'inherit'});
const assets=resolve(root,'dist/assets');
const files=readdirSync(assets);
let script=readFileSync(resolve(assets,files.find(f=>f.endsWith('.js'))),'utf8');
let styles=readFileSync(resolve(assets,files.find(f=>f.endsWith('.css'))),'utf8');
for(const name of ['valve-hero.png','valve-atlas.png','valve-atlas-2.png']){
  const path='/images/'+name;
  const embedded='data:image/png;base64,'+readFileSync(resolve(root,'public/images',name)).toString('base64');
  script=script.split(path).join(embedded);
  styles=styles.split(path).join(embedded);
}
if(script.includes('/images/')||styles.includes('/images/'))throw new Error('An image dependency is not embedded');
const html=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f5f5f1"><title>阀门研习所 · Valve Atlas · 离线版</title><style>${styles}</style></head><body><div id="root"></div><script type="module">${script.replace(/<\/script/gi,'<\\/script')}</script></body></html>`;
mkdirSync(resolve(root,'downloads'),{recursive:true});
writeFileSync(resolve(root,'downloads/valve-atlas.html'),html);
console.log('Offline file ready: downloads/valve-atlas.html — all code and images embedded.');
