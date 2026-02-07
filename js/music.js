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

    // ========== SCROLL INDICATOR ==========
    const initScrollIndicator = () => {
        const indicator = document.querySelector('.scroll-indicator');
        if (!indicator) return;

        indicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#playlists');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

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

    // ========== MUSIC PLAYER ==========
    const initMusicPlayer = () => {
        const playBtn = document.querySelector('.play-btn');
        const vinylRecord = document.querySelector('.vinyl-record');
        const volumeSlider = document.querySelector('.volume-slider');
        const volumeValue = document.querySelector('.volume-value');
        const progressFill = document.querySelector('.progress-fill');
        const timeCurrent = document.querySelector('.time-current');

        let isPlaying = false;
        let progress = 0;
        let interval;

        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        };

        // Play/Pause button
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                isPlaying = !isPlaying;
                const icon = playBtn.querySelector('i');

                if (isPlaying) {
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                    vinylRecord?.classList.add('playing');

                    // Simulate progress
                    interval = setInterval(() => {
                        progress += 0.1;
                        if (progress > 100) progress = 0;
                        if (progressFill) progressFill.style.width = `${progress}%`;

                        // Fake time update (assuming 3:45 duration)
                        const totalSeconds = 225;
                        const currentSeconds = (progress / 100) * totalSeconds;
                        if (timeCurrent) timeCurrent.textContent = formatTime(currentSeconds);

                    }, 100);

                } else {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                    vinylRecord?.classList.remove('playing');
                    clearInterval(interval);
                }
            });
        }

        // Volume control
        if (volumeSlider && volumeValue) {
            volumeSlider.addEventListener('input', (e) => {
                volumeValue.textContent = e.target.value + '%';
            });
        }

        // Control buttons hover effects
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    };

    // ========== VISUALIZER ==========
    const initVisualizer = () => {
        const canvas = document.getElementById('visualizer');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = 200;

        const bars = 60;
        const barWidth = canvas.width / bars;
        let dataArray = new Array(bars).fill(0);

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Generate random heights for bars (simulated)
            for (let i = 0; i < bars; i++) {
                dataArray[i] = Math.random() * 100 + 20;

                const barHeight = dataArray[i];
                const x = i * barWidth;
                const y = canvas.height - barHeight;

                // Gradient for bars
                const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
                gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
                gradient.addColorStop(1, 'rgba(255, 215, 0, 0.2)');

                ctx.fillStyle = gradient;
                ctx.fillRect(x, y, barWidth - 2, barHeight);
            }

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = 200;
        });
    };

    // ========== PARTICLE BACKGROUND ==========
    const initParticles = () => {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particlesArray = [];
        const numberOfParticles = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = (Math.random() * 0.5) - 0.25;
                this.speedY = (Math.random() * 0.5) - 0.25;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animate);
        }

        init();
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particlesArray.length = 0;
            init();
        });
    };

    // ========== PLAYLIST CARDS ==========
    const initPlaylistCards = () => {
        document.querySelectorAll('.playlist-card').forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.zIndex = '10';
            });

            card.addEventListener('mouseleave', function () {
                this.style.zIndex = '1';
            });
        });
    };

    // ========== PLAYLIST INTERACTION ==========
    const initPlaylistInteraction = () => {
        const classicalCard = document.getElementById('card-classical');
        const vietnameseCard = document.getElementById('card-vietnamese');

        const classicalSection = document.getElementById('classical-elegance');
        const vietnameseSection = document.getElementById('vietnamese-mix');
        const body = document.body;

        const hideAllSections = () => {
            classicalSection.classList.add('hidden');
            vietnameseSection.classList.add('hidden');
            body.classList.remove('era-classical', 'era-nostalgia', 'era-reflection');
        };

        const toggleSection = (section, eraClass) => {
            const isHidden = section.classList.contains('hidden');
            hideAllSections();
            if (isHidden) {
                section.classList.remove('hidden');
                body.classList.add(eraClass);
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        if (classicalCard && classicalSection) {
            classicalCard.addEventListener('click', (e) => {
                const allCards = document.querySelectorAll('.playlist-card');
                allCards.forEach(c => {
                    if (c !== classicalCard) c.classList.remove('active');
                });
                classicalCard.classList.toggle('active');
                toggleSection(classicalSection, 'era-classical');
            });
        }

        if (vietnameseCard && vietnameseSection) {
            vietnameseCard.addEventListener('click', (e) => {
                const allCards = document.querySelectorAll('.playlist-card');
                allCards.forEach(c => {
                    if (c !== vietnameseCard) c.classList.remove('active');
                });
                vietnameseCard.classList.toggle('active');
                toggleSection(vietnameseSection, 'era-nostalgia');
            });
        }
    };

    // ========== TRACK ITEMS ==========
    const initTrackItems = () => {
        document.querySelectorAll('.track-play-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const icon = this.querySelector('i');
                const isPlaying = icon.classList.contains('fa-pause');

                // Reset all other buttons
                document.querySelectorAll('.track-play-btn i').forEach(i => {
                    i.classList.remove('fa-pause');
                    i.classList.add('fa-play');
                });

                if (!isPlaying) {
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                } else {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
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

        // Observe playlist cards
        document.querySelectorAll('.playlist-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `all 0.8s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // Observe track items
        document.querySelectorAll('.track-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });
    };

    // Initialize all modules
    initProgressBar();
    initSmoothScroll();
    initScrollIndicator();
    initMusicPlayer();
    initVisualizer();
    initParticles();
    initPlaylistInteraction();
    initTrackItems();
    initScrollAnimations();
});
