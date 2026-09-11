window.applyPortfolioLogos=function(){
  const META={
    nesr:{i:0,b:[19.5,6,80.5,53.5],h:56,label:'NESR'},
    labelle:{i:1,b:[7.5,11,92.5,49],h:41,label:'Groupe LaBelle'},
    processtool:{i:2,b:[23,6,77,53.5],h:56,label:'ProcessTool'},
    umbb:{i:3,b:[23.5,11.5,76,48.5],h:61,label:'UMBB'},
    fhc:{i:4,b:[25,4.5,75,55.5],h:64,label:'FHC'},
    sonatrach:{i:5,b:[33.5,5.5,66,54],h:62,label:'Sonatrach'},
    fertial:{i:6,b:[7.5,21,92.5,39],h:20,label:'Fertial'},
    linde:{i:7,b:[7.5,18,92.5,42],h:26,label:'Linde'},
    saidal:{i:8,b:[28,6,72,53.5],h:56,label:'Saidal'}
  };
  const spriteW=900,spriteH=60,cellW=100;
  const sprite=window.__logoSprite;
  if(!sprite)return;
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
    el.style.backgroundImage='url("'+sprite+'")';
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
    school.querySelectorAll('.education-logo-pair,.edu-logo-pair,.org-logo,img.brand-logo').forEach(el=>el.remove());
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
    const title=h3.textContent.trim();
    const key=visits[title];
    if(!key)return;
    h3.querySelectorAll('img.brand-logo,.org-logo').forEach(el=>el.remove());
    h3.classList.add('visit-title-row');
    const logo=makeLogo(key);
    if(logo)h3.prepend(logo);
  });
};
