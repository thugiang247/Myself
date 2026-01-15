// ========== UTILITY FUNCTIONS ==========
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

document.addEventListener('DOMContentLoaded', () => {

    // ========== DARK MODE ==========
    const initDarkMode = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });
    };

    // ========== NAVBAR BEHAVIOR ==========
    const initNavbar = () => {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-links a');

        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinksContainer = document.getElementById('navLinks');
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close menu on link click & smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinksContainer.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');

                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // ========== SCROLL-BASED ANIMATIONS ==========
    const initScrollAnimations = () => {
        // --- Progress Bar ---
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (scrollTop / docHeight) * 100;
                progressBar.style.width = progress + '%';
            });
        }

        // --- Section fade-in ---
        const sections = document.querySelectorAll('.section-content');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.1 });
        sections.forEach(section => sectionObserver.observe(section));

        // --- Staggered item fade-in ---
        const animatedItems = document.querySelectorAll('.interest-block');
        const itemObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedItems.forEach(item => {
             item.style.opacity = '0';
             item.style.transform = 'translateY(40px)';
             item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            itemObserver.observe(item)
        });
    };

    // ========== INTERACTIVE PARALLAX & TILT ANIMATIONS ==========
    const initPointerAnimations = () => {
        // --- Parallax floating shapes ---
        const parallaxContainer = document.getElementById('parallaxContainer');
        if (parallaxContainer && window.matchMedia("(min-width: 769px)").matches) {
            const shapes = parallaxContainer.querySelectorAll('.floating-shape');
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                shapes.forEach(shape => {
                    const speed = parseFloat(shape.dataset.speed) || 0.03;
                    const movement = -(scrollY * speed);
                    shape.style.transform = `translateY(${movement}px)`;
                });
            });
        }
        
        // --- Hero parallax on mouse move ---
        const hero = document.getElementById('hero');
        const heroContent = hero.querySelector('.section-content');
         if (heroContent && window.matchMedia("(min-width: 769px)").matches) {
            hero.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { offsetWidth, offsetHeight } = hero;
                const xPos = (clientX / offsetWidth - 0.5) * 30; // 30 is the movement intensity
                const yPos = (clientY / offsetHeight - 0.5) * 30;
                heroContent.style.transform = `translateX(${-xPos}px) translateY(${-yPos}px)`;
            });
         }
    };


    // Initialize all modules
    initDarkMode();
    initNavbar();
    initScrollAnimations();
    initPointerAnimations();
});
