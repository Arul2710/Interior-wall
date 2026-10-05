
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelectorAll('.theme-toggle-btn');
    function updateThemeIcons() {
        const isDark = document.documentElement.classList.contains('dark');
        document.querySelectorAll('.theme-icon').forEach(icon => {
            icon.className = isDark ? 'fas fa-sun text-xl theme-icon' : 'fas fa-moon text-xl theme-icon';
        });
    }
    themeToggle.forEach(btn => {
        btn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
            updateThemeIcons();
        });
    });
    updateThemeIcons();

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
            document.documentElement.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
            localStorage.setItem('rtl', isRtl ? 'false' : 'true');
        });
    });

    const mobileBtn = document.getElementById('mobile-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileClose = document.getElementById('mobile-close');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => mobileMenu.classList.remove('translate-x-full'));
        mobileClose.addEventListener('click', () => mobileMenu.classList.add('translate-x-full'));
    }

    document.querySelectorAll('.mobile-dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.target);
            target.classList.toggle('hidden');
            const icon = btn.querySelector('.fa-chevron-down');
            if(icon) icon.classList.toggle('rotate-180');
        });
    });

    let path = window.location.pathname.split('/').pop() || 'index.html';
    path = path.split('?')[0].split('#')[0];
    
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(path) && !link.classList.contains('no-active')) {
            if(href === path || href === './' + path || href === '../' + path) {
                link.classList.add('active-link', 'text-primary');
                link.classList.remove('text-gray-700', 'dark:text-gray-200');
            }
        }
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => { b.classList.remove('bg-primary', 'text-white'); b.classList.add('bg-gray-100', 'text-gray-800'); });
                btn.classList.add('bg-primary', 'text-white');
                btn.classList.remove('bg-gray-100', 'text-gray-800');
                const filter = btn.dataset.filter;
                filterItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});
