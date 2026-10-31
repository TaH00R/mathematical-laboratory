/* Dependency-free headless Edge fallback when the in-app Browser is unavailable. */
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),os=require('node:os');
const {spawn}=require('node:child_process');
const catalogue=require('../experiments');
const root=path.resolve(__dirname,'..');
const port=Number(process.argv.find(s=>s.startsWith('--port='))?.split('=')[1]||8765);
const debugPort=port+572;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}
 const target=fs.existsSync(file)&&fs.statSync(file).isDirectory()?path.join(file,'index.html'):file;
 if(!fs.existsSync(target)){res.writeHead(404).end();return;}
 const types={'.html':'text/html','.js':'text/javascript','.css':'text/css'};
 res.setHeader('Content-Type',types[path.extname(target)]||'application/octet-stream');res.end(fs.readFileSync(target));
});
let edge,ws;
(async()=>{
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve);});
 const profile=fs.mkdtempSync(path.join(os.tmpdir(),'mathlab-edge-'));
 edge=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new',`--remote-debugging-port=${debugPort}`,`--user-data-dir=${profile}`,'--no-first-run','--no-default-browser-check','about:blank'],{windowsHide:true,stdio:'ignore'});
 edge.on('error',e=>console.error('Edge launch:',e.message));
 let targets;
 for(let i=0;i<40;i++){try{targets=await(await fetch(`http://127.0.0.1:${debugPort}/json/list`,{signal:AbortSignal.timeout(750)})).json();break;}catch{await sleep(250);}}
 if(!targets)throw Error('Headless Edge did not start');
 const page=targets.find(t=>t.type==='page');ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
 let serial=0;const pending=new Map(),errors=[],failures=[];
 ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
 await send('Runtime.enable');await send('Page.enable');
 fs.mkdirSync(path.join(root,'artifacts'),{recursive:true});
 const focused=process.argv.includes('--focused');
 const only=process.argv.find(s=>s.startsWith('--projects='))?.split('=')[1].split(',').map(Number);
 for(const viewport of (focused?[{width:1440,height:900},{width:390,height:844}]:[{width:1440,height:900},{width:390,height:844},{width:320,height:700}])){
  await send('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:viewport.width<600});
  await send('Emulation.setTouchEmulationEnabled',{enabled:viewport.width<600});
  for(const entry of [{id:0,path:'',title:'Collection'},...catalogue].filter(e=>(!only||only.includes(e.id))&&(!focused||[0,1,3,4,31,32,49].includes(e.id)))){
   errors.length=0;
   await send('Page.navigate',{url:`http://127.0.0.1:${port}/${entry.path}`});
   for(let i=0;i<50;i++){await sleep(40);if(await evaluate(`document.readyState==='complete' && !!document.querySelector('${entry.id===0?'#experimentGrid a':entry.id===1?'#view':'#canvas'}')`))break;}
   await sleep(100);
   if(entry.id&&![1,3,4,31].includes(entry.id))await evaluate(`document.getElementById('play').textContent==='Pause' && document.getElementById('play').click()`);
   const state=await evaluate(`({width:innerWidth,scroll:document.documentElement.scrollWidth,title:document.title,readout:document.querySelector('#readout')?.textContent,canvas:[...document.querySelectorAll('canvas')].filter(c=>getComputedStyle(c).display!=='none').map(c=>({w:c.clientWidth,h:c.clientHeight}))})`);
   if(state.scroll>state.width+1)failures.push(`${viewport.width}px #${entry.id}: overflow ${state.scroll}`);
   if(state.canvas.some(c=>c.w<=0||c.h<=0))failures.push(`${viewport.width}px #${entry.id}: empty canvas`);
   if(entry.id)await evaluate(`(()=>{const c=document.querySelector('${entry.id===1?'#view':'#canvas'}'),r=c.getBoundingClientRect(),box=c.parentElement.getBoundingClientRect();if(Math.abs(r.width-box.width)>2)throw Error('Canvas does not fill its container width');if(Math.abs(c.width-r.width*devicePixelRatio)>2)throw Error('Canvas bitmap does not match the displayed width');})()`);
   if(state.readout&&/NaN|undefined/.test(state.readout))failures.push(`${viewport.width}px #${entry.id}: ${state.readout}`);
   if(viewport.width===1440&&entry.id&&![1,3,4,31].includes(entry.id)){
    await evaluate(`for(const el of document.querySelectorAll('#controls input,#controls select')){const old=el.value;for(const v of el.tagName==='SELECT'?[...el.options].map(o=>o.value):[el.min,el.max]){el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));document.getElementById('step').click();}el.value=old;el.dispatchEvent(new Event('input',{bubbles:true}));}document.getElementById('reset').click();`);
    await evaluate(`if(getComputedStyle(document.body).getPropertyValue('--cyan').trim()!=='#35e0d0')throw Error('Instrument theme missing');if(document.querySelectorAll('[data-preset]').length<2)throw Error('Missing experiment presets');if(document.getElementById('aboutText').textContent.length<80)throw Error('Missing concept explanation');for(const button of document.querySelectorAll('[data-preset]')){button.click();document.getElementById('step').click();if(button.getAttribute('aria-pressed')!=='true')throw Error('Preset selection not reflected');}document.getElementById('defaults').click();`);
   }
   if(entry.id===41){
    await evaluate(`document.getElementById('defaults').click();document.getElementById('canvas').scrollIntoView({block:'center'})`);
    const p=await evaluate(`(()=>{const r=document.getElementById('canvas').getBoundingClientRect(),s=Math.min((r.width-2*Math.min(24,r.width*.04))/2.4,(r.height-2*Math.min(24,r.width*.04))/2);return {x:r.left+r.width/2-s,y:r.top+r.height/2+.6*s,toX:r.left+r.width/2-.75*s,toY:r.top+r.height/2+.3*s};})()`);
    if(viewport.width<600){
     await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:p.x,y:p.y}]});
     await send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:p.toX,y:p.toY}]});
     await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    }else{
     await send('Input.dispatchMouseEvent',{type:'mousePressed',x:p.x,y:p.y,button:'left',clickCount:1});
     await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:p.toX,y:p.toY,button:'left',buttons:1});
     await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:p.toX,y:p.toY,button:'left',clickCount:1});
    }
    await evaluate(`const parameter=document.querySelector('#controls input[aria-label="t"]');parameter.value=.75;parameter.dispatchEvent(new Event('input',{bubbles:true}));`);
    await sleep(60);
    await evaluate(`(()=>{const c=document.getElementById('canvas'),r=c.getBoundingClientRect(),s=Math.min((r.width-2*Math.min(24,r.width*.04))/2.4,(r.height-2*Math.min(24,r.width*.04))/2),pixel=c.getContext('2d').getImageData(Math.round(r.width/2-.75*s),Math.round(r.height/2+.3*s),1,1).data;if(pixel[0]<200||pixel[1]<160||pixel[2]>130)throw Error('Scrubbing t lost the dragged Bezier control point');})()`);
   }
   if(entry.id===44&&viewport.width===1440){
    await sleep(50);await evaluate(`globalThis.projectionBefore=document.getElementById('canvas').toDataURL()`);
    const p=await evaluate(`(()=>{const r=document.getElementById('canvas').getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};})()`);
    await send('Input.dispatchMouseEvent',{type:'mousePressed',x:p.x,y:p.y,button:'left',clickCount:1});
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:p.x+50,y:p.y,button:'left',buttons:1});
    await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:p.x+50,y:p.y,button:'left',clickCount:1});
    await sleep(60);await evaluate(`if(globalThis.projectionBefore===document.getElementById('canvas').toDataURL())throw Error('Sphere rotation did not alter the projection')`);
   }
   if(focused&&entry.id===1){
    await evaluate(`document.getElementById('engCpu').click()`);await sleep(1000);
    await evaluate(`if(!cpu.on||!cpu.workers.length)throw Error('CPU renderer did not start');if(!cpu.full)throw Error('CPU renderer did not finish a frame');document.getElementById('engGpu').click();`);
   }
   if(focused&&entry.id===3){
    const b=await evaluate(`(()=>{document.getElementById('clear').click();const r=canvas.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};})()`);
    await send('Input.dispatchMouseEvent',{type:'mousePressed',x:b.x+50,y:b.y,button:'left',clickCount:1});
    for(let k=1;k<=30;k++)await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:b.x+50*Math.cos(k/30*Math.PI*2),y:b.y+50*Math.sin(k/30*Math.PI*2),button:'left',buttons:1});
    await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:b.x+50,y:b.y,button:'left',clickCount:1});
    await evaluate(`if(drawingMode||coefficients.length<10)throw Error('Drawn path did not reconstruct');document.getElementById('terms').value=12;document.getElementById('terms').dispatchEvent(new Event('input'));if(document.getElementById('termValue').textContent!=='12')throw Error('Term readout stale');document.getElementById('reset').click();`);
   }
   if(focused&&entry.id===4)await evaluate(`setSystem('rossler');param1.value=1;param3.value=0;resetSimulation();if(!Number.isFinite(points.length))throw Error('Invalid attractor state');setSystem('lorenz');`);
   if(focused&&entry.id===31)await evaluate(`compileEquation('x^3');setDrawMode('full');if(evalTier(1,2)!==12||evalTier(2,2)!==12||evalTier(3,2)!==6)throw Error('Derivative cascade is wrong');for(let i=0;i<4;i++)document.getElementById('addTierBtn').click();if(canvas.clientHeight<1000)throw Error('Higher tiers too short');compileEquation('x@');if(!document.getElementById('inputStatus').classList.contains('invalid'))throw Error('Invalid expression accepted');compileEquation('sqrt(x-5)');if(document.getElementById('inputStatus').classList.contains('invalid'))throw Error('Valid domain-restricted function rejected');compileEquation('sin(x)');`);
   if(entry.id===31)await evaluate(`(()=>{const original=drawCurve,flags=[];drawCurve=(...args)=>{flags.push(args[4]);original(...args);};setDrawMode('live');drawCurve=original;if(flags[0]!==false)throw Error('Primary function hidden in live mode');})()`);
   if(entry.id===0)await evaluate(`document.getElementById('search').value='Newton';document.getElementById('search').dispatchEvent(new Event('input'));if(document.querySelectorAll('#experimentGrid a').length!==2)throw Error('Search results wrong');document.getElementById('search').value='';document.getElementById('search').dispatchEvent(new Event('input'));`);
   if(entry.id===0)await evaluate(`if(getComputedStyle(document.body).getPropertyValue('--blue').trim()!=='#4d91ff')throw Error('Homepage blue theme was not restored')`);
   if([1,3,4].includes(entry.id))await evaluate(`if(document.getElementById('previous')?.getAttribute('href')!==${JSON.stringify('../'+catalogue[(entry.id+48)%50].path)}||document.getElementById('next')?.getAttribute('href')!==${JSON.stringify('../'+catalogue[entry.id%50].path)})throw Error('Explorer navigation is incorrect')`);
   if(process.argv.includes('--scroll')&&entry.id){
    const selector=entry.id===1?'#view':'#canvas';
    const before=await evaluate(`(()=>{const c=document.querySelector('${selector}'),r=c.getBoundingClientRect();const event=new WheelEvent('wheel',{deltaY:180,bubbles:true,cancelable:true});c.dispatchEvent(event);if(event.defaultPrevented)throw Error('Ordinary wheel event was intercepted');return {top:r.top+scrollY,x:r.left+r.width/2,y:Math.min(innerHeight-50,r.top+Math.min(100,r.height/2)),scroll:scrollY,position:getComputedStyle(c.parentElement).position};})()`);
    if(before.position==='sticky'||before.position==='fixed')throw Error('Graph has sticky or fixed positioning');
    const expression=entry.id===1?'JSON.stringify([cx,cy,width])':entry.id===4?'JSON.stringify([rotationX,rotationY,zoom])':entry.id===31?'JSON.stringify([state.xMin,state.xMax,state.paneYBounds])':`JSON.stringify([...document.querySelectorAll('#controls input[aria-label="zoom"]')].map(i=>i.value))`;
    const graphBefore=await evaluate(expression);
    await send('Input.dispatchMouseEvent',{type:'mouseWheel',x:before.x,y:before.y,deltaX:0,deltaY:420});await sleep(120);
    const after=await evaluate(`(()=>{const r=document.querySelector('${selector}').getBoundingClientRect();return {top:r.top+scrollY,scroll:scrollY};})()`);
    if(after.scroll<=before.scroll)failures.push(`${viewport.width}px #${entry.id}: wheel did not scroll the page`);
    if(Math.abs(after.top-before.top)>1)failures.push(`${viewport.width}px #${entry.id}: graph moved within the document on scroll`);
    if(await evaluate(expression)!==graphBefore)failures.push(`${viewport.width}px #${entry.id}: scrolling changed graph view`);
    await evaluate(`document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,0)`);
   }
   if(process.argv.includes('--fit'))await sleep(100);
   if(process.argv.includes('--fit')&&[10,19,32,33,34,47,49].includes(entry.id))await evaluate(`(()=>{const c=document.getElementById('canvas'),d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let left=c.width,right=-1;for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){const i=(y*c.width+x)*4;if(d[i+1]>170&&d[i+1]>d[i]*1.05&&d[i+2]>80){left=Math.min(left,x);right=Math.max(right,x);}}if((right-left)/c.width<.85)throw Error('Project ${entry.id}: plotted width ratio '+((right-left)/c.width).toFixed(3));})()`);
   if(process.argv.includes('--fit')&&entry.id===3)await evaluate(`(()=>{const p=createPath('circle'),span=Math.max(...p.map(p=>p.re))-Math.min(...p.map(p=>p.re));if(span/canvas.clientWidth<.9)throw Error('Fourier drawing does not fit the panel width');})()`);
   if([0,3,4,5,7,31,41,43].includes(entry.id)&&viewport.width!==320){const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(root,`artifacts/${entry.id}-${viewport.width}.png`),Buffer.from(shot.data,'base64'));}
   if(errors.length)failures.push(`${viewport.width}px #${entry.id}: ${[...new Set(errors)].join('; ')}`);
  }
  console.log(`Checked ${only?'projects '+only.join(','):focused?'focused interactions':'collection and 50 projects'} at ${viewport.width} × ${viewport.height}`);
 }
 if(focused){errors.length=0;await send('Page.navigate',{url:`file:///${root.replaceAll('\\','/')}/01-mandelbrot/index.html`});await sleep(1500);await evaluate(`if(!gpu&&!cpu.on)throw Error('Direct-file Mandelbrot did not start');document.getElementById('engCpu').click();`);await sleep(1500);await evaluate(`if(!cpu.full)throw Error('Direct-file workers did not finish');`);if(errors.length)failures.push(`Direct-file Mandelbrot: ${errors.join('; ')}`);console.log('Checked direct-file Mandelbrot GPU/CPU startup');}
 if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('Browser checks passed: no overflow, empty canvases, invalid readouts or runtime errors.');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>{ws?.close();edge?.kill();server.close();});
