// Scroll reveal animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section-content').forEach(section => {
    observer.observe(section);
});

// Staggered animation for interest blocks
const blockObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.interest-block').forEach((block, index) => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(50px)';
    block.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    blockObserver.observe(block);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ========== PARALLAX FLOATING SHAPES ==========
const shapes = document.querySelectorAll('.floating-shape');

// Store current and target values for each shape
const shapeStates = [];
shapes.forEach(shape => {
    shapeStates.push({
        element: shape,
        speed: parseFloat(shape.dataset.speed) || 0.03,
        currentY: 0,
        targetY: 0,
        currentRotation: 0,
        targetRotation: 0
    });
});

function updateParallaxTargets() {
    const scrollY = window.scrollY;
    shapeStates.forEach(state => {
        state.targetY = scrollY * state.speed * 100;
        state.targetRotation = scrollY * state.speed * 20;
    });
}

function animateParallax() {
    shapeStates.forEach(state => {
        state.currentY = lerp(state.currentY, state.targetY, 0.05);
        state.currentRotation = lerp(state.currentRotation, state.targetRotation, 0.05);
        state.element.style.transform = `translateY(${state.currentY}px) rotate(${state.currentRotation}deg)`;
    });
    requestAnimationFrame(animateParallax);
}

window.addEventListener('scroll', updateParallaxTargets);
updateParallaxTargets();
animateParallax();

// ========== 3D TILT EFFECT FOR CARDS ==========
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let isHovering = false;
    let animationId = null;

    function animateTilt() {
        currentRotateX = lerp(currentRotateX, targetRotateX, 0.1);
        currentRotateY = lerp(currentRotateY, targetRotateY, 0.1);

        const translateY = isHovering ? -5 : 0;
        card.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translateY(${translateY}px)`;

        // Continue animation if not at rest
        if (Math.abs(currentRotateX - targetRotateX) > 0.01 || Math.abs(currentRotateY - targetRotateY) > 0.01) {
            animationId = requestAnimationFrame(animateTilt);
        } else if (!isHovering) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            animationId = null;
        }
    }

    card.addEventListener('mousemove', (e) => {
        isHovering = true;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetRotateX = (y - centerY) / 25;
        targetRotateY = (centerX - x) / 25;

        // Update shine position smoothly
        const shine = card.querySelector('.tilt-shine');
        if (shine) {
            const shineX = (x / rect.width) * 100;
            const shineY = (y / rect.height) * 100;
            shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 50%)`;
            shine.style.opacity = '1';
        }

        if (!animationId) {
            animateTilt();
        }
    });

    card.addEventListener('mouseleave', () => {
        isHovering = false;
        targetRotateX = 0;
        targetRotateY = 0;

        const shine = card.querySelector('.tilt-shine');
        if (shine) {
            shine.style.opacity = '0';
        }

        if (!animationId) {
            animateTilt();
        }
    });
});

// ========== HERO PARALLAX ON MOUSE MOVE ==========
const hero = document.getElementById('hero');
const heroContent = hero.querySelector('.section-content');

let heroCurrentX = 0;
let heroCurrentY = 0;
let heroTargetX = 0;
let heroTargetY = 0;

function animateHeroParallax() {
    heroCurrentX = lerp(heroCurrentX, heroTargetX, 0.08);
    heroCurrentY = lerp(heroCurrentY, heroTargetY, 0.08);
    heroContent.style.transform = `translateX(${heroCurrentX}px) translateY(${heroCurrentY}px)`;
    requestAnimationFrame(animateHeroParallax);
}

hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    heroTargetX = (e.clientX - rect.left - rect.width / 2) / 50;
    heroTargetY = (e.clientY - rect.top - rect.height / 2) / 50;
});

hero.addEventListener('mouseleave', () => {
    heroTargetX = 0;
    heroTargetY = 0;
});

animateHeroParallax();