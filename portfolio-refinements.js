/* Optional credential previews, loaded only when requested. */
(function(){
 function init(){
  const fr=document.documentElement.lang==='fr';
  document.querySelectorAll('#certifications .cert').forEach(function(cert){
   const link=Array.from(cert.querySelectorAll('a')).find(a=>/drive\.google\.com\/file\/d\//.test(a.href)||/engineer-certificates\/.*\.jpg/.test(a.href));
   if(!link)return;
   const match=link.href.match(/drive\.google\.com\/file\/d\/([^/]+)/);
   const title=cert.querySelector('strong').textContent;
   const details=document.createElement('details');details.className='credential-preview';
   const summary=document.createElement('summary');summary.textContent=fr?'Aperçu du justificatif':'Preview credential';
   const content=document.createElement('div');content.className='credential-preview-content';
   details.append(summary,content);
   details.addEventListener('toggle',function(){
    if(!details.open||content.children.length)return;
    if(match){
     const frame=document.createElement('iframe');frame.src='https://drive.google.com/file/d/'+match[1]+'/preview';frame.title=(fr?'Justificatif : ':'Credential: ')+title;frame.loading='lazy';frame.referrerPolicy='no-referrer';content.appendChild(frame);
    }else{
     const img=document.createElement('img');img.src=link.href;img.alt=(fr?'Certificat : ':'Certificate: ')+title;img.loading='lazy';content.appendChild(img);
    }
    const fallback=document.createElement('a');fallback.href=link.href;fallback.target='_blank';fallback.rel='noopener noreferrer';fallback.textContent=fr?'Ouvrir le document original ↗':'Open original document ↗';content.appendChild(fallback);
   });
   cert.appendChild(details);
  });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
