(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const a=async()=>{const s=async t=>{const c=await(await fetch(t)).json();return console.log("data:",c),c},o="https://official-joke-api.appspot.com/jokes/programming/ten",i="https://official-joke-api.appspot.com/jokes/programming/random",r=await s(o),e=await s(i);document.body.innerHTML+=`
  <p>${e[0].setup} | ${e[0].punchline}</p>
  <p>-------------------------------------------------</p>`;for(let t of r)document.body.innerHTML+=`
    <p>${t.setup} | ${t.punchline}</p>`};a();