/**
 * Redone Technical Cursor Logic
 * Precision dot + Elastic ring + Magnetic snapping
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Create cursor elements
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    // Only activate on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
        document.body.classList.add('custom-cursor-active');
    } else {
        dot.style.display = 'none';
        ring.style.display = 'none';
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;

    // 2. Position tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // 3. Animation loop
    const animate = () => {
        // Dot follows with very high speed (almost instant)
        dotX += (mouseX - dotX) * 0.4;
        dotY += (mouseY - dotY) * 0.4;

        // Ring follows with more delay for elastic feel
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;

        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;

        requestAnimationFrame(animate);
    };
    animate();

    // 4. Interaction detection
    const interactiveElements = document.querySelectorAll('a, button, .interest-card, .playlist-card, .book-item, .metric-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hovering');
        });

        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hovering');
            // Remove magnetic if applied
            ring.classList.remove('cursor-magnetic');
        });

        // Optional: Simple Magnetic Snap
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            // Calculate distance from center of element
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // If very close to center, "snap" the ring slightly towards it
            const distanceX = mouseX - centerX;
            const distanceY = mouseY - centerY;

            // Apply a small pull towards center for the ring
            ringX -= distanceX * 0.1;
            ringY -= distanceY * 0.1;
        });
    });

    // 5. Click Feedback
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-clicking'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-clicking'));

    // 6. Window Visibility
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    });
});
