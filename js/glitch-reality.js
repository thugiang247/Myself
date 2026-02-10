/**
 * Glitch Reality (The Third Persona)
 * Only active in Mode: Crazy
 */

class GlitchReality {
    constructor() {
        this.messages = [
            "HỆ THỐNG LỖI",
            "AI ĐANG XEM?",
            "XÓA NGAY",
            "ĐỪNG TIN HẮN",
            "THOÁT RA ĐI",
            "I SEE YOU",
            "CHƯA ĐỦ ĐÂU",
            "01010110"
        ];
        this.isActive = false;
        this.overlay = null;
        this.lastTriggerTime = 0;
        this.mouseSpeed = 0;
        this.lastMousePos = { x: 0, y: 0 };

        this.init();
    }

    init() {
        // Create overlay element
        this.overlay = document.createElement('div');
        this.overlay.className = 'glitch-overlay';
        this.overlay.innerHTML = `
            <div class="glitch-text"></div>
            <div class="glitch-subtext">THIRD PERSONA DETECTED</div>
        `;
        document.body.appendChild(this.overlay);

        // Check persona state
        const observer = new MutationObserver(() => this.updateState());
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        // Initial check
        this.updateState();

        // Mouse speed monitoring
        window.addEventListener('mousemove', (e) => this.monitorMouseSpeed(e));

        // Random glitch interval
        this.scheduleNextGlitch();
    }

    updateState() {
        this.isActive = document.body.classList.contains('mode-crazy');
    }

    monitorMouseSpeed(e) {
        if (!this.isActive) return;

        const now = Date.now();
        const dt = now - this.lastTriggerTime;

        const dx = e.clientX - this.lastMousePos.x;
        const dy = e.clientY - this.lastMousePos.y;
        const speed = Math.sqrt(dx * dx + dy * dy);

        // If mouse moves extremely fast and hasn't glitched in 10s
        if (speed > 150 && dt > 10000) {
            this.triggerGlitch();
        }

        this.lastMousePos = { x: e.clientX, y: e.clientY };
    }

    scheduleNextGlitch() {
        if (!this.isActive) {
            setTimeout(() => this.scheduleNextGlitch(), 5000);
            return;
        }

        const wait = 20000 + Math.random() * 20000; // 20-40 seconds
        setTimeout(() => {
            this.triggerGlitch();
            this.scheduleNextGlitch();
        }, wait);
    }

    triggerGlitch() {
        if (!this.isActive || document.hidden) return;

        this.lastTriggerTime = Date.now();
        const msg = this.messages[Math.floor(Math.random() * this.messages.length)];
        this.overlay.querySelector('.glitch-text').textContent = msg;

        // Apply classes
        document.body.classList.add('glitch-active');
        this.overlay.classList.add('active');

        // Play subtle sound if you want, but sticking to visual for now

        const duration = 150 + Math.random() * 150; // 150-300ms

        setTimeout(() => {
            document.body.classList.remove('glitch-active');
            this.overlay.classList.remove('active');
        }, duration);
    }
}

// Start the glitch
document.addEventListener('DOMContentLoaded', () => {
    new GlitchReality();
});
