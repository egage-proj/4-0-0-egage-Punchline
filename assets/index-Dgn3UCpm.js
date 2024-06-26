(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const u=async(n="")=>{const o=`https://official-joke-api.appspot.com/jokes${n}/ten`;try{const e=await fetch(o);if(!e.ok)throw new Error(`Fetch failed with status - ${e.status}, ${e.statusText}`);return(e.headers.get("content-type")||"").includes("application/json")?[await e.json(),null]:[await e.text(),null]}catch(e){return console.warn(e),[null,e]}},d=async n=>{const o=`https://official-joke-api.appspot.com/jokes/${n}`;try{const e=await fetch(o);if(!e.ok)throw new Error(`Fetch failed with status - ${e.status}, ${e.statusText}`);return(e.headers.get("content-type")||"").includes("application/json")?[await e.json(),null]:[await e.text(),null]}catch(e){return console.warn(e),[null,e]}},p=n=>{document.querySelector("ul").innerHTML="";for(const o of n[0]){const e=document.createElement("li");e.innerHTML=`<p>${o.setup}</p>`,e.dataset.jokeId=o.id,e.classList.add("flex-box");const a=document.createElement("div");a.classList.add("flex-box");const t=document.createElement("button");t.textContent="Punchline!",t.dataset.jokeId=o.id;const s=document.createElement("button");s.textContent="Guess",s.dataset.jokeId=o.id,a.append(s,t),e.append(a),document.querySelector("ul").append(e)}},m=(n,o)=>{const e=document.querySelector("#guessGame");e.replaceChildren();const a=document.createElement("div");a.classList.add("modal-content","column-flex-box"),a.innerHTML=`
  <div class="flex-box">
    <h2>${n.setup}</h2>
    <span class="close">&times;</span>
  </div>
  `;const t=document.createElement("div");t.classList.add("grid-2-column"),e.style.display="block";const s=new Map;s.set(n.id,n);const r=Math.floor(Math.random()*4);let i=0;for(;i<4;){const l=Math.floor(Math.random()*o.length);if(r===i){const c=document.createElement("button");c.dataset.correct=!0,c.textContent=n.punchline,t.append(c),i++}else if(s.has(o[l].id)){console.log("repeated");continue}else{s.set(o[l].id,o[l]);const c=document.createElement("button");c.dataset.correct=!1,c.textContent=o[l].punchline,t.append(c),i++}}a.append(t),e.append(a)},f=async n=>{n.preventDefault();const o=document.querySelector("#jokeTypeSelect").value;p(await u(o))},h=async n=>{if(n.target.matches("button")){const o=await d(n.target.dataset.jokeId);if(n.target.textContent==="Punchline!")n.target.parentElement.parentElement.innerHTML=`<p>${o[0].setup}</p><p>    </p><p>${o[0].punchline}</p>`;else if(n.target.textContent==="Guess"){const e=await u();m(o[0],e[0]),n.target.parentElement.parentElement.innerHTML=`<p>${o[0].setup}</p>`}}},y=async n=>{if(n.target.matches("button")){const o=n.target.parentElement.children[0].textContent;n.target.dataset.correct==="true"?document.querySelector("#guessGame").innerHTML=`
    <div class="flex-box modal-content">
      <h2>Correct!</h2>
      <span class="close">&times;</span>
    </div>
    `:document.querySelector("#guessGame").innerHTML=`
    <div class="flex-box modal-content">
      <h2>Wrong!</h2>
      <span class="close">&times;</span>
    </div>
    `;const e=document.querySelectorAll("li");for(const a of e)if(a.children[0].textContent===o){const t=await d(a.dataset.jokeId);a.innerHTML=`<p>${t[0].setup} | ${t[0].punchline}</p>`}}},g=n=>{!n.target.matches(".close")&&n.target.matches("div, div > *")||(n.currentTarget.style.display="none")},x=async()=>{p(await u()),document.querySelector("form").addEventListener("submit",f),document.querySelector("ul").addEventListener("click",h),await d(Math.floor(Math.random()*406)),await u(),document.querySelector("#guessGame").addEventListener("click",y),document.querySelector("#guessGame").addEventListener("click",g)};x();
