window.__patch2=function(t,P){
  const log=[];
  const one=(a,b,label)=>{const n=t.split(a).length-1; if(n!==1) throw label+' count '+n; t=t.replace(a,()=>b); log.push(label);};
  // 1) X logo for twitter-icon includable
  const i=t.indexOf("<b:includable id='twitter-icon'>"); if(i<0) throw 'no twitter-icon';
  const j=t.indexOf('</b:includable>',i)+15;
  t=t.slice(0,i)+"<b:includable id='twitter-icon'>\n        <svg viewBox='0 0 32 32'>"+P.icons.x.replace(/><\/path>/g,'/>')+"</svg>\n      </b:includable>"+t.slice(j); log.push('x-icon');
  // 2) accept "X" as link name too
  const twc="<b:elseif cond='data:link.name == &quot;Twitter&quot;'/>\n                                  <b:include name='twitter-icon'/>";
  if(t.split(twc).length===2){ t=t.replace(twc,()=>"<b:elseif cond='data:link.name == &quot;Twitter&quot; or data:link.name == &quot;X&quot;'/>\n                                  <b:include name='twitter-icon'/>"); log.push('x-cond'); }
  // 3) TikTok into footer, using the side-menu TikTok link
  const ll=t.slice(t.indexOf("<b:widget id='LinkList002'"), t.indexOf('</b:widget>', t.indexOf("<b:widget id='LinkList002'")));
  const m=ll.match(/name='text-(\d+)'>\s*tiktok\s*</i); let tt=null;
  if(m){ const lm=ll.match(new RegExp("name='link-"+m[1]+"'>([^<]+)<")); tt=lm&&lm[1].trim(); }
  const ui=t.indexOf('<ul class="sL">'), uj=t.indexOf('</ul>',ui);
  if(tt && !/sl-tt/.test(t.slice(ui,uj))){
    const li='<li><a aria-label="TikTok" class="link sl-tt" href="'+tt+'" rel="noopener" target="_blank"><svg aria-hidden="true" viewBox="0 0 32 32">'+P.icons.tt+'</svg></a></li>';
    const blk=t.slice(ui,uj); const k=blk.search(/<li><a[^>]*sl-ig[^>]*>[\s\S]*?<\/a><\/li>/);
    let nb; if(k>=0){ const end=blk.indexOf('</a></li>',k)+9; nb=blk.slice(0,end)+'\n     '+li+blk.slice(end);} else nb=blk.replace(/\n\s*$/,'')+'\n     '+li+'\n ';
    t=t.slice(0,ui)+nb+t.slice(uj); log.push('footer-tt '+tt);
  } else log.push('footer-tt skipped ('+(tt?'exists':'no tiktok link')+')');
  // 4) side-menu tiles CSS (after the footer dark-hover rule)
  const A=".drK footer .sL a.link:hover,.drK footer .sL a.link:focus-visible{background:var(--sb,var(--linkC));border-color:transparent;color:#fff;box-shadow:0 6px 14px rgba(0,0,0,.35)}";
  if(!t.includes('.mnMob .mSoc .tIc{')) one(A, A+"\n"+P.css2, 'side-css');
  return {t,log};
};
