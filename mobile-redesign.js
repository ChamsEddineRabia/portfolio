(function(){
 function init(){
  const media=window.matchMedia('(max-width:760px)');
  const fr=document.documentElement.lang==='fr';
  const header=document.querySelector('.topbar'),inner=document.querySelector('.topbar-inner'),menu=document.querySelector('.menu');
  if(!header||!inner||!menu)return;
  menu.id='mobile-section-menu';
  const toggle=document.createElement('button');toggle.type='button';toggle.className='mobile-section-toggle';toggle.setAttribute('aria-controls',menu.id);toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label',fr?'Ouvrir la navigation des sections':'Open section navigation');
  const current=document.createElement('span');current.textContent=fr?'Présentation':'Overview';toggle.appendChild(current);inner.insertBefore(toggle,menu);
  const added=[];
  const destinations=fr?[['projects','Mémoire de Master'],['online-internship','Formation en ligne'],['workshops','Ateliers et événements'],['industrial','Visites industrielles'],['skills','Compétences'],['languages','Langues'],['contact','Contact']]:[['projects','Master’s thesis'],['online-internship','Online internship'],['workshops','Workshops & events'],['industrial','Industrial visits'],['skills','Skills'],['languages','Languages'],['contact','Contact']];
  destinations.forEach(function(item){if(menu.querySelector('a[href="#'+item[0]+'"]'))return;const a=document.createElement('a');a.href='#'+item[0];a.textContent=item[1];a.dataset.phoneOnly='true';menu.appendChild(a);added.push(a);});
  const ordered=Array.from(menu.querySelectorAll('a')).sort((a,b)=>{const x=document.getElementById(a.hash.slice(1)),y=document.getElementById(b.hash.slice(1));return x&&y?(x.compareDocumentPosition(y)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1):0;});
  function close(){header.classList.remove('mobile-menu-open');toggle.setAttribute('aria-expanded','false');}
  toggle.addEventListener('click',function(){const open=toggle.getAttribute('aria-expanded')!=='true';header.classList.toggle('mobile-menu-open',open);toggle.setAttribute('aria-expanded',String(open));});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();if(media.matches)toggle.focus();}});
  document.addEventListener('click',e=>{if(!header.contains(e.target))close();});
  let pending=false;
  function position(){pending=false;if(!media.matches)return;let active=null;const line=header.getBoundingClientRect().height+70;for(const a of ordered){const section=document.getElementById(a.hash.slice(1));if(section&&section.getBoundingClientRect().top<=line)active=a;}
   const contact=document.getElementById('contact');if(contact&&Math.ceil(window.scrollY+innerHeight)>=document.documentElement.scrollHeight-2)active=ordered.find(a=>a.hash==='#contact')||active;
   current.textContent=active?active.textContent:(fr?'Présentation':'Overview');
   ordered.forEach(a=>{const selected=a===active;a.classList.toggle('is-active',selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(position);}}
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);window.addEventListener('load',schedule);
  const certificates=Array.from(document.querySelectorAll('#certifications .cert'));let expanded=false;
  const more=document.createElement('button');more.type='button';more.className='mobile-more';more.setAttribute('aria-expanded','false');
  function syncCertificates(){certificates.forEach((c,i)=>c.classList.toggle('is-mobile-hidden',media.matches&&!expanded&&i>=5));more.textContent=expanded?(fr?'Réduire la liste':'Show fewer certificates'):(fr?'Voir les '+certificates.length+' certificats':'View all '+certificates.length+' certificates');more.setAttribute('aria-expanded',String(expanded));}
  if(certificates.length>5){certificates[0].parentElement.after(more);more.addEventListener('click',()=>{expanded=!expanded;syncCertificates();});}
  const moved=[];
  function details(){
   if(media.matches){document.querySelectorAll('#training .card,#industrial .card').forEach(card=>{const p=Array.from(card.children).find(el=>el.tagName==='P');if(!p||p.parentElement.classList.contains('mobile-detail'))return;const anchor=document.createComment('paragraph-position');p.before(anchor);const d=document.createElement('details');d.className='mobile-detail';const summary=document.createElement('summary');summary.textContent=fr?'Lire le détail':'Read details';d.append(summary,p);card.appendChild(d);moved.push({p,anchor,d});});}
   else{moved.splice(0).forEach(({p,anchor,d})=>{anchor.replaceWith(p);d.remove();});}
  }
  function responsive(){close();added.forEach(a=>a.hidden=!media.matches);syncCertificates();details();position();}
  if(media.addEventListener)media.addEventListener('change',responsive);else media.addListener(responsive);responsive();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
