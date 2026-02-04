document.addEventListener('DOMContentLoaded', () => {
    // 1. Create the transition overlay element
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);

    // 2. Trigger the page-loaded class after a short delay
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 50);

    // 3. Intercept all internal links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        // Only target internal links (adjust if you have a specific pattern)
        const href = link.getAttribute('href');

        // Skip links that are empty, hash-only, or external
        if (!href || href.startsWith('#') || href.startsWith('http') || link.getAttribute('target') === '_blank') {
            return;
        }

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.href;

            // Activate transition
            overlay.classList.add('active');

            // Navigate after animation
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600); // Matches CSS transition duration
        });
    });

    // Handle browser back/forward buttons (optional but nice)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            overlay.classList.remove('active');
            document.body.classList.add('page-loaded');
        }
    });
});
