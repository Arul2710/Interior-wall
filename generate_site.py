import os
import urllib.request

base_dir = r'c:/Users/arulp/OneDrive/Desktop/interior wall'
dirs = ['css', 'js', 'images', 'admin', 'user']
for d in dirs:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

# Download some placeholder images
images = {
    'hero-mural.jpg': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop',
    'living-room-mural.jpg': 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop',
    'kids-room-mural.jpg': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    'commercial-mural.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    'artist-painting.jpg': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop',
    'accent-wall.jpg': 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop',
    'logo.png': 'https://via.placeholder.com/150x50?text=Logo'
}
for name, url in images.items():
    path = os.path.join(base_dir, 'images', name)
    if not os.path.exists(path):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
                out_file.write(response.read())
        except Exception as e:
            print(f"Failed to download {name}: {e}")

style_css = '''
:root { --bg-color: #f9fafb; --text-color: #1f2937; --primary: #8b5cf6; }
.dark { --bg-color: #111827; --text-color: #f3f4f6; }
body { background-color: var(--bg-color); color: var(--text-color); transition: all 0.3s ease; }
.masonry { column-count: 3; column-gap: 1em; }
.masonry-item { break-inside: avoid; margin-bottom: 1em; }
@media(max-width:1024px){.masonry{column-count:2;}}
@media(max-width:640px){.masonry{column-count:1;}}
.hero-bg { background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../images/hero-mural.jpg') center/cover; }
.hover-scale { transition: transform 0.3s; }
.hover-scale:hover { transform: scale(1.02); }
'''
with open(os.path.join(base_dir, 'css', 'style.css'), 'w') as f: f.write(style_css)

main_js = '''
document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    const rtlBtn = document.getElementById('rtl-toggle');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) html.classList.add('dark');
    
    if(themeBtn) themeBtn.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
    });

    if(rtlBtn) rtlBtn.addEventListener('click', () => {
        html.dir = html.dir === 'rtl' ? 'ltr' : 'rtl';
    });

    if(mobileBtn && mobileMenu) mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    const filters = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');
    filters.forEach(btn => btn.addEventListener('click', (e) => {
        const cat = e.target.dataset.cat;
        items.forEach(item => {
            if(cat === 'all' || item.dataset.cat === cat) item.style.display = 'block';
            else item.style.display = 'none';
        });
    }));
});
'''
with open(os.path.join(base_dir, 'js', 'main.js'), 'w') as f: f.write(main_js)

def create_page(filename, title, content, path_prefix=''):
    nav = f'''
    <nav class="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="{path_prefix}index.html" class="text-2xl font-bold text-gray-800 dark:text-white">MuralArt</a>
                </div>
                <div class="hidden md:flex items-center space-x-6">
                    <a href="{path_prefix}index.html" class="hover:text-purple-600">Home</a>
                    <a href="{path_prefix}about.html" class="hover:text-purple-600">About</a>
                    <a href="{path_prefix}services.html" class="hover:text-purple-600">Services</a>
                    <a href="{path_prefix}portfolio.html" class="hover:text-purple-600">Portfolio</a>
                    <a href="{path_prefix}pricing.html" class="hover:text-purple-600">Pricing</a>
                    <a href="{path_prefix}blog.html" class="hover:text-purple-600">Blog</a>
                    <a href="{path_prefix}contact.html" class="hover:text-purple-600">Contact</a>
                    <div class="relative group">
                        <button class="hover:text-purple-600 flex items-center">Account &#9662;</button>
                        <div class="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg mt-2 rounded w-48 py-2">
                            <a href="{path_prefix}admin/dashboard.html" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Admin Dashboard</a>
                            <a href="{path_prefix}user/dashboard.html" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">User Dashboard</a>
                            <a href="{path_prefix}login.html" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Login</a>
                        </div>
                    </div>
                    <button id="theme-toggle" class="p-2 bg-gray-200 dark:bg-gray-700 rounded">&#9728;/&#9789;</button>
                    <button id="rtl-toggle" class="p-2 bg-gray-200 dark:bg-gray-700 rounded">RTL</button>
                </div>
                <div class="md:hidden flex items-center">
                    <button id="mobile-menu-btn" class="text-gray-800 dark:text-white focus:outline-none">&#9776;</button>
                </div>
            </div>
        </div>
        <div id="mobile-menu" class="hidden md:hidden bg-white dark:bg-gray-900 pb-4">
            <a href="{path_prefix}index.html" class="block px-4 py-2">Home</a>
            <a href="{path_prefix}about.html" class="block px-4 py-2">About</a>
            <a href="{path_prefix}services.html" class="block px-4 py-2">Services</a>
            <a href="{path_prefix}portfolio.html" class="block px-4 py-2">Portfolio</a>
            <a href="{path_prefix}contact.html" class="block px-4 py-2">Contact</a>
            <a href="{path_prefix}admin/dashboard.html" class="block px-4 py-2">Admin Dashboard</a>
            <a href="{path_prefix}user/dashboard.html" class="block px-4 py-2">User Dashboard</a>
        </div>
    </nav>
    '''
    
    footer = f'''
    <footer class="bg-gray-900 text-white py-12 mt-20">
        <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 class="text-xl font-bold mb-4">MuralArt</h3>
                <p class="text-gray-400">Premium interior wall art and custom murals for homes and businesses.</p>
            </div>
            <div>
                <h4 class="font-bold mb-4">Quick Links</h4>
                <ul class="space-y-2">
                    <li><a href="{path_prefix}index.html" class="text-gray-400 hover:text-white">Home</a></li>
                    <li><a href="{path_prefix}about.html" class="text-gray-400 hover:text-white">About</a></li>
                    <li><a href="{path_prefix}services.html" class="text-gray-400 hover:text-white">Services</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold mb-4">Legal</h4>
                <ul class="space-y-2">
                    <li><a href="{path_prefix}404.html" class="text-gray-400 hover:text-white">Privacy Policy</a></li>
                    <li><a href="{path_prefix}coming-soon.html" class="text-gray-400 hover:text-white">Terms of Service</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold mb-4">Subscribe</h4>
                <div class="flex">
                    <input type="email" placeholder="Email" class="px-3 py-2 text-black rounded-l w-full">
                    <button class="bg-purple-600 px-4 rounded-r">Go</button>
                </div>
            </div>
        </div>
    </footer>
    '''

    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - MuralArt</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="{path_prefix}css/style.css" rel="stylesheet">
</head>
<body class="antialiased">
    {nav}
    <main class="min-h-screen">
        {content}
    </main>
    {footer}
    <script src="{path_prefix}js/main.js"></script>
</body>
</html>'''
    with open(os.path.join(base_dir, filename), 'w', encoding='utf-8') as f:
        f.write(html)

# Index Page
index_content = '''
<section class="hero-bg h-[80vh] flex items-center justify-center text-center text-white">
    <div class="max-w-3xl px-4">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">Transform Your Walls Into Art</h1>
        <p class="text-xl mb-8">Custom murals and interior wall art designed to make every space feel personal.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="contact.html" class="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full font-semibold transition">Book a Consultation</a>
            <a href="portfolio.html" class="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition">View Portfolio</a>
        </div>
    </div>
</section>

<section class="py-20 px-4 max-w-7xl mx-auto">
    <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Our Services</h2>
        <p class="text-gray-600 dark:text-gray-400">Premium artwork for every space</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover-scale">
            <img src="images/living-room-mural.jpg" alt="Living Room" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">Custom Home Murals</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">Personalized designs tailored to your living space.</p>
                <a href="service-details.html" class="text-purple-600 font-semibold">Learn More &rarr;</a>
            </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover-scale">
            <img src="images/kids-room-mural.jpg" alt="Kids Room" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">Kids' Room Murals</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">Imaginative and playful designs for children's rooms.</p>
                <a href="service-details.html" class="text-purple-600 font-semibold">Learn More &rarr;</a>
            </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover-scale">
            <img src="images/commercial-mural.jpg" alt="Commercial" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">Commercial Murals</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">Elevate your business aesthetic with custom art.</p>
                <a href="service-details.html" class="text-purple-600 font-semibold">Learn More &rarr;</a>
            </div>
        </div>
    </div>
</section>
'''
create_page('index.html', 'Home', index_content)

# Portfolio Page
portfolio_content = '''
<div class="pt-10 pb-6 text-center">
    <h1 class="text-4xl font-bold">Our Portfolio</h1>
    <p class="text-gray-600 dark:text-gray-400 mt-2">Explore our recent artwork</p>
</div>
<div class="max-w-7xl mx-auto px-4 pb-20">
    <div class="flex justify-center space-x-4 mb-8 overflow-x-auto py-2">
        <button class="filter-btn px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full" data-cat="all">All</button>
        <button class="filter-btn px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full" data-cat="living">Living Room</button>
        <button class="filter-btn px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full" data-cat="kids">Kids Room</button>
        <button class="filter-btn px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full" data-cat="commercial">Commercial</button>
    </div>
    <div class="masonry">
        <div class="portfolio-item masonry-item" data-cat="living"><img src="images/living-room-mural.jpg" alt="living" class="w-full rounded shadow-md"></div>
        <div class="portfolio-item masonry-item" data-cat="kids"><img src="images/kids-room-mural.jpg" alt="kids" class="w-full rounded shadow-md"></div>
        <div class="portfolio-item masonry-item" data-cat="commercial"><img src="images/commercial-mural.jpg" alt="comm" class="w-full rounded shadow-md"></div>
        <div class="portfolio-item masonry-item" data-cat="living"><img src="images/accent-wall.jpg" alt="accent" class="w-full rounded shadow-md"></div>
        <div class="portfolio-item masonry-item" data-cat="commercial"><img src="images/hero-mural.jpg" alt="hero" class="w-full rounded shadow-md"></div>
    </div>
</div>
'''
create_page('portfolio.html', 'Portfolio', portfolio_content)

# About Page
about_content = '''
<div class="max-w-5xl mx-auto px-4 py-20">
    <h1 class="text-4xl font-bold text-center mb-10">Our Story</h1>
    <div class="flex flex-col md:flex-row gap-10 items-center">
        <img src="images/artist-painting.jpg" alt="Artist" class="w-full md:w-1/2 rounded-lg shadow-xl">
        <div>
            <h2 class="text-2xl font-bold mb-4">Creating Spaces with Soul</h2>
            <p class="mb-4">We are a team of dedicated artists who believe that walls should be more than just boundaries. They should tell a story, evoke emotion, and bring spaces to life.</p>
            <p>From whimsical kids' rooms to sophisticated corporate lobbies, we've transformed hundreds of spaces.</p>
        </div>
    </div>
</div>
'''
create_page('about.html', 'About Us', about_content)

# Contact Page
contact_content = '''
<div class="max-w-3xl mx-auto px-4 py-20">
    <h1 class="text-4xl font-bold text-center mb-4">Book a Consultation</h1>
    <p class="text-center text-gray-600 dark:text-gray-400 mb-10">Let's discuss your next project.</p>
    <form class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
                <label class="block mb-2 text-sm font-medium">Full Name</label>
                <input type="text" class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required>
            </div>
            <div>
                <label class="block mb-2 text-sm font-medium">Email</label>
                <input type="email" class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required>
            </div>
        </div>
        <div class="mb-6">
            <label class="block mb-2 text-sm font-medium">Project Type</label>
            <select class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                <option>Residential Mural</option>
                <option>Commercial Mural</option>
                <option>Accent Wall</option>
                <option>Kids Room</option>
            </select>
        </div>
        <div class="mb-6">
            <label class="block mb-2 text-sm font-medium">Message</label>
            <textarea rows="4" class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required></textarea>
        </div>
        <button type="submit" class="w-full bg-purple-600 text-white font-bold py-3 rounded hover:bg-purple-700 transition" onclick="alert('Form submitted (demo)'); return false;">Send Request</button>
    </form>
</div>
'''
create_page('contact.html', 'Contact', contact_content)

# Admin Dashboard Page
admin_content = '''
<div class="max-w-7xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-purple-500">
            <h3 class="text-gray-500 text-sm">Total Projects</h3>
            <p class="text-2xl font-bold">124</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-green-500">
            <h3 class="text-gray-500 text-sm">Consultations</h3>
            <p class="text-2xl font-bold">18</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-blue-500">
            <h3 class="text-gray-500 text-sm">Messages</h3>
            <p class="text-2xl font-bold">5</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-yellow-500">
            <h3 class="text-gray-500 text-sm">Revenue (Demo)</h3>
            <p class="text-2xl font-bold">$12,400</p>
        </div>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b dark:border-gray-700"><h3 class="font-bold">Recent Requests</h3></div>
        <table class="w-full text-left">
            <thead>
                <tr class="bg-gray-50 dark:bg-gray-700">
                    <th class="p-4">Name</th><th class="p-4">Project</th><th class="p-4">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b dark:border-gray-700"><td class="p-4">John Doe</td><td class="p-4">Living Room Mural</td><td class="p-4"><span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span></td></tr>
                <tr class="border-b dark:border-gray-700"><td class="p-4">Jane Smith</td><td class="p-4">Office Accent Wall</td><td class="p-4"><span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Approved</span></td></tr>
            </tbody>
        </table>
    </div>
</div>
'''
create_page('admin/dashboard.html', 'Admin Dashboard', admin_content, '../')

# User Dashboard
user_content = '''
<div class="max-w-7xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-8">Welcome back, Alex!</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 class="font-bold text-xl mb-4">Upcoming Consultations</h3>
            <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">12</div>
                <div>
                    <h4 class="font-semibold">Site Visit & Measurement</h4>
                    <p class="text-sm text-gray-500">Oct 12, 2024 at 10:00 AM</p>
                </div>
            </div>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 class="font-bold text-xl mb-4">Saved Artworks</h3>
            <div class="grid grid-cols-3 gap-2">
                <img src="../images/living-room-mural.jpg" class="w-full h-20 object-cover rounded">
                <img src="../images/accent-wall.jpg" class="w-full h-20 object-cover rounded">
            </div>
        </div>
    </div>
</div>
'''
create_page('user/dashboard.html', 'User Dashboard', user_content, '../')

# Generics for the rest
generic = "<div class='text-center py-20'><h1 class='text-4xl font-bold'>Page Content Placeholder</h1><p class='mt-4'>Detailed design for this page would go here.</p></div>"
create_page('home-2.html', 'Home 2', generic)
create_page('services.html', 'Services', generic)
create_page('service-details.html', 'Service Details', generic)
create_page('pricing.html', 'Pricing', generic)
create_page('blog.html', 'Blog', generic)
create_page('blog-details.html', 'Blog Details', generic)
create_page('404.html', '404 Not Found', "<div class='text-center py-32'><h1 class='text-9xl font-bold'>404</h1><p class='text-2xl mt-4'>Page not found</p><a href='index.html' class='mt-8 inline-block bg-purple-600 text-white px-6 py-2 rounded'>Go Home</a></div>")
create_page('login.html', 'Login', generic)
create_page('register.html', 'Register', generic)
create_page('coming-soon.html', 'Coming Soon', generic)
create_page('maintenance.html', 'Maintenance', generic)

print("Site generated successfully.")
