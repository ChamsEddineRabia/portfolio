(function(){
  function initPortfolioUpgrades(lang){
    lang = lang === 'fr' ? 'fr' : 'en';

    // Make the language switcher share clean URLs.
    var prefix = location.pathname.indexOf('/portfolio/') !== -1 ? '/portfolio/' : '/';
    document.querySelectorAll('.language-switcher a').forEach(function(a){
      var code=(a.textContent||'').trim().toLowerCase();
      if(code==='en'||code==='fr'){
        a.href=prefix+code+'/'+(location.hash||'');
        a.addEventListener('click',function(){localStorage.setItem('portfolioLanguage',code);});
      }
    });

    // Availability / relocation message — broad, not role-restrictive.
    var status=document.querySelector('.status');
    if(status){
      status.classList.add('availability');
      status.innerHTML=lang==='fr'
        ? 'Disponible · Basé à <b>Annaba, Algérie</b> · Ouvert à la mobilité et aux opportunités en Algérie comme à l’international.'
        : 'Available · Based in <b>Annaba, Algeria</b> · Open to relocation and engineering opportunities in Algeria and internationally.';
    }

    // Direct proof for the MTO thesis.
    var projectLinks=document.querySelector('#projects .project-link-row');
    if(projectLinks && !projectLinks.querySelector('.project-proof-link')){
      var thesis=document.createElement('a');
      thesis.className='project-proof-link';
      thesis.href='https://drive.google.com/file/d/1Yl0XcJk-jzXm0VNNReegceRT7mzPBjJW/view?usp=sharing';
      thesis.target='_blank';
      thesis.rel='noopener noreferrer';
      thesis.textContent=lang==='fr'?'Consulter le mémoire complet ↗':'View full thesis ↗';
      projectLinks.insertBefore(thesis,projectLinks.firstChild);
    }

    // Official Algerian Red Crescent website.
    document.querySelectorAll('#volunteering .company').forEach(function(company){
      var t=company.textContent||'';
      if((t.indexOf('Algerian Red Crescent')!==-1 || t.indexOf('Croissant-Rouge Algérien')!==-1) && !company.querySelector('a[href="https://cra.dz/"]')){
        var link=document.createElement('a');
        link.className='org-link';
        link.href='https://cra.dz/';
        link.target='_blank';
        link.rel='noopener noreferrer';
        link.textContent=lang==='fr'?'Site officiel ↗':'Official website ↗';
        company.appendChild(document.createTextNode(' '));
        company.appendChild(link);
      }
    });

    // Discreet direct-section links.
    document.querySelectorAll('section.block[id]').forEach(function(section){
      var head=section.querySelector('.section-head');
      if(!head || head.querySelector('.deep-link')) return;
      var a=document.createElement('a');
      a.className='deep-link';
      a.href='#'+section.id;
      a.textContent='#';
      a.title=lang==='fr'?'Copier le lien direct':'Copy direct link';
      a.setAttribute('aria-label',a.title+' — '+section.id);
      a.addEventListener('click',function(e){
        e.preventDefault();
        var clean=location.origin+prefix+lang+'/#'+section.id;
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(clean).then(function(){showToast(lang==='fr'?'Lien copié':'Section link copied');});
        }
        history.replaceState(null,'','#'+section.id);
      });
      head.appendChild(a);
    });

    // Copy-email helper without changing the normal mailto action.
    var mail=document.querySelector('.contact-links a[href^="mailto:"]');
    if(mail && !document.querySelector('.contact-email-row')){
      var wrap=document.createElement('div');
      wrap.className='contact-email-row';
      mail.parentNode.insertBefore(wrap,mail);
      wrap.appendChild(mail);
      var btn=document.createElement('button');
      btn.type='button';
      btn.className='copy-email';
      btn.textContent=lang==='fr'?'Copier':'Copy';
      btn.setAttribute('aria-label',lang==='fr'?"Copier l’adresse e-mail":'Copy email address');
      btn.addEventListener('click',function(){
        var email='chamssourabia@gmail.com';
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(email).then(function(){showToast(lang==='fr'?'E-mail copié':'Email copied');});
        }else{showToast(email);}
      });
      wrap.appendChild(btn);
    }

    // Performance and accessibility hints for non-hero imagery.
    document.querySelectorAll('img.brand-logo').forEach(function(img){img.loading='lazy';img.decoding='async';});
    var portrait=document.getElementById('profile-photo');
    if(portrait){portrait.decoding='async';portrait.fetchPriority='high';}
  }

  var timer;
  function showToast(message){
    var toast=document.getElementById('copy-toast');
    if(!toast) return;
    toast.textContent=message;
    toast.classList.add('show');
    clearTimeout(timer);
    timer=setTimeout(function(){toast.classList.remove('show');},1600);
  }

  window.initPortfolioUpgrades=initPortfolioUpgrades;
})();
