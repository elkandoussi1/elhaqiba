(async function(tag,mode){
const sleep=t=>new Promise(r=>setTimeout(r,t));
const st=document.createElement('style');st.textContent='*,*::before,*::after{transition:none!important;animation:none!important}';document.head.appendChild(st);
const B=document.body; if(mode==='dark'){B.classList.remove('lgT','syD');B.classList.add('drK')}
const props=['display','position','top','left','right','bottom','width','height','margin-top','margin-right','margin-bottom','margin-left','padding-top','padding-right','padding-bottom','padding-left','color','background-color','border-top','border-right','border-bottom','border-left','border-radius','font-size','font-weight','font-family','line-height','opacity','visibility','transform','z-index','box-shadow','flex','gap','text-align','direction','overflow-x','overflow-y','fill','stroke','outline','justify-content','align-items','white-space','list-style-type','content','cursor'];
const skip=e=>e.closest('#kRel,.tic1,.tickerNews,.pu-views,.pVws,.pDt,time,abbr,.kTrL ~ *,iframe,.adsbygoogle,#recentPosts,.ctgW,.relatedPosts,#related-posts,.goog-te-gadget,.skiptranslate')||/^(SCRIPT|STYLE|NOSCRIPT|LINK|META|IFRAME)$/.test(e.tagName);
function h(s){let a=0xdeadbeef,b=0x41c6ce57;for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);a=Math.imul(a^c,2654435761);b=Math.imul(b^c,1597334677)}a=Math.imul(a^(a>>>16),2246822507)^Math.imul(b^(b>>>13),3266489909);b=Math.imul(b^(b>>>16),2246822507)^Math.imul(a^(a>>>13),3266489909);return(4294967296*(2097151&b)+(a>>>0)).toString(36)}
function path(e){const p=[];while(e&&e!==document.body){let s=e.tagName.toLowerCase();if(e.id&&!/^\d|kNm|kd\d/.test(e.id))s+='#'+e.id;else{const c=(e.getAttribute('class')||'').trim().split(/\s+/).filter(x=>x&&!/^(lazy|loaded|lazied|on|open|active|hidden)$/.test(x)).slice(0,3).join('.');if(c)s+='.'+c;const sib=[...e.parentNode.children].filter(x=>x.tagName===e.tagName);if(sib.length>1)s+=':'+sib.indexOf(e)}p.unshift(s);e=e.parentElement}return p.join('>')}
function snap(root){const o={};[root,...root.querySelectorAll('*')].forEach(e=>{if(skip(e))return;const cs=getComputedStyle(e);let v=props.map(p=>cs.getPropertyValue(p)).join('|');for(const ps of ['::before','::after']){const c=getComputedStyle(e,ps);if(c.content!=='none'&&c.content!=='normal')v+='#'+ps+props.map(p=>c.getPropertyValue(p)).join('|')}o[path(e)]=h(v)});return o}
const res={base:snap(document.body)};
const states=['onMode','forCusThm','offTrans','offBkm','offPrf','offNav','forTocJs','forShare','forComments'];
for(const id of states){const i=document.getElementById(id);if(!i)continue;i.checked=true;i.dispatchEvent(new Event('change',{bubbles:true}));await sleep(80);const roots=[document.querySelector('header'),document.querySelector('.blogMn'),document.querySelector('.tocL'),document.querySelector('.pSh'),document.querySelector('#comment, .cmS, .pCmnts')].filter(Boolean);const o={};roots.forEach(r=>Object.assign(o,snap(r)));res[id]=o;i.checked=false;i.dispatchEvent(new Event('change',{bubbles:true}));await sleep(30)}
const si=document.getElementById('searchIn');if(si){si.focus();await sleep(60);res.search=snap(document.querySelector('.BlogSearch'));si.blur()}
const key='__fp_'+tag;
const prev=localStorage.getItem(key);
if(!prev||window.__fpSave){localStorage.setItem(key,JSON.stringify(res));return {saved:key,counts:Object.fromEntries(Object.entries(res).map(([k,v])=>[k,Object.keys(v).length]))}}
const P=JSON.parse(prev),diff={};for(const s in res){const a=P[s]||{},b=res[s];const d=[];for(const k in b){if(k in a&&a[k]!==b[k])d.push(k)}const missing=Object.keys(a).filter(k=>!(k in b)).length,added=Object.keys(b).filter(k=>!(k in a)).length;if(d.length||missing||added)diff[s]={changed:d.slice(0,25),nChanged:d.length,missing,added}}
return {compared:key,diff};
})
