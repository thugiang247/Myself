document.addEventListener('DOMContentLoaded', () => {
    // Heartbeat effect for elements with .heartbeat class
    const addHeartbeat = () => {
        const stats = document.querySelectorAll('.stat-card, .hero-badge');
        stats.forEach(stat => {
            stat.classList.add('heartbeat-anim');
        });
    };

    // CSS for heartbeat animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartbeat {
            0% { transform: scale(1); }
            14% { transform: scale(1.05); }
            28% { transform: scale(1); }
            42% { transform: scale(1.05); }
            70% { transform: scale(1); }
        }
        .heartbeat-anim {
            animation: heartbeat 1.5s infinite;
        }
    `;
    document.head.appendChild(style);

    addHeartbeat();
});
