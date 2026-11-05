(() => {
  const toggle = document.getElementById('language-toggle');
  const printButton = document.getElementById('print-button');
  const download = document.getElementById('download-button');
  const backLink = document.getElementById('home-link');
  const status = document.getElementById('language-status');
  const sections = [...document.querySelectorAll('[data-language]')];
  let language = 'en';
  const pdfUrl = () => `assets/cv/CHEN_Yubo_CV_${language.toUpperCase()}.pdf`;
  function setLanguage(next, announce = true) {
    language = next === 'zh' ? 'zh' : 'en';
    const chinese = language === 'zh';
    sections.forEach(section => { section.hidden = section.dataset.language !== language; });
    document.documentElement.lang = chinese ? 'zh-CN' : 'en';
    document.title = chinese ? '陈玉博 — 个人简历' : 'Yubo Chen — Curriculum Vitae';
    toggle.textContent = chinese ? 'Switch to English' : '切换中文';
    toggle.setAttribute('aria-label', chinese ? 'Switch CV to English' : '切换为中文简历');
    printButton.textContent = chinese ? '打开 / 打印 PDF' : 'Open / Print PDF';
    printButton.setAttribute('aria-label', chinese ? '打开纯净 PDF，在 PDF 查看器中打印' : 'Open clean PDF to print from the PDF viewer');
    download.textContent = chinese ? '下载 PDF' : 'Download PDF';
    download.href = pdfUrl();
    backLink.textContent = chinese ? '← 返回主页' : '← Homepage';
    document.querySelector('.toolbar').setAttribute('aria-label', chinese ? '简历操作' : 'CV controls');
    document.querySelector('.skip-link').textContent = chinese ? '跳至简历' : 'Skip to CV';
    if (announce) status.textContent = chinese ? '已切换为中文简历。' : 'English CV selected.';
    try { localStorage.setItem('cv-language', language); } catch {}
    const url = new URL(location.href);url.searchParams.set('lang', language);history.replaceState(null, '', url);
  }
  const requested = new URLSearchParams(location.search).get('lang');let saved;
  try { saved = localStorage.getItem('cv-language'); } catch {}
  setLanguage(requested === 'zh' || requested === 'en' ? requested : saved === 'zh' ? 'zh' : 'en', false);
  toggle.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
  printButton.addEventListener('click', () => { window.open(pdfUrl(), '_blank', 'noopener'); });
})();
