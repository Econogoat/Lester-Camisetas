import{g as r,t as c}from"./browser-store.DG2rWj9f.js";const n=document.getElementById("catalog-data"),d=n?JSON.parse(n.textContent||"[]"):[],m=new Map(d.map(e=>[e.id,e])),s=document.querySelector("[data-wishlist-items]"),o=document.querySelector("[data-wishlist-empty]"),g=e=>`$ ${e.toLocaleString("es-AR")}`,a=()=>{if(!s)return;const e=r().map(t=>m.get(t)).filter(t=>!!t);if(e.length===0){s.innerHTML="",o?.classList.remove("hidden");return}o?.classList.add("hidden"),s.innerHTML=e.map(t=>{const l=t.imgFront&&!t.imgFront.startsWith("[")?`<img src="${t.imgFront}" alt="" class="h-full w-full object-cover" />`:`<div class="flex h-full items-center justify-center"><span class="font-display text-5xl text-bone/10">${t.crest}</span></div>`;return`
          <div data-wishlist-card data-product-id="${t.id}">
            <div class="relative aspect-[4/5] overflow-hidden bg-ink-raised">
              ${l}
              <button type="button" data-remove-wishlist aria-label="Quitar de favoritos" class="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center bg-black/60 text-steel transition-colors hover:text-bone">✕</button>
            </div>
            <div class="pt-3">
              <p class="text-xs uppercase tracking-wide text-bone/60">${t.club}</p>
              <p class="mt-0.5 text-sm font-medium text-bone">${t.name}</p>
              <p class="mt-1 text-sm font-bold text-bone">${g(t.price)}</p>
            </div>
          </div>
        `}).join(""),s.querySelectorAll("[data-wishlist-card]").forEach(t=>{const i=t.getAttribute("data-product-id")??"";t.querySelector("[data-remove-wishlist]")?.addEventListener("click",()=>{c(i),a()})})};a();window.addEventListener("lester:store-update",a);
