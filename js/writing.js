document.addEventListener('DOMContentLoaded', () => {
    // Typewriter effect for Hero Subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent.trim();
        subtitle.textContent = '';
        subtitle.style.opacity = '1';
        subtitle.style.borderRight = '2px solid var(--text-accent)';
        subtitle.style.display = 'inline-block';
        subtitle.style.whiteSpace = 'normal';

        let i = 0;
        function type() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            } else {
                subtitle.style.borderRight = 'none';
            }
        }

        // Start typing after a short delay
        setTimeout(type, 1000);
    }

    // Effect for the blog button
    const blogBtn = document.querySelector('.btn-blog');
    if (blogBtn) {
        blogBtn.addEventListener('mouseenter', () => {
            blogBtn.style.transform = 'translateY(-5px) scale(1.05)';
        });
        blogBtn.addEventListener('mouseleave', () => {
            blogBtn.style.transform = 'translateY(0) scale(1)';
        });
    }
});
