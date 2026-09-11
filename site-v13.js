window.initPortfolio = function(){
  const targets = [
    '.section-head','.entry','.technical-card','.academic-row','.card','.mini','.cert','.skill','.language','.contact-grid'
  ];
  const els = [...document.querySelectorAll(targets.join(','))];
  els.forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.technical-grid,.cards,.certs,.skill-cloud,.two-col').forEach(el=>el.classList.add('reveal-stagger'));

  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      })
    },{threshold:.12,rootMargin:'0px 0px -7% 0px'});
    document.querySelectorAll('.reveal,.reveal-stagger').forEach(el=>io.observe(el));
  }else{
    document.querySelectorAll('.reveal,.reveal-stagger').forEach(el=>el.classList.add('visible'));
  }
};
