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
        const hero = document.getElementById('hero');
        const heroContent = hero?.querySelector('.section-content');
        if (!heroContent || !window.matchMedia("(min-width: 769px)").matches) return;

        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        const friction = 0.08; // Control smooth lag (lower = smoother/slower)

        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Normalize coordinates to -1 to 1
            mouseX = (clientX / innerWidth - 0.5) * 2;
            mouseY = (clientY / innerHeight - 0.5) * 2;
        });

        const animateParallax = () => {
            // Lerp logic
            currentX += (mouseX - currentX) * friction;
            currentY += (mouseY - currentY) * friction;

            const xPos = currentX * 25; // movement intensity
            const yPos = currentY * 25;

            heroContent.style.transform = `translateX(${-xPos}px) translateY(${-yPos}px)`;
            requestAnimationFrame(animateParallax);
        };

        animateParallax();
    };


    // ========== PRELOADER LOGIC ==========
    const initPreloader = () => {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        window.addEventListener('load', () => {
            // Give a little extra time for the animations to play
            setTimeout(() => {
                preloader.classList.add('fade-out');

                // Remove from DOM after fade animation
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 1000);
            }, 1500);
        });
    };

    // ========== PARTICLE CURSOR TRAIL ==========
    const initParticleTrail = () => {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const maxParticles = 50;

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.life = 100;
                this.color = `rgba(255, 215, 0, ${Math.random() * 0.5 + 0.3})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= 2;
                this.size *= 0.97;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Glow effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
            }
        }

        let mouseX = 0;
        let mouseY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Create new particle
            if (particles.length < maxParticles) {
                particles.push(new Particle(mouseX, mouseY));
            }
        });

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();

                if (particles[i].life <= 0) {
                    particles.splice(i, 1);
                }
            }

            requestAnimationFrame(animate);
        }

        animate();
    };

    // ========== SKILLS ANIMATION ==========
    const initSkillsAnimation = () => {
        const skillItems = document.querySelectorAll('.skill-tag');

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const item = entry.target;

                    // Stagger animation
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);

                    skillObserver.unobserve(item);
                }
            });
        }, { threshold: 0.2 });

        skillItems.forEach(item => skillObserver.observe(item));
    };

    // Initialize all modules
    initDarkMode();
    initPreloader();
    initNavbar();
    initScrollAnimations();
    initPointerAnimations();
    initParticleTrail();
    initSkillsAnimation();
});
