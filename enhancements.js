window.initPortfolioEnhancements=function(){
  const body=document.body;
  body.classList.add('motion-ready');

  requestAnimationFrame(()=>requestAnimationFrame(()=>body.classList.add('hero-visible')));

  const revealSelectors=[
    '.section-head','.entry','.project','.academic-row','.card','.mini','.cert','.skill','.language','.contact-grid'
  ];
  const revealItems=[...document.querySelectorAll(revealSelectors.join(','))];

  revealItems.forEach((el,i)=>{
    el.classList.add('reveal');
    const parent=el.parentElement;
    const siblings=parent?[...parent.children].filter(n=>revealSelectors.some(s=>n.matches?.(s))):[];
    const localIndex=Math.max(0,siblings.indexOf(el));
    el.style.setProperty('--reveal-delay',`${Math.min(localIndex,5)*55}ms`);
  });

  if('IntersectionObserver' in window){
    const revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:'0px 0px -7% 0px'});
    revealItems.forEach(el=>revealObserver.observe(el));
  }else{
    revealItems.forEach(el=>el.classList.add('is-visible'));
  }

  const topbar=document.querySelector('.topbar');
  const setProgress=()=>{
    if(!topbar)return;
    const max=document.documentElement.scrollHeight-window.innerHeight;
    const pct=max>0?Math.min(100,Math.max(0,(window.scrollY/max)*100)):0;
    topbar.style.setProperty('--scroll-progress',pct+'%');
  };
  setProgress();
  window.addEventListener('scroll',setProgress,{passive:true});
  window.addEventListener('resize',setProgress);

  const navLinks=[...document.querySelectorAll('.menu a[href^="#"]')];
  const sectionMap=navLinks.map(link=>{
    const id=link.getAttribute('href').slice(1);
    return {link,section:document.getElementById(id)};
  }).filter(x=>x.section);

  if('IntersectionObserver' in window && sectionMap.length){
    const navObserver=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
      if(!visible.length)return;
      const active=sectionMap.find(x=>x.section===visible[0].target);
      if(!active)return;
      navLinks.forEach(link=>link.classList.toggle('is-active',link===active.link));
    },{rootMargin:'-24% 0px -60% 0px',threshold:[0,.15,.35,.6]});
    sectionMap.forEach(x=>navObserver.observe(x.section));
  }

  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click',()=>{
      const href=link.getAttribute('href');
      if(!href||href==='#')return;
      const target=document.querySelector(href);
      if(target) setTimeout(()=>target.setAttribute('tabindex','-1'),0);
    });
  });
};
