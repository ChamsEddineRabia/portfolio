from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
VERSION = "20260912-static-v2"

CONFIG = {
    "en": {
        "fragment_dir": ROOT / "fragments",
        "title": "Chams Eddine Rabia | Petroleum & Process Engineer",
        "description": "Portfolio of Chams Eddine Rabia, petroleum and process engineer with experience in oilfield services, refining, hydraulics, HSE and technical leadership.",
        "aria": "Choose language",
    },
    "fr": {
        "fragment_dir": ROOT / "fragments-fr",
        "title": "Chams Eddine Rabia | Ingénieur Pétrole & Procédés",
        "description": "Portfolio de Chams Eddine Rabia, ingénieur pétrole, pétrochimie et génie des procédés, avec expérience en services pétroliers, raffinage, hydraulique et HSE.",
        "aria": "Choisir la langue",
    },
}


def replace_site_root(html: str, static_markup: str) -> str:
    marker = '<div id="site-root">'
    start = html.find(marker)
    if start == -1:
        raise RuntimeError('site-root container not found')

    open_end = start + len(marker)
    depth = 1
    closing_start = None
    token_re = re.compile(r'<div\b[^>]*>|</div>', re.I)
    for match in token_re.finditer(html, open_end):
        token = match.group(0).lower()
        if token.startswith('</div'):
            depth -= 1
            if depth == 0:
                closing_start = match.start()
                break
        else:
            depth += 1

    if closing_start is None:
        raise RuntimeError('site-root closing div not found')

    inner = f'\n<!-- STATIC-CONTENT-START -->\n{static_markup}\n<!-- STATIC-CONTENT-END -->\n'
    return html[:open_end] + inner + html[closing_start:]


def enrich_markup(markup: str, lang: str) -> str:
    if lang == 'en':
        cta = '<a class="header-cta" href="mailto:chamssourabia@gmail.com">Contact</a>'
        switcher = '<div class="topbar-actions">' + cta + '<div class="language-switcher" role="group" aria-label="Choose language"><a href="../en/" class="is-active" aria-current="true">EN</a><a href="../fr/">FR</a></div></div>'
        markup = markup.replace(cta, switcher, 1)

        old_project = '<p class="project-link-row"><a class="org-link inverse" href="https://fhc.univ-boumerdes.dz/" rel="noopener noreferrer" target="_blank">Faculty of Hydrocarbons &amp; Chemistry ↗</a></p>'
        new_project = '<p><b>Technical focus:</b> SAPO-34 and ZSM-5 catalyst comparison, reactor and process configuration, operating-condition analysis, material and energy balances, process simulation, safety assessment and techno-economic evaluation.</p>\n<p class="project-link-row"><a class="project-proof-link" href="https://drive.google.com/file/d/1Yl0XcJk-jzXm0VNNReegceRT7mzPBjJW/view?usp=sharing" rel="noopener noreferrer" target="_blank">View full thesis ↗</a> <a class="org-link inverse" href="https://fhc.univ-boumerdes.dz/" rel="noopener noreferrer" target="_blank">Faculty of Hydrocarbons &amp; Chemistry ↗</a></p>'
        markup = markup.replace(old_project, new_project, 1)

        markup = markup.replace('Arzew · Mar 2023</div>', 'Arzew · Mar 2023 <a class="org-link supporting-proof" href="https://drive.google.com/file/d/1iegbtELt4NUN2WjS_Oh10jTvyll7dtYQ/view?usp=drivesdk" rel="noopener noreferrer" target="_blank">Credential ↗</a></div>', 1)
        markup = markup.replace('Annaba · Dec 2022</div>', 'Annaba · Dec 2022 <a class="org-link supporting-proof" href="https://drive.google.com/file/d/19QisxxVa5ExrXBmXVVaM_SM4w8WKAQ8R/view?usp=drivesdk" rel="noopener noreferrer" target="_blank">Credential ↗</a></div>', 1)
        markup = markup.replace('Student Energy of Boumerdes Ex-Future Designer Club / Student Energy</div>', 'Student Energy of Boumerdes Ex-Future Designer Club / Student Energy <a class="org-link supporting-proof" href="https://drive.google.com/file/d/19QPyfIzqAkIukG3A7hCaouMfUWuilu19/view?usp=drivesdk" rel="noopener noreferrer" target="_blank">Credential ↗</a></div>', 1)
        markup = markup.replace('Algerian Red Crescent — Annaba Branch</div>', 'Algerian Red Crescent — Annaba Branch <a class="org-link" href="https://cra.dz/" rel="noopener noreferrer" target="_blank">Official website ↗</a> <a class="org-link supporting-proof" href="https://drive.google.com/file/d/19R7CDEOqr57DHEOVaEP2umz7M0kxUoPr/view?usp=drivesdk" rel="noopener noreferrer" target="_blank">Credential ↗</a></div>', 1)
        markup = markup.replace('SYLABS × UNICEF Algeria</div>', 'SYLABS × UNICEF Algeria <a class="org-link supporting-proof" href="https://drive.google.com/file/d/1YwtPuH_AN2p1NMc5HmxY0Dh90nDUebLY/view?usp=drivesdk" rel="noopener noreferrer" target="_blank">Credential ↗</a></div>', 1)
    else:
        cta = '<a class="header-cta" href="mailto:chamssourabia@gmail.com">Contact</a>'
        switcher = '<div class="topbar-actions">' + cta + '<div class="language-switcher" role="group" aria-label="Choisir la langue"><a href="../en/">EN</a><a href="../fr/" class="is-active" aria-current="true">FR</a></div></div>'
        markup = markup.replace(cta, switcher, 1)

        old_project = '<p class="project-link-row"><a class="org-link inverse" href="https://fhc.univ-boumerdes.dz/" rel="noopener noreferrer" target="_blank">Faculté des Hydrocarbures &amp; de la Chimie ↗</a></p>'
        new_project = '<p><b>Axes techniques :</b> comparaison des catalyseurs SAPO-34 et ZSM-5, configuration du réacteur et du procédé, analyse des conditions opératoires, bilans matière et énergie, simulation, sécurité et évaluation technico-économique.</p>\n<p class="project-link-row"><a class="project-proof-link" href="https://drive.google.com/file/d/1Yl0XcJk-jzXm0VNNReegceRT7mzPBjJW/view?usp=sharing" rel="noopener noreferrer" target="_blank">Consulter le mémoire complet ↗</a> <a class="org-link inverse" href="https://fhc.univ-boumerdes.dz/" rel="noopener noreferrer" target="_blank">Faculté des Hydrocarbures &amp; de la Chimie ↗</a></p>'
        markup = markup.replace(old_project, new_project, 1)

        markup = markup.replace('Arzew · Mars 2023</div>', 'Arzew · Mars 2023 <a class="org-link supporting-proof" href="https://drive.google.com/file/d/1iegbtELt4NUN2WjS_Oh10jTvyll7dtYQ/view?usp=drivesdk" rel="noopener noreferrer" target="_blank">Justificatif ↗</a></div>', 1)
        markup = markup.replace('Annaba · Déc 2022</div>', 'Annaba · Déc 2022 <a class="org-link supporting-proof" href="https://drive.google.com/file/d/19QisxxVa5ExrXBmXVVaM_SM4w8WKAQ8R/view?usp=drivesdk" rel="noopener noreferrer" target="_blank">Justificatif ↗</a></div>', 1)
        markup = markup.replace('Student Energy of Boumerdes Ex-Future Designer Club / Student Energy</div>', 'Student Energy of Boumerdes Ex-Future Designer Club / Student Energy <a class="org-link supporting-proof" href="https://drive.google.com/file/d/19QPyfIzqAkIukG3A7hCaouMfUWuilu19/view?usp=drivesdk" rel="noopener noreferrer" target="_blank">Justificatif ↗</a></div>', 1)
        markup = markup.replace('Croissant-Rouge Algérien — Comité d’Annaba</div>', 'Croissant-Rouge Algérien — Comité d’Annaba <a class="org-link" href="https://cra.dz/" rel="noopener noreferrer" target="_blank">Site officiel ↗</a> <a class="org-link supporting-proof" href="https://drive.google.com/file/d/19R7CDEOqr57DHEOVaEP2umz7M0kxUoPr/view?usp=drivesdk" rel="noopener noreferrer" target="_blank">Justificatif ↗</a></div>', 1)
        markup = markup.replace('SYLABS × UNICEF Algérie</div>', 'SYLABS × UNICEF Algérie <a class="org-link supporting-proof" href="https://drive.google.com/file/d/1YwtPuH_AN2p1NMc5HmxY0Dh90nDUebLY/view?usp=drivesdk" rel="noopener noreferrer" target="_blank">Justificatif ↗</a></div>', 1)

    return markup


def build(lang: str) -> None:
    cfg = CONFIG[lang]
    page = ROOT / lang / "index.html"
    html = page.read_text(encoding="utf-8")

    fragments = []
    for idx in range(1, 6):
        text = (cfg["fragment_dir"] / f"part-{idx}.html").read_text(encoding="utf-8")
        text = text.replace('src="assets/', 'src="../assets/')
        fragments.append(text)
    static_markup = enrich_markup("\n".join(fragments), lang)

    html = re.sub(r"<title>.*?</title>", f"<title>{cfg['title']}</title>", html, count=1, flags=re.S)
    html = re.sub(
        r'<meta name="description" content="[^"]*">',
        f'<meta name="description" content="{cfg["description"]}">',
        html,
        count=1,
    )
    html = replace_site_root(html, static_markup)

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
    html = html.replace("20260912-static-preview", VERSION).replace("20260911-8", VERSION)
    page.write_text(html, encoding="utf-8")


for language in ("en", "fr"):
    build(language)

print("Built static SEO pages for EN and FR")
