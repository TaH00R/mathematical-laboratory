const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const M=require('../shared/math');
const close=(a,b,e=1e-8)=>assert.ok(Math.abs(a-b)<e,`${a} ≠ ${b}`);
test('catalogue has 50 numbered working project entry points',()=>{
 const c=require('../experiments');assert.equal(c.length,50);
 c.forEach((e,i)=>{assert.equal(e.id,i+1);for(const f of ['index.html','style.css','script.js','README.md'])assert.ok(fs.existsSync(`${e.path}${f}`),`${e.path}${f}`);});
});
test('quadrature integrates polynomial reference problems',()=>{
 close(M.integrate(x=>x*x,0,2,8),8/3);
 close(M.integrate(x=>x**4,0,2,80),6.4,1e-8);
 assert.ok(Math.abs(M.integrate(Math.sin,0,Math.PI,100,'midpoint')-2)<.0001);
});
test('RK4 follows exponential growth',()=>{let y=[1];for(let i=0;i<10;i++)y=M.rk4(y,.1,([x])=>[x]);close(y[0],Math.E,3e-6);});
test('probability reference values',()=>{close(M.birthday(23),.5072972343,1e-9);close(M.birthday(366),1);close(M.bayes(.01,.95,.95),.16101694915254236);});
test('prime arithmetic and Bézier endpoints',()=>{assert.equal(M.prime(1),false);assert.equal(M.prime(97),true);assert.deepEqual(M.factors(120),[2,2,2,3,5]);const p=[{x:0,y:0},{x:1,y:2},{x:3,y:0}];assert.deepEqual(M.bezier(p,0),p[0]);assert.deepEqual(M.bezier(p,1),p[2]);close(M.bezier(p,.5).y,1);});
test('DFT resolves sampled frequency',()=>{const a=M.dft(Array.from({length:128},(_,n)=>Math.sin(M.tau*7*n/128)));close(a[7],.5);close(a[121],.5);close(a[8],0);});
test('convex hull excludes interior points and triangulation has empty circumcircles',()=>{
 const p=[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:.4,y:.3}];assert.equal(M.hull(p).length,4);
 const triangles=M.delaunay(p);assert.equal(triangles.length,4);
 for(const t of triangles){const c=M.circum(...t.map(i=>p[i]));assert.ok(c);for(let i=0;i<p.length;i++)if(!t.includes(i))assert.ok((p[i].x-c.x)**2+(p[i].y-c.y)**2>=c.r2-1e-9);}
});
const source=fs.readFileSync('31-derivates/script.js','utf8').split('const canvas =')[0];
const engine=vm.runInNewContext(source+';MathEngine');
test('derivative parser rejects unknown input and uses standard precedence',()=>{
 for(const s of ['sin(x)@','foo(x)','y+1','1.2.3+x'])assert.throws(()=>engine.parse(s));
 close(engine.evaluate(engine.parse('-x^2'),3),-9);close(engine.evaluate(engine.parse('2x + (x+1)(x-1)'),3),14);
 close(engine.evaluate(engine.parse('1e-3*x'),2),.002);
 assert.ok(Number.isNaN(engine.evaluate(engine.parse('0/x'),0)));
});
test('symbolic derivatives match analytic values; unsupported operations use fallback',()=>{
 for(const [expr,x,expected] of [['x^3',2,12],['sin(x)',0,1],['tanh(x)',0,1],['exp(x)',1,Math.E]])close(engine.evaluate(engine.diff(engine.parse(expr)),x),expected);
 assert.throws(()=>engine.diff(engine.parse('floor(x)')));
 close(engine.numDiff(x=>x*x*x,2,3),6,1e-3);
});
