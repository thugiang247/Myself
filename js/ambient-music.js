/**
 * Ambient Music Controller
 * Handles cross-page music state and the persistent UI
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Create the Player UI and Audio Element
    const playerContainer = document.createElement('div');
    playerContainer.className = 'ambient-music-player';
    playerContainer.innerHTML = `
        <div class="music-toggle-btn" id="music-toggle">
            <i class="fas fa-play"></i>
        </div>
        <div class="music-bars" id="music-bars">
            <span></span><span></span><span></span><span></span>
        </div>
        <div class="music-info">Bật nhạc nền</div>
        <audio id="ambient-audio" loop>
            <!-- Source will be added later -->
        </audio>
    `;
    document.body.appendChild(playerContainer);

    const toggleBtn = document.getElementById('music-toggle');
    const playIcon = toggleBtn.querySelector('i');
    const musicBars = document.getElementById('music-bars');
    const musicInfo = playerContainer.querySelector('.music-info');
    const audio = document.getElementById('ambient-audio');

    // 2. State Management via localStorage
    let isPlaying = localStorage.getItem('ambient_playing') === 'true';
    let currentVolume = 0.5;

    // 3. Sync State on Load
    const syncState = () => {
        if (isPlaying) {
            playIcon.classList.replace('fa-play', 'fa-pause');
            musicBars.classList.add('playing');
            musicInfo.textContent = 'Ambient: ON';
            // Note: Auto-play is often blocked unless there's user interaction
            // We'll try to play, but it might fail until the first click
            audio.play().catch(() => {
                // If blocked, update UI to reflect pause
                isPlaying = false;
                updateUIState();
            });
        } else {
            updateUIState();
        }
    };

    const updateUIState = () => {
        if (isPlaying) {
            playIcon.classList.replace('fa-play', 'fa-pause');
            musicBars.classList.add('playing');
            musicInfo.textContent = 'Ambient: ON';
        } else {
            playIcon.classList.replace('fa-pause', 'fa-play');
            musicBars.classList.remove('playing');
            musicInfo.textContent = 'Ambient: OFF';
        }
    };

    // 4. Toggle Interaction
    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            audio.play();
            isPlaying = true;
        }
        localStorage.setItem('ambient_playing', isPlaying);
        updateUIState();
    });

    // 5. Persistence across page loads (Approximate)
    // Save current time before page unload
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('ambient_time', audio.currentTime);
    });

    // Restore time on load
    const savedTime = localStorage.getItem('ambient_time');
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    syncState();
});
