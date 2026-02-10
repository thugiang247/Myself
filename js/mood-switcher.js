document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Widget HTML
    const widget = document.createElement('div');
    widget.className = 'mood-widget';
    widget.innerHTML = `
        <div class="mood-options">
            <div class="mood-option" data-mood="chill">
                <i class="fas fa-coffee"></i>
                <span class="mood-label">Chill</span>
            </div>
            <div class="mood-option" data-mood="energy">
                <i class="fas fa-bolt"></i>
                <span class="mood-label">Energy</span>
            </div>
            <div class="mood-option" data-mood="deep">
                <i class="fas fa-feather-alt"></i>
                <span class="mood-label">Deep</span>
            </div>
        </div>
        <div class="mood-toggle" id="moodToggle">
            <i class="fas fa-adjust"></i>
        </div>
    `;
    document.body.appendChild(widget);

    // 2. Elements
    const toggleBtn = document.getElementById('moodToggle');
    const optionsContainer = widget.querySelector('.mood-options');
    const options = widget.querySelectorAll('.mood-option');

    // 3. Load Saved Mood
    const currentMood = localStorage.getItem('userMood') || 'chill';
    setMood(currentMood);

    // 4. Toggle Menu
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        widget.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!widget.contains(e.target)) {
            widget.classList.remove('active');
        }
    });

    // 5. Select Mood
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            const selectedMood = opt.getAttribute('data-mood');
            setMood(selectedMood);
        });
    });

    function setMood(mood) {
        // Reset Logic
        document.body.classList.remove('theme-energy', 'theme-deep');
        options.forEach(o => o.classList.remove('active'));

        // Activate Logic
        if (mood === 'energy') {
            document.body.classList.add('theme-energy');
        } else if (mood === 'deep') {
            document.body.classList.add('theme-deep');
        }
        // 'chill' is default (no class)

        // UI Update
        const activeOption = widget.querySelector(`.mood-option[data-mood="${mood}"]`);
        if (activeOption) activeOption.classList.add('active');

        // Save
        localStorage.setItem('userMood', mood);
    }
});
