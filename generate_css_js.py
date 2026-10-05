import os

base_dir = r'c:/Users/arulp/OneDrive/Desktop/interior wall'

style_css = '''
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

:root {
    --primary: #d4a373;
    --primary-dark: #b5835a;
    --bg-light: #faf9f6;
    --text-light: #2c2c2c;
    --bg-dark: #121212;
    --card-dark: #1e1e1e;
    --text-dark: #f0f0f0;
}

body {
    font-family: 'Inter', sans-serif;
    transition: background-color 0.3s, color 0.3s;
}

h1, h2, h3, h4, h5, h6, .font-serif {
    font-family: 'Playfair Display', serif;
}

/* Dark Mode Overrides */
.dark body { background-color: var(--bg-dark); color: var(--text-dark); }
.dark .bg-white { background-color: var(--card-dark) !important; color: var(--text-dark) !important; border-color: #333 !important; }
.dark .bg-gray-50 { background-color: #1a1a1a !important; border-color: #333 !important; }
.dark .text-gray-900, .dark .text-gray-800, .dark .text-gray-700 { color: #f0f0f0 !important; }
.dark .text-gray-600 { color: #ccc !important; }
.dark .border-gray-100, .dark .border-gray-200 { border-color: #333 !important; }

/* Utilities */
.masonry { column-count: 3; column-gap: 1.5rem; }
.masonry-item { break-inside: avoid; margin-bottom: 1.5rem; }
@media (max-width: 1024px) { .masonry { column-count: 2; } }
@media (max-width: 640px) { .masonry { column-count: 1; } }

.nav-link.active {
    color: var(--primary) !important;
}

.fade-in { animation: fadeIn 0.8s ease-in-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* RTL */
[dir="rtl"] .ml-4 { margin-left: 0; margin-right: 1rem; }
[dir="rtl"] .mr-4 { margin-right: 0; margin-left: 1rem; }
[dir="rtl"] .pl-4 { padding-left: 0; padding-right: 1rem; }
[dir="rtl"] .pr-4 { padding-right: 0; padding-left: 1rem; }
[dir="rtl"] .text-left { text-align: right; }
[dir="rtl"] .text-right { text-align: left; }
'''

with open(os.path.join(base_dir, 'css', 'style.css'), 'w', encoding='utf-8') as f:
    f.write(style_css)


main_js = '''
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    const themeBtnMobile = document.getElementById('theme-toggle-mobile');
    const html = document.documentElement;
    
    function setTheme(isDark) {
        if(isDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }
    
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setTheme(true);
    }
    
    const toggleTheme = () => setTheme(!html.classList.contains('dark'));
    if(themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if(themeBtnMobile) themeBtnMobile.addEventListener('click', toggleTheme);

    // RTL Toggle
    const rtlBtn = document.getElementById('rtl-toggle');
    const rtlBtnMobile = document.getElementById('rtl-toggle-mobile');
    const toggleRTL = () => {
        html.dir = html.dir === 'rtl' ? 'ltr' : 'rtl';
    };
    if(rtlBtn) rtlBtn.addEventListener('click', toggleRTL);
    if(rtlBtnMobile) rtlBtnMobile.addEventListener('click', toggleRTL);

    // Mobile menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Active state logic
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, #mobile-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPath || href.endsWith('/' + currentPath))) {
            link.classList.add('active');
            if (link.classList.contains('nav-link')) {
                link.classList.add('text-[#d4a373]');
            } else {
                link.classList.add('bg-gray-100', 'text-[#d4a373]');
            }
        }
    });

    // Form submission mock
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submitted successfully! (Frontend Demo)');
        });
    });
});
'''

with open(os.path.join(base_dir, 'js', 'main.js'), 'w', encoding='utf-8') as f:
    f.write(main_js)

print("CSS and JS generated.")
