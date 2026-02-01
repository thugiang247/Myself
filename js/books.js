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

        // Observe book cards
        document.querySelectorAll('.book-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `all 0.8s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // Observe sections
        document.querySelectorAll('.section-content').forEach(section => {
            observer.observe(section);
        });
    };

    // ========== SCROLL INDICATOR ==========
    const initScrollIndicator = () => {
        const indicator = document.querySelector('.scroll-indicator');
        if (!indicator) return;

        indicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#classics');
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

    // ========== BOOK CARD INTERACTIONS ==========
    const initBookCards = () => {
        document.querySelectorAll('.book-card').forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.zIndex = '10';
            });

            card.addEventListener('mouseleave', function () {
                this.style.zIndex = '1';
            });
        });
    };

    // Initialize all modules
    initProgressBar();
    initSmoothScroll();
    initScrollAnimations();
    initScrollIndicator();
    initBookCards();
});
