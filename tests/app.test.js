import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {valves,categories} from '../src/data.js';
import {spawn} from 'node:child_process';

test('32 complete bilingual learning entries in seven functional categories',()=>{
 assert.equal(valves.length,32);assert.equal(new Set(valves.map(v=>v.id)).size,32);
 for(const v of valves){for(const key of ['zh','en','principle','principleEn','memory','memoryEn','identify','identifyEn','use','useEn','note','noteEn'])assert.ok(v[key],`${v.id}.${key}`);assert.ok(categories.some(c=>c.id===v.category));assert.ok(v.photo>=0&&v.photo<=31)}
});

test('library, learning progress, collection, ten-question quiz and mobile navigation',async()=>{
 const url=process.env.TEST_URL||'http://127.0.0.1:5187';
 const server=process.env.TEST_URL?null:spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5187','--strictPort'],{stdio:'ignore'});
 try {for(let attempt=0;attempt<50;attempt++){try{const response=await fetch(url);if(response.ok)break}catch{}if(attempt===49)throw new Error('Test server did not become ready');await new Promise(r=>setTimeout(r,100))}}catch(e){server?.kill();throw e}
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url);
  await page.waitForSelector('.valve-card');assert.equal(await page.locator('.valve-card').count(),32);
  await page.screenshot({path:'/tmp/valve-desktop.png',fullPage:false});
  await page.getByRole('button',{name:'止回防倒流 5',exact:true}).click();assert.equal(await page.locator('.valve-card').count(),5);
  await page.locator('.category-tabs button').first().click();
  await page.getByRole('textbox',{name:'搜索阀门 Search valves'}).fill('butterfly');assert.equal(await page.locator('.valve-card').count(),1);
  await page.getByRole('button',{name:'清空搜索 Clear search'}).click();
  await page.locator('.valve-card').first().getByRole('button',{name:'02 原理',exact:true}).click();assert.equal(await page.locator('.valve-card').first().locator('svg.diagram').count(),1);
  await page.locator('.card-title').first().click();await page.waitForSelector('[role=dialog]');
  assert.equal(await page.locator('.detail-images figure').count(),2);assert.ok(await page.locator('.memory-panel').innerText());
  await page.locator('.detail-save').click();await page.locator('.detail-bottom .primary-button').click();
  await page.screenshot({path:'/tmp/valve-detail.png',fullPage:false});
  await page.keyboard.press('Escape');assert.equal(await page.locator('[role=dialog]').count(),0);
  await page.reload();await page.waitForSelector('.valve-card');assert.equal(await page.locator('.learned-badge').count(),1);assert.equal(await page.locator('.bookmark-button.saved').count(),1);
  await page.locator('nav button').nth(3).click();assert.equal(await page.locator('.valve-card').count(),1);
  await page.locator('nav button').nth(1).click();assert.equal(await page.locator('.path-stage').count(),7);
  await page.locator('nav button').nth(2).click();await page.getByRole('button',{name:'开始挑战',exact:true}).click();
  for(let i=0;i<10;i++){await page.locator('.quiz-options button').first().click();assert.equal(await page.locator('.quiz-explanation').count(),1);await page.locator('.quiz-explanation .primary-button').click()}
  assert.equal(await page.locator('.answer-review button').count(),10);
  await page.locator('.lang-button').click();assert.ok(await page.locator('.quiz-result h2').innerText());
  await page.locator('nav button').first().click();assert.equal(await page.locator('.valve-card').count(),32);
  await page.getByRole('button',{name:'列表视图 List view'}).click();assert.equal(await page.locator('.list-view').count(),1);
  for(const width of [390,768,1000,1440]){await page.setViewportSize({width,height:850});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`horizontal overflow at ${width}`)}
  await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'网格视图 Grid view'}).click();
  await page.screenshot({path:'/tmp/valve-mobile.png',fullPage:false});
  await page.locator('.mobile-menu').click();await page.locator('nav button').nth(1).click();assert.equal(await page.locator('.path-stage').count(),7);assert.equal(await page.locator('.sidebar.is-open').count(),0);
  assert.deepEqual(errors,[]);
 }finally{await browser.close();server?.kill()}
});
