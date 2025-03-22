import i18next from '../i18n/index.js';

// Initialize translations
document.addEventListener('DOMContentLoaded', () => {
    // Get saved language from localStorage or default to 'en'
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    
    // Set initial language
    document.documentElement.lang = savedLang;
    i18next.changeLanguage(savedLang);
    
    // Update active state of language buttons
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === savedLang) {
            btn.classList.add('active');
        }
    });

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = i18next.t(key);
    });
});

// Language switcher functionality
document.querySelectorAll('.language-btn').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        
        // Save selected language to localStorage
        localStorage.setItem('selectedLanguage', lang);
        
        // Update language
        document.documentElement.lang = lang;
        i18next.changeLanguage(lang);
        
        // Update active state
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Update all translatable elements
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            element.textContent = i18next.t(key);
        });
    });
}); 