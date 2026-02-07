// MUST BE AT THE TOP AND GLOBAL
let ytPlayer;
let isYtAPIReady = false;
let currentPlaylistTracks = [];
let currentTrackIndex = -1;

console.log("YouTube Player Script Loaded");

// YouTube IFrame API calls this when ready
window.onYouTubeIframeAPIReady = function () {
    console.log("YouTube IFrame API Ready signal received");
    ytPlayer = new YT.Player('youtube-player-container', {
        height: '0',
        width: '0',
        videoId: '',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'origin': window.location.origin
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
};

function onPlayerReady(event) {
    isYtAPIReady = true;
    console.log("YouTube Player Object Created & Ready");
}

function onPlayerError(event) {
    console.error("YouTube Player Error:", event.data);
}

function onPlayerStateChange(event) {
    const playBtn = document.querySelector('.play-btn');
    const miniPlayPauseBtn = document.querySelector('.play-pause-btn');
    const vinylRecord = document.querySelector('.vinyl-record');
    const floatingPlayer = document.getElementById('floating-player');

    const mainIcon = playBtn?.querySelector('i');
    const miniIcon = miniPlayPauseBtn?.querySelector('i');

    console.log("YouTube State Change:", event.data);

    if (event.data == YT.PlayerState.PLAYING) {
        updateIcons(true);
        vinylRecord?.classList.add('playing');
        floatingPlayer?.classList.add('playing');
        floatingPlayer?.classList.add('visible');
        startProgressLoop();
    } else {
        updateIcons(false);
        vinylRecord?.classList.remove('playing');
        floatingPlayer?.classList.remove('playing');
        stopProgressLoop();
    }
}

function updateIcons(isPlaying) {
    const playBtn = document.querySelector('.play-btn');
    const miniPlayPauseBtn = document.querySelector('.play-pause-btn');
    const mainIcon = playBtn?.querySelector('i');
    const miniIcon = miniPlayPauseBtn?.querySelector('i');

    if (isPlaying) {
        if (mainIcon) { mainIcon.classList.remove('fa-play'); mainIcon.classList.add('fa-pause'); }
        if (miniIcon) { miniIcon.classList.remove('fa-play'); miniIcon.classList.add('fa-pause'); }
    } else {
        if (mainIcon) { mainIcon.classList.remove('fa-pause'); mainIcon.classList.add('fa-play'); }
        if (miniIcon) { miniIcon.classList.remove('fa-pause'); miniIcon.classList.add('fa-play'); }
    }
}

// Progress Loop
let progressInterval;
function startProgressLoop() {
    stopProgressLoop();
    progressInterval = setInterval(() => {
        if (ytPlayer && ytPlayer.getCurrentTime) {
            const current = ytPlayer.getCurrentTime();
            const total = ytPlayer.getDuration();
            const percent = (current / total) * 100;

            // Main Player UI
            const progressFill = document.querySelector('.progress-fill');
            const timeCurrent = document.querySelector('.time-current');
            const timeTotal = document.querySelector('.time-total');

            // Floating Player UI
            const miniProgressFill = document.querySelector('.mini-progress-fill');

            if (progressFill) progressFill.style.width = `${percent}%`;
            if (miniProgressFill) miniProgressFill.style.width = `${percent}%`;
            if (timeCurrent) timeCurrent.textContent = formatYtTime(current);
            if (timeTotal && total > 0) timeTotal.textContent = formatYtTime(total);
        }
    }, 1000);
}

function stopProgressLoop() {
    clearInterval(progressInterval);
}

function formatYtTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

const YouTubeAudio = {
    play: (videoId, title, artist, startSeconds = 0) => {
        console.log("Attempting to play Video ID:", videoId, "from", startSeconds, "s");
        if (!isYtAPIReady) {
            console.warn("YouTube API not ready yet!");
            return;
        }

        // Update All UI info
        const mainTitle = document.querySelector('.track-title');
        const mainArtist = document.querySelector('.track-artist');
        const miniTitle = document.querySelector('.mini-track-name');
        const miniArtist = document.querySelector('.mini-track-artist');

        if (mainTitle) mainTitle.textContent = title;
        if (mainArtist) mainArtist.textContent = artist;
        if (miniTitle) miniTitle.textContent = title;
        if (miniArtist) miniArtist.textContent = artist;

        ytPlayer.loadVideoById({
            videoId: videoId,
            startSeconds: parseInt(startSeconds) || 0
        });
        ytPlayer.playVideo();
    },
    toggle: () => {
        if (!isYtAPIReady) return;
        const state = ytPlayer.getPlayerState();
        if (state == YT.PlayerState.PLAYING) {
            ytPlayer.pauseVideo();
        } else {
            ytPlayer.playVideo();
        }
    },
    setVolume: (value) => {
        if (ytPlayer && ytPlayer.setVolume) {
            ytPlayer.setVolume(value);
            // Sync sliders
            const mainSlider = document.querySelector('.volume-slider');
            const miniSlider = document.querySelector('.mini-volume-slider');
            if (mainSlider) mainSlider.value = value;
            if (miniSlider) miniSlider.value = value;

            const volumeValue = document.querySelector('.volume-value');
            if (volumeValue) volumeValue.textContent = value + '%';
        }
    },
    seek: (percent) => {
        if (ytPlayer && ytPlayer.getDuration) {
            const time = (percent / 100) * ytPlayer.getDuration();
            ytPlayer.seekTo(time, true);
        }
    },
    next: () => {
        if (currentTrackIndex < currentPlaylistTracks.length - 1) {
            currentTrackIndex++;
            playTrackFromData(currentPlaylistTracks[currentTrackIndex]);
        }
    },
    prev: () => {
        if (currentTrackIndex > 0) {
            currentTrackIndex--;
            playTrackFromData(currentPlaylistTracks[currentTrackIndex]);
        }
    }
};

function playTrackFromData(trackElement) {
    const videoId = trackElement.getAttribute('data-video-id');
    const startSeconds = trackElement.getAttribute('data-start') || 0;
    const title = trackElement.querySelector('.track-name').textContent;
    const artist = trackElement.querySelector('.track-artist-name').textContent;

    // Highlight current track
    document.querySelectorAll('.track-item').forEach(item => item.classList.remove('playing-now'));
    trackElement.classList.add('playing-now');

    YouTubeAudio.play(videoId, title, artist, startSeconds);
}

document.addEventListener('DOMContentLoaded', () => {
    // Collect tracks globally
    document.addEventListener('click', (e) => {
        const trackItem = e.target.closest('.track-item[data-video-id]');
        if (trackItem) {
            // Update current context
            const parentList = trackItem.closest('.tracks-list');
            currentPlaylistTracks = Array.from(parentList.querySelectorAll('.track-item[data-video-id]'));
            currentTrackIndex = currentPlaylistTracks.indexOf(trackItem);

            playTrackFromData(trackItem);
        }

        // Controls Bridge
        if (e.target.closest('.play-btn') || e.target.closest('.play-pause-btn')) {
            YouTubeAudio.toggle();
        }

        if (e.target.closest('.next-btn') || e.target.closest('.next-track')) {
            YouTubeAudio.next();
        }

        if (e.target.closest('.prev-btn') || e.target.closest('.prev-track')) {
            YouTubeAudio.prev();
        }
    });

    // Volume Sliders Bridge
    const sliders = ['.volume-slider', '.mini-volume-slider'];
    sliders.forEach(selector => {
        const slider = document.querySelector(selector);
        if (slider) {
            slider.addEventListener('input', (e) => {
                YouTubeAudio.setVolume(e.target.value);
            });
        }
    });

    // Progress Bar Click Bridge
    const progressTracks = ['.progress-track', '.mini-progress-bar'];
    progressTracks.forEach(selector => {
        const track = document.querySelector(selector);
        if (track) {
            track.addEventListener('click', (e) => {
                const rect = track.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = (x / rect.width) * 100;
                YouTubeAudio.seek(percent);
            });
        }
    });
});
