import {mkdir,copyFile,rm} from 'node:fs/promises';
const dest=new URL('../dist/',import.meta.url);
await rm(dest,{recursive:true,force:true});await mkdir(dest,{recursive:true});
for(const file of ['index.html','styles.css','app.js','engine.js','questions.json','icon.svg','.nojekyll']){
  await copyFile(new URL('../'+file,import.meta.url),new URL(file,dest));
}
console.log('Packaged seven static website files in dist/.');
