/**
 * Gravity Leak Effect
 * Triggered when: Theme = Energy AND Persona = Crazy
 */

class GravityLeak {
    constructor() {
        this.elements = [];
        this.isActive = false;
        this.mouse = { x: 0, y: 0 };
        this.draggedElement = null;
        this.lastMouse = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };

        this.init();
    }

    init() {
        // Watch for changes in body classes
        const observer = new MutationObserver(() => this.checkState());
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        window.addEventListener('mousemove', (e) => {
            this.velocity.x = e.clientX - this.lastMouse.x;
            this.velocity.y = e.clientY - this.lastMouse.y;
            this.lastMouse.x = e.clientX;
            this.lastMouse.y = e.clientY;
        });

        this.checkState();
        this.animate();
    }

    checkState() {
        const isEnergy = document.body.classList.contains('theme-energy');
        const isCrazy = document.body.classList.contains('mode-crazy');

        if (isEnergy && isCrazy && !this.isActive) {
            this.start();
        } else if ((!isEnergy || !isCrazy) && this.isActive) {
            this.stop();
        }
    }

    start() {
        this.isActive = true;
        // Select elements to float
        const targets = document.querySelectorAll('.skill-tag, .book-card, .interest-block, .stat-item, .personal-portrait, .bio-card, .tea-card, .music-stats .stat-item');

        targets.forEach((el, index) => {
            // Store initial state
            el.style.transition = 'none';
            el.style.cursor = 'grab';

            const rect = el.getBoundingClientRect();
            this.elements.push({
                el: el,
                x: 0,
                y: 0,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                rotation: 0,
                vr: (Math.random() - 0.5) * 0.5,
                phase: Math.random() * Math.PI * 2,
                originalZIndex: el.style.zIndex
            });

            // Interaction
            el.addEventListener('mousedown', (e) => this.onMouseDown(e, index));
        });

        window.addEventListener('mouseup', () => this.onMouseUp());
    }

    stop() {
        this.isActive = false;
        this.elements.forEach(item => {
            item.el.style.transform = '';
            item.el.style.cursor = '';
            item.el.style.zIndex = item.originalZIndex;
        });
        this.elements = [];
    }

    onMouseDown(e, index) {
        if (!this.isActive) return;
        this.draggedElement = this.elements[index];
        this.draggedElement.el.style.cursor = 'grabbing';
        this.draggedElement.el.style.zIndex = '1000';
        e.preventDefault();
    }

    onMouseUp() {
        if (this.draggedElement) {
            this.draggedElement.el.style.cursor = 'grab';
            // Toss effect
            this.draggedElement.vx = this.velocity.x * 0.5;
            this.draggedElement.vy = this.velocity.y * 0.5;
            this.draggedElement = null;
        }
    }

    animate() {
        if (this.isActive) {
            this.elements.forEach(item => {
                if (item === this.draggedElement) {
                    // Update based on mouse speed
                    item.x += this.velocity.x;
                    item.y += this.velocity.y;
                } else {
                    // Floating logic
                    item.phase += 0.02;
                    const bobbing = Math.sin(item.phase) * 0.5;

                    item.x += item.vx;
                    item.y += item.vy + bobbing;
                    item.rotation += item.vr;

                    // Friction/Air resistance
                    item.vx *= 0.98;
                    item.vy *= 0.98;
                    item.vr *= 0.98;

                    // Add some base floating speed if too slow
                    if (Math.abs(item.vx) < 0.1) item.vx += (Math.random() - 0.5) * 0.1;
                    if (Math.abs(item.vy) < 0.1) item.vy += (Math.random() - 0.5) * 0.1;

                    // Bounds check (keep them somewhat close to home)
                    if (Math.abs(item.x) > 100) item.vx -= item.x * 0.001;
                    if (Math.abs(item.y) > 100) item.vy -= item.y * 0.001;
                }

                item.el.style.transform = `translate(${item.x}px, ${item.y}px) rotate(${item.rotation}deg)`;
            });
        }
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.gravityLeak = new GravityLeak();
});
