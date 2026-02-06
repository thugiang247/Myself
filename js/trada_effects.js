/**
 * Trada Page Specific Interactivity
 * Floating plastic chairs & Sunflower seeds on click
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sunflower Seeds Click Effect
    document.addEventListener('click', (e) => {
        createSeeds(e.clientX, e.clientY);
    });

    function createSeeds(x, y) {
        const seedCount = 8;
        for (let i = 0; i < seedCount; i++) {
            const seed = document.createElement('div');
            seed.className = 'sunflower-seed';

            // Randomize seed look
            const size = Math.random() * 8 + 4;
            seed.style.width = `${size}px`;
            seed.style.height = `${size * 1.5}px`;

            // Initial position
            seed.style.left = `${x}px`;
            seed.style.top = `${y}px`;

            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 10 + 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            document.body.appendChild(seed);

            // Animate physics
            let posX = x;
            let posY = y;
            let velY = vy;
            let rotation = Math.random() * 360;

            const animateSeed = () => {
                posX += vx;
                velY += 0.5; // Gravity
                posY += velY;
                rotation += 10;

                seed.style.left = `${posX}px`;
                seed.style.top = `${posY}px`;
                seed.style.transform = `rotate(${rotation}deg)`;

                if (posY < window.innerHeight + 100) {
                    requestAnimationFrame(animateSeed);
                } else {
                    seed.remove();
                }
            };

            requestAnimationFrame(animateSeed);
        }
    }

    // 2. Floating Plastic Chairs (Background Decor)
    const chairIcons = ['https://cdn-icons-png.flaticon.com/512/2855/2855141.png', 'https://cdn-icons-png.flaticon.com/512/2855/2855137.png']; // Red and Blue chair icons if possible, or just use FontAwesome

    function createFloatingDecor() {
        const decor = document.createElement('div');
        decor.className = 'floating-chair';

        // Use FontAwesome icons instead for reliability
        const isChair = Math.random() > 0.3;
        decor.innerHTML = isChair ? '<i class="fas fa-chair"></i>' : '<i class="fas fa-mug-hot"></i>';

        const size = Math.random() * 30 + 20;
        decor.style.fontSize = `${size}px`;
        decor.style.color = Math.random() > 0.5 ? '#e74c3c' : '#3498db'; // Red or Blue
        decor.style.left = `${Math.random() * 100}vw`;
        decor.style.top = `${window.innerHeight + 100}px`;
        decor.style.opacity = Math.random() * 0.3 + 0.1;

        document.body.appendChild(decor);

        let posY = window.innerHeight + 100;
        const speed = Math.random() * 2 + 1;
        const drift = (Math.random() - 0.5) * 2;
        let posX = parseFloat(decor.style.left);

        const animateDecor = () => {
            posY -= speed;
            posX += drift;
            decor.style.top = `${posY}px`;
            decor.style.left = `${posX}px`;
            decor.style.transform = `rotate(${posY * 0.2}deg)`;

            if (posY > -100) {
                requestAnimationFrame(animateDecor);
            } else {
                decor.remove();
            }
        };

        requestAnimationFrame(animateDecor);
    }

    // Spawn decor periodically
    setInterval(createFloatingDecor, 3000);

    // 3. Steam Button Logic Idea 5
    const steamBtn = document.getElementById('steamBtn');
    if (steamBtn) {
        steamBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Don't trigger seeds from this click
            document.body.classList.add('steam-active');

            // Remove class after animation to allow re-triggering
            setTimeout(() => {
                document.body.classList.remove('steam-active');
            }, 3000);
        });
    }
});
