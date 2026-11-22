
/* TERRA INFINITA 3.1 — navigation helpers, gallery and local-only lights. */
"use strict";
(()=>{
 const $=s=>document.querySelector(s);
 const $$=s=>Array.from(document.querySelectorAll(s));
 const links=[["⌂ Główna","index.html"],["☀ O mnie","about.html"],["✣ 7 dni","days.html"],["∞ 365 dni","year.html"],["✧ Manifest","manifest.html"],["▧ Galeria","gallery.html"],["♫ Muzyka","music.html"],["⌘ Studio","studio.html"],["♡ Światła","lights.html"]];
 if(!$(".terra-header")){
  const nav=document.createElement("nav");nav.className="terra-legacy-bar";nav.setAttribute("aria-label","Menu całego TERRA INFINITA");
  const name=location.pathname.split("/").pop()||"index.html";
  links.forEach(([label,path])=>{
   const a=document.createElement("a");a.href="./"+path;a.textContent=label;
   if(path===name)a.setAttribute("aria-current","page");nav.append(a);
  });
  document.body.prepend(nav);
 }
 const viewer=$("#terra-gallery-viewer");
 if(viewer){
  const image=$("#terra-view-image"),title=$("#terra-view-title"),caption=$("#terra-view-caption");
  let returnFocus=null;
  function closeViewer(){if(viewer.open)viewer.close();}
  $$(".terra-gallery-card").forEach(button=>button.addEventListener("click",()=>{
   const src=button.dataset.image;if(!src?.startsWith("./assets/"))return;
   returnFocus=button;image.src=src;image.alt=button.querySelector("img")?.alt||"Obraz galerii";
   title.textContent=button.dataset.title||"Galeria";caption.textContent=button.dataset.caption||"";
   if(typeof viewer.showModal==="function")viewer.showModal();else window.open(src,"_blank","noopener,noreferrer");
  }));
  $("#terra-view-close")?.addEventListener("click",closeViewer);
  viewer.addEventListener("click",e=>{if(e.target===viewer)closeViewer();});
  viewer.addEventListener("close",()=>returnFocus?.focus({preventScroll:true}));
 }
 const lightButtons=$$(".terra-light-card[data-light]");
 if(lightButtons.length===6){
  const key="terra-infinita-lights-v1";
  let on=Array(6).fill(false);
  try{const stored=JSON.parse(localStorage.getItem(key)||"null");if(Array.isArray(stored)&&stored.length===6)on=stored.map(Boolean);}catch{}
  function paint(){
   const count=on.filter(Boolean).length;
   lightButtons.forEach(button=>{
    const index=Number(button.dataset.light),lit=on[index];
    button.setAttribute("aria-pressed",String(lit));
    const label=button.querySelector(".terra-light-label");if(label)label.textContent=lit?"✦ ZAPALONE · KLIKNIJ, ABY ZGASIĆ":"✧ ZAPAL ŚWIATŁO";
   });
   $("#terra-light-status").textContent=count===6?"♾ Wszystkie sześć świateł rozświetlone!":count+" / 6 świateł zapalonych";
   try{localStorage.setItem(key,JSON.stringify(on));}catch{}
  }
  lightButtons.forEach(button=>button.addEventListener("click",()=>{const i=Number(button.dataset.light);if(i>=0&&i<6){on[i]=!on[i];paint();}}));
  $("#terra-light-reset")?.addEventListener("click",()=>{on=Array(6).fill(false);paint();});
  paint();
 }
})();
