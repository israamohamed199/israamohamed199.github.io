async function loadTranslations(lang) {
  const res = await fetch('translations.json');
  const translations = await res.json();
  return translations[lang];
}

async function changeLanguage(lang) {
  localStorage.setItem('preferredLang', lang);
  const data = await loadTranslations(lang);
  for (const key in data) {
    const el = document.getElementById(key);
    if (el) {
      el.textContent = data[key];
    }
    const elTitle = document.getElementById(key + '-title');
    if (elTitle) {
      elTitle.textContent = data[key];
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLang') || 'en';
  changeLanguage(savedLang);
});
