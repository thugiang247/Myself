// journey.js — Scroll-triggered reveal for milestones

document.addEventListener('DOMContentLoaded', () => {
    const milestones = document.querySelectorAll('.milestone');

    if (!milestones.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger each milestone slightly
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    milestones.forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.08}s`;
        observer.observe(el);
    });

    // Also animate capsule items
    const capsuleItems = document.querySelectorAll('.capsule-item');
    const capsuleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                capsuleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    capsuleItems.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
        capsuleObserver.observe(item);
    });
});
