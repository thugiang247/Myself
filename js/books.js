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

    // ========== BOOK CARD INTERACTIONS (3D TILT, MOBILE & FLIP) ==========
    const initBookCards = () => {
        const cards = document.querySelectorAll('.book-card');
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        cards.forEach(card => {
            const book = card.querySelector('.book-3d-object');
            if (!book) return;

            // --- 1. Click to Flip/Open ---
            card.addEventListener('click', function (e) {
                // Ignore clicks on links/buttons
                if (e.target.closest('a, button')) return;

                const isOpen = this.classList.contains('is-open');
                const clickedContent = e.target.closest('.book-inner-content');

                // If book is open and user clicks inside the content (to scroll/read), don't close it
                // UNLESS they click exactly on the instruction or a close area
                if (isOpen && clickedContent && !e.target.closest('.book-instruction')) {
                    return;
                }

                // Toggle this book
                this.classList.toggle('is-open');

                // Close all other open books first
                if (!isOpen) {
                    document.querySelectorAll('.book-card.is-open').forEach(c => {
                        if (c !== this) {
                            c.classList.remove('is-open');
                            const otherBook = c.querySelector('.book-3d-object');
                            if (otherBook) otherBook.style.transform = `rotateY(-20deg) rotateX(5deg) scale(1)`;
                        }
                    });
                }

                // Set transform for this book
                if (isOpen) {
                    // We just removed is-open
                    book.style.transform = `rotateY(-20deg) rotateX(5deg) scale(1)`;
                } else {
                    // We just added is-open
                    book.style.transform = `rotateY(0deg) rotateX(0deg) scale(1.1)`;
                }
            });

            // --- 2. DESKTOP: Mouse Tilt ---
            if (!isMobile) {
                card.addEventListener('mousemove', function (e) {
                    if (this.classList.contains('is-open')) return;

                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateY = ((x - centerX) / centerX) * 25;
                    const rotateX = ((centerY - y) / centerY) * 25;
                    book.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
                    this.style.zIndex = '10';
                });

                card.addEventListener('mouseleave', function () {
                    if (this.classList.contains('is-open')) return;
                    book.style.transform = `rotateY(-20deg) rotateX(5deg) scale(1)`;
                    this.style.zIndex = '1';
                });
            }

            // --- 3. MOBILE: Touch & Scroll Interaction ---
            else {
                card.addEventListener('touchmove', function (e) {
                    if (this.classList.contains('is-open')) return;
                    const touch = e.touches[0];
                    const rect = this.getBoundingClientRect();
                    const x = touch.clientX - rect.left;
                    const y = touch.clientY - rect.top;

                    if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateY = ((x - centerX) / centerX) * 20;
                        const rotateX = ((centerY - y) / centerY) * 20;
                        book.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
                    }
                }, { passive: true });

                card.addEventListener('touchend', function () {
                    if (this.classList.contains('is-open')) return;
                    setTimeout(() => {
                        book.style.transform = `rotateY(-20deg) rotateX(5deg) scale(1)`;
                    }, 500);
                });

                window.addEventListener('scroll', () => {
                    if (card.classList.contains('is-open')) return;
                    const rect = card.getBoundingClientRect();
                    const viewHeight = window.innerHeight;
                    const cardCenter = rect.top + rect.height / 2;
                    const scrollDist = (cardCenter - viewHeight / 2) / (viewHeight / 2);
                    const autoRotateY = -20 + (scrollDist * 20);

                    if (rect.top < viewHeight && rect.bottom > 0) {
                        book.style.transform = `rotateY(${autoRotateY}deg) rotateX(5deg)`;
                    }
                }, { passive: true });
            }
        });
    };

    // Initialize all modules
    initProgressBar();
    initSmoothScroll();
    initScrollAnimations();
    initScrollIndicator();
    initBookCards();
});
