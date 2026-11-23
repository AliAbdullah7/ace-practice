import {mkdir,copyFile,rm,cp} from 'node:fs/promises';
const dest=new URL('../dist/',import.meta.url);
await rm(dest,{recursive:true,force:true});await mkdir(dest,{recursive:true});
for(const file of ['index.html','styles.css','app.js','engine.js','questions.json','questions-v2.json','questions-v3.json','icon.svg','.nojekyll']){
  await copyFile(new URL('../'+file,import.meta.url),new URL(file,dest));
}
await cp(new URL('../assets/',import.meta.url),new URL('assets/',dest),{recursive:true});
console.log('Packaged all three practice sets and their required images in dist/.');
