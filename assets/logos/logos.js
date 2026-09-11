window.applyPortfolioLogos=function(){
  const META={
    nesr:{i:0,b:[39,12,161,107],h:46,label:'NESR'},
    labelle:{i:1,b:[15,22,185,98],h:42,label:'Groupe LaBelle'},
    processtool:{i:2,b:[46,12,154,107],h:46,label:'ProcessTool'},
    umbb:{i:3,b:[47,23,152,97],h:58,label:'UMBB'},
    fhc:{i:4,b:[50,9,150,111],h:58,label:'FHC'},
    sonatrach:{i:5,b:[67,11,132,108],h:60,label:'Sonatrach'},
    fertial:{i:6,b:[15,42,185,78],h:30,label:'Fertial'},
    linde:{i:7,b:[15,36,185,84],h:32,label:'Linde'},
    saidal:{i:8,b:[56,12,144,107],h:50,label:'Saidal'}
  };
  const spriteW=1800,spriteH=120,cellW=200;
  function makeLogo(key){
    const m=META[key];
    if(!m)return null;
    const [x1,y1,x2,y2]=m.b;
    const naturalH=y2-y1;
    const scale=m.h/naturalH;
    const el=document.createElement('span');
    el.className='org-logo org-logo-'+key;
    el.setAttribute('role','img');
    el.setAttribute('aria-label',m.label+' logo');
    el.style.width=((x2-x1)*scale)+'px';
    el.style.height=(naturalH*scale)+'px';
    el.style.backgroundImage='url("assets/logos/logo-sprite.png")';
    el.style.backgroundSize=(spriteW*scale)+'px '+(spriteH*scale)+'px';
    el.style.backgroundPosition=(-(m.i*cellW+x1)*scale)+'px '+(-y1*scale)+'px';
    return el;
  }
  function companyLogo(titleNeedle,key){
    const entry=[...document.querySelectorAll('#professional article.entry')].find(el=>(el.querySelector('h3')?.textContent||'').includes(titleNeedle));
    const company=entry?.querySelector('.company');
    if(!company)return;
    company.querySelectorAll('img.brand-logo,.org-logo').forEach(el=>el.remove());
    company.classList.add('company-logo-row');
    const logo=makeLogo(key);
    if(logo)company.prepend(logo);
  }
  companyLogo('Field Supervisor Trainee','nesr');
  companyLogo('Technical Manager Level 2','labelle');
  companyLogo('Hydraulic Software Support Specialist','processtool');

  document.querySelectorAll('#education .academic-row').forEach(row=>{
    const degree=row.querySelector('.degree')?.textContent||'';
    if(!degree.includes('M.Sc.')&&!degree.includes('B.Sc.'))return;
    const school=row.querySelector('.school');
    if(!school)return;
    school.querySelectorAll('.education-logo-pair,.org-logo').forEach(el=>el.remove());
    school.classList.add('education-school-row');
    const pair=document.createElement('span');
    pair.className='education-logo-pair';
    const umbb=makeLogo('umbb'),fhc=makeLogo('fhc');
    if(umbb)pair.appendChild(umbb);
    if(fhc)pair.appendChild(fhc);
    school.prepend(pair);
  });

  const visits={
    'GP1Z Arzew':'sonatrach',
    'Fertial Annaba':'fertial',
    'Linde Gas Skikda':'linde',
    'Sonatrach RA2K':'sonatrach',
    'Saidal Group':'saidal'
  };
  document.querySelectorAll('#industrial .card').forEach(card=>{
    const h3=card.querySelector('h3');
    if(!h3)return;
    const title=[...h3.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE).map(n=>n.textContent).join('').trim()||h3.textContent.trim();
    const key=visits[title];
    if(!key)return;
    h3.querySelectorAll('.org-logo').forEach(el=>el.remove());
    h3.classList.add('visit-title-row');
    const logo=makeLogo(key);
    if(logo)h3.prepend(logo);
  });
};
