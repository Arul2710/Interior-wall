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
            if (icon) icon.classList.toggle('rotate-180');
        });
    });

    let path = window.location.pathname.split('/').pop() || 'index.html';
    path = path.split('?')[0].split('#')[0];

    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(path) && !link.classList.contains('no-active')) {
            if (href === path || href === './' + path || href === '../' + path) {
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
                filterBtns.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white');
                    b.classList.add('bg-gray-100', 'text-gray-800');
                    if (b.hasAttribute('aria-pressed')) b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('bg-primary', 'text-white');
                btn.classList.remove('bg-gray-100', 'text-gray-800');
                if (btn.hasAttribute('aria-pressed')) btn.setAttribute('aria-pressed', 'true');
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

    /* ---- Demo form handling ----------------------------------------------
       These forms are front-end only: no backend is connected yet, so
       submissions are not delivered. Validation, error and success states
       are real; wire up an email/booking service to receive requests. */
    const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (ch) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
    ));

    document.querySelectorAll('.js-demo-form').forEach((form) => {
        const status = form.querySelector('.form-status');
        const fields = Array.from(form.querySelectorAll('input, select, textarea'));

        const matchOf = (field) => form.querySelector('[name="' + field.dataset.match + '"]');

        const messageFor = (field) => {
            if (field.validity.valueMissing) {
                if (field.type === 'checkbox') return 'Please tick this box to continue.';
                return 'This field is required.';
            }
            if (field.dataset.match) {
                const other = matchOf(field);
                if (other && field.value !== other.value) return 'Passwords do not match.';
            }
            if (field.type === 'email' && field.validity.typeMismatch) return 'Please enter a valid email address.';
            if (field.type === 'tel' && field.validity.patternMismatch) return 'Please enter a valid phone number.';
            return field.validationMessage || 'Please check this field.';
        };

        const fieldValid = (field) => {
            if (field.type === 'file') return true;
            if (!field.checkValidity()) return false;
            if (field.dataset.match) {
                const other = matchOf(field);
                if (other && field.value !== other.value) return false;
            }
            return true;
        };

        const errorElFor = (field) => {
            const wrap = field.closest('div');
            if (!wrap) return null;
            const own = wrap.querySelector('.form-error');
            if (own) return own;
            // Auth fields keep the input inside a .relative wrapper; fall back to
            // the immediate field group so the message is still scoped correctly.
            return wrap.parentElement ? wrap.parentElement.querySelector('.form-error') : null;
        };

        const clearField = (field) => {
            field.classList.remove('field-invalid');
            field.removeAttribute('aria-invalid');
            const err = errorElFor(field);
            if (err) { err.classList.add('hidden'); err.textContent = ''; }
        };

        const markInvalid = (field) => {
            field.classList.add('field-invalid');
            field.setAttribute('aria-invalid', 'true');
            const err = errorElFor(field);
            if (err) { err.textContent = messageFor(field); err.classList.remove('hidden'); }
        };

        fields.forEach((field) => {
            const revalidate = () => {
                clearField(field);
                fields.forEach((f) => { if (f.dataset.match === field.name) clearField(f); });
            };
            field.addEventListener('input', revalidate);
            field.addEventListener('change', revalidate);
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let firstInvalid = null;
            fields.forEach((field) => {
                clearField(field);
                if (!fieldValid(field)) {
                    markInvalid(field);
                    if (!firstInvalid) firstInvalid = field;
                }
            });

            if (firstInvalid) {
                if (status) {
                    status.className = 'form-status is-error';
                    status.textContent = 'Please correct the highlighted fields and try again.';
                    status.classList.remove('hidden');
                }
                firstInvalid.focus();
                return;
            }

            const nameField = form.querySelector('[name="name"]');
            const hasName = nameField && nameField.value.trim();
            const greeting = hasName
                ? 'Thanks, ' + escapeHtml(nameField.value.trim().split(/\s+/)[0]) + '!'
                : 'Thank you!';

            if (status) {
                status.className = 'form-status is-success';
                status.innerHTML = form.dataset.successMessage
                    ? form.dataset.successMessage
                    : '<strong>' + greeting + '</strong> Your request has been captured. '
                        + 'This demo form is not yet connected to a backend, so nothing has been sent. '
                        + 'Next step: confirm directly by calling <a href="tel:+15551234567">+1 (555) 123-4567</a> '
                        + 'or emailing <a href="mailto:hello@artmural.studio">hello@artmural.studio</a>.';
                status.classList.remove('hidden');
                status.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            form.reset();
        });
    });

    /* Scroll reveal — elements already in view are shown immediately to avoid a flash */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

            revealEls.forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
                    el.classList.add('is-visible');
                } else {
                    io.observe(el);
                }
            });
        } else {
            revealEls.forEach(el => el.classList.add('is-visible'));
        }
    }

    /* Smooth in-page navigation for anchor links */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href').slice(1);
            const target = id ? document.getElementById(id) : null;
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // Placeholder links (e.g. href="#") must not jump the page to the top.
                e.preventDefault();
            }
        });
    });
});
