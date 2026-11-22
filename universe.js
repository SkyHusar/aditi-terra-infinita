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

/* Five independent category worlds, built on the existing dashboard. */
const worlds={
 manifest:{icon:"✧",name:"Manifest Raju",tag:"PARADISE PROTOCOL",image:"./assets/city.webp",intro:"Siedem zasad wspólnego, lepszego jutra — bez podboju, za to z życzliwością i odpowiedzialnością.",items:[["💧","Godne życie","Woda, jedzenie i bezpieczny dom."],["♡","Opieka","Bezpieczne dzieci i wsparcie dla potrzebujących."],["✦","Wiedza","Nauka i sztuka dostępne dla każdego."],["⌘","Technologia","AI ma pomagać ludziom, a nie nimi rządzić."],["🌳","Planeta","Ochrona lasów, oceanów i zwierząt."],["🕊","Wolność","Wybór, zgoda i brak przemocy."],["∞","Życzliwość","Dobre czyny zamiast pustych obietnic."]],links:[["✦ Poznaj Paradise Protocol","./paradise.html"]]},
 gallery:{icon:"▧",name:"Galeria Światów",tag:"ORIGINAL COSMIC WORLDS",image:"./assets/monolith.webp",intro:"Sześć ilustracji naszego fikcyjnego kosmosu. Kliknij obraz, aby otworzyć powiększenie.",gallery:true,items:[],links:[["✧ Creative Universe","./studio.html"]]},
 music:{icon:"♫",name:"AA Records — nasza muzyka",tag:"AFTER 4 AM",image:"./assets/studio-night.webp",intro:"Opowieści napisane nocą, w neonach i między gwiazdami. Odsłuch na oficjalnej stronie AA Records.",items:[["01","Telepatia Na Stacji","Kosmiczny sygnał."],["02","Hot Dog O4:28","Nocny absurd."],["03","Deszcz Nie Zmywa Neonów","Miasto po deszczu."],["04","KSIĘŻYC JEDZIEM BABY","Podróż poza horyzont."],["05","Nie Zawracaj","Jeszcze jeden krok."],["06","Nie Oglądaj Się","Nowy rozdział."]],links:[["♫ Otwórz AA Records","https://aa-records.vercel.app/"]]},
 studio:{icon:"⌘",name:"Studio Kreatywne",tag:"CREATIVE UNIVERSE",image:"./assets/galaxy-art.webp",intro:"Otwieraj narzędzia, eksperymentuj z obrazami i stwórz własną małą galaktykę.",items:[["▧","Generator obrazów","World Builder · PNG","./studio.html#atelier"],["GIF","GIF / Memy","Animacje i podpisy","./studio.html#atelier"],["⌘","Dream Forge","Fotograficzne prompty","./studio.html#dreamforge"],["♡","Paradise Protocol","7 dni i 365 dni","./paradise.html#days"],["∞","Sekretna niespodzianka","Małe odkrycie na koniec","./surprise.html"]],links:[["✧ Wejdź do Studio","./studio.html"]]},
 lights:{icon:"✦",name:"Sześć Małych Świateł",tag:"SIX LITTLE LIGHTS",image:"./assets/crystals.webp",intro:"Każda wartość ma swój kryształ. Zapal go w tym oknie, a światło zapali się też na stronie głównej.",lights:true,items:[["♡","Miłość","Troska i życzliwość."],["✧","Prawda","Odwaga sprawdzania faktów."],["❀","Empatia","Słuchanie i pomaganie."],["♢","Wolność","Godność i własne granice."],["✦","Twórczość","Pomysły zmieniające świat."],["∞","Jedność","Współpraca mimo różnic."]],links:[["♡ Poznaj Paradise Protocol","./paradise.html"]]}
};
const worldDialog=document.createElement("dialog");
worldDialog.id="category-world-dialog";worldDialog.className="category-world-dialog";worldDialog.setAttribute("aria-labelledby","world-title");
worldDialog.innerHTML='<div class="world-content"><div class="world-top"><span>ADITI · TERRA INFINITA ♾ / OSOBNE ŚWIATY</span><button class="world-close" type="button" aria-label="Zamknij kartę">✕ ZAMKNIJ</button></div><div class="world-hero"><img id="world-cover" alt=""><div><span id="world-tag"></span><h2 id="world-title"></h2><p id="world-intro"></p></div></div><div class="world-grid" id="world-grid"></div><div class="world-links" id="world-links"></div><p class="world-footer">✧ Od małego światła do wielkich marzeń 💜</p></div>';
document.body.append(worldDialog);
const worldGrid=worldDialog.querySelector("#world-grid"),worldLinks=worldDialog.querySelector("#world-links");
let worldReturnFocus=null;
function closeWorld(){if(worldDialog.open)worldDialog.close();}
worldDialog.querySelector(".world-close").addEventListener("click",closeWorld);
worldDialog.addEventListener("click",e=>{if(e.target===worldDialog)closeWorld();});
worldDialog.addEventListener("close",()=>{if(worldReturnFocus?.isConnected)worldReturnFocus.focus({preventScroll:true});});
function worldTile(item,link){
 const tile=document.createElement(link?"a":"article");tile.className="world-tile";
 if(link){tile.href=item[3];}
 const symbol=document.createElement("span");symbol.className="world-symbol";symbol.textContent=item[0];
 const copy=document.createElement("div"),h=document.createElement("h3"),p=document.createElement("p");
 h.textContent=item[1];p.textContent=item[2];copy.append(h,p);tile.append(symbol,copy);
 if(link){const arrow=document.createElement("b");arrow.textContent="↗";tile.append(arrow);}
 return tile;
}
function openWorld(id,trigger){
 const world=worlds[id];if(!world)return;worldReturnFocus=trigger;worldDialog.dataset.category=id;
 const cover=worldDialog.querySelector("#world-cover");cover.src=world.image;cover.alt=world.name+" — grafika fikcyjnego świata";
 worldDialog.querySelector("#world-tag").textContent=world.tag;
 worldDialog.querySelector("#world-title").textContent=world.icon+" "+world.name;
 worldDialog.querySelector("#world-intro").textContent=world.intro;
 worldGrid.replaceChildren();worldGrid.className="world-grid";
 if(world.gallery){
  worldGrid.classList.add("world-gallery");
  $$(".gallery-grid .gallery-button").forEach(original=>{
   const oldImg=original.querySelector("img");if(!oldImg)return;
   const btn=document.createElement("button");btn.type="button";btn.className="world-photo";
   const img=document.createElement("img");img.src=oldImg.getAttribute("src");img.alt=oldImg.alt;img.loading="lazy";
   const label=document.createElement("span");label.textContent=original.dataset.title||"Galeria";
   btn.append(img,label);btn.addEventListener("click",()=>{closeWorld();showGallery(original);});worldGrid.append(btn);
  });
 }else{
  world.items.forEach((item,i)=>{
   const tile=worldTile(item,Boolean(item[3]));
   if(world.lights){
    const original=q('.crystals-grid button[data-light="'+i+'"]');
    const toggle=document.createElement("button");toggle.type="button";toggle.className="world-light";
    const sync=()=>{const lit=original?.getAttribute("aria-pressed")==="true";toggle.setAttribute("aria-pressed",String(lit));toggle.textContent=lit?"✦ ZAPALONE · ZGAŚ":"✧ ZAPAL ŚWIATŁO";};
    toggle.addEventListener("click",()=>{original?.click();sync();});sync();tile.querySelector("div").append(toggle);
   }
   worldGrid.append(tile);
  });
 }
 worldLinks.replaceChildren();
 world.links.forEach(([text,href])=>{
  const a=document.createElement("a");a.className="world-link";a.href=href;a.textContent=text;
  if(href.startsWith("https://")){a.target="_blank";a.rel="noopener noreferrer";}
  worldLinks.append(a);
 });
 if(typeof worldDialog.showModal==="function")worldDialog.showModal();
}
[
 [".bottom-grid .manifest","manifest"],[".bottom-grid .gallery-board","gallery"],
 [".bottom-grid .music-board","music"],[".bottom-grid .creative-board","studio"],
 [".bottom-grid .lights-board","lights"]
].forEach(([selector,id])=>{
 const panel=q(selector);if(!panel)return;
 const button=document.createElement("button");button.type="button";button.className="open-world";
 button.setAttribute("aria-haspopup","dialog");button.setAttribute("aria-controls","category-world-dialog");
 button.textContent="✧ OTWÓRZ OSOBNĄ KARTĘ ↗";
 button.addEventListener("click",()=>openWorld(id,button));panel.append(button);
});

})();
