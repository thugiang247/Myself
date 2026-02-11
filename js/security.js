/**
 * SECURITY PROTOCOLS - Precision Engineering Edition
 * This script implements baseline defensive measures for the portfolio.
 */

const initSecurityProtocols = () => {
    // 1. Disable Right-Click with Technical Feedback
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        console.warn('%c[SECURITY] System access restricted. Context menu disabled.', 'color: #d4af37; font-weight: bold; background: #111; padding: 5px;');
        showSecurityAlert("Access Denied: Context Menu Restricted");
    });

    // 2. Prevent Common DevTools Shortcuts
    document.addEventListener('keydown', (e) => {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (
            e.keyCode === 123 ||
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
            (e.ctrlKey && e.keyCode === 85)
        ) {
            e.preventDefault();
            console.warn('%c[SECURITY] Technical inspection blocked.', 'color: #f00; font-weight: bold;');
            showSecurityAlert("System Alert: Source Access Restricted");
        }
    });

    // 3. Security Alert UI (Technical Style)
    function showSecurityAlert(message) {
        const alert = document.createElement('div');
        alert.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: rgba(10, 10, 10, 0.95);
            border: 1px solid #d4af37;
            color: #d4af37;
            padding: 12px 24px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.75rem;
            z-index: 10001;
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
            text-transform: uppercase;
            letter-spacing: 2px;
        `;
        alert.innerHTML = `<i class="fas fa-shield-alt" style="margin-right: 10px;"></i> ${message}`;
        document.body.appendChild(alert);

        // Trigger animation
        requestAnimationFrame(() => {
            alert.style.transform = 'translateX(-50%) translateY(0)';
        });

        // Remove after delay
        setTimeout(() => {
            alert.style.transform = 'translateX(-50%) translateY(100px)';
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 500);
        }, 3000);
    }

    // 4. Force HTTPS (if not local)
    if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        window.location.href = window.location.href.replace('http:', 'https:');
    }

    // 5. Basic Clickjacking Protection (Client-side)
    if (window.self !== window.top) {
        window.top.location = window.self.location;
    }
};

// Auto-init only if DOM is already loaded or via event
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSecurityProtocols);
} else {
    initSecurityProtocols();
}
