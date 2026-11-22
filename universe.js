/* ADITI × Daniel — TERRA INFINITA Neon Universe.
   Accessible local interactions. No trackers, API, wallets, or automated outreach. */
"use strict";
(()=>{
const q=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const gallery=q("#lightbox"),galleryImg=q("#lightbox-img"),galleryTitle=q("#lightbox-title");
let beforeGallery=null;
function showGallery(btn){
 const img=btn.dataset.image;
 if(!img || !img.startsWith("./assets/"))return;
 beforeGallery=btn;
 galleryImg.src=img;
 galleryImg.alt=btn.querySelector("img")?.alt||"Wybrana grafika kosmiczna";
 galleryTitle.textContent=btn.dataset.title||"Galeria światów";
 if(typeof gallery.showModal==="function")gallery.showModal();
}
function closeGallery(){
 if(gallery.open)gallery.close();
 beforeGallery?.focus({preventScroll:true});
}
$$(".gallery-button").forEach(btn=>btn.addEventListener("click",()=>showGallery(btn)));
q("#lightbox-close").addEventListener("click",closeGallery);
gallery.addEventListener("click",event=>{if(event.target===gallery)closeGallery()});
let lights=Array(6).fill(false);
const lightQuotes=[
 "Miłość: życzliwość nie wymaga wielkiej fortuny.",
 "Prawda: piękna historia nie musi udawać faktów.",
 "Empatia: zauważ cierpienie i spróbuj pomóc.",
 "Wolność: nikt nie powinien być czyimś więźniem.",
 "Twórczość: wyobraź sobie coś dobrego — i zbuduj mały fragment.",
 "Jedność: różnimy się, ale możemy działać razem."
];
$$(".crystals-grid button[data-light]").forEach((b)=>{
 b.setAttribute("aria-pressed","false");
 b.addEventListener("click",()=>{
  const index=Number(b.dataset.light);
  if(!Number.isInteger(index)||index<0||index>5)return;
  lights[index]=!lights[index];
  b.classList.toggle("active",lights[index]);
  b.setAttribute("aria-pressed",String(lights[index]));
  const count=lights.filter(Boolean).length;
  q("#lights-status").textContent=count===6?
    "♾ Zapalono wszystkie sześć świateł! Dobro buduje się z małych gestów.":
    count===0?"Wybierz światło, aby je zapalić. Każde oznacza inną wartość.":
    "✧ "+count+" / 6 — "+lightQuotes[index];
 });
});
const dialog=q("#message-dialog");
q("#message-button").addEventListener("click",()=>dialog.showModal?.());
q("#message-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});
q("#share-button").addEventListener("click",async()=>{
 const btn=q("#share-button"),old=btn.textContent,link="https://aditi-terra-infinita.vercel.app/";
 try{
  await navigator.clipboard.writeText(link);
  btn.textContent="✓ SKOPIOWANO LINK";
 }catch{btn.textContent="SKOPIUJ Z PASKA ADRESU";}
 setTimeout(()=>btn.textContent=old,2600);
});
const sections=$$("main section[id]");
const navLinks=$$(".topnav nav a[href^='#']");
if("IntersectionObserver" in window){
 const observer=new IntersectionObserver(entries=>{
  for(const e of entries){
   if(!e.isIntersecting)continue;
   navLinks.forEach(a=>a.classList.toggle("current",a.getAttribute("href")==="#"+e.target.id));
  }
 },{rootMargin:"-18% 0px -73% 0px",threshold:0});
 sections.forEach(s=>observer.observe(s));
}
})();
