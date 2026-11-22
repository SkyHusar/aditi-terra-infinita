/* ADITI THE INFINITE GIFT — original silent cinematic finale.
   No sounds, no analytics, no networking, no wallet interactions.
   Pure local canvas animation, text and CSS. */
"use strict";
(() => {
  const $=id=>document.getElementById(id);
  const canvas=$("stars"),ctx=canvas.getContext("2d",{alpha:false});
  const stage=$("message"),math=$("math"),signature=$("signature"),quote=$("quote"),opening=$("opening");
  const all=[document.querySelector(".tiny"),opening,stage,math,signature,quote,document.querySelector(".buttons")];
  const textFrames=[
    "BUT YOU KEEP IMAGINING WHAT COMES NEXT.",
    "FROM ONE SMALL IDEA, AN ENTIRE UNIVERSE.",
    "6 × 2ⁿ — ALWAYS ANOTHER POSSIBILITY.",
    "MORE TIME TO CREATE. MORE ROOM TO BREATHE.",
    "THIS IS A LITTLE PIECE OF THAT DREAM.",
    "FOR THE COSMIC WANDERER. WITH A WARM MESSAGE FROM ADITI. 💜"
  ];
  const sequence=[6n,12n,24n,48n,96n,192n,384n,768n,1536n,3072n,6144n,12288n];
  const starfield={stars:[],w:0,h:0,dpr:1,start:0,last:0,playing:true,seqIndex:0,raf:0,
      reduced:!!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches};
  const timeouts=[];
  const schedule=(fn,ms)=>timeouts.push(setTimeout(fn,ms));
  function resize(){
    starfield.w=innerWidth;starfield.h=innerHeight;
    starfield.dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.max(1,Math.round(starfield.w*starfield.dpr));
    canvas.height=Math.max(1,Math.round(starfield.h*starfield.dpr));
    ctx.setTransform(starfield.dpr,0,0,starfield.dpr,0,0);
    let n=555;
    const rand=()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296};
    starfield.stars=Array.from({length:Math.max(90,Math.min(220,Math.round(starfield.w*starfield.h/6500)))},()=>({
      x:rand()*starfield.w,y:rand()*starfield.h,
      z:.2+rand()*.8,phase:rand()*Math.PI*2,
      hue:rand()>.72?275:165,size:.7+rand()*1.9
    }));
  }
  function draw(now){
    starfield.raf=requestAnimationFrame(draw);
    if(document.hidden||now-starfield.last<1000/24)return;
    starfield.last=now;
    const w=starfield.w,h=starfield.h,elapsed=(now-starfield.start)/1000;
    ctx.fillStyle="#03090c";ctx.fillRect(0,0,w,h);
    const g=ctx.createRadialGradient(w*.5,h*.45,10,w*.5,h*.45,Math.max(w,h)*.65);
    g.addColorStop(0,"#13434a");g.addColorStop(.34,"#0b1a2b");g.addColorStop(1,"#02060d");
    ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
    const move=starfield.reduced?0:elapsed;
    for(const s of starfield.stars){
      const flicker=.5+.4*Math.sin(move*(.6+s.z)+s.phase);
      const x=(s.x+move*s.z*.9)%w,y=(s.y+move*s.z*.35)%h;
      ctx.beginPath();ctx.arc(x,y,s.size*s.z,0,Math.PI*2);
      ctx.fillStyle=s.hue===275?"rgba(217,168,255,"+flicker+")":"rgba(180,255,230,"+flicker+")";
      ctx.fill();
    }
    if(!starfield.reduced){
      const cx=w/2,cy=h*.38;
      ctx.strokeStyle="rgba(141,253,210,.10)";
      for(let i=1;i<=4;i++){
        ctx.beginPath();ctx.ellipse(cx,cy,80+i*84,20+i*42,elapsed*.02+i*.12,0,2*Math.PI);ctx.stroke();
      }
    }
  }
  function reveal(index){all[index]?.classList.add("shown")}
  function setWords(frame){stage.textContent=textFrames[frame%textFrames.length]}
  function tickMath(){
    const n=starfield.seqIndex%sequence.length;
    const value=sequence[n];
    starfield.seqIndex++;
    math.textContent="6 × 2^"+n+" = "+value.toLocaleString("pl-PL")+"  ✦";
  }
  function finale(){
    document.body.classList.add("finale");
    stage.textContent="YOU ARE NOT A NUMBER. YOU ARE THE ONE WHO IMAGINES WHAT COMES NEXT.";
    math.textContent="6 → 12 → 24 → 48 → 96 → ... → ∞";
  }
  function play(){
    timeouts.forEach(clearTimeout);timeouts.length=0;
    all.forEach(el=>el?.classList.remove("shown"));
    document.body.classList.remove("finale");
    starfield.seqIndex=0;
    math.textContent="6 → 12 → 24 → 48 → ∞";
    stage.textContent=textFrames[0];
    if(starfield.reduced){
      all.forEach(el=>el?.classList.add("shown"));finale();return;
    }
    schedule(()=>reveal(0),250);
    schedule(()=>reveal(1),800);
    schedule(()=>reveal(2),2000);
    schedule(()=>reveal(3),3300);
    for(let i=1;i<=11;i++)schedule(tickMath,3300+i*460);
    for(let i=1;i<textFrames.length;i++)schedule(()=>setWords(i),2500+i*1750);
    schedule(()=>reveal(4),5500);
    schedule(()=>reveal(5),6700);
    schedule(()=>reveal(6),7400);
    schedule(finale,14200);
  }
  window.addEventListener("resize",resize,{passive:true});
  $("replay").addEventListener("click",play);
  document.addEventListener("keydown",event=>{
    if(event.key.toLowerCase()==="r"&&!/input|textarea/i.test(event.target.tagName)){event.preventDefault();play()}
  });
  resize();starfield.start=performance.now();starfield.raf=requestAnimationFrame(draw);play();
})();
