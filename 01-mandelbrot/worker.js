// this runs inside each web worker. it computes strips of the main image for the cpu
// fallback (same perturbation math as the gpu shader, in doubles) and the julia preview.
const BAIL=1e4;
let orbit=null, orbitJob=-1, orbitLen=0;
function perturb(dcr,dci,Z,M,max){
  let dzr=0,dzi=0,n=0;
  for(let i=0;i<max;i++){
    const Zr=Z[2*n],Zi=Z[2*n+1];
    const nr=2*(Zr*dzr-Zi*dzi)+(dzr*dzr-dzi*dzi)+dcr, ni=2*(Zr*dzi+Zi*dzr)+2*dzr*dzi+dci;
    dzr=nr; dzi=ni; n++;
    const zr=Z[2*n]+dzr, zi=Z[2*n+1]+dzi, zz=zr*zr+zi*zi;
    if(zz>BAIL) return i+2-Math.log2(Math.log(zz)*0.5/Math.LN2);
    if(n>=M||zz<dzr*dzr+dzi*dzi){ dzr=zr; dzi=zi; n=0; }   // rebase
  }
  return -1;
}
function escape(cr,ci,max){
  let x=0,y=0,xx=0,yy=0,i=0;
  while(xx+yy<=BAIL&&i<max){ y=2*x*y+ci; x=xx-yy+cr; xx=x*x; yy=y*y; i++; }
  if(xx+yy<=BAIL) return -1;
  return i+1-Math.log2(Math.log(xx+yy)*0.5/Math.LN2);
}
function inBulbs(cr,ci){
  const q=(cr-0.25)*(cr-0.25)+ci*ci;
  return q*(q+(cr-0.25))<=0.25*ci*ci || (cr+1)*(cr+1)+ci*ci<=0.0625;
}
onmessage=e=>{
  const m=e.data;
  if(m.type==="orbit"){ orbit=m.Z; orbitJob=m.job; orbitLen=m.M; return; }
  if(m.type==="julia"){
    const {cr,ci,w,h,max}=m, out=new Float32Array(w*h), pw=3.4, ph=pw*h/w;
    let k=0;
    for(let py=0;py<h;py++){ const zi0=-ph/2+(py+0.5)/h*ph;
      for(let px=0;px<w;px++){ let x=-pw/2+(px+0.5)/w*pw, y=zi0, xx=x*x, yy=y*y, i=0;
        while(xx+yy<=BAIL&&i<max){ y=2*x*y+ci; x=xx-yy+cr; xx=x*x; yy=y*y; i++; }
        out[k++]= xx+yy<=BAIL ? -1 : i+1-Math.log2(Math.log(xx+yy)*0.5/Math.LN2);
      } }
    postMessage({type:"julia",out,w,h},[out.buffer]);
    return;
  }
  const {job,y0,y1,w,h,dx,dy,maxIter,bulbs,c0r,c0i,direct}=m;
  if(job!==orbitJob){ postMessage({type:"strip",job,y0,y1,out:null}); return; }
  const out=new Float32Array((y1-y0)*w);
  let k=0;
  for(let py=y0;py<y1;py++){
    const dci=(py+0.5-h/2)*dy;
    for(let px=0;px<w;px++){ const dcr=(px+0.5-w/2)*dx;
      // shallow views are exact in plain doubles and that loop is 3x cheaper; deep ones need the reference orbit
      out[k++]= (bulbs&&inBulbs(c0r+dcr,c0i+dci)) ? -1 : direct ? escape(c0r+dcr,c0i+dci,maxIter) : perturb(dcr,dci,orbit,orbitLen,maxIter); }
  }
  postMessage({type:"strip",job,y0,y1,out},[out.buffer]);
};
