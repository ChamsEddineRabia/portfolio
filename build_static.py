from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
VERSION = "20260912-static-preview"

CONFIG = {
    "en": {
        "fragment_dir": ROOT / "fragments",
        "title": "Chams Eddine Rabia | Petroleum & Process Engineer",
        "description": "Portfolio of Chams Eddine Rabia, petroleum, petrochemical and process engineer with experience in oilfield services, refining, hydraulics, HSE and technical leadership.",
        "aria": "Choose language",
    },
    "fr": {
        "fragment_dir": ROOT / "fragments-fr",
        "title": "Chams Eddine Rabia | Ingénieur Pétrole & Procédés",
        "description": "Portfolio de Chams Eddine Rabia, ingénieur pétrole, pétrochimie et génie des procédés, avec expérience en services pétroliers, raffinage, hydraulique et HSE.",
        "aria": "Choisir la langue",
    },
}


def build(lang: str) -> None:
    cfg = CONFIG[lang]
    page = ROOT / lang / "index.html"
    html = page.read_text(encoding="utf-8")

    fragments = []
    for idx in range(1, 6):
        text = (cfg["fragment_dir"] / f"part-{idx}.html").read_text(encoding="utf-8")
        text = text.replace('src="assets/', 'src="../assets/')
        fragments.append(text)
    static_markup = "\n".join(fragments)

    html = re.sub(r"<title>.*?</title>", f"<title>{cfg['title']}</title>", html, count=1, flags=re.S)
    html = re.sub(
        r'<meta name="description" content="[^"]*">',
        f'<meta name="description" content="{cfg["description"]}">',
        html,
        count=1,
    )
    html = html.replace('<div id="site-root"></div>', f'<div id="site-root">\n{static_markup}\n</div>', 1)

    init_script = f'''<script>(function(){{
const lang='{lang}';
localStorage.setItem('portfolioLanguage',lang);
const img=document.getElementById('profile-photo');
if(img&&window.__profilePhoto)img.src='data:image/jpeg;base64,'+window.__profilePhoto;
const topbarInner=document.querySelector('.topbar-inner'),cta=document.querySelector('.header-cta');
if(topbarInner&&cta&&!document.querySelector('.language-switcher')){{
  const actions=document.createElement('div');actions.className='topbar-actions';
  const switcher=document.createElement('div');switcher.className='language-switcher';
  switcher.setAttribute('role','group');switcher.setAttribute('aria-label','{cfg["aria"]}');
  ['en','fr'].forEach(code=>{{
    const a=document.createElement('a');a.textContent=code.toUpperCase();
    a.href='../'+code+'/'+(location.hash||'');
    a.classList.toggle('is-active',code===lang);
    a.setAttribute('aria-current',code===lang?'true':'false');
    switcher.appendChild(a);
  }});
  cta.before(actions);actions.appendChild(cta);actions.appendChild(switcher);
}}
if(window.initPortfolioEnhancements)window.initPortfolioEnhancements();
if(window.initPortfolioUpgrades)window.initPortfolioUpgrades(lang);
}})();</script>'''

    html = re.sub(r"<script>\(async function\(\)\{.*?</script>", init_script, html, count=1, flags=re.S)
    html = html.replace("20260911-8", VERSION)
    page.write_text(html, encoding="utf-8")


for language in ("en", "fr"):
    build(language)

print("Built static SEO pages for EN and FR")
