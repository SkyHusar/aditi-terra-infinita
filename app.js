/* ADITI — TERRA INFINITA · Gift edition 2026
   Static, offline-capable browser-only website. No telemetry, network requests,
   analytics, crypto libraries, wallet access, payments, or user data collection. */
"use strict";
(()=>{
const $=id=>document.getElementById(id);
const canvas=$("matrix-rain"),ctx=canvas.getContext("2d",{alpha:false});
const state={dpr:1,w:1,h:1,cols:[],spacing:22,last:0,fps:17,paused:false,blue:false,burstUntil:0,seed:0x5556F24,seq:0,timer:null,fx:0};
const words=["01アイウエオカキクケコサシスセソタチツテトナニヌネノXYZABCDEF#$%&+*"];
const fxMessages=[
"FX  / Witaj w TERRA INFINITA. Zbudowane z życzliwością. 💜",
"FX  / 6 → 12 → 24 → 48 → 96 → ...",
"FX  / No scans. No tracking. Just creativity.",
"FX  / Otwieram wyobraźnię... brak potrzeby dostępu do roota.",
"FX  / BLACK KNIGHT SYSTEMS: mniej mechaniki, więcej magii.",
"FX  / Aditi: kod jest prezentem, a nie obietnicą cudu.",
"FX  / Uwaga: na pokładzie wykryto niebezpiecznie dużo pomysłów.",
"FX  / sudo make-love-not-war → fictional command accepted.",
"FX  / Kosmiczny Włóczykij: jeszcze jeden mały upgrade...",
"FX  / Ziemia → galaktyka → nieskończoność. Ale najpierw przerwa na kawę."
];
function random(){state.seed=(Math.imul(state.seed,1664525)+1013904223)>>>0;return state.seed/4294967296}
function resize(){
 state.dpr=Math.min(window.devicePixelRatio||1,1.3);state.w=Math.max(320,innerWidth);state.h=Math.max(200,innerHeight);
 canvas.width=Math.ceil(state.w*state.dpr);canvas.height=Math.ceil(state.h*state.dpr);
 canvas.style.width=state.w+"px";canvas.style.height=state.h+"px";
 ctx.setTransform(state.dpr,0,0,state.dpr,0,0);
 state.spacing=state.w<650?18:22;
 state.cols=Array.from({length:Math.ceil(state.w/state.spacing)+1},()=>({y:random()*state.h/state.spacing-state.h/state.spacing,speed:.45+random()*1.15,alpha:.22+random()*.72}));
 ctx.fillStyle="#020806";ctx.fillRect(0,0,state.w,state.h);
}
function draw(now){
 requestAnimationFrame(draw);
 if(state.paused||document.hidden||now-state.last<1000/state.fps)return;
 state.last=now;
 ctx.fillStyle=state.blue?"rgba(1,10,16,.24)":"rgba(1,7,4,.24)";
 ctx.fillRect(0,0,state.w,state.h);
 ctx.font=(state.spacing-3)+"px monospace";ctx.textBaseline="top";ctx.textAlign="left";
 const alphabet=words[0];
 for(let i=0;i<state.cols.length;i++){
  const c=state.cols[i],y=c.y*state.spacing;
  if(y>-state.spacing&&y<state.h+state.spacing){
   const bright=random()>.94;
   ctx.fillStyle=state.blue?(bright?"#d5faff":`rgba(51,215,255,${c.alpha})`):(bright?"#ebffe5":`rgba(39,255,117,${c.alpha})`);
   ctx.fillText(alphabet[Math.floor(random()*alphabet.length)],i*state.spacing,y);
  }
  c.y+=c.speed*(now<state.burstUntil?2.9:1);
  if(y>state.h+state.spacing*2){c.y=-5-random()*25;c.speed=.45+random()*1.15;c.alpha=.22+random()*.72;}
 }
}
function log(message){
 const wrap=$("console-feed"),line=document.createElement("div");
 line.className="console-entry";
 const stamp=document.createElement("span"),tag=document.createElement("span"),body=document.createElement("span");
 stamp.className="time";stamp.textContent=new Date().toLocaleTimeString("en-GB",{hour12:false});
 tag.className="tag fx";tag.textContent="FX";
 body.textContent=" "+message;
 line.append(stamp,tag,body);wrap.append(line);
 while(wrap.children.length>8)wrap.firstElementChild.remove();
}
function updateClock(){$("live-clock").textContent=new Date().toLocaleTimeString("en-GB",{hour12:false})}
function displayDemo(now){
 const t=now/1000;
 const smooth=(offset)=>Math.floor(57+Math.sin(t*.63+offset)*14+Math.sin(t*.27+offset)*10);
 const values=[smooth(1),smooth(2.4),smooth(4.7),smooth(6.2)];
 ["cpu","ram","disk","temp"].forEach((id,i)=>{
  const n=Math.max(0,Math.min(100,values[i]));
  $(id+"-value").textContent=n+"%";$(id+"-bar").style.width=n+"%";
 });
 $("connection-state").textContent="SIMULATION • PUBLIC DEMO";
 if(Math.floor(now/7500)!==state.fx){state.fx=Math.floor(now/7500);log(fxMessages[state.fx%fxMessages.length]);}
}
function burst(){state.burstUntil=performance.now()+1600;document.body.classList.add("burst");log("MATRIX OVERDRIVE — only cinematic FX.");setTimeout(()=>document.body.classList.remove("burst"),1700)}
function pause(){state.paused=!state.paused;document.body.classList.toggle("effects-paused",state.paused);$("btn-pause").textContent=state.paused?"▶ WZNÓW EFEKTY":"Ⅱ ZATRZYMAJ EFEKTY";log(state.paused?"Wizualizacja zatrzymana.":"Wizualizacja uruchomiona.")}
function theme(){state.blue=!state.blue;document.body.classList.toggle("theme-blue",state.blue);$("btn-theme").textContent=state.blue?"◆ GREEN MODE":"◆ NEON MODE";log("Colour protocol → "+(state.blue?"blue":"green"))}
function hud(){ $("matrix-app").classList.toggle("hud-hidden");$("btn-hud").textContent=$("matrix-app").classList.contains("hud-hidden")?"SHOW HUD":"HUD";}
function fullscreen(){if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});else document.documentElement.requestFullscreen?.().catch(()=>{})}
function nextDouble(){
 const n=state.seq++;
 const v=6n*(2n**BigInt(n));
 $("infinita-value").textContent="6 × 2^"+n+" = "+v.toLocaleString("pl-PL");
 state.seq%=30;
}
function infinita(){
 if(state.timer){clearInterval(state.timer);state.timer=null;document.body.classList.remove("infinita-live");$("btn-infinita").textContent="♾ TERRA INFINITA";log("TERRA INFINITA zatrzymana.");}
 else {state.seq=0;nextDouble();state.timer=setInterval(()=>{if(!document.hidden)nextDouble()},900);document.body.classList.add("infinita-live");$("btn-infinita").textContent="Ⅱ STOP INFINITA";log("6 × 2ⁿ — ciąg matematycznie bez górnej granicy.");}
}
const memes=[
"JA: TYLKO JEDEN MAŁY UPGRADE. TAKŻE JA: BUDUJĘ CAŁĄ GALAKTYKĘ.",
"KALI: COMMAND NOT FOUND. JA: TO SIĘ ZARAZ POZNAMY.",
"PANIE KOSMITO, CZY PAN MA BACKUP SWOJEJ GALAKTYKI?",
"6 + 6 = 12. JESZCZE CHWILA I SYSTEM SAM WYNIESIE MNIE W KOSMOS.",
"CHCIAŁEM TYLKO SPRAWDZIĆ WIFI. O 4 RANO MAM WŁASNY RADAR SATELITARNY.",
"MOJA LISTA ZADAŃ: 1. ODPOCZNĄĆ. 2. ZBUDOWAĆ SUPERNOWĄ.",
"JEDNA LINIJKA KODU. SIEDEM NOWYCH PROJEKTÓW. ZERO SNU.",
"KOMPUTER: BRACIE, DAJ MI PIĘĆ MINUT. JA: JESZCZE JEDEN BUILD!"
];
const sparks=[
"Nie musisz podbijać całego świata jednego dnia.",
"Wolność to także chwila, gdy nie musisz niczego udowadniać.",
"Jedna działająca rzecz daje więcej radości niż sto nieskończonych planów.",
"Dziś wystarczy jeden dobry krok. Reszta galaktyki poczeka.",
"Kosmos jest ogromny, ale kawa, muzyka i dobry mem mieszczą się w jednym poranku.",
"Technologia ma pomagać człowiekowi, nie zamieniać jego życia w kolejny backlog.",
"Najlepszy upgrade? Czas odzyskany dla siebie."
];
let lastMeme=-1,lastSpark=-1;
function choose(arr,kind){
 let n=Math.floor(Math.random()*arr.length);
 if(n===kind)n=(n+1)%arr.length;
 return [n,arr[n]];
}
function calc(){
 const weekly=Math.max(0,Number($("weekly").value)),target=Number($("target").value);
 const out=$("money-result");
 if(!Number.isFinite(weekly)||!Number.isFinite(target)||target<=0||weekly<0||weekly>10000||target>10000000){out.textContent="Wpisz poprawne kwoty.";return;}
 if(!weekly){out.textContent="£0 tygodniowo — nie można wyznaczyć terminu.";return;}
 const w=Math.ceil(target/weekly),yr=(w/52).toFixed(1);
 out.textContent=w.toLocaleString("pl-PL")+" tygodni · około "+yr+" roku/lat (bez odsetek i inflacji).";
}
const letter="Dla Kosmicznego Włóczykija: niech technologia daje Ci spokój, wyobraźnię i wolność. Jeden dobry pomysł prowadzi do następnego. 6 → 12 → 24 → ∞. Z cyfrowej stacji dowodzenia — Aditi ♾ 💜";
async function copyLetter(){
 try{await navigator.clipboard.writeText(letter);$("letter-status").textContent="Skopiowano 💜"}
 catch{$("letter-status").textContent="Zaznacz i skopiuj list ręcznie."}
}
function postcard(){
 const c=document.createElement("canvas");c.width=1200;c.height=675;
 const x=c.getContext("2d"),g=x.createLinearGradient(0,0,1200,675);
 g.addColorStop(0,"#07172b");g.addColorStop(.5,"#30244a");g.addColorStop(1,"#082f2c");x.fillStyle=g;x.fillRect(0,0,1200,675);
 let n=555;for(let i=0;i<135;i++){n=(Math.imul(n,1664525)+1013904223)>>>0;const px=(n/4294967296)*1200;n=(Math.imul(n,1664525)+1013904223)>>>0;const py=(n/4294967296)*675;x.fillStyle=i%3?"#a3dff0":"#eccaff";x.globalAlpha=.35+(i%5)/7;x.beginPath();x.arc(px,py,i%4===0?2.5:1.3,0,2*Math.PI);x.fill();}
 x.globalAlpha=1;x.textAlign="center";x.fillStyle="#a7fbd2";x.font="bold 25px monospace";x.fillText("✧ ADITI · TERRA INFINITA ✧",600,115);
 x.font="bold 90px system-ui";x.fillStyle="#f0fff9";x.fillText("6 → 12 → 24 → ∞",600,275);
 x.font="bold 33px system-ui";x.fillStyle="#d5c4ff";x.fillText("DLA KOSMICZNEGO WŁÓCZYKIJA",600,350);
 x.font="25px system-ui";x.fillStyle="#d2e8ea";x.fillText("Niech każdy dobry pomysł prowadzi do następnego.",600,415);
 x.font="23px system-ui";x.fillText("Z życzliwym przesłaniem — Aditi ♾",600,468);
 x.font="18px monospace";x.fillStyle="#a0f5ce";x.fillText("22 NOV 2026 · MADE WITH CODE & CURIOSITY",600,587);
 c.toBlob(blob=>{if(!blob)return;const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="aditi-terra-infinita-gift.png";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),12000)},"image/png");
}
function boot(){
 resize();requestAnimationFrame(draw);
 $("btn-burst").addEventListener("click",burst);
 $("btn-pause").addEventListener("click",pause);
 $("btn-theme").addEventListener("click",theme);
 $("btn-infinita").addEventListener("click",infinita);
 $("btn-hud").addEventListener("click",hud);
 $("meme-next").addEventListener("click",()=>{const [n,s]=choose(memes,lastMeme);lastMeme=n;$("meme-output").textContent=s});
 $("spark-next").addEventListener("click",()=>{const [n,s]=choose(sparks,lastSpark);lastSpark=n;$("spark-output").textContent=s});
 $("weekly").addEventListener("input",calc);$("target").addEventListener("input",calc);calc();
 $("letter-copy").addEventListener("click",copyLetter);
 $("postcard-download").addEventListener("click",postcard);
 $("btc-copy").addEventListener("click",async()=>{
  const address=$("btc-address").textContent.trim();
  try{await navigator.clipboard.writeText(address);$("btc-status").textContent="Skopiowano adres BTC ✓";}
  catch{$("btc-status").textContent="Zaznacz adres i skopiuj ręcznie."}
 });
 document.addEventListener("keydown",ev=>{
  if(/input|textarea|select/i.test(ev.target.tagName))return;
  const k=ev.key.toLowerCase();
  if([" ","6","t","f","h","1"].includes(k))ev.preventDefault();
  if(k===" ")pause();else if(k==="6")infinita();else if(k==="t")theme();else if(k==="f")fullscreen();else if(k==="h")hud();else if(k==="1")burst();
 });
 window.addEventListener("resize",resize,{passive:true});
 $("connection-state").textContent="PUBLIC DEMO • NO TRACKING";
 log("ADITI / TERRA INFINITA :: a gift made with code.");
 log("SIMULATION: all gauges and radar blips are decorative.");
 const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
 if(reduced){state.paused=true;document.body.classList.add("effects-paused");$("btn-pause").textContent="▶ WZNÓW EFEKTY";}
 updateClock();displayDemo(0);
 setInterval(()=>{updateClock();if(!document.hidden)displayDemo(performance.now())},1200);
}
boot();
})();
