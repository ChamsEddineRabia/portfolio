(function(){
  function initPortfolioUpgrades(lang){
    lang = lang === 'fr' ? 'fr' : 'en';

    var prefix = location.pathname.indexOf('/portfolio/') !== -1 ? '/portfolio/' : '/';
    document.querySelectorAll('.language-switcher a').forEach(function(a){
      var code=(a.textContent||'').trim().toLowerCase();
      if(code==='en'||code==='fr'){
        a.href=prefix+code+'/'+(location.hash||'');
        a.addEventListener('click',function(){localStorage.setItem('portfolioLanguage',code);});
      }
    });

    var status=document.querySelector('.status');
    if(status){
      status.classList.add('availability');
      status.innerHTML=lang==='fr'
        ? '<span class="availability-line availability-state">Disponible</span><span class="availability-line">Basé à <b>Annaba, Algérie</b></span><span class="availability-line">Ouvert à la mobilité et aux opportunités en Algérie comme à l’international.</span>'
        : '<span class="availability-line availability-state">Available</span><span class="availability-line">Based in <b>Annaba, Algeria</b></span><span class="availability-line">Open to relocation and engineering opportunities in Algeria and internationally.</span>';
    }

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

    // Correct Drive folder for the certificate collection.
    var credentialFolder='https://drive.google.com/drive/folders/1_blt5TLJ1RgmJM3oubw2OLhRAo_UfJl7?usp=sharing';
    var certIntro=document.querySelector('#certifications .section-intro');
    if(certIntro){
      var archive=certIntro.querySelector('a');
      if(archive){
        archive.href=credentialFolder;
        archive.textContent=lang==='fr'?'Dossier des justificatifs ↗':'Credential folder ↗';
      }
    }

    // Exact credential files confirmed inside the supplied Drive folder.
    var credentialMap={
      'Green Digital Program':'https://drive.google.com/file/d/1iqTNkknQdYsdnyrLpnGfwgeu-DXsh2DD/view?usp=drivesdk',
      'The 21st Century Skills Training':'https://drive.google.com/file/d/1YJLOB_fcsaDJaLuhNKgPaOVRmUgxcsWW/view?usp=drivesdk',
      'Global Summer School Edition 2021':'https://drive.google.com/file/d/1MqjcA4OXfZxuTzPHeYPDu6quPK_PTUCo/view?usp=drivesdk',
      'Certificate of Organization — WikiStage Boumerdes':'https://drive.google.com/file/d/13GK9437nSxytom2KaOPHBTNKzNhei_ss/view?usp=drivesdk',
      'Certificate of Appreciation — Student Energy of Boumerdes Ex-Future Designer Club':'https://drive.google.com/file/d/1Z0V08g1CUCISeM8levObyeon7GmJs4lP/view?usp=drivesdk',
      'Writing Professional Emails — Online':'https://drive.google.com/file/d/1_fSfREiy_uSIf9-WySbB1SJqxXgGS2WG/view?usp=drivesdk',
      'Synergy World Event — Participation':'https://drive.google.com/file/d/1YMQCnzSyN0Py4FTCCJuQQXtPi3mUQeen/view?usp=drivesdk',
      'Algeria 2.0 Event — Participation':'https://drive.google.com/file/d/1_ersZu2ONUXBC_OISkoBuZiYh_bs2uLS/view?usp=drivesdk',
      'Entrepreneurship Summer School Algeria 2016':'https://drive.google.com/file/d/1BUtii0eYUR_KJCNNsnkCN6JrHjEoJkYA/view?usp=drivesdk'
    };

    document.querySelectorAll('#certifications .cert').forEach(function(cert){
      var titleNode=cert.querySelector('strong');
      var meta=cert.querySelector('span');
      if(!titleNode || !meta) return;
      var title=(titleNode.textContent||'').trim();
      var url=credentialMap[title];
      if(!url || meta.querySelector('a[href="'+url+'"]')) return;
      var a=document.createElement('a');
      a.className='org-link credential-link';
      a.href=url;
      a.target='_blank';
      a.rel='noopener noreferrer';
      a.textContent=lang==='fr'?'Voir le justificatif ↗':'View credential ↗';
      meta.appendChild(document.createTextNode(' '));
      meta.appendChild(a);
    });

    // Supporting certificates tied to relevant portfolio entries.
    addProof('#industrial .card','GP1Z Arzew','https://drive.google.com/file/d/1iegbtELt4NUN2WjS_Oh10jTvyll7dtYQ/view?usp=drivesdk',lang);
    addProof('#industrial .card','Fertial Annaba','https://drive.google.com/file/d/19QisxxVa5ExrXBmXVVaM_SM4w8WKAQ8R/view?usp=drivesdk',lang);
    addProof('#volunteering .entry','Volunteer / First Aider','https://drive.google.com/file/d/19R7CDEOqr57DHEOVaEP2umz7M0kxUoPr/view?usp=drivesdk',lang);
    addProof('#volunteering .entry','Bénévole / Secouriste','https://drive.google.com/file/d/19R7CDEOqr57DHEOVaEP2umz7M0kxUoPr/view?usp=drivesdk',lang);
    addProof('#volunteering .entry','Volunteer — TATWEER DZ','https://drive.google.com/file/d/1YwtPuH_AN2p1NMc5HmxY0Dh90nDUebLY/view?usp=drivesdk',lang);
    addProof('#volunteering .entry','Bénévole — TATWEER DZ','https://drive.google.com/file/d/1YwtPuH_AN2p1NMc5HmxY0Dh90nDUebLY/view?usp=drivesdk',lang);
    addProof('#leadership .entry','President','https://drive.google.com/file/d/19QPyfIzqAkIukG3A7hCaouMfUWuilu19/view?usp=drivesdk',lang);
    addProof('#leadership .entry','Président','https://drive.google.com/file/d/19QPyfIzqAkIukG3A7hCaouMfUWuilu19/view?usp=drivesdk',lang);

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

    document.querySelectorAll('img.brand-logo').forEach(function(img){img.loading='lazy';img.decoding='async';});
    var portrait=document.getElementById('profile-photo');
    if(portrait){portrait.decoding='async';portrait.fetchPriority='high';}
  }

  function addProof(selector,title,url,lang){
    document.querySelectorAll(selector).forEach(function(item){
      var h=item.querySelector('h3');
      if(!h || (h.textContent||'').trim()!==title || item.querySelector('a[href="'+url+'"]')) return;
      var host=item.querySelector('.company') || item.querySelector('.date') || h;
      var a=document.createElement('a');
      a.className='org-link supporting-proof';
      a.href=url;
      a.target='_blank';
      a.rel='noopener noreferrer';
      a.textContent=lang==='fr'?'Justificatif ↗':'Credential ↗';
      host.appendChild(document.createTextNode(' '));
      host.appendChild(a);
    });
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
