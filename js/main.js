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


    // ========== DYNAMIC UNIVERSE ==========
    const initUniverse = () => {
        const universe = document.getElementById('universe');
        if (!universe) return;

        const starCount = 150; // Number of stars
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            // Random Position
            const x = Math.random() * 100;
            const y = Math.random() * 100;

            // Random Size
            const size = Math.random() * 2 + 1; // 1px to 3px

            // Random Animation Duration
            const duration = Math.random() * 3 + 2; // 2s to 5s

            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.setProperty('--twinkle-duration', `${duration}s`);

            universe.appendChild(star);
        }
    };

    // ========== SHOOTING STARS ==========
    const initShootingStars = () => {
        const container = document.getElementById('shooting-stars');
        if (!container) return;

        const createShootingStar = () => {
            const star = document.createElement('div');
            star.classList.add('shooting-star');

            // Random starting position (top-right area)
            const startX = Math.random() * 50 + 50; // 50-100%
            const startY = Math.random() * 30; // 0-30%

            star.style.left = `${startX}%`;
            star.style.top = `${startY}%`;

            // Random duration (1.5s to 3s)
            const duration = Math.random() * 1.5 + 1.5;
            star.style.animationDuration = `${duration}s`;

            container.appendChild(star);

            // Remove after animation
            setTimeout(() => {
                star.remove();
            }, duration * 1000);
        };

        // Create shooting stars at random intervals
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance every interval
                createShootingStar();
            }
        }, 2000);

        // Create initial shooting star
        createShootingStar();
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
        const skillItems = document.querySelectorAll('.skill-item');

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const progress = item.getAttribute('data-progress');
                    const progressBar = item.querySelector('.skill-progress');
                    const percentageText = item.querySelector('.skill-percentage');

                    // Stagger animation
                    setTimeout(() => {
                        item.classList.add('visible');

                        // Animate progress bar
                        setTimeout(() => {
                            progressBar.style.width = progress + '%';

                            // Animate percentage counter
                            let currentProgress = 0;
                            const duration = 1500;
                            const increment = progress / (duration / 16);

                            const counter = setInterval(() => {
                                currentProgress += increment;
                                if (currentProgress >= progress) {
                                    currentProgress = progress;
                                    clearInterval(counter);
                                }
                                percentageText.textContent = Math.round(currentProgress) + '%';
                            }, 16);
                        }, 200);
                    }, index * 100);

                    skillObserver.unobserve(item);
                }
            });
        }, { threshold: 0.2 });

        skillItems.forEach(item => skillObserver.observe(item));
    };

    // Initialize all modules
    initDarkMode();
    initNavbar();
    initScrollAnimations();
    initPointerAnimations();
    initUniverse();
    initShootingStars();
    initParticleTrail();
    initSkillsAnimation();
});
