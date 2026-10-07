const fs = require('fs');
const path = require('path');

const dirs = ['css', 'js', 'images', 'admin', 'user'];
dirs.forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const imgs = {
    hero1: 'images/hero-mural.jpg',
    hero2: 'images/hero-mural.jpg',
    hero3: 'images/hero-mural.jpg',
    room: 'images/hero-mural.jpg',
    kids: 'images/hero-mural.jpg',
    office: 'images/hero-mural.jpg',
    artist: 'images/hero-mural.jpg',
    mural: 'images/hero-mural.jpg',
    avatar1: 'https://randomuser.me/api/portraits/women/44.jpg',
    avatar2: 'https://randomuser.me/api/portraits/men/32.jpg'
};

const styleCss = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
body { font-family: 'Inter', sans-serif; overflow-x: hidden; }
h1, h2, h3, h4, h5, h6, .font-serif { font-family: 'Playfair Display', serif; }
.glass-nav { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); }
.dark .glass-nav { background: rgba(17, 24, 39, 0.95); }
.active-link { color: #d97706 !important; font-weight: 600; }
.active-link::after { content: ''; display: block; height: 2px; width: 100%; background: #d97706; margin-top: 2px; }
.nav-link { position: relative; }
html[dir="rtl"] .ml-auto { margin-right: auto; margin-left: 0; }
html[dir="rtl"] .mr-4 { margin-left: 1rem; margin-right: 0; }
html[dir="rtl"] .pl-4 { padding-right: 1rem; padding-left: 0; }
.dashboard-sidebar { min-height: calc(100vh - 80px); }
`;
fs.writeFileSync('css/style.css', styleCss);

const mainJs = `
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
`;
fs.writeFileSync('js/main.js', mainJs);

const Head = (title, prefix='') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | ArtMural Studio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="${prefix}css/style.css">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: { extend: { colors: { primary: '#d97706', dark: '#111827' } } }
        }
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        }
        if (localStorage.getItem('rtl') === 'true') {
            document.documentElement.setAttribute('dir', 'rtl');
        }
    </script>
</head>
<body class="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
`;

const Nav = (prefix='') => `
<header class="fixed w-full z-50 glass-nav border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            <div class="flex-shrink-0">
                <a href="${prefix}index.html" class="no-active text-3xl font-serif font-bold text-gray-900 dark:text-white tracking-tight">Art<span class="text-primary">Mural</span></a>
            </div>
            
            <nav class="hidden lg:flex items-center space-x-8">
                <div class="relative group py-8">
                    <a href="#" class="nav-link text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium flex items-center gap-1 transition-colors">
                        Home <i class="fas fa-chevron-down text-[10px]"></i>
                    </a>
                    <div class="absolute top-full left-0 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-b-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top -translate-y-2 group-hover:translate-y-0">
                        <a href="${prefix}index.html" class="block px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors">Home 1</a>
                        <a href="${prefix}home-2.html" class="block px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors">Home 2</a>
                    </div>
                </div>
                
                <a href="${prefix}about.html" class="nav-link text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors">About</a>
                <a href="${prefix}services.html" class="nav-link text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors">Services</a>
                <a href="${prefix}portfolio.html" class="nav-link text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors">Portfolio</a>
                <a href="${prefix}pricing.html" class="nav-link text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors">Pricing</a>
                <a href="${prefix}blog.html" class="nav-link text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors">Blog</a>
                <a href="${prefix}contact.html" class="nav-link text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors">Contact</a>
                
                

                                <div class="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                    <button class="theme-toggle-btn text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors focus:outline-none p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <i class="theme-icon fas fa-moon"></i>
                    </button>
                    <button class="rtl-toggle-btn text-xs font-bold text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors focus:outline-none p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                        RTL
                    </button>
                </div>
                <a href="login.html" class="px-5 py-2.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors font-medium text-sm shadow-sm">Login</a>
            </nav>

            <div class="flex items-center lg:hidden space-x-4">
                <button class="theme-toggle-btn text-gray-500 dark:text-gray-400">
                    <i class="theme-icon fas fa-moon text-xl"></i>
                </button>
                <button id="mobile-btn" class="text-gray-900 dark:text-white focus:outline-none p-2">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </div>
    </div>
</header>

<div id="mobile-menu" class="fixed inset-0 z-[60] bg-white dark:bg-gray-900 transform translate-x-full transition-transform duration-300 overflow-y-auto">
    <div class="p-6">
        <div class="flex justify-between items-center mb-8">
            <span class="text-2xl font-serif font-bold text-gray-900 dark:text-white">Art<span class="text-primary">Mural</span></span>
            <button id="mobile-close" class="text-gray-500 hover:text-primary focus:outline-none">
                <i class="fas fa-times text-2xl"></i>
            </button>
        </div>
        
        <nav class="flex flex-col space-y-4">
            <div>
                <button class="mobile-dropdown-toggle w-full flex justify-between items-center text-lg font-medium text-gray-900 dark:text-white py-2" data-target="mob-home">
                    Home <i class="fas fa-chevron-down text-sm transition-transform"></i>
                </button>
                <div id="mob-home" class="hidden pl-4 py-2 space-y-2 border-l-2 border-gray-100 dark:border-gray-800 ml-2 mt-2">
                    <a href="${prefix}index.html" class="block text-gray-600 dark:text-gray-400 py-1">Home 1</a>
                    <a href="${prefix}home-2.html" class="block text-gray-600 dark:text-gray-400 py-1">Home 2</a>
                </div>
            </div>
            <a href="${prefix}about.html" class="text-lg font-medium text-gray-900 dark:text-white py-2">About</a>
            <a href="${prefix}services.html" class="text-lg font-medium text-gray-900 dark:text-white py-2">Services</a>
            <a href="${prefix}portfolio.html" class="text-lg font-medium text-gray-900 dark:text-white py-2">Portfolio</a>
            <a href="${prefix}pricing.html" class="text-lg font-medium text-gray-900 dark:text-white py-2">Pricing</a>
            <a href="${prefix}blog.html" class="text-lg font-medium text-gray-900 dark:text-white py-2">Blog</a>
            <a href="${prefix}contact.html" class="text-lg font-medium text-gray-900 dark:text-white py-2">Contact</a>
            
            <div>
                
                
            </div>
            
            <div class="pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <button class="rtl-toggle-btn text-sm font-bold text-gray-600 dark:text-gray-400 py-2">Toggle RTL Direction</button>
            </div>
        </nav>
    </div>
</div>
<main class="pt-20">
`;

const Footer = (prefix='') => `
</main>
<footer class="relative bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white pt-20 pb-10 overflow-hidden transition-colors duration-300">
    <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"></div>
    <div class="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
                <a href="${prefix}index.html" class="inline-flex items-center gap-3 text-3xl font-serif font-bold mb-6 tracking-tight text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"><img src="images/logo.svg?v=2" alt="ArtMural" class="h-10 w-auto">Art<span class="text-primary">Mural</span></a>
                <p class="text-gray-600 dark:text-gray-400 mb-6 font-light leading-relaxed">Premium custom interior wall art and murals designed to transform your everyday spaces into extraordinary experiences.</p>
                <div class="flex space-x-3">
                    <a href="#" aria-label="Facebook" class="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center shadow-sm hover:bg-primary hover:text-white hover:border-primary hover:shadow-primary/30 transition-all"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram" class="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center shadow-sm hover:bg-primary hover:text-white hover:border-primary hover:shadow-primary/30 transition-all"><i class="fab fa-instagram"></i></a>
                    <a href="#" aria-label="Pinterest" class="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center shadow-sm hover:bg-primary hover:text-white hover:border-primary hover:shadow-primary/30 transition-all"><i class="fab fa-pinterest-p"></i></a>
                </div>
            </div>
            <div>
                <h4 class="text-lg font-bold mb-6 font-serif text-gray-900 dark:text-white relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-primary after:rounded-full">Quick Links</h4>
                <ul class="space-y-3">
                    <li><a href="${prefix}about.html" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">About Studio</a></li>
                    <li><a href="${prefix}services.html" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">Our Services</a></li>
                    <li><a href="${prefix}portfolio.html" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">Portfolio Showcase</a></li>
                    <li><a href="${prefix}pricing.html" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">Pricing Packages</a></li>
                    <li><a href="${prefix}contact.html" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">Book Consultation</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-lg font-bold mb-6 font-serif text-gray-900 dark:text-white relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-primary after:rounded-full">Services</h4>
                <ul class="space-y-3">
                    <li><a href="${prefix}service-details.html" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">Home Murals</a></li>
                    <li><a href="${prefix}service-details.html" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">Kids Room Art</a></li>
                    <li><a href="${prefix}service-details.html" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">Commercial Spaces</a></li>
                    <li><a href="${prefix}service-details.html" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">Office Branding</a></li>
                    <li><a href="${prefix}service-details.html" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">Accent Walls</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-lg font-bold mb-6 font-serif text-gray-900 dark:text-white relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-primary after:rounded-full">Newsletter</h4>
                <p class="text-gray-600 dark:text-gray-400 mb-4 font-light">Subscribe to get the latest artwork updates and studio news.</p>
                <form class="flex" onsubmit="event.preventDefault();">
                    <input type="email" placeholder="Email Address" aria-label="Email Address" class="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-l-lg focus:outline-none focus:border-primary transition-colors">
                    <button type="submit" aria-label="Subscribe" class="bg-primary hover:bg-amber-600 text-white px-4 py-3 rounded-r-lg transition-colors shadow-sm"><i class="fas fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
        <div class="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
            <p>&copy; 2026 ArtMural Studio. All rights reserved.</p>
            <div class="space-x-4 mt-4 md:mt-0">
                <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" class="hover:text-primary transition-colors">Terms of Service</a>
            </div>
        </div>
    </div>
</footer>
<script src="${prefix}js/main.js"></script>
</body>
</html>
`;

const Hero = (title, sub, img, btn1, btn1Link='contact.html', btn2=null, btn2Link='portfolio.html', vh='min-h-[90vh]') => `
<section class="relative ${vh} flex items-center justify-center text-center px-4 overflow-hidden">
    <div class="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000" style="background-image: url('${img}');"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/90 dark:from-gray-900/90 dark:to-gray-900/95"></div>
    <div class="relative z-10 max-w-5xl mx-auto text-white">
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight drop-shadow-lg">${title}</h1>
        <p class="text-xl md:text-2xl mb-12 font-light max-w-3xl mx-auto text-gray-200">${sub}</p>
        <div class="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="${btn1Link}" class="bg-primary hover:bg-amber-600 text-white px-10 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1">${btn1}</a>
            ${btn2 ? `<a href="${btn2Link}" class="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-10 py-4 rounded-full font-semibold transition-all shadow-lg transform hover:-translate-y-1">${btn2}</a>` : ''}
        </div>
    </div>
</section>
`;

const TextMedia = (title, text, img, list=[], reverse=false, cta=null, ctaLink='contact.html') => `
<section class="py-24 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16">
            <div class="w-full lg:w-1/2">
                <div class="relative">
                    <img src="${img}" alt="${title}" class="rounded-2xl shadow-2xl w-full object-cover h-[500px]">
                    <div class="absolute -bottom-6 ${reverse ? '-left-6' : '-right-6'} bg-primary text-white p-6 rounded-xl shadow-xl hidden md:block">
                        <p class="font-serif text-3xl font-bold">10+</p>
                        <p class="text-sm font-medium">Years Experience</p>
                    </div>
                </div>
            </div>
            <div class="w-full lg:w-1/2">
                <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">${title}</h2>
                <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">${text}</p>
                ${list.length > 0 ? `
                <ul class="space-y-4 mb-10">
                    ${list.map(item => `<li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3 rtl:ml-3 rtl:mr-0 text-xl"></i><span class="text-gray-700 dark:text-gray-300 font-medium">${item}</span></li>`).join('')}
                </ul>
                ` : ''}
                ${cta ? `<a href="${ctaLink}" class="inline-flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg">${cta} <i class="fas fa-arrow-right ml-2 rtl:mr-2 rtl:ml-0"></i></a>` : ''}
            </div>
        </div>
    </div>
</section>
`;

const GridSection = (title, sub, items) => `
<section class="py-24 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">${title}</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">${sub}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${items.map(item => `
            <div class="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group border border-gray-100 dark:border-gray-800 transform hover:-translate-y-2 flex flex-col">
                <div class="h-64 overflow-hidden relative">
                    <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div class="p-8 flex-1 flex flex-col">
                    <h3 class="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">${item.title}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">${item.desc}</p>
                    <a href="service-details.html" class="text-primary font-semibold hover:text-amber-700 flex items-center uppercase text-sm tracking-wide mt-auto">Learn More <i class="fas fa-arrow-right ml-2 text-xs"></i></a>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
</section>
`;

const PortfolioGallery = (title, withFilters=true) => `
<section class="py-24 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div class="max-w-2xl">
                <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">${title}</h2>
                <p class="text-lg text-gray-600 dark:text-gray-400">Explore our finest selected wall art transformations and custom murals.</p>
            </div>
            ${withFilters ? `
            <div class="flex flex-wrap gap-2">
                <button class="filter-btn bg-primary text-white px-5 py-2 rounded-full text-sm font-medium transition-colors" data-filter="all">All</button>
                <button class="filter-btn bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-5 py-2 rounded-full text-sm font-medium transition-colors" data-filter="residential">Residential</button>
                <button class="filter-btn bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-5 py-2 rounded-full text-sm font-medium transition-colors" data-filter="commercial">Commercial</button>
            </div>
            ` : `<a href="portfolio.html" class="inline-flex text-primary font-bold hover:text-amber-700">Explore Full Portfolio <i class="fas fa-arrow-right ml-2 mt-1"></i></a>`}
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="filter-item group relative overflow-hidden rounded-2xl aspect-square" data-category="residential">
                <img src="images/Living Room.jpg" alt="Living Room" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span class="text-primary font-bold text-sm uppercase tracking-wider mb-2">Living Room</span>
                    <h3 class="text-white text-2xl font-serif font-bold">Modern Abstract Flow</h3>
                </div>
            </div>
            <div class="filter-item group relative overflow-hidden rounded-2xl aspect-[4/5] md:row-span-2" data-category="commercial">
                <img src="images/Commercial Tech Startup Lobby.jpg" alt="Office Mural" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span class="text-primary font-bold text-sm uppercase tracking-wider mb-2">Commercial</span>
                    <h3 class="text-white text-2xl font-serif font-bold">Tech Startup Lobby</h3>
                </div>
            </div>
            <div class="filter-item group relative overflow-hidden rounded-2xl aspect-square" data-category="residential">
                <img src="images/Jungle Safari Theme.jpg" alt="Kids Room" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span class="text-primary font-bold text-sm uppercase tracking-wider mb-2">Kids Room</span>
                    <h3 class="text-white text-2xl font-serif font-bold">Jungle Safari Theme</h3>
                </div>
            </div>
            <div class="filter-item group relative overflow-hidden rounded-2xl aspect-square" data-category="commercial">
                <img src="images/Botanical Cafe Vibe.jpg" alt="Cafe Art" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span class="text-primary font-bold text-sm uppercase tracking-wider mb-2">Restaurant</span>
                    <h3 class="text-white text-2xl font-serif font-bold">Botanical Cafe Vibe</h3>
                </div>
            </div>
            <div class="filter-item group relative overflow-hidden rounded-2xl aspect-square" data-category="residential">
                <img src="images/Geometric Minimalist.jpg" alt="Accent Wall" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span class="text-primary font-bold text-sm uppercase tracking-wider mb-2">Accent Wall</span>
                    <h3 class="text-white text-2xl font-serif font-bold">Geometric Minimalist</h3>
                </div>
            </div>
        </div>
    </div>
</section>
`;

const ProcessSection = () => `
<section class="py-24 bg-gray-900 text-white relative overflow-hidden">
    <div class="absolute top-0 right-0 w-1/2 h-full bg-primary/10 rounded-l-full blur-3xl transform translate-x-1/3"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-4xl md:text-5xl font-serif font-bold mb-4">Our Creative Process</h2>
            <p class="text-lg text-gray-400">From the first brushstroke to the final reveal, our process is designed to be seamless, collaborative, and inspiring.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            ${[
                {n:'01', t:'Consultation', d:'We discuss your vision, space, and style preferences.'},
                {n:'02', t:'Concept & Design', d:'Creating digital mockups and sketches for approval.'},
                {n:'03', t:'Preparation', d:'Protecting surfaces and priming the wall.'},
                {n:'04', t:'Final Reveal', d:'The actual painting and the exciting final walkthrough.'}
            ].map(s => `
            <div class="bg-gray-800/50 backdrop-blur border border-gray-700 p-8 rounded-2xl hover:bg-gray-800 transition-colors">
                <div class="text-5xl font-serif font-bold text-gray-700 mb-6">${s.n}</div>
                <h3 class="text-2xl font-bold mb-3">${s.t}</h3>
                <p class="text-gray-400">${s.d}</p>
            </div>
            `).join('')}
        </div>
    </div>
</section>
`;

const Testimonials = () => `
<section class="py-24 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">Client Stories</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">Hear from those whose spaces we've transformed.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${[
                {name:'Sarah Jenkins', role:'Homeowner', img:imgs.avatar1, text:'The mural completely transformed our living room. It feels so personal and warm. The attention to detail is incredible.'},
                {name:'Michael Chen', role:'Cafe Owner', img:imgs.avatar2, text:'Our customers constantly take photos in front of the botanical wall. It gave our cafe the exact vibe we were missing.'},
                {name:'Emily Ross', role:'Interior Designer', img:'https://randomuser.me/api/portraits/women/68.jpg', text:'I always recommend ArtMural to my clients. Their professionalism and artistic talent are unmatched in the industry.'}
            ].map(r => `
            <div class="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow border border-gray-100 dark:border-gray-700 flex flex-col h-full">
                <div class="flex text-primary mb-6 space-x-1">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                </div>
                <p class="text-gray-700 dark:text-gray-300 mb-8 italic">"${r.text}"</p>
                <div class="flex items-center mt-auto">
                    <img src="${r.img}" alt="${r.name}" class="w-14 h-14 rounded-full object-cover mr-4">
                    <div>
                        <h4 class="font-bold text-gray-900 dark:text-white">${r.name}</h4>
                        <span class="text-sm text-gray-500 dark:text-gray-400">${r.role}</span>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
</section>
`;

const FAQ = () => `
<section class="py-24 bg-white dark:bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">Everything you need to know about our packages, process, and pricing.</p>
        </div>
        <div class="space-y-4">
            ${[
                {q:'How is the final price of a project calculated?', a:'Pricing is based on wall size, surface condition, design complexity, and the finishes you choose. After a free on-site or virtual consultation we provide a fixed quote, so there are no hidden costs.'},
                {q:'What is included in every package?', a:'Every package includes a free initial consultation, digital mockups, full surface preparation, premium non-toxic paints, a final protective varnish, and complete clean-up when the work is done.'},
                {q:'Is the first consultation really free?', a:'Yes. The initial consultation is always free and takes about 30 minutes. We discuss your vision, measure the space, and share ideas before you commit to anything.'},
                {q:'How long does a typical project take?', a:'Most residential murals are completed within 2 to 5 days once the design is approved. Larger commercial projects usually take one to two weeks, depending on scale and surface preparation.'},
                {q:'Can I upgrade my package later?', a:'Absolutely. You can upgrade at any point before work begins and only pay the difference between the packages. We will always confirm the new price in writing first.'},
                {q:'What are your payment terms?', a:'We ask for a 50% deposit to reserve your project date, with the remaining balance due on completion. Bank transfer and major cards are accepted.'}
            ].map(item => `
            <details class="group bg-gray-50 dark:bg-gray-800 rounded-2xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
                <summary class="flex items-center justify-between gap-4 cursor-pointer select-none list-none px-6 py-5 md:px-8 md:py-6 [&::-webkit-details-marker]:hidden">
                    <h3 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white">${item.q}</h3>
                    <i class="fas fa-plus text-primary transition-transform duration-300 group-open:rotate-45"></i>
                </summary>
                <p class="px-6 pb-6 md:px-8 text-gray-600 dark:text-gray-400 leading-relaxed">${item.a}</p>
            </details>
            `).join('')}
        </div>
    </div>
</section>
`;

const CTA = () => `
<section class="py-24 bg-primary text-white text-center px-4">
    <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl md:text-6xl font-serif font-bold mb-6">Ready to Transform Your Space?</h2>
        <p class="text-xl md:text-2xl mb-10 font-light text-amber-100">Let's create something beautiful together. Schedule a free consultation today.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="contact.html" class="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg text-lg">Book a Consultation</a>
            <a href="portfolio.html" class="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white px-10 py-4 rounded-full font-bold transition-all text-lg">View Portfolio</a>
        </div>
    </div>
</section>
`;

const Pricing = () => `
<section class="py-24 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">Investment Packages</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">Transparent pricing for custom artwork based on detail and size.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            ${[
                {n:'Basic Accent', p:'$900+', d:'Perfect for small walls and simple minimalist designs.', f:['Up to 50 sq ft','Minimal details','1-2 Colors','1 Revision','Prep & Clean up']},
                {n:'Standard Mural', p:'$2,500+', d:'Detailed artwork for medium sized residential walls.', f:['Up to 150 sq ft','Medium details','Full Color','2 Revisions','Wall preparation','Varnish finish'], pop:true},
                {n:'Premium Commercial', p:'$5,000+', d:'Highly detailed, large scale artwork for businesses.', f:['200+ sq ft','Hyper-realistic/Complex','Unlimited Colors','Unlimited Revisions','Premium materials','Maintenance guide']}
            ].map(p => `
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border ${p.pop ? 'border-primary ring-2 ring-primary ring-opacity-50 transform md:-translate-y-4 relative' : 'border-gray-200 dark:border-gray-700'} p-8 flex flex-col">
                ${p.pop ? '<div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</div>' : ''}
                <h3 class="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">${p.n}</h3>
                <p class="text-gray-500 dark:text-gray-400 mb-6 h-12">${p.d}</p>
                <div class="text-4xl font-bold text-gray-900 dark:text-white mb-8">${p.p} <span class="text-lg text-gray-500 font-normal">/proj</span></div>
                <ul class="space-y-4 mb-8 flex-grow">
                    ${p.f.map(f => `<li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-primary mr-3 text-sm"></i>${f}</li>`).join('')}
                </ul>
                <a href="contact.html" class="block w-full py-4 rounded-xl font-bold text-center transition-colors ${p.pop ? 'bg-primary hover:bg-amber-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'}">Get a Quote</a>
            </div>
            `).join('')}
        </div>
    </div>
</section>
`;

const ContactForm = () => `
<section class="py-24 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100 dark:border-gray-800">
            <div class="w-full lg:w-2/5 bg-gray-900 text-white p-12 relative overflow-hidden">
                <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('images/accent-wall.jpg');"></div>
                <div class="relative z-10">
                    <h3 class="text-3xl font-serif font-bold mb-6">Contact Information</h3>
                    <p class="text-gray-300 mb-10">Fill up the form and our team will get back to you within 24 hours to discuss your project.</p>
                    <div class="space-y-6">
                        <div class="flex items-center"><i class="fas fa-phone-alt text-primary w-8 text-xl"></i> <span>+1 (555) 123-4567</span></div>
                        <div class="flex items-center"><i class="fas fa-envelope text-primary w-8 text-xl"></i> <span>hello@artmural.studio</span></div>
                        <div class="flex items-center"><i class="fas fa-map-marker-alt text-primary w-8 text-xl"></i> <span>123 Creative Ave, NY 10001</span></div>
                    </div>
                </div>
            </div>
            <div class="w-full lg:w-3/5 p-12">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Book a Consultation</h3>
                <form class="space-y-6" onsubmit="event.preventDefault(); alert('Form submitted successfully! (Frontend Demo)');">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                            <input type="text" required class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input type="email" required class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Type</label>
                            <select class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
                                <option>Residential Mural</option>
                                <option>Commercial Artwork</option>
                                <option>Accent Wall</option>
                                <option>Kids Room</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget Range</label>
                            <select class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
                                <option>$1,000 - $2,500</option>
                                <option>$2,500 - $5,000</option>
                                <option>$5,000+</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Details</label>
                        <textarea rows="4" required class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                    </div>
                    <button type="submit" class="w-full bg-primary hover:bg-amber-600 text-white font-bold py-4 rounded-xl shadow-lg transition-colors">Send Request</button>
                </form>
            </div>
        </div>
    </div>
</section>
`;

const DashboardLayout = (title, type, content, prefix='../') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="${prefix}css/style.css">
    <script>
        tailwind.config = { darkMode: 'class', theme: { extend: { colors: { primary: '#d97706' } } } }
        if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
    </script>
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-20 flex items-center justify-between px-6 sticky top-0 z-50">
        <div class="flex items-center gap-4">
            <a href="${prefix}index.html" class="text-2xl font-serif font-bold text-gray-900 dark:text-white">Art<span class="text-primary">Mural</span></a>
            <span class="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">${type} Demo</span>
        </div>
        <div class="flex items-center gap-4">
            <a href="${prefix}index.html" class="text-sm font-medium hover:text-primary transition-colors">Back to Website</a>
            <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img src="${imgs.avatar1}" class="w-full h-full object-cover">
            </div>
        </div>
    </header>

    <div class="flex">
        <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 dashboard-sidebar hidden md:block flex-shrink-0">
            <nav class="p-4 space-y-2">
                ${type === 'Admin' ? `
                <a href="dashboard.html" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-bold"><i class="fas fa-home w-5"></i> Dashboard</a>
                <a href="projects.html" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"><i class="fas fa-paint-roller w-5"></i> Projects</a>
                <a href="messages.html" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"><i class="fas fa-envelope w-5"></i> Messages</a>
                <a href="settings.html" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"><i class="fas fa-cog w-5"></i> Settings</a>
                ` : `
                <a href="dashboard.html" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-bold"><i class="fas fa-home w-5"></i> Overview</a>
                <a href="bookings.html" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"><i class="fas fa-calendar-check w-5"></i> Bookings</a>
                <a href="saved-projects.html" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"><i class="fas fa-heart w-5"></i> Saved</a>
                <a href="profile.html" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"><i class="fas fa-user w-5"></i> Profile</a>
                `}
            </nav>
        </aside>
        <main class="flex-1 p-8">
            ${content}
        </main>
    </div>
</body>
</html>
`;

const pages = {};
const serviceItems = [
    {title: 'Residential Murals', desc: 'Custom designs for living rooms, bedrooms, and hallways.', img: 'images/Residential Murals.jpg'},
    {title: 'Kids Room Art', desc: 'Playful, imaginative spaces for children of all ages.', img: 'images/Kids Room Art.jpg'},
    {title: 'Commercial Branding', desc: 'Impactful wall art for retail, restaurants, and offices.', img: 'images/Workplace Lounge Wall.jpg'},
    {title: 'Accent Walls', desc: 'Minimalist geometric or abstract patterns.', img: 'images/accent-wall.jpg'},
    {title: 'Exterior Murals', desc: 'Durable, weather-resistant outdoor artwork.', img: 'images/Exterior Murals.jpg'},
    {title: 'Custom Illustrations', desc: 'Bespoke canvas and small-scale custom requests.', img: 'images/Custom Illustrations.jpg'}
];

const IndexStoryBlock = `
<section class="py-24 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14">
            <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">Crafting Spaces with Passion</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">With over 10 years of experience, ArtMural studio brings blank walls to life. We specialize in bespoke, hand-painted murals that reflect your personality and brand.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div class="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow border border-gray-100 dark:border-gray-700">
                <p class="text-4xl font-serif font-bold text-primary mb-2">250+</p>
                <p class="text-gray-600 dark:text-gray-400 font-medium">Walls Transformed</p>
            </div>
            <div class="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow border border-gray-100 dark:border-gray-700">
                <p class="text-4xl font-serif font-bold text-primary mb-2">150+</p>
                <p class="text-gray-600 dark:text-gray-400 font-medium">Happy Clients</p>
            </div>
            <div class="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow border border-gray-100 dark:border-gray-700">
                <p class="text-4xl font-serif font-bold text-primary mb-2">100%</p>
                <p class="text-gray-600 dark:text-gray-400 font-medium">Premium Materials Used</p>
            </div>
        </div>
        <div class="text-center mt-12">
            <a href="about.html" class="bg-primary hover:bg-amber-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg">Learn About Us</a>
        </div>
    </div>
</section>

<section class="py-24 bg-white dark:bg-gray-900">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">Our Creative Process</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">A clear, collaborative journey from the first conversation to the final brushstroke.</p>
        </div>
        <ol class="relative border-l-2 border-primary/30 ml-4 md:mx-auto md:max-w-2xl space-y-10">
            <li class="pl-10 relative">
                <span class="absolute -left-6 top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-serif font-bold text-lg shadow-lg">01</span>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Discovery Call</h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">We listen to your ideas, understand the room's purpose, and define the mood you want to create.</p>
            </li>
            <li class="pl-10 relative">
                <span class="absolute -left-6 top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-serif font-bold text-lg shadow-lg">02</span>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Site Visit & Measurements</h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">We assess the wall surface, lighting, and proportions so the artwork fits your space perfectly.</p>
            </li>
            <li class="pl-10 relative">
                <span class="absolute -left-6 top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-serif font-bold text-lg shadow-lg">03</span>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Concept & Color Study</h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">Sketches and palette studies are shared with you and refined until every detail feels right.</p>
            </li>
            <li class="pl-10 relative">
                <span class="absolute -left-6 top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-serif font-bold text-lg shadow-lg">04</span>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Hand-Painted Execution</h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">Our artists bring the design to life with premium, non-toxic paints applied in careful layers.</p>
            </li>
            <li class="pl-10 relative">
                <span class="absolute -left-6 top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-serif font-bold text-lg shadow-lg">05</span>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Final Walkthrough & Care</h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">We review the finished wall together and share simple care tips to keep it looking fresh for years.</p>
            </li>
        </ol>
    </div>
</section>
`;

pages['index.html'] = 
    Hero('Transform Your Walls Into Art', 'Custom murals and interior wall art designed to make every space feel deeply personal and unique.', imgs.hero1, 'Book a Consultation') +
    GridSection('Our Services', 'Tailored artistic solutions for every environment.', serviceItems) +
    PortfolioGallery('Featured Portfolio', false) +
    ProcessSection() +
    IndexStoryBlock +
    CTA();

pages['home-2.html'] = 
    `
<section class="relative min-h-[80vh] flex items-center py-20 px-4 overflow-hidden">
    <div class="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000" style="background-image: url('images/home2 hero bg.jpg');"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/90 dark:from-gray-900/90 dark:to-gray-900/95"></div>
    <div class="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <div class="text-white text-center lg:text-left">
            <h1 class="text-5xl md:text-7xl lg:text-6xl xl:text-7xl font-serif font-bold mb-6 leading-tight drop-shadow-lg">Elevate Your Environment</h1>
            <p class="text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto lg:mx-0 text-gray-200">Editorial, sophisticated, and modern interior wall artwork.</p>
            <div class="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <a href="portfolio.html" class="bg-primary hover:bg-amber-600 text-white px-10 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1">View Gallery</a>
                <a href="services.html" class="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-10 py-4 rounded-full font-semibold transition-all shadow-lg transform hover:-translate-y-1">Our Services</a>
            </div>
        </div>
        <div class="hidden md:block">
            <img src="images/Terrazzo Lounge.jpg" alt="Modern interior wall art" class="rounded-3xl shadow-2xl w-full h-[420px] lg:h-[480px] object-cover border-4 border-white/20">
        </div>
    </div>
</section>
` +
    GridSection('Popular Categories', 'Discover styles that fit your aesthetic.', serviceItems.slice(0,3)) +
    `
<section class="py-24 bg-gray-900 text-white relative overflow-hidden">
    <div class="absolute top-0 left-0 w-1/2 h-full bg-primary/10 rounded-r-full blur-3xl transform -translate-x-1/3"></div>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-14">
            <h2 class="text-4xl md:text-5xl font-serif font-bold mb-4">Walls That Tell Your Story</h2>
            <p class="text-xl text-gray-300 font-light leading-relaxed">A wall is never just a wall. It sets the mood of a room, starts conversations, and reflects the people who live or work behind it. We craft each mural to carry your story with elegance and permanence.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
                <h3 class="text-primary font-bold uppercase text-sm tracking-widest mb-3">Tailored by Design</h3>
                <p class="text-gray-400 leading-relaxed">Every project begins with your palette, your references, and your space — never a template.</p>
            </div>
            <div>
                <h3 class="text-primary font-bold uppercase text-sm tracking-widest mb-3">Painted by Hand</h3>
                <p class="text-gray-400 leading-relaxed">Skilled artists layer premium, non-toxic paints so textures stay rich for years to come.</p>
            </div>
            <div>
                <h3 class="text-primary font-bold uppercase text-sm tracking-widest mb-3">Built to Last</h3>
                <p class="text-gray-400 leading-relaxed">Protective finishes keep colors vivid through sunlight, humidity, and everyday life.</p>
            </div>
        </div>
    </div>
</section>
` +
    TextMedia('Before & After Transformation', 'See how a blank canvas becomes a masterpiece. We handle everything from preparation to the final protective coat.', imgs.mural, [], true, 'Start Your Project') +
    `
<section class="py-24 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">Designed for the Way You Live</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">Great wall art is never picked from a catalog. It is composed for your light, your architecture, and the rhythm of your everyday life.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">A Considered Approach</h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">Before a brush touches the wall, we study the room — its proportions, its natural light, and how you move through it. That context shapes every color and line that follows.</p>
            </div>
            <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Honest Collaboration</h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">You see sketches and palettes before painting begins, and nothing advances without your approval. The final wall should feel unmistakably yours.</p>
            </div>
        </div>
        <blockquote class="border-l-4 border-primary pl-6 italic text-xl text-gray-700 dark:text-gray-300 leading-relaxed">"A blank wall is a quiet invitation — we simply help you answer it."</blockquote>
    </div>
</section>
` +
    TextMedia('The Artist Studio', 'Founded in 2015, we are a collective of passionate artists dedicated to transforming mundane spaces into breathtaking environments.', imgs.artist, []) +
    Testimonials() +
    CTA();

pages['about.html'] = 
    Hero('About The Studio', 'Discover the passion and people behind the art.', 'images/The Artist Studio.jpg', 'View Portfolio', 'portfolio.html', null, null, 'h-[60vh]') +
    TextMedia('Our Story', 'What started as a small passion project in a tiny garage has blossomed into a full-scale creative studio. We believe art shouldn\'t just live in galleries—it belongs in the spaces where we live, work, and dream.', 'images/The Artist Studio.jpg') +
    GridSection('Mission & Vision', 'Our core principles.', [
        {title: 'Creativity First', desc:'Pushing boundaries in design.', img:'images/Creativity First.jpg'},
        {title: 'Client Collaboration', desc:'Your voice in every stroke.', img:'images/Client Collaboration.jpg'},
        {title: 'Lasting Quality', desc:'Using premium, durable paints.', img:'images/Lasting Quality.jpg'}
    ]) +
    TextMedia('Our Philosophy', 'We approach every blank wall as an opportunity to tell a story. Whether it is a calming bedroom retreat or an energizing office environment, context is everything.', 'images/artist-painting.jpg', [], true) +
    ProcessSection() + 
    Testimonials() +
    CTA();

pages['services.html'] = 
    Hero('Our Services', 'Comprehensive mural and painting services.', 'images/Gallery Reception Wall.jpg', 'Get a Quote', 'contact.html', null, null, 'h-[60vh]') +
    TextMedia('Residential Murals', 'Transform your living space into a personal sanctuary with custom-designed murals tailored to your home\'s architecture and your personal taste.', 'images/Residential Murals.jpg', ['Living Rooms', 'Bedrooms', 'Hallways'], false, 'Learn More', 'service-details.html') +
    TextMedia('Kids Room Murals', 'Spark imagination with playful, colorful, and engaging wall art designed specifically for children\'s spaces and nurseries.', 'images/kids-room-mural.jpg', ['Nurseries', 'Playrooms', 'Educational Themes'], true, 'Learn More', 'service-details.html') +
    TextMedia('Commercial & Office', 'Enhance your brand identity and inspire your team with large-scale commercial murals that make a lasting impression on clients and employees.', 'images/commercial-mural.jpg', ['Lobbies', 'Meeting Rooms', 'Cafes & Restaurants'], false, 'Learn More', 'service-details.html') +
    TextMedia('Accent Walls', 'Sometimes less is more. We create striking geometric or textured accent walls that serve as the perfect backdrop for your interior design.', 'images/accent-wall.jpg', ['Geometric Patterns', 'Abstract Flow', 'Textured Finish'], true, 'Learn More', 'service-details.html') +
    Pricing() +
    CTA();

pages['service-details.html'] = 
    Hero('Residential Wall Murals', 'Custom artwork for your home.', 'images/Sunlit Reading Nook.jpg', 'Book a Consultation', 'contact.html', null, null, 'h-[60vh]') +
    TextMedia('Service Overview', 'Our residential mural service is designed to bring your dream space to life. We work closely with you to understand your aesthetic, color palette, and the mood you want to create.', 'images/Living Room.jpg', ['Fully Custom Design', 'Color Matching', 'Clean Process']) +
    GridSection('Benefits', 'Why choose custom art?', [
        {title: 'Unique to You', desc:'No one else will have this wall.', img:'images/Custom Illustrations.jpg'},
        {title: 'Adds Value', desc:'Elevates the interior design significantly.', img:'images/Lasting Quality.jpg'},
        {title: 'Mood Enhancement', desc:'Colors and shapes that improve wellbeing.', img:'images/Sunlit Reading Nook.jpg'}
    ]) +
    PortfolioGallery('Recent Residential Work', false) +
    ProcessSection() +
    Pricing() +
    CTA();

pages['portfolio.html'] = 
    Hero('Our Portfolio', 'A showcase of our finest transformations.', 'images/Terrazzo Lounge.jpg', 'Start Your Project', 'contact.html', null, null, 'h-[60vh]') +
    PortfolioGallery('Filter By Category', true) +
    TextMedia('Commercial Spotlight', 'See how we transformed the downtown tech hub.', 'images/Workplace Lounge Wall.jpg', [], true) +
    TextMedia('Residential Highlight', 'A serene bedroom retreat featuring abstract botanical motifs.', 'images/Bedroom Murals.jpg', []) +
    CTA();

pages['pricing.html'] = 
    Hero('Transparent Pricing', 'Investment packages for every project scale.', 'images/Staircase Statements.jpg', 'Request a Quote', 'contact.html', null, null, 'h-[60vh]') +
    Pricing() +
    TextMedia('What is Included?', 'Every package includes a comprehensive service from start to finish. We ensure absolute satisfaction.', 'images/artist-painting.jpg', ['Free Initial Consultation', 'Digital Mockups', 'Surface Preparation', 'Premium Non-toxic Paints', 'Final Protective Varnish', 'Clean-up'], true) +
    ProcessSection() +
    FAQ() +
    CTA();

pages['contact.html'] = 
    Hero('Get In Touch', 'Let us discuss your next project.', 'images/Client Collaboration.jpg', 'Fill the Form', '#form', null, null, 'h-[50vh]') +
    '<div id="form"></div>' +
    ContactForm() +
    TextMedia('Visit Our Studio', 'We are open for in-person consultations by appointment. Come see our material samples and draft portfolios.', 'images/The Artist Studio.jpg', ['Open Mon-Fri: 9am - 6pm', 'By Appointment Only']) +
    CTA();

pages['blog.html'] = 
    Hero('Art & Design Journal', 'Insights, trends, and stories from the studio.', 'images/Creativity First.jpg', 'Read Latest', '#latest', null, null, 'min-h-[60vh] py-20') +
    `<section id="latest" class="py-24 bg-white dark:bg-gray-900"><div class="max-w-7xl mx-auto px-4"><div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2 bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow">
            <img src="images/Geometric Minimalist.jpg" class="w-full h-96 object-cover">
            <div class="p-8">
                <span class="text-primary font-bold text-sm uppercase">Trends</span>
                <h3 class="text-3xl font-serif font-bold my-4">Top 5 Mural Trends for 2026</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">Explore the geometric and abstract flows dominating modern interior spaces.</p>
                <a href="blog-details.html" class="text-primary font-bold">Read Article <i class="fas fa-arrow-right text-sm"></i></a>
            </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow">
            <h4 class="font-serif text-xl font-bold mb-6">Categories</h4>
            <ul class="space-y-3">
                <li><a href="#" class="text-gray-600 hover:text-primary">Interior Design (12)</a></li>
                <li><a href="#" class="text-gray-600 hover:text-primary">Artist Tips (8)</a></li>
                <li><a href="#" class="text-gray-600 hover:text-primary">Studio News (5)</a></li>
                <li><a href="#" class="text-gray-600 hover:text-primary">Case Studies (14)</a></li>
            </ul>
        </div>
    </div></div></section>` +
    GridSection('Recent Articles', '', serviceItems.slice(0,3).map(i => ({...i, link:'blog-details.html'}))) +
    CTA();

pages['blog-details.html'] = 
    Hero('Top 5 Mural Trends for 2026', 'Published on Oct 12, 2025 | By Elena Rossi', 'images/Geometric Minimalist.jpg', 'Back to Blog', 'blog.html', null, null, 'h-[60vh]') +
    TextMedia('The Rise of Abstract Geometrics', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'images/Geometric Minimalist.jpg', [], false) +
    TextMedia('Biophilic Design on Walls', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.', 'images/Botanical Cafe Vibe.jpg', [], true) +
    GridSection('Related Articles', '', serviceItems.slice(3,6)) +
    CTA();

const SimplePage = (title, content) => `
<section class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-24">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl text-center border border-gray-100 dark:border-gray-700">
        ${content}
    </div>
</section>
`;

pages['404.html'] = SimplePage('404', `
    <h1 class="text-8xl font-serif font-bold text-primary mb-4">404</h1>
    <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Canvas Not Found</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-8">The page you are looking for has been painted over or doesn't exist.</p>
    <a href="index.html" class="inline-block bg-primary hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full transition-colors">Back to Home</a>
`);

pages['login.html'] = SimplePage('Login', `
    <h2 class="text-3xl font-serif font-bold mb-2 text-gray-900 dark:text-white">Welcome Back</h2>
    
    <form class="space-y-4 text-left" onsubmit="event.preventDefault(); window.location.href='user/dashboard.html'">
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" required class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input type="password" required class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
        </div>
        <div class="flex justify-between items-center text-sm">
            <label class="flex items-center text-gray-600 dark:text-gray-400"><input type="checkbox" class="mr-2"> Remember me</label>
            <a href="#" class="text-primary hover:underline">Forgot password?</a>
        </div>
        <button type="submit" class="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 rounded-xl transition-colors mt-4">Sign In</button>
    </form>
    <p class="mt-6 text-gray-600 dark:text-gray-400 text-sm"> <a href="register.html" class="text-primary font-bold">Register</a></p>
`);

pages['register.html'] = SimplePage('Register', `
    
    <form class="space-y-4 text-left" onsubmit="event.preventDefault(); window.location.href='login.html'">
        <div><label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">Name</label><input type="text" class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2"></div>
        <div><label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">Email</label><input type="email" class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2"></div>
        <div><label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">Password</label><input type="password" class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2"></div>
        <button type="submit" class="w-full bg-primary text-white font-bold py-3 rounded-xl">Register</button>
    </form>
    <p class="mt-6 text-gray-600 text-sm">Already have an account? <a href="login.html" class="text-primary font-bold">Login</a></p>
`);

pages['coming-soon.html'] = SimplePage('Coming Soon', `<h2 class="text-4xl font-serif font-bold mb-4">Coming Soon</h2><p>We are working on something awesome.</p>`);
pages['maintenance.html'] = SimplePage('Maintenance', `<h2 class="text-4xl font-serif font-bold mb-4">Under Maintenance</h2><p>We'll be back shortly.</p>`);

const adminDash = `
    <h1 class="text-3xl font-serif font-bold mb-8">Dashboard Overview</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        ${[{n:'Total Projects', v:'124', i:'fa-paint-roller'},{n:'New Requests', v:'12', i:'fa-envelope'},{n:'Active Works', v:'5', i:'fa-briefcase'},{n:'Revenue', v:'$45k', i:'fa-chart-line'}].map(s => `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div><p class="text-gray-500 text-sm mb-1">${s.n}</p><p class="text-2xl font-bold">${s.v}</p></div>
                <div class="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl"><i class="fas ${s.i}"></i></div>
            </div>
        `).join('')}
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 p-6">
        <h3 class="text-xl font-bold mb-4">Recent Consultation Requests</h3>
        <table class="w-full text-left">
            <tr class="border-b dark:border-gray-700 text-gray-500 text-sm"><th class="pb-3">Client</th><th class="pb-3">Type</th><th class="pb-3">Status</th></tr>
            <tr class="border-b dark:border-gray-700"><td class="py-4">John Doe</td><td>Residential</td><td><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pending</span></td></tr>
            <tr><td class="py-4">Cafe 42</td><td>Commercial</td><td><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Approved</span></td></tr>
        </table>
    </div>
`;
fs.writeFileSync('admin/dashboard.html', DashboardLayout('Admin', 'Admin', adminDash));
fs.writeFileSync('admin/projects.html', DashboardLayout('Projects', 'Admin', '<h1 class="text-3xl font-serif font-bold">Manage Projects</h1><p class="mt-4">List of all active and completed mural projects.</p>'));
fs.writeFileSync('admin/messages.html', DashboardLayout('Messages', 'Admin', '<h1 class="text-3xl font-serif font-bold">Messages</h1><p class="mt-4">Client communications.</p>'));
fs.writeFileSync('admin/settings.html', DashboardLayout('Settings', 'Admin', '<h1 class="text-3xl font-serif font-bold">Settings</h1><p class="mt-4">System configuration.</p>'));

const userDash = `
    <h1 class="text-3xl font-serif font-bold mb-8">Welcome, Sarah</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gradient-to-r from-primary to-amber-500 text-white p-6 rounded-xl shadow-lg md:col-span-2 relative overflow-hidden">
            <h3 class="text-xl font-bold mb-2">Upcoming Consultation</h3>
            <p class="opacity-90 mb-4">Oct 15, 2026 at 10:00 AM via Zoom</p>
            <button class="bg-white text-primary px-4 py-2 rounded font-bold text-sm">Reschedule</button>
            <i class="fas fa-calendar-alt absolute -right-4 -bottom-4 text-8xl opacity-20"></i>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
            <h3 class="text-xl font-bold mb-2">Saved Styles</h3>
            <p class="text-3xl font-bold text-primary mb-2">14</p>
            <a href="saved-projects.html" class="text-sm text-gray-500 hover:text-primary">View Collection <i class="fas fa-arrow-right"></i></a>
        </div>
    </div>
`;
fs.writeFileSync('user/dashboard.html', DashboardLayout('User', 'User', userDash));
fs.writeFileSync('user/bookings.html', DashboardLayout('Bookings', 'User', '<h1 class="text-3xl font-serif font-bold">My Bookings</h1><p class="mt-4">Your upcoming and past project bookings.</p>'));
fs.writeFileSync('user/saved-projects.html', DashboardLayout('Saved Projects', 'User', '<h1 class="text-3xl font-serif font-bold">Saved Projects</h1><p class="mt-4">Inspiration board.</p>'));
fs.writeFileSync('user/profile.html', DashboardLayout('Profile', 'User', '<h1 class="text-3xl font-serif font-bold">Profile</h1><p class="mt-4">Manage your account details.</p>'));

Object.entries(pages).forEach(([file, content]) => {
    if (file === '404.html') {
        fs.writeFileSync(file, Head('404') + `<main>\n` + content + `</main>\n<script src="js/main.js"></script>\n</body>\n</html>\n`);
        return;
    }
    fs.writeFileSync(file, Head(file.replace('.html', '').toUpperCase()) + Nav() + content + Footer());
});
console.log('Build complete!');
