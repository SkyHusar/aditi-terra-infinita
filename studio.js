import { GIFEncoder, quantize, applyPalette } from "./vendor/gifenc.esm.js";
/* ADITI CREATIVE UNIVERSE — original deterministic Canvas artwork.
   No external image service, no tracking, no wallets, no remote data access. */
"use strict";
const $=id=>document.getElementById(id),canvas=$("art-canvas");
const P={
 violet:{sky:"#090d25",mid:"#292252",deep:"#05091b",a:"#a88dff",b:"#6eead2",light:"#ffe0fc",ground:"#38366e"},
 emerald:{sky:"#031a1b",mid:"#0c4f50",deep:"#030b18",a:"#89ffb5",b:"#3beac7",light:"#e5ffe9",ground:"#12616b"},
 cyan:{sky:"#061c32",mid:"#15417e",deep:"#04101c",a:"#84e8ff",b:"#689aff",light:"#d8fff9",ground:"#2b6698"},
 solar:{sky:"#2a112a",mid:"#783361",deep:"#10172c",a:"#ffb37d",b:"#f873b0",light:"#fff1b6",ground:"#673258"}
};
const titles={nebula:"NEBULA DREAMSCAPE",rings:"RINGS OF INFINITY",portal:"THE STARGATE",paradise:"DATA CENTER PARADISE",eclipse:"ECLIPSE AT DAWN",ocean:"ALIEN OCEAN"};
const memes=[
 ["JA: JESZCZE JEDEN MAŁY UPGRADE","RÓWNIEŻ JA: BUDUJĘ CAŁĄ GALAKTYKĘ"],
 ["ALIENWARE MÓWI: KONIEC PROJEKTÓW","JA: TO DOPIERO WERSJA DEMO XD"],
 ["KOSMICI PYTAJĄ: GDZIE JEST RAJ?","JA: ZARAZ, ROBIĘ BACKUP SQLITE"],
 ["6 + 6 = 12, 12 + 12 = 24","ZA CHWILĘ PODWOJĘ CAŁY WSZECHŚWIAT"],
 ["MIAŁ BYĆ TYLKO JEDEN MEM","TERAZ MAM WŁASNĄ FABRYKĘ GIFÓW"],
 ["AI: W CZYM MOGĘ POMÓC?","JA: ZBUDUJ MI DATA CENTER PARADISE"]
];
const state={world:"nebula",palette:"violet",density:70,seed:555,meme:false,top:"",bottom:"",gifBusy:false};
function rng(seed){let n=(Math.floor(seed)||1)>>>0;return()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};}
function rgba(hex,alpha){return "rgba("+[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)).join(",")+","+alpha+")";}
function clamp(n,a,b){return Math.min(b,Math.max(a,n));}
function circle(c,x,y,r,fill){c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=fill;c.fill();}
function line(c,x,y,u,v,color,width=1){c.beginPath();c.moveTo(x,y);c.lineTo(u,v);c.strokeStyle=color;c.lineWidth=width;c.stroke();}
function backdrop(c,p,r){
 const g=c.createLinearGradient(0,0,1200,675);g.addColorStop(0,p.sky);g.addColorStop(.6,p.mid);g.addColorStop(1,p.deep);c.fillStyle=g;c.fillRect(0,0,1200,675);
 for(let i=0;i<17;i++){
  const x=160+r()*850,y=60+r()*530,rad=100+r()*250,col=i%3===0?p.a:i%3===1?p.b:p.ground;
  const h=c.createRadialGradient(x,y,0,x,y,rad);
  h.addColorStop(0,rgba(col,.10+r()*.1));h.addColorStop(.55,rgba(col,.04));h.addColorStop(1,rgba(col,0));
  c.fillStyle=h;c.fillRect(x-rad,y-rad,2*rad,2*rad);
 }
}
function stars(c,p,r,t){
 for(let i=0;i<Math.round(state.density*4);i++){
  const x=r()*1200,y=r()*675,z=r(),radius=z>.97?2.5:z>.78?1.25:.56;
  c.globalAlpha=(.3+r()*.68)*(.78+.22*Math.sin(t*2+i));
  circle(c,x,y,radius,i%6===0?p.a:p.light);
  if(i%51===0){line(c,x-6,y,x+6,y,rgba(p.light,.45),.6);line(c,x,y-6,x,y+6,rgba(p.light,.45),.6);}
 }c.globalAlpha=1;
}
function planet(c,x,y,rad,p,r,t){
 const g=c.createRadialGradient(x-rad*.33,y-rad*.42,rad*.1,x,y,rad*1.25);
 g.addColorStop(0,p.light);g.addColorStop(.23,p.a);g.addColorStop(.65,p.ground);g.addColorStop(1,p.deep);
 c.save();c.shadowColor=p.a;c.shadowBlur=36;circle(c,x,y,rad,g);c.shadowBlur=0;
 c.beginPath();c.arc(x,y,rad,0,2*Math.PI);c.clip();
 for(let i=0;i<17;i++){const yy=y-rad+r()*2*rad;c.fillStyle=rgba(i%2?p.light:p.a,.02+r()*.07);c.fillRect(x-rad*1.6,yy,rad*3.2,8+r()*15);}
 const sh=c.createLinearGradient(x-rad,y-rad,x+rad,y+rad);sh.addColorStop(0,"#ffffff16");sh.addColorStop(.44,"#00000000");sh.addColorStop(1,"#000000b0");c.fillStyle=sh;c.fillRect(x-rad,y-rad,2*rad,2*rad);c.restore();
 c.beginPath();c.arc(x,y,rad*1.04,0,2*Math.PI);c.strokeStyle=rgba(p.light,.28);c.lineWidth=2;c.stroke();
}
function scene(c,p,r,t){
 backdrop(c,p,r);stars(c,p,r,t);
 const world=state.world;
 if(world==="nebula"){
  for(let i=0;i<15;i++){const x=250+r()*700,y=140+r()*400,rad=70+r()*180;
   const g=c.createRadialGradient(x,y,0,x,y,rad);g.addColorStop(0,rgba(i%2?p.a:p.b,.14));g.addColorStop(1,rgba(p.a,0));c.fillStyle=g;c.fillRect(x-rad,y-rad,2*rad,2*rad);}
  planet(c,805,365,137,p,r,t);planet(c,235,490,51,p,r,t);
 } else if(world==="rings"){
  planet(c,690,354,170,p,r,t);
  c.save();c.translate(690,354);c.rotate(-.28+Math.sin(t*.4)*.05);
  for(let j=3;j>=0;j--){c.beginPath();c.ellipse(0,0,255+j*18,47+j*8,0,0,2*Math.PI);c.lineWidth=7-j;c.strokeStyle=rgba(j%2?p.light:p.b,.6-j*.08);c.shadowColor=p.a;c.shadowBlur=14;c.stroke();}c.restore();
  planet(c,180,180,24,p,r,t);
 } else if(world==="portal"){
  const x=605,y=347,rad=230;
  for(let j=13;j>=1;j--){c.beginPath();c.ellipse(x,y,rad*(.2+j*.075),rad*(.17+j*.067),-t*.03,0,Math.PI*2);
   c.strokeStyle=rgba(j%3===0?p.light:j%2?p.a:p.b,.15+(14-j)*.05);c.lineWidth=3+(14-j)*.5;c.shadowColor=p.b;c.shadowBlur=14;c.stroke();}c.shadowBlur=0;
  const g=c.createRadialGradient(x,y,0,x,y,rad*.7);g.addColorStop(0,rgba(p.light,.7));g.addColorStop(.4,rgba(p.a,.18));g.addColorStop(1,rgba(p.a,0));c.fillStyle=g;c.fillRect(x-rad,y-rad,2*rad,2*rad);
 } else if(world==="paradise"){
  planet(c,935,182,104,p,r,t);
  const horizon=520;c.fillStyle=rgba(p.ground,.45);c.fillRect(0,horizon,1200,675-horizon);
  for(let j=-12;j<=12;j++)line(c,600,horizon,600+j*140,675,rgba(p.b,.24),1);
  for(let y=horizon;y<675;y+=Math.max(6,(y-horizon+10)*.18))line(c,0,y,1200,y,rgba(p.b,.22),1);
  for(let j=0;j<14;j++){const x=95+j*75+r()*12,th=105+r()*175,tw=26+r()*19;
   c.fillStyle=rgba(p.deep,.95);c.fillRect(x,horizon-th,tw,th);c.strokeStyle=rgba(p.b,.6);c.strokeRect(x,horizon-th,tw,th);
   for(let k=1;k<=10;k++)line(c,x+4,horizon-th+th*k/11,x+tw-4,horizon-th+th*k/11,rgba(p.a,.2+r()*.5),1);}
  circle(c,605,312,73,rgba(p.b,.22));c.strokeStyle=p.light;c.lineWidth=3;c.beginPath();c.arc(605,312,86,0,Math.PI*2);c.stroke();
  c.font="900 124px system-ui";c.textAlign="center";c.textBaseline="middle";c.fillStyle=p.light;c.fillText("∞",605,318);c.textBaseline="alphabetic";
 } else if(world==="eclipse"){
  const x=665,y=321,rad=198;
  const g=c.createRadialGradient(x,y,rad*.78,x,y,rad*1.85);g.addColorStop(0,rgba(p.light,.7));g.addColorStop(.6,rgba(p.a,.2));g.addColorStop(1,rgba(p.a,0));
  c.fillStyle=g;c.fillRect(x-rad*2,y-rad*2,4*rad,4*rad);circle(c,x,y,rad,"#050a17");
  c.save();c.strokeStyle=rgba(p.light,.85);c.shadowColor=p.a;c.shadowBlur=27;c.lineWidth=9;c.beginPath();c.arc(x,y,rad,0,Math.PI*2);c.stroke();c.restore();
 } else if(world==="ocean"){
  planet(c,815,164,91,p,r,t);
  const sea=c.createLinearGradient(0,449,0,675);sea.addColorStop(0,rgba(p.a,.47));sea.addColorStop(1,p.deep);
  c.fillStyle=sea;c.fillRect(0,449,1200,226);
  for(let j=0;j<22;j++){const yy=455+j*10;c.beginPath();
   for(let x=0;x<=1200;x+=9){const y=yy+Math.sin(x/35+j*.7+t*2)*(3+j*.35);if(x===0)c.moveTo(x,y);else c.lineTo(x,y);}
   c.strokeStyle=rgba(j%2?p.b:p.light,.18+j*.009);c.lineWidth=1+j*.06;c.stroke();}
 }
 const vig=c.createRadialGradient(600,330,100,600,330,790);vig.addColorStop(0,"#00000000");vig.addColorStop(1,"#010313c5");c.fillStyle=vig;c.fillRect(0,0,1200,675);
}
function wrap(c,text,maxWidth,base=55){const words=String(text||"").trim().split(/\s+/);
 for(let s=base;s>=24;s-=2){c.font="900 "+s+"px Impact,Arial Black,sans-serif";const lines=[];let row="";
  for(const w of words){const candidate=row?row+" "+w:w;if(c.measureText(candidate).width>maxWidth&&row){lines.push(row);row=w;}else row=candidate;}if(row)lines.push(row);
  if(lines.length<=2&&lines.every(x=>c.measureText(x).width<=maxWidth))return {lines,s};}
 return {lines:[String(text||"").slice(0,60)],s:24};
}
function memeOverlay(c,top,bottom){
 c.fillStyle="#030817bd";c.fillRect(0,0,1200,131);c.fillRect(0,532,1200,143);
 for(const [text,y] of [[top,67],[bottom,602]]){if(!text)continue;const {lines,s}=wrap(c,text,1090);c.font="900 "+s+"px Impact,Arial Black,sans-serif";c.textAlign="center";c.textBaseline="middle";
  c.lineWidth=10;c.lineJoin="round";c.strokeStyle="#030616";c.fillStyle="#f8fffd";const start=y-(lines.length-1)*s*.55;
  lines.forEach((word,i)=>{const lineY=start+i*s*1.1;c.strokeText(word,600,lineY,1100);c.fillText(word,600,lineY,1100);});}
 c.textBaseline="alphabetic";
}
function paint(c,t,params=state){
 c.save();c.setTransform(c.canvas.width/1200,0,0,c.canvas.height/675,0,0);c.clearRect(0,0,1200,675);
 const p=P[params.palette],r=rng(params.seed);
 scene(c,p,r,t);
 if(params.meme)memeOverlay(c,params.top,params.bottom);
 else{c.fillStyle=rgba(p.light,.85);c.font="900 16px monospace";c.textAlign="left";c.fillText("ADITI // CREATIVE UNIVERSE",33,43);
  c.textAlign="right";c.fillText("SEED "+params.seed+" · "+params.world.toUpperCase(),1163,638);}
 c.restore();
}
function readSettings(){
 state.world=$("world").value;state.palette=document.querySelector('input[name="palette"]:checked')?.value||"violet";
 state.density=clamp(Number($("density").value)||70,10,100);
 state.seed=clamp(Math.round(Number($("seed").value)||555),1,999999);
 state.meme=$("meme-enable").checked;state.top=$("meme-top").value.trim();state.bottom=$("meme-bottom").value.trim();
 return {...state};
}
function redraw(){
 readSettings();paint(canvas.getContext("2d"),0);
 $("density-value").textContent=state.density+"%";$("seed-value").textContent=state.seed;
 $("art-seed-label").textContent="SEED "+state.seed;$("art-scenes-label").textContent="SCENE: "+titles[state.world];
 document.querySelectorAll(".palette-swatch").forEach(e=>e.classList.toggle("is-active",e.dataset.palette===state.palette));
 $("scene-status").textContent="RENDER COMPLETE · LOCAL";
}
function status(x){$("studio-status").textContent=x}
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),12000);}
function savePNG(){readSettings();canvas.toBlob(blob=>{if(blob){download(blob,"aditi-"+state.world+"-"+state.seed+".png");status("PNG gotowy · 1200 × 675 · "+Math.round(blob.size/1024)+" KB");}else status("Błąd eksportu PNG");},"image/png");}
async function saveGIF(){
 if(state.gifBusy)return;
 state.gifBusy=true;const btn=$("export-gif"),old=btn.innerHTML;btn.disabled=true;btn.textContent="↻ RENDERING 0%";
 const cfg=readSettings(),off=document.createElement("canvas");off.width=480;off.height=270;const c=off.getContext("2d",{willReadFrequently:true}),gif=GIFEncoder();
 try{
  let palette;
  for(let i=0;i<12;i++){
   paint(c,i/12*6.283,cfg);
   const rgba=c.getImageData(0,0,480,270).data;
   if(!palette)palette=quantize(rgba,64);
   gif.writeFrame(applyPalette(rgba,palette),480,270,{palette,delay:120,repeat:0});
   btn.textContent="↻ RENDERING "+Math.round((i+1)/12*100)+"%";
   status("Rendering GIF "+(i+1)+"/12 — dane pozostają w przeglądarce");
   await new Promise(resolve=>setTimeout(resolve,0));
  }
  gif.finish();const blob=new Blob([gif.bytes()],{type:"image/gif"});
  download(blob,"aditi-"+cfg.world+"-"+cfg.seed+".gif");
  status("GIF gotowy! 12 klatek · 480 × 270 · "+Math.round(blob.size/1024)+" KB");
 }catch(err){console.error(err);status("Nie udało się utworzyć GIF: "+String(err.message).slice(0,120));}
 finally{state.gifBusy=false;btn.disabled=false;btn.innerHTML=old;}
}
function randomWorld(){
 const worlds=Object.keys(titles),colors=Object.keys(P);
 $("world").value=worlds[Math.floor(Math.random()*worlds.length)];
 const colour=colors[Math.floor(Math.random()*colors.length)];
 document.querySelector('input[name="palette"][value="'+colour+'"]').checked=true;
 $("seed").value=1+Math.floor(Math.random()*999998);
 redraw();status("✧ Nowy kosmos! Kliknij SAVE PNG lub RENDER GIF.");
}
function randomMeme(){
 const [top,bottom]=memes[Math.floor(Math.random()*memes.length)];
 $("meme-enable").checked=true;$("meme-top").value=top;$("meme-bottom").value=bottom;
 redraw();status("😂 Gotowy mem — możesz edytować i zapisać PNG lub GIF.");
}
function makePrompt(){
 const subject=$("prompt-subject").value.trim().slice(0,260)||"Surreal cosmic landscape";
 const styles={cinematic:"cinematic photorealism, lifelike physical materials",documentary:"natural documentary photography, unposed candid realism",dreamy:"ethereal fine art photography, dreamy atmospheric depth",architectural:"photoreal architectural photography, precise geometric lines",portrait:"editorial portrait photography, realistic skin and optics"};
 const lights={neon:"soft neon twilight with vibrant reflections",golden:"golden hour sunlight with long soft shadows",moon:"subtle blue moonlight with realistic ambient bounce",studio:"large softbox studio lighting and clean color separation",rain:"rain-soaked reflective surfaces and atmospheric street lighting"};
 const cameras={wide:"full-frame 24mm wide-angle lens",portrait:"full-frame 85mm portrait lens",macro:"100mm macro lens, precise close-up focus",aerial:"high-resolution aerial wide shot"};
 const text=[
  "SUBJECT: "+subject+".",
  "STYLE: "+styles[$("prompt-style").value]+".",
  "LIGHTING: "+lights[$("prompt-light").value]+".",
  "CAMERA: "+cameras[$("prompt-camera").value]+".",
  "COMPOSITION: deliberate focal point, authentic depth cues, physically plausible shadows, subtle film grain, nuanced color grading, realistic textures.",
  "OUTPUT: high detail, aspect ratio "+$("prompt-ratio").value+", no watermark, no logo, no text overlays.",
  "AVOID: plastic-looking surfaces, oversharpening, unrealistic reflections, oversaturated skin tones, malformed hands, illegible typography."
 ].join("\n");
 $("prompt-output").textContent=text;
}
async function copy(text,success){try{await navigator.clipboard.writeText(text);status(success);}catch{status("Skopiuj ręcznie: schowek może wymagać HTTPS.");}}
function init(){
 for(const id of ["world","density","seed","meme-enable","meme-top","meme-bottom"])$(id).addEventListener("input",redraw);
 document.querySelectorAll('input[name="palette"]').forEach(el=>el.addEventListener("change",redraw));
 $("export-png").addEventListener("click",savePNG);
 $("export-gif").addEventListener("click",saveGIF);
 $("random-world").addEventListener("click",randomWorld);
 $("seed-shuffle").addEventListener("click",()=>{$("seed").value=1+Math.floor(Math.random()*999999);redraw()});
 $("seed-copy").addEventListener("click",()=>copy(String(state.seed),"Skopiowano ziarno "+state.seed));
 $("meme-random").addEventListener("click",randomMeme);
 $("prompt-build").addEventListener("click",makePrompt);
 $("prompt-copy").addEventListener("click",()=>copy($("prompt-output").textContent,"Prompt skopiowany"));
 for(const id of ["prompt-subject","prompt-style","prompt-light","prompt-camera","prompt-ratio"])$(id).addEventListener("input",makePrompt);
 redraw();makePrompt();
}
init();
