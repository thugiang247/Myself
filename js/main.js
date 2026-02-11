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

        // --- Staggered item fade-in (Refined) ---
        const animatedItems = document.querySelectorAll('.interest-block, .skill-tag, .bio-card');
        const itemObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('reveal-active');
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        animatedItems.forEach(item => {
            item.classList.add('reveal-hidden');
            itemObserver.observe(item);
        });
    };

    // ========== INTERACTIVE TECHNICAL GRID ==========
    const initTechnicalGrid = () => {
        const root = document.documentElement;
        // Optimization: Disable mouse glow and coordinate tracking on mobile/tablets
        if (window.matchMedia("(min-width: 1025px)").matches) {
            window.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                root.style.setProperty('--mouse-x', `${x}%`);
                root.style.setProperty('--mouse-y', `${y}%`);
            });
        }

        // Dynamic coordinate marking (subtle breakthrough)
        const grid = document.querySelector('.technical-grid');
        if (grid) {
            for (let i = 0; i < 5; i++) {
                const marker = document.createElement('div');
                marker.className = 'grid-marker';
                marker.style.top = Math.random() * 100 + '%';
                marker.style.left = Math.random() * 100 + '%';
                marker.innerHTML = `<span>LAT_${(Math.random() * 90).toFixed(2)}</span><span>LON_${(Math.random() * 180).toFixed(2)}</span>`;
                grid.appendChild(marker);
            }
        }
    };

    // ========== INTERACTIVE PARALLAX ==========
    const initPointerAnimations = () => {
        const hero = document.getElementById('hero');
        const heroContent = hero?.querySelector('.section-content');
        if (!heroContent || !window.matchMedia("(min-width: 769px)").matches) return;

        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        const friction = 0.05;

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        const animateParallax = () => {
            currentX += (mouseX - currentX) * friction;
            currentY += (mouseY - currentY) * friction;
            heroContent.style.transform = `translateX(${-currentX * 15}px) translateY(${-currentY * 15}px) rotateX(${-currentY * 2}deg) rotateY(${currentX * 2}deg)`;
            requestAnimationFrame(animateParallax);
        };
        animateParallax();
    };


    // ========== SYSTEM DIAGNOSTICS PRELOADER ==========
    const initPreloader = () => {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        const diagnostics = preloader.querySelector('.loader-diagnostics');
        const percentage = preloader.querySelector('.loader-percentage');

        const logs = [
            'Initializing core engine...',
            'Loading technical grid system...',
            'Syncing obsidian & champagne palette...',
            'Calibrating precision markers...',
            'Establishing archive connection...',
            'Finalizing aesthetic assets...',
            'System operational.'
        ];

        // Simplified Preloader: Just the percentage
        let count = 0;
        const isMobile = window.matchMedia("(max-width: 1024px)").matches;
        const incrementSpeed = isMobile ? 10 : 20; // Super fast

        const countInterval = setInterval(() => {
            count += Math.floor(Math.random() * 15) + 5;
            if (count >= 100) {
                count = 100;
                clearInterval(countInterval);

                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    preloader.style.transition = 'opacity 0.4s ease';
                    document.body.style.overflow = 'auto';
                }, 150);
            }
            if (percentage) percentage.textContent = `${count}%`;
        }, incrementSpeed);

        document.body.style.overflow = 'hidden';
    };

    // ========== PARTICLE CURSOR TRAIL ==========
    const initParticleTrail = () => {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        // Optimization: Disable particle trail on small screens / mobile to save GPU
        if (window.matchMedia("(max-width: 1024px)").matches) {
            canvas.style.display = 'none';
            return;
        }

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const maxParticles = 50;

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.life = 100;
                this.color = `rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1})`;
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
    initTechnicalGrid();
    initPointerAnimations();
    initParticleTrail();
    initSkillsAnimation();
});
