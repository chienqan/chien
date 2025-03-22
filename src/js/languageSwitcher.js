import i18next from '../i18n/index.js';

// Initialize translations
document.addEventListener('DOMContentLoaded', () => {
    // Get saved language from localStorage or default to 'en'
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    
    // Set initial language
    document.documentElement.lang = savedLang;
    i18next.changeLanguage(savedLang);
    
    // Update language button states
    updateLanguageButton(savedLang);
    updateLanguageButtons(savedLang);

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = i18next.t(key);
    });
});

// Function to update navigation language button state
function updateLanguageButton(lang) {
    const languageIcon = document.getElementById('language-icon');
    const languageText = document.querySelector('#language .nav-link-label');
    
    if (lang === 'vi') {
        languageIcon.src = 'assets/images/vietnam.png';
        languageText.textContent = 'Tiếng Việt';
    } else {
        languageIcon.src = 'assets/images/usa.png';
        languageText.textContent = 'English';
    }
}

// Function to update language-btn class buttons state
function updateLanguageButtons(lang) {
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
}

// Function to change language
function changeLanguage(newLang) {
    // Save selected language to localStorage
    localStorage.setItem('selectedLanguage', newLang);
    
    // Update language
    document.documentElement.lang = newLang;
    i18next.changeLanguage(newLang);
    
    // Update language button states
    updateLanguageButton(newLang);
    updateLanguageButtons(newLang);

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = i18next.t(key);
    });
}

// Navigation language button click handler
document.getElementById('language').addEventListener('click', () => {
    const currentLang = localStorage.getItem('selectedLanguage') || 'en';
    const newLang = currentLang === 'en' ? 'vi' : 'en';
    changeLanguage(newLang);
});

// Language-btn class buttons click handler
document.querySelectorAll('.language-btn').forEach(button => {
    button.addEventListener('click', () => {
        const newLang = button.dataset.lang;
        changeLanguage(newLang);
    });
}); 