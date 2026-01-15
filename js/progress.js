// ========== SMOOTH LERP UTILITY ==========
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// ========== PROGRESS BAR ==========
const progressBar = document.getElementById('progressBar');
let currentProgress = 0;
let targetProgress = 0;

function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    targetProgress = (scrollTop / docHeight) * 100;
}

function animateProgressBar() {
    currentProgress = lerp(currentProgress, targetProgress, 0.1);
    progressBar.style.width = currentProgress + '%';
    requestAnimationFrame(animateProgressBar);
}

window.addEventListener('scroll', updateProgressBar);
updateProgressBar();
animateProgressBar();