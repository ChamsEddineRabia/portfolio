/* Keep the section menu synchronized with manual scrolling. */
(function () {
  function init() {
    const header = document.querySelector('.topbar');
    const links = Array.from(document.querySelectorAll('.menu a[href^="#"], .header-cta[href="#contact"]'));
    const items = links.map(link => ({
      link,
      section: document.getElementById(link.getAttribute('href').slice(1))
    })).filter(item => item.section);
    if (!items.length) return;
    let pending = false;
    function update() {
      pending = false;
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
      const readingLine = headerHeight + Math.min(120, window.innerHeight * 0.2);
      let active = null;
      for (const item of items) {
        if (item.section.getBoundingClientRect().top <= readingLine) active = item;
      }
      const contact = items.find(item => item.section.id === 'contact');
      const atBottom = Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2;
      if (contact && atBottom && contact.section.getBoundingClientRect().top < window.innerHeight) active = contact;
      for (const link of links) {
        const current = Boolean(active && link === active.link);
        link.classList.toggle('is-active', current);
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
    function schedule() {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(update);
    }
    // Capture scrolling on the document as well as the viewport.
    document.addEventListener('scroll', schedule, { passive: true, capture: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    window.addEventListener('pageshow', schedule);
    window.addEventListener('load', schedule);
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(schedule);
      observer.observe(document.body);
      if (header) observer.observe(header);
    }
    update();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
