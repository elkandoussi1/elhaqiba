window.__audit = async()=>{
const O=location.origin; const posts=[];
for(let s=1;;s+=150){const f=await (await fetch(`/feeds/posts/default?alt=json&max-results=150&start-index=${s}`,{cache:'no-store'})).json(); const e=f.feed.entry||[]; posts.push(...e); if(e.length<150)break;}
const pages=[]; {const f=await (await fetch('/feeds/pages/default?alt=json&max-results=150',{cache:'no-store'})).json(); pages.push(...(f.feed.entry||[]));}
const urlOf=e=>(e.link.find(l=>l.rel=='alternate')||{}).href;
const known=new Set([...posts,...pages].map(e=>urlOf(e)&&urlOf(e).replace(/^https?:/,'').replace(/[?#].*$/,'')));
const lang=(await (await fetch('/',{cache:'no-store'})).text()).match(/<html[^>]*lang='([^']+)'/)?.[1]||'';
const R=[]; const titles={};
const chk=async(e,kind)=>{
  const url=urlOf(e); const title=e.title.$t; const html=(e.content||e.summary||{}).$t||'';
  const d=new DOMParser().parseFromString('<div>'+html+'</div>','text/html'); const root=d.body;
  const txt=root.textContent.replace(/\s+/g,' ').trim(); const words=lang=='ja'?Math.round(txt.replace(/\s/g,'').length/2.5):txt.split(' ').filter(Boolean).length;
  const iss=[];
  const slug=(url||'').split('/').pop();
  if(/^blog-post(_\d+)?\.html$|^blog-page(_\d+)?\.html$|^\d+\.html$/.test(slug)) iss.push('slug-default');
  if(!title.trim()) iss.push('no-title'); if(title.length>(lang=='ja'?40:70)) iss.push('title-long('+title.length+')');
  (titles[title.trim()]=titles[title.trim()]||[]).push(url);
  if(kind=='post'&&!(e.category||[]).length) iss.push('no-label');
  if(words<300) iss.push('thin('+words+'w)');
  const imgs=[...root.querySelectorAll('img')];
  if(kind=='post'&&!imgs.length&&!e.media$thumbnail) iss.push('no-image');
  const noalt=imgs.filter(i=>!(i.getAttribute('alt')||'').trim()).length; if(noalt) iss.push('img-no-alt:'+noalt);
  const httpImg=imgs.filter(i=>/^http:/.test(i.getAttribute('src')||'')).length; if(httpImg) iss.push('img-http:'+httpImg);
  const bigImg=imgs.filter(i=>/\/s(16\d\d|[2-9]\d{3}|0)\//.test(i.getAttribute('src')||'')).length; if(bigImg) iss.push('img-fullsize:'+bigImg);
  const h1=root.querySelectorAll('h1').length; if(h1) iss.push('h1-in-body:'+h1);
  const hs=[...root.querySelectorAll('h2,h3,h4,h5,h6')]; let prev=1, skip=0; hs.forEach(h=>{const l=+h.tagName[1]; if(l>prev+1) skip++; prev=l;}); if(skip) iss.push('heading-skip:'+skip);
  if(kind=='post'&&!hs.length&&words>400) iss.push('no-subheadings');
  const emptyH=hs.filter(h=>!h.textContent.trim()).length; if(emptyH) iss.push('empty-heading:'+emptyH);
  const emptyP=[...root.querySelectorAll('p,div')].filter(p=>!p.textContent.replace(/ /g,'').trim()&&!p.querySelector('img,iframe,video,svg,hr')).length; if(emptyP>5) iss.push('empty-blocks:'+emptyP);
  const inlineFont=root.querySelectorAll('[style*="font-family"],font').length; if(inlineFont) iss.push('inline-font:'+inlineFont);
  const inlineColor=[...root.querySelectorAll('[style]')].filter(x=>/(^|;)\s*(color|background(-color)?)\s*:/i.test(x.getAttribute('style'))).length; if(inlineColor) iss.push('inline-color:'+inlineColor);
  const links=[...root.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'));
  const httpL=links.filter(h=>/^http:\/\//.test(h)).length; if(httpL) iss.push('link-http:'+httpL);
  const bad=links.filter(h=>/yourusername|your-channel|example\.com|localhost|draft\.blogger|blogger\.com\/blog\/post\/edit|^#$|^javascript:/i.test(h)); if(bad.length) iss.push('link-placeholder:'+bad.slice(0,3).join(' , '));
  const host=location.host; const intl=links.filter(h=>h.includes(host)||/^\/\d{4}\/\d{2}\//.test(h)||/^\/p\//.test(h)||/^\/search\/label/.test(h));
  const broken=intl.filter(h=>/\/\d{4}\/\d{2}\/[^/?#]+\.html|\/p\/[^/?#]+\.html/.test(h)).map(h=>h.replace(/^https?:\/\/[^/]+/,'//'+host).replace(/^\/(?!\/)/,'//'+host+'/').replace(/^https?:/,'').replace(/[?#].*$/,'')).filter(h=>!known.has(h));
  if(broken.length) iss.push('internal-unknown:'+broken.length+' '+[...new Set(broken)].slice(0,4).join(' , '));
  const xBlog=links.filter(h=>/(elkandoussi|denmarkinsider|theeverydayaiguide|okanenotobira)\.blogspot/.test(h)&&!h.includes(host)); if(xBlog.length) iss.push('cross-blog-link:'+xBlog.length);
  if(kind=='post'&&!intl.length) iss.push('no-internal-links');
  const ifr=[...root.querySelectorAll('iframe')]; const ifrNoLazy=ifr.filter(f=>f.getAttribute('loading')!='lazy').length; if(ifrNoLazy) iss.push('iframe-no-lazy:'+ifrNoLazy);
  if(root.querySelector('script')) iss.push('script-in-post');
  const ph=txt.match(/lorem ipsum|yourusername|\[insert|\bTODO\b|اكتب هنا|ضع هنا|\[image|\[link/i); if(ph) iss.push('placeholder-text:'+ph[0]);
  if((lang=='en'||lang=='da'||lang=='ja')&&/[؀-ۿ]{3,}/.test(txt)) iss.push('arabic-in-'+lang);
  if(lang=='ja'&&!/[぀-ヿ一-鿿]/.test(txt)) iss.push('no-japanese');
  if(/&lt;\/?(p|div|h[1-6]|span|strong|a|img|ul|li|table)\b/i.test(html)&&!root.querySelector('pre,code,textarea')) iss.push('escaped-html');
  if(/\{\{|\}\}/.test(txt)&&!root.querySelector('script,pre,code')) iss.push('template-braces');
  if(/\*\*[^*]+\*\*|^#{1,3} /m.test(txt)) iss.push('raw-markdown');
  try{ const r=await fetch(url,{cache:'no-store'}); const h=await r.text();
    if(r.status!=200) iss.push('status:'+r.status); if(r.redirected) iss.push('redirect->'+r.url);
    const md=(h.match(/<meta content='([^']*)' name='description'\/>/)||h.match(/<meta[^>]+name=['"]description['"][^>]+content=['"]([^'"]*)/)||[])[1];
    if(!md||!md.trim()) iss.push('no-search-desc'); else if(md.length>160) iss.push('desc-long('+md.length+')');
    if(/<meta[^>]+content=['"][^'"]*noindex[^'"]*['"][^>]+name=['"]robots|<meta[^>]+name=['"]robots['"][^>]+content=['"][^'"]*noindex/i.test(h)) iss.push('NOINDEX');
    const xr=r.headers.get('x-robots-tag'); if(xr&&/noindex/.test(xr)) iss.push('X-NOINDEX');
  }catch(err){ iss.push('fetch-fail'); }
  R.push({k:kind,u:url.replace(O,''),t:title.slice(0,80),pub:(e.published||{}).$t?.slice(0,10),w:words,lab:(e.category||[]).map(c=>c.term).join(','),iss});
};
const all=[...posts.map(e=>['post',e]),...pages.map(e=>['page',e])];
for(let i=0;i<all.length;i+=6){ await Promise.all(all.slice(i,i+6).map(([k,e])=>chk(e,k))); }
const dupT=Object.entries(titles).filter(([t,u])=>u.length>1).map(([t,u])=>t+' x'+u.length);
const cnt={}; R.forEach(r=>r.iss.forEach(x=>{const k=x.split(/[:(]/)[0]; cnt[k]=(cnt[k]||0)+1;}));
window.__R=R; return {host:location.host, lang, posts:posts.length, pages:pages.length, counts:cnt, dupTitles:dupT};
};
window.__res=null; window.__err=null; window.__audit().then(r=>window.__res=r).catch(e=>window.__err=String(e));
