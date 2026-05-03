/* HIGGINS BUILDING GROUP — interactions */

(function () {
    'use strict';

    // -------- Sticky nav --------
    const nav = document.querySelector('.nav');
    if (nav) {
        const onScroll = () => {
            if (window.scrollY > 40) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
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
        // Close on link click
        nav.querySelectorAll('.nav-links a').forEach(a => {
            a.addEventListener('click', () => {
                nav.classList.remove('open');
                document.body.style.overflow = '';
            });
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

    // -------- Contact form (no-op, prevents default for static demo) --------
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
