document.addEventListener('DOMContentLoaded', () => {

    // Counter Animation for Stats
    const stats = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                let start = 0;

                const step = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const progress = timestamp - startTime;
                    const percentage = Math.min(progress / duration, 1);

                    // Ease out quart
                    const ease = 1 - Math.pow(1 - percentage, 4);

                    target.textContent = Math.floor(start + (finalValue - start) * ease);

                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    } else {
                        target.textContent = finalValue + (target.getAttribute('data-suffix') || '');
                    }
                };

                let startTime = null;
                window.requestAnimationFrame(step);
                observer.unobserve(target); // Only animate once
            }
        });
    };

    const observer = new IntersectionObserver(animateStats, observerOptions);
    stats.forEach(stat => observer.observe(stat));

    // Simple parallax for hero ring
    document.addEventListener('mousemove', (e) => {
        const ring = document.querySelector('.hero-ring');
        if (ring) {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;
            ring.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }
    });

});
