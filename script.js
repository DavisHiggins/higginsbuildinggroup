/* HIGGINS BUILDING GROUP — interactions */

(function () {
    'use strict';

    const nav = document.querySelector('.nav');
    const isHome = document.body.dataset.page === 'home';

    // -------- Sticky nav (different behavior on home) --------
    if (nav) {
        if (isHome) {
            nav.classList.add('nav-home');
        }

        const studio = document.querySelector('.studio');

        const onScroll = () => {
            if (isHome && studio) {
                // On home, nav stays transparent until the Studio section
                // reaches the top of the viewport
                const r = studio.getBoundingClientRect();
                if (r.top <= 80) {
                    nav.classList.add('nav-solid');
                } else {
                    nav.classList.remove('nav-solid');
                }
            } else {
                if (window.scrollY > 40) nav.classList.add('scrolled');
                else nav.classList.remove('scrolled');
            }
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // -------- Mobile menu toggle --------
    const toggle = document.querySelector('.nav-toggle');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            const expanded = nav.classList.contains('open');
            toggle.setAttribute('aria-expanded', expanded);
            document.body.style.overflow = expanded ? 'hidden' : '';
        });
        nav.querySelectorAll('.nav-links a').forEach(a => {
            a.addEventListener('click', () => {
                nav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // -------- Hero slideshow --------
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
        // Lazy-set background-image from data-src for slides 2+
        slides.forEach((s, i) => {
            if (i > 0 && s.dataset.src) {
                // Preload and assign once loaded for smooth transitions
                const img = new Image();
                img.onload = () => {
                    s.style.backgroundImage = `url('${s.dataset.src}')`;
                };
                img.src = s.dataset.src;
            }
        });

        let current = 0;
        const total = slides.length;
        const INTERVAL = 6000; // 6 seconds per slide

        const advance = () => {
            const next = (current + 1) % total;
            slides[current].classList.remove('active');
            slides[next].classList.add('active');
            current = next;
        };

        // Pause when tab is hidden to save resources
        let timer = setInterval(advance, INTERVAL);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(timer);
            } else {
                timer = setInterval(advance, INTERVAL);
            }
        });
    }

    // -------- Scroll reveal --------
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
    } else {
        document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('in'));
    }

    // -------- Gallery filter --------
    const pills = document.querySelectorAll('.pill');
    const gItems = document.querySelectorAll('.gimg');
    const counter = document.querySelector('.gallery-count');
    if (pills.length && gItems.length) {
        const updateCount = () => {
            if (!counter) return;
            const visible = document.querySelectorAll('.gimg:not([hidden])').length;
            counter.textContent = visible.toString().padStart(2, '0') + ' Projects';
        };
        pills.forEach(p => {
            p.addEventListener('click', () => {
                pills.forEach(x => x.classList.remove('active'));
                p.classList.add('active');
                const cat = p.dataset.filter;
                gItems.forEach(item => {
                    if (cat === 'all' || item.dataset.cat === cat) item.hidden = false;
                    else item.hidden = true;
                });
                updateCount();
            });
        });
        updateCount();
    }

    // -------- Contact form --------
    const cf = document.querySelector('.contact-form');
    if (cf) {
        cf.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = cf.querySelector('button[type="submit"]');
            if (btn) {
                const orig = btn.innerHTML;
                btn.innerHTML = 'Message Sent <span class="arrow"></span>';
                btn.disabled = true;
                setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; cf.reset(); }, 2800);
            }
        });
    }

    // -------- Notify form --------
    const nf = document.querySelector('.notify-form');
    if (nf) {
        nf.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = nf.querySelector('button[type="submit"]');
            if (btn) {
                const orig = btn.innerHTML;
                btn.innerHTML = 'You\'re On The List <span class="arrow"></span>';
                setTimeout(() => { btn.innerHTML = orig; nf.reset(); }, 2800);
            }
        });
    }
})();
