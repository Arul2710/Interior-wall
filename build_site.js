const fs = require('fs');
const path = require('path');

const dirs = ['css', 'js', 'images', 'admin', 'user'];
dirs.forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const imgs = {
    hero1: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop',
    hero2: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop',
    hero3: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=2000&auto=format&fit=crop',
    room: 'https://images.unsplash.com/photo-1560067174-c5a3a8f37060?q=80&w=2000&auto=format&fit=crop',
    kids: 'https://images.unsplash.com/photo-1519710168127-05740fcb7e19?q=80&w=2000&auto=format&fit=crop',
    office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
    artist: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop',
    mural: 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?q=80&w=2000&auto=format&fit=crop',
    avatar1: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    avatar2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
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
                
                <div class="relative group py-8">
                    <a href="#" class="nav-link text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium flex items-center gap-1 transition-colors">
                        Account <i class="fas fa-chevron-down text-[10px]"></i>
                    </a>
                    <div class="absolute top-full right-0 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-b-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top -translate-y-2 group-hover:translate-y-0">
                        <div class="px-5 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900/50">Admin</div>
                        <a href="${prefix}admin/dashboard.html" class="block px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary">Admin Dashboard</a>
                        <a href="${prefix}admin/projects.html" class="block px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary">Manage Projects</a>
                        <a href="${prefix}admin/messages.html" class="block px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary">Messages</a>
                        <a href="${prefix}admin/settings.html" class="block px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary">Settings</a>
                        
                        <div class="px-5 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">User</div>
                        <a href="${prefix}user/dashboard.html" class="block px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary">User Dashboard</a>
                        <a href="${prefix}user/bookings.html" class="block px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary">My Bookings</a>
                        <a href="${prefix}user/saved-projects.html" class="block px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary">Saved Projects</a>
                        <a href="${prefix}user/profile.html" class="block px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary">Profile</a>
                    </div>
                </div>

                <div class="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                    <button class="theme-toggle-btn text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors focus:outline-none p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <i class="theme-icon fas fa-moon"></i>
                    </button>
                    <button class="rtl-toggle-btn text-xs font-bold text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors focus:outline-none p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                        RTL
                    </button>
                </div>
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
                <button class="mobile-dropdown-toggle w-full flex justify-between items-center text-lg font-medium text-gray-900 dark:text-white py-2" data-target="mob-account">
                    Account <i class="fas fa-chevron-down text-sm transition-transform"></i>
                </button>
                <div id="mob-account" class="hidden pl-4 py-2 space-y-4 border-l-2 border-gray-100 dark:border-gray-800 ml-2 mt-2">
                    <div>
                        <div class="text-xs font-bold text-gray-400 uppercase mb-2">Admin</div>
                        <a href="${prefix}admin/dashboard.html" class="block text-gray-600 dark:text-gray-400 py-1">Admin Dashboard</a>
                        <a href="${prefix}admin/projects.html" class="block text-gray-600 dark:text-gray-400 py-1">Manage Projects</a>
                        <a href="${prefix}admin/messages.html" class="block text-gray-600 dark:text-gray-400 py-1">Messages</a>
                        <a href="${prefix}admin/settings.html" class="block text-gray-600 dark:text-gray-400 py-1">Settings</a>
                    </div>
                    <div>
                        <div class="text-xs font-bold text-gray-400 uppercase mb-2">User</div>
                        <a href="${prefix}user/dashboard.html" class="block text-gray-600 dark:text-gray-400 py-1">User Dashboard</a>
                        <a href="${prefix}user/bookings.html" class="block text-gray-600 dark:text-gray-400 py-1">My Bookings</a>
                        <a href="${prefix}user/saved-projects.html" class="block text-gray-600 dark:text-gray-400 py-1">Saved Projects</a>
                        <a href="${prefix}user/profile.html" class="block text-gray-600 dark:text-gray-400 py-1">Profile</a>
                    </div>
                </div>
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
<footer class="bg-gray-900 text-white pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
                <h3 class="text-3xl font-serif font-bold mb-6 tracking-tight">Art<span class="text-primary">Mural</span></h3>
                <p class="text-gray-400 mb-6 font-light leading-relaxed">Premium custom interior wall art and murals designed to transform your everyday spaces into extraordinary experiences.</p>
                <div class="flex space-x-4">
                    <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"><i class="fab fa-pinterest-p"></i></a>
                </div>
            </div>
            <div>
                <h4 class="text-lg font-bold mb-6 font-serif">Quick Links</h4>
                <ul class="space-y-3">
                    <li><a href="${prefix}about.html" class="text-gray-400 hover:text-white transition-colors">About Studio</a></li>
                    <li><a href="${prefix}services.html" class="text-gray-400 hover:text-white transition-colors">Our Services</a></li>
                    <li><a href="${prefix}portfolio.html" class="text-gray-400 hover:text-white transition-colors">Portfolio Showcase</a></li>
                    <li><a href="${prefix}pricing.html" class="text-gray-400 hover:text-white transition-colors">Pricing Packages</a></li>
                    <li><a href="${prefix}contact.html" class="text-gray-400 hover:text-white transition-colors">Book Consultation</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-lg font-bold mb-6 font-serif">Services</h4>
                <ul class="space-y-3">
                    <li><a href="${prefix}service-details.html" class="text-gray-400 hover:text-white transition-colors">Home Murals</a></li>
                    <li><a href="${prefix}service-details.html" class="text-gray-400 hover:text-white transition-colors">Kids Room Art</a></li>
                    <li><a href="${prefix}service-details.html" class="text-gray-400 hover:text-white transition-colors">Commercial Spaces</a></li>
                    <li><a href="${prefix}service-details.html" class="text-gray-400 hover:text-white transition-colors">Office Branding</a></li>
                    <li><a href="${prefix}service-details.html" class="text-gray-400 hover:text-white transition-colors">Accent Walls</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-lg font-bold mb-6 font-serif">Newsletter</h4>
                <p class="text-gray-400 mb-4 font-light">Subscribe to get the latest artwork updates and studio news.</p>
                <form class="flex" onsubmit="event.preventDefault();">
                    <input type="email" placeholder="Email Address" class="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:border-primary">
                    <button type="submit" class="bg-primary hover:bg-amber-600 px-4 py-3 rounded-r-lg transition-colors"><i class="fas fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>&copy; 2026 ArtMural Studio. All rights reserved.</p>
            <div class="space-x-4 mt-4 md:mt-0">
                <a href="#" class="hover:text-white">Privacy Policy</a>
                <a href="#" class="hover:text-white">Terms of Service</a>
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
            <div class="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group border border-gray-100 dark:border-gray-800 transform hover:-translate-y-2">
                <div class="h-64 overflow-hidden relative">
                    <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div class="p-8">
                    <h3 class="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">${item.title}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">${item.desc}</p>
                    <a href="service-details.html" class="text-primary font-semibold hover:text-amber-700 flex items-center uppercase text-sm tracking-wide">Learn More <i class="fas fa-arrow-right ml-2 text-xs"></i></a>
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
                <img src="${imgs.room}" alt="Living Room" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span class="text-primary font-bold text-sm uppercase tracking-wider mb-2">Living Room</span>
                    <h3 class="text-white text-2xl font-serif font-bold">Modern Abstract Flow</h3>
                </div>
            </div>
            <div class="filter-item group relative overflow-hidden rounded-2xl aspect-[4/5] md:row-span-2" data-category="commercial">
                <img src="${imgs.office}" alt="Office Mural" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span class="text-primary font-bold text-sm uppercase tracking-wider mb-2">Commercial</span>
                    <h3 class="text-white text-2xl font-serif font-bold">Tech Startup Lobby</h3>
                </div>
            </div>
            <div class="filter-item group relative overflow-hidden rounded-2xl aspect-square" data-category="residential">
                <img src="${imgs.kids}" alt="Kids Room" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span class="text-primary font-bold text-sm uppercase tracking-wider mb-2">Kids Room</span>
                    <h3 class="text-white text-2xl font-serif font-bold">Jungle Safari Theme</h3>
                </div>
            </div>
            <div class="filter-item group relative overflow-hidden rounded-2xl aspect-square" data-category="commercial">
                <img src="${imgs.hero3}" alt="Cafe Art" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span class="text-primary font-bold text-sm uppercase tracking-wider mb-2">Restaurant</span>
                    <h3 class="text-white text-2xl font-serif font-bold">Botanical Cafe Vibe</h3>
                </div>
            </div>
            <div class="filter-item group relative overflow-hidden rounded-2xl aspect-square" data-category="residential">
                <img src="${imgs.mural}" alt="Accent Wall" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
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
                {name:'Emily Ross', role:'Interior Designer', img:imgs.avatar1, text:'I always recommend ArtMural to my clients. Their professionalism and artistic talent are unmatched in the industry.'}
            ].map(r => `
            <div class="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow border border-gray-100 dark:border-gray-700">
                <div class="flex text-primary mb-6 space-x-1">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                </div>
                <p class="text-gray-700 dark:text-gray-300 mb-8 italic">"${r.text}"</p>
                <div class="flex items-center">
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
                <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('${imgs.artist}');"></div>
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
    {title: 'Residential Murals', desc: 'Custom designs for living rooms, bedrooms, and hallways.', img: imgs.room},
    {title: 'Kids Room Art', desc: 'Playful, imaginative spaces for children of all ages.', img: imgs.kids},
    {title: 'Commercial Branding', desc: 'Impactful wall art for retail, restaurants, and offices.', img: imgs.office},
    {title: 'Accent Walls', desc: 'Minimalist geometric or abstract patterns.', img: imgs.mural},
    {title: 'Exterior Murals', desc: 'Durable, weather-resistant outdoor artwork.', img: imgs.hero3},
    {title: 'Custom Illustrations', desc: 'Bespoke canvas and small-scale custom requests.', img: imgs.artist}
];

pages['index.html'] = 
    Hero('Transform Your Walls Into Art', 'Custom murals and interior wall art designed to make every space feel deeply personal and unique.', imgs.hero1, 'Book a Consultation') +
    TextMedia('Crafting Spaces with Passion', 'With over 10 years of experience, ArtMural studio brings blank walls to life. We specialize in bespoke, hand-painted murals that reflect your personality and brand.', imgs.artist, ['250+ Walls Transformed', '150+ Happy Clients', 'Premium Materials Used'], false, 'Learn About Us', 'about.html') +
    GridSection('Our Services', 'Tailored artistic solutions for every environment.', serviceItems) +
    PortfolioGallery('Featured Portfolio', false) +
    ProcessSection() +
    Testimonials() +
    CTA();

pages['home-2.html'] = 
    Hero('Elevate Your Environment', 'Editorial, sophisticated, and modern interior wall artwork.', imgs.hero2, 'View Gallery', 'portfolio.html', 'Our Services', 'services.html', 'h-[80vh]') +
    GridSection('Popular Categories', 'Discover styles that fit your aesthetic.', serviceItems.slice(0,3)) +
    TextMedia('Before & After Transformation', 'See how a blank canvas becomes a masterpiece. We handle everything from preparation to the final protective coat.', imgs.mural, [], true, 'Start Your Project') +
    PortfolioGallery('Latest Projects') +
    TextMedia('The Artist Studio', 'Founded in 2015, we are a collective of passionate artists dedicated to transforming mundane spaces into breathtaking environments.', imgs.artist, []) +
    Testimonials() +
    CTA();

pages['about.html'] = 
    Hero('About The Studio', 'Discover the passion and people behind the art.', imgs.artist, 'View Portfolio', 'portfolio.html', null, null, 'h-[60vh]') +
    TextMedia('Our Story', 'What started as a small passion project in a tiny garage has blossomed into a full-scale creative studio. We believe art shouldn\'t just live in galleries—it belongs in the spaces where we live, work, and dream.', imgs.hero1) +
    GridSection('Mission & Vision', 'Our core principles.', [
        {title: 'Creativity First', desc:'Pushing boundaries in design.', img:imgs.hero3},
        {title: 'Client Collaboration', desc:'Your voice in every stroke.', img:imgs.room},
        {title: 'Lasting Quality', desc:'Using premium, durable paints.', img:imgs.mural}
    ]) +
    TextMedia('Our Philosophy', 'We approach every blank wall as an opportunity to tell a story. Whether it is a calming bedroom retreat or an energizing office environment, context is everything.', imgs.office, [], true) +
    ProcessSection() + 
    Testimonials() +
    CTA();

pages['services.html'] = 
    Hero('Our Services', 'Comprehensive mural and painting services.', imgs.mural, 'Get a Quote', 'contact.html', null, null, 'h-[60vh]') +
    TextMedia('Residential Murals', 'Transform your living space into a personal sanctuary with custom-designed murals tailored to your home\'s architecture and your personal taste.', imgs.room, ['Living Rooms', 'Bedrooms', 'Hallways'], false, 'Learn More', 'service-details.html') +
    TextMedia('Kids Room Murals', 'Spark imagination with playful, colorful, and engaging wall art designed specifically for children\'s spaces and nurseries.', imgs.kids, ['Nurseries', 'Playrooms', 'Educational Themes'], true, 'Learn More', 'service-details.html') +
    TextMedia('Commercial & Office', 'Enhance your brand identity and inspire your team with large-scale commercial murals that make a lasting impression on clients and employees.', imgs.office, ['Lobbies', 'Meeting Rooms', 'Cafes & Restaurants'], false, 'Learn More', 'service-details.html') +
    TextMedia('Accent Walls', 'Sometimes less is more. We create striking geometric or textured accent walls that serve as the perfect backdrop for your interior design.', imgs.hero3, ['Geometric Patterns', 'Abstract Flow', 'Textured Finish'], true, 'Learn More', 'service-details.html') +
    Pricing() +
    CTA();

pages['service-details.html'] = 
    Hero('Residential Wall Murals', 'Custom artwork for your home.', imgs.room, 'Book a Consultation', 'contact.html', null, null, 'h-[60vh]') +
    TextMedia('Service Overview', 'Our residential mural service is designed to bring your dream space to life. We work closely with you to understand your aesthetic, color palette, and the mood you want to create.', imgs.mural, ['Fully Custom Design', 'Color Matching', 'Clean Process']) +
    GridSection('Benefits', 'Why choose custom art?', [
        {title: 'Unique to You', desc:'No one else will have this wall.', img:imgs.hero1},
        {title: 'Adds Value', desc:'Elevates the interior design significantly.', img:imgs.hero2},
        {title: 'Mood Enhancement', desc:'Colors and shapes that improve wellbeing.', img:imgs.hero3}
    ]) +
    PortfolioGallery('Recent Residential Work', false) +
    ProcessSection() +
    Pricing() +
    CTA();

pages['portfolio.html'] = 
    Hero('Our Portfolio', 'A showcase of our finest transformations.', imgs.hero3, 'Start Your Project', 'contact.html', null, null, 'h-[60vh]') +
    PortfolioGallery('Filter By Category', true) +
    TextMedia('Commercial Spotlight', 'See how we transformed the downtown tech hub.', imgs.office, [], true) +
    TextMedia('Residential Highlight', 'A serene bedroom retreat featuring abstract botanical motifs.', imgs.room, []) +
    Testimonials() +
    CTA();

pages['pricing.html'] = 
    Hero('Transparent Pricing', 'Investment packages for every project scale.', imgs.hero1, 'Request a Quote', 'contact.html', null, null, 'h-[60vh]') +
    Pricing() +
    TextMedia('What is Included?', 'Every package includes a comprehensive service from start to finish. We ensure absolute satisfaction.', imgs.artist, ['Free Initial Consultation', 'Digital Mockups', 'Surface Preparation', 'Premium Non-toxic Paints', 'Final Protective Varnish', 'Clean-up'], true) +
    ProcessSection() +
    Testimonials() +
    CTA();

pages['contact.html'] = 
    Hero('Get In Touch', 'Let us discuss your next project.', imgs.hero2, 'Fill the Form', '#form', null, null, 'h-[50vh]') +
    '<div id="form"></div>' +
    ContactForm() +
    TextMedia('Visit Our Studio', 'We are open for in-person consultations by appointment. Come see our material samples and draft portfolios.', imgs.artist, ['Open Mon-Fri: 9am - 6pm', 'By Appointment Only']) +
    CTA();

pages['blog.html'] = 
    Hero('Art & Design Journal', 'Insights, trends, and stories from the studio.', imgs.hero3, 'Read Latest', '#latest', null, null, 'h-[50vh]') +
    `<section id="latest" class="py-24 bg-white dark:bg-gray-900"><div class="max-w-7xl mx-auto px-4"><div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2 bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow">
            <img src="${imgs.mural}" class="w-full h-96 object-cover">
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
    Hero('Top 5 Mural Trends for 2026', 'Published on Oct 12, 2025 | By Elena Rossi', imgs.mural, 'Back to Blog', 'blog.html', null, null, 'h-[60vh]') +
    TextMedia('The Rise of Abstract Geometrics', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', imgs.hero1, [], false) +
    TextMedia('Biophilic Design on Walls', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.', imgs.hero3, [], true) +
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
    <p class="text-gray-600 dark:text-gray-400 mb-8">Sign in to your client account.</p>
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
    <p class="mt-6 text-gray-600 dark:text-gray-400 text-sm">Don't have an account? <a href="register.html" class="text-primary font-bold">Register</a></p>
`);

pages['register.html'] = SimplePage('Register', `
    <h2 class="text-3xl font-serif font-bold mb-2 text-gray-900 dark:text-white">Create Account</h2>
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
    fs.writeFileSync(file, Head(file.replace('.html', '').toUpperCase()) + Nav() + content + Footer());
});
console.log('Build complete!');
