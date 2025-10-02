let translations = {};

// Load translations
fetch("translations.json")
  .then(response => response.json())
  .then(data => {
    translations = data;
    const selectedLang = localStorage.getItem("selectedLanguage") || "pl";
    applyLanguage(selectedLang);
    updateLanguageButtonHighlight(selectedLang); // <--- This runs on page load
  });

function changeLanguage(lang) {
  localStorage.setItem("selectedLanguage", lang);
  applyLanguage(lang);
  updateLanguageButtonHighlight(lang);
}

function applyLanguage(lang) {
  // Set innerText for elements
  document.querySelectorAll("[data-lang]").forEach(element => {
    const key = element.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Set placeholders
  document.querySelectorAll("[placeholder][data-lang]").forEach(element => {
    const key = element.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      element.setAttribute("placeholder", translations[lang][key]);
    }
  });
}

function updateLanguageButtonHighlight(lang) {
  const btnEN = document.getElementById("btn-en");
  const btnPL = document.getElementById("btn-pl");

  btnEN?.classList.remove("active");
  btnPL?.classList.remove("active");

  if (lang === "en") btnEN?.classList.add("active");
  if (lang === "pl") btnPL?.classList.add("active");
}
