window.__audit2 = async()=>{
const posts=[]; for(let s=1;;s+=150){const f=await (await fetch(`/feeds/posts/default?alt=json&max-results=150&start-index=${s}`,{cache:'no-store'})).json(); const e=f.feed.entry||[]; posts.push(...e); if(e.length<150)break;}
const pages=(await (await fetch('/feeds/pages/default?alt=json&max-results=150')).json()).feed.entry||[];
const all=[...posts,...pages]; const urlOf=e=>(e.link.find(l=>l.rel=='alternate')||{}).href;
// CSS text of a post page
const h=await (await fetch(urlOf(posts[0]||pages[0]))).text();
let css=[...h.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n');
for(const m of h.matchAll(/<link[^>]+href=['"]([^'"]+\.css[^'"]*)['"]/g)){ try{ css+=await (await fetch(m[1].replace(/&amp;/g,'&'))).text(); }catch(e){} }
for(const m of h.matchAll(/ldCss\([^"']*["']([^"']+\.css)["']/g)){ try{ css+=await (await fetch(m[1])).text(); }catch(e){} }
const classUse={}; const imgs=[];
for(const e of all){ const html=(e.content||{}).$t||''; const d=new DOMParser().parseFromString('<div>'+html+'</div>','text/html');
  d.body.querySelectorAll('[class]').forEach(el=>el.classList.forEach(c=>{ (classUse[c]=classUse[c]||new Set()).add(urlOf(e).replace(location.origin,'')); }));
  d.body.querySelectorAll('img[src]').forEach(i=>imgs.push([i.getAttribute('src'),urlOf(e).replace(location.origin,'')]));
}
const ignore=/^(separator|tr_bq|MsoNormal|Apple-|post-|separator|tr-caption|tr_|dir|ltr|rtl)$/;
const missing=Object.entries(classUse).filter(([c])=>!new RegExp('\\.'+c.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&')+'(?![\\w-])').test(css)).map(([c,s])=>c+' ('+s.size+') '+[...s].slice(0,2).join(','));
const broken=[]; const uniq=[...new Map(imgs.map(x=>[x[0],x])).values()];
for(let i=0;i<uniq.length;i+=4){ await Promise.all(uniq.slice(i,i+4).map(([src,p])=>new Promise(ok=>{const im=new Image(); const t=setTimeout(()=>{broken.push('timeout '+src.slice(0,90)+' @'+p);ok()},25000); im.onload=()=>{clearTimeout(t);ok()}; im.onerror=()=>{clearTimeout(t);broken.push(src.slice(0,100)+' @'+p);ok()}; im.src=src;}))); }
return {cssLen:css.length, classes:Object.keys(classUse).length, missing, imgs:uniq.length, broken};
};
window.__res2=null; window.__audit2().then(r=>window.__res2=r).catch(e=>window.__res2='ERR '+e);
