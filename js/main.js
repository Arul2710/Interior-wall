
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
