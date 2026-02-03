document.addEventListener('DOMContentLoaded', () => {
    // ========== PROGRESS BAR ==========
    const initProgressBar = () => {
        const progressBar = document.getElementById('progressBar');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };

    // ========== SMOOTH SCROLL ==========
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // ========== SCROLL ANIMATIONS ==========
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements
        const animateElements = document.querySelectorAll('.note-card, .section-content, #quote-section');
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.8s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    };

    // ========== SCROLL INDICATOR ==========
    const initScrollIndicator = () => {
        const indicator = document.querySelector('.scroll-indicator');
        if (!indicator) return;

        indicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#personal-notes');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Hide indicator after scrolling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                indicator.style.opacity = '0';
                indicator.style.pointerEvents = 'none';
            } else {
                indicator.style.opacity = '1';
                indicator.style.pointerEvents = 'auto';
            }
        });
    };

    // Initialize all modules
    initProgressBar();
    initSmoothScroll();
    initScrollAnimations();
    initScrollIndicator();
});
