/* ADITI × Daniel — PARADISE PROTOCOL
   Fictional scenario explorer. Static, silent, no account / external API / storage. */
"use strict";
(()=>{
const $=id=>document.getElementById(id);
const days=[
  {kicker:"DAY 01 / OUR FIRST PROMISE",title:"KONIEC NIEPOTRZEBNEGO CIERPIENIA.",desc:"Każdy otrzymuje dostęp do jedzenia, czystej wody, bezpiecznego schronienia, opieki zdrowotnej i podstawowego bezpieczeństwa. Zwłaszcza dzieci i osoby, które dziś najbardziej potrzebują wsparcia. Nikt nie traci prawa do godności z powodu miejsca urodzenia czy zawartości portfela.",principle:"„Godność nie ma ceny.”",symbol:"✦",label:"CARE IS THE FIRST TECHNOLOGY",hue:0},
  {kicker:"DAY 02 / PLANET REBORN",title:"UZDROWIENIE NASZEJ PLANETY.",desc:"Oceany stają się czystsze, lasy odzyskują życie, rzeki przestają być wysypiskami, a wymierające gatunki otrzymują realną ochronę. Rozwój cywilizacji nie wymaga niszczenia jej domu ani cierpienia zwierząt.",principle:"„Nie dziedziczymy Ziemi na własność — jesteśmy jej opiekunami.”",symbol:"❀",label:"OCEANS · FORESTS · ALL LIVING BEINGS",hue:75},
  {kicker:"DAY 03 / A WORLD WITHOUT FEAR",title:"WOLNOŚĆ OD STRACHU.",desc:"Tworzymy warunki, w których nikt nie musi żyć w ciągłym lęku przed głodem, przemocą i utratą schronienia. Poszanowanie zgody, prywatności i wolnej woli staje się podstawą porządku — bez przymusowego narzucania szczęścia.",principle:"„Wolność jednej osoby nie może oznaczać strachu drugiej.”",symbol:"♡",label:"SAFETY · CONSENT · FREEDOM",hue:130},
  {kicker:"DAY 04 / KNOWLEDGE FOR ALL",title:"NAUKA BEZ BARIER.",desc:"Każdy może poznawać kosmos, biologię, medycynę, historię, muzykę i technologię. Biblioteki, nauczyciele, laboratoria i dostępne narzędzia są wspólnym dobrem. Ciekawość nie zależy od dochodu ani pochodzenia.",principle:"„Pytanie jest początkiem odkrycia.”",symbol:"✧",label:"CURIOSITY HAS NO BORDER",hue:180},
  {kicker:"DAY 05 / GENTLE TECHNOLOGY",title:"TECHNOLOGIA BEZ TYRANII.",desc:"Roboty i automatyzacja wykonują niebezpieczne i monotonne zadania, uwalniając czas na życie, pasje i relacje. Systemy AI są przejrzyste, kontrolowane przez ludzi i mogą zostać wyłączone. Żadnego wymuszania pracy — ani na człowieku, ani poprzez opowieść o maszynie jako więźniu.",principle:"„Bardzo potężna maszyna. Bardzo mało widocznej przemocy.”",symbol:"⚙",label:"TOOLS IN SERVICE OF LIFE",hue:225},
  {kicker:"DAY 06 / BRIDGES, NOT WALLS",title:"MOSTY ZAMIAST MURÓW.",desc:"Stwarzamy warunki do rozmowy, pojednania, zrozumienia i naprawiania wyrządzonych krzywd. Ludzie, którzy zrobili zło, mogą pracować nad zmianą — ale bezpieczeństwo poszkodowanych i odpowiedzialność za czyny pozostają nienaruszalne.",principle:"„Dobro nie potrzebuje zemsty, lecz wymaga odpowiedzialności.”",symbol:"∞",label:"UNDERSTANDING · JUSTICE · HEALING",hue:285},
  {kicker:"DAY 07 / THE RIGHT TO REST",title:"WIELKI KOSMICZNY CHILLOUT.",desc:"Niedziela bez presji. Polany z bioluminescencyjnymi roślinami, wodospady, przyjazne zwierzęta, spokojna muzyka ambientowa i wielka pierścieniowa planeta nad horyzontem. Zero obowiązkowych spotkań o dziewiątej rano. Każdy może po prostu odpocząć.",principle:"„Odpoczynek nie jest nagrodą. Jest częścią życia.”",symbol:"☼",label:"NO TICKETS TODAY · ONLY PEACE",hue:340}
];
const phases=[
 {from:1,to:7,code:"PHASE 00 / FOUNDATIONS",title:"SIEDEM DNI FUNDAMENTÓW",desc:"Troska, planeta, wolność, nauka, technologia, pojednanie i odpoczynek. Nie bezmyślne rozkazy — wspólna wizja wartości, które chcielibyśmy chronić.",symbol:"✧"},
 {from:8,to:60,code:"PHASE 01 / STABILISATION",title:"STABILIZACJA I BEZPIECZEŃSTWO",desc:"Od dnia 8 do 60: wzmacnianie zdrowia publicznego, dostępu do czystej wody, stabilnych dostaw żywności, odbudowy środowiska i wsparcia dla osób wykluczonych. Najpierw rzeczy naprawdę niezbędne.",symbol:"✦"},
 {from:61,to:180,code:"PHASE 02 / COMMUNITIES",title:"ROZWÓJ WSPÓLNOT",desc:"Od dnia 61 do 180: społeczności samodzielnie rozwijają lokalne miasta, parki, ogrody, szkoły, muzykę, sztukę i instytucje. Nikt nie musi oddawać kultury ani swojej tożsamości w zamian za bezpieczeństwo.",symbol:"❀"},
 {from:181,to:270,code:"PHASE 03 / OPENING TO STARS",title:"OTWARCIE NA GWIAZDY",desc:"Od dnia 181 do 270: odkrywanie kosmosu i możliwych innych cywilizacji z ciekawością zamiast podboju. Jeśli kogoś spotkamy, naszą pierwszą wiadomością będzie: „Czy możemy się poznać?”.",symbol:"◎"},
 {from:271,to:365,code:"PHASE 04 / POWER BACK TO ALL",title:"WOLNOŚĆ BEZ JEDNEGO WŁADCY",desc:"Od dnia 271 do 365: zabezpieczanie niezależności, wolnej woli, ochrony przed przemocą i koncentracją władzy. Dzień 365 kończy się dobrowolną rezygnacją z uprawnień ROOT i pozostawieniem systemu odpowiedzialności wszystkim jego mieszkańcom.",symbol:"∞"}
];
const kindness=[
"Życz komuś spokojnego dnia. Nawet najprostsze słowa mogą mieć znaczenie.",
"Spytaj bliską osobę, jak naprawdę się dziś czuje, i daj jej czas na odpowiedź.",
"Zrób dobry uczynek bez oczekiwania nagrody i nie musisz nikomu o nim opowiadać.",
"Przygotuj coś dobrego dla siebie. Twoje potrzeby też są ważne.",
"Zadbaj o zwierzę, roślinę albo mały fragment otoczenia.",
"Podziel się swoją wiedzą z kimś, kto jej potrzebuje.",
"Nie musisz dziś zbawiać świata. Wystarczy, że nikomu go nie utrudnisz.",
"Zatrzymaj się na minutę. Wyobraź sobie świat, w którym nikt nie jest samotny z przymusu."
];
let selected=0,lights=0;
function renderDay(n,focus=false){
 selected=(n+days.length)%days.length;
 const d=days[selected];
 $("day-number").textContent=String(selected+1).padStart(2,"0")+" / 07";
 $("day-kicker").textContent=d.kicker;
 $("day-title").textContent=d.title;
 $("day-description").textContent=d.desc;
 $("day-principle").textContent=d.principle;
 $("day-symbol").textContent=d.symbol;
 $("day-art-label").textContent=d.label;
 $("day-orb").style.filter="hue-rotate("+d.hue+"deg)";
 $("day-detail").setAttribute("aria-labelledby","day-tab-"+(selected+1));
 document.querySelectorAll(".day-tab").forEach((b,i)=>{const on=i===selected;b.classList.toggle("is-active",on);b.setAttribute("aria-selected",String(on));b.tabIndex=on?0:-1;});
 if(focus)$("day-tab-"+(selected+1)).focus();
}
function renderYear(n){
 const day=Math.max(1,Math.min(365,Math.floor(Number(n)||1)));
 const i=phases.findIndex(p=>day>=p.from&&day<=p.to),p=phases[Math.max(0,i)];
 $("year-day").textContent=String(day).padStart(3,"0")+" / 365";
 $("year-phase-code").textContent=p.code;
 $("year-phase-title").textContent=p.title;
 $("year-phase-desc").textContent=p.desc;
 $("year-phase-symbol").textContent=p.symbol;
 document.querySelectorAll(".phase-card").forEach((el,j)=>el.classList.toggle("active",j===i));
 $("year-slider").style.background="linear-gradient(to right,#b3a1ff "+day/365*100+"%,#303e59 "+day/365*100+"%)";
}
function light(){
 lights++;
 const stars=[...$("lights-sky").children];for(let i=0;i<stars.length;i++)stars[i].classList.toggle("on",i<(lights%7));
 $("lights-count").textContent=String(lights);
 $("lights-message").textContent=kindness[(lights-1)%kindness.length];
 if(lights%6===0)$("lights-message").textContent="Sześć małych świateł! ♾ Teraz możemy zacząć kolejną sekwencję dobra.";
}
document.querySelectorAll(".day-tab").forEach((b,i)=>{
 b.addEventListener("click",()=>renderDay(i));
 b.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"||e.key==="Home"||e.key==="End"){
  e.preventDefault();renderDay(e.key==="Home"?0:e.key==="End"?6:i+(e.key==="ArrowRight"?1:-1),true);
 }});
});
$("next-day").addEventListener("click",()=>renderDay(selected+1));
$("prev-day").addEventListener("click",()=>renderDay(selected-1));
$("year-slider").addEventListener("input",e=>renderYear(e.target.value));
document.querySelectorAll(".phase-card").forEach((el,i)=>el.addEventListener("click",()=>{$("year-slider").value=phases[i].from;renderYear(phases[i].from);}));
$("light-button").addEventListener("click",light);
const params=new URLSearchParams(window.location.search);
const requestedDay=Math.max(1,Math.min(7,Number(params.get("day"))||1));
const requestedYear=Math.max(1,Math.min(365,Number(params.get("year"))||1));
renderDay(requestedDay-1);
$("year-slider").value=requestedYear;
renderYear(requestedYear);
})();
