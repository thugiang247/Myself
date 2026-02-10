document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('personaToggle');
    const body = document.body;

    // Define the "Crazy" content mapping
    const crazyContent = {
        // Nav
        'logo': "Minh",
        'nav-home': "Nhà",
        'nav-about': "Tui là ai?",
        'nav-skills': "Chiêu thức",
        'nav-hobby': "Chơi bời",
        'nav-contact': "Gọi tui đi",

        // Hero
        'hero-name': "Minh 'Tôm' (2004)",
        'hero-desc': "Sáng làm cơ khí, tối code dạo, đêm nằm thẳng",

        // About
        'bio-intro': "Minh, 20 tuổi, hệ điều hành thiếu nhi.",
        'bio-1': '<i class="fas fa-graduation-cap"></i> Tốt nghiệp trường đời, chuyên ngành... đi ngủ.',
        'bio-2': '<i class="fas fa-tools"></i> Sở trường: Biến lợn lành thành lợn què.',
        'bio-3': '<i class="fas fa-seedling"></i> Châm ngôn: Việc hôm nay chớ để ngày mai (để tuần sau).',

        // Skills
        'skill-tech': "Phép thuật Winx",
        'tag-mech': "Vặn ốc dạo",
        'sub-mech': "Vặn đâu hỏng đó",
        'tag-elec': "Nối dây điện",
        'sub-elec': "Giật tê người",
        'tag-code': "Phù thủy Code",
        'sub-code': "Code toàn bug",

        'skill-mind': "Tư duy đỉnh cao",
        'tag-self': "Google Master",
        'sub-self': "Copy Paste",
        'tag-solve': "Đổ tại máy",
        'sub-solve': "Fix bằng cách restart",
        'tag-detail': "Soi mói",
        'sub-detail': "Thánh bắt bẻ",

        // === SUBPAGES NAV ===
        'nav-home-sub': "Về Chuồng",
        'nav-music': "Động Nhạc",
        'nav-books': "Bí Kíp",
        'nav-stats': "Thành Tích Ảo",
        'nav-gallery': "Ảnh Dìm Hàng",
        'nav-blog': "Chém Gió",

        // === BOOKS PAGE ===
        'books-hero-title': "Tàng Kinh Các",
        'books-hero-sub': "Đọc nhiều để cãi cho thắng (hoặc không bị lừa)",
        'books-mind-lid': "Hộp Pandora",
        'books-mind-sub': "Cẩn thận coi chừng 'ngộ chữ'",
        'books-btn-random': "Xin một quẻ",

        // === MUSIC PAGE ===
        'music-hero-title': "Vũ Trường Tại Gia",
        'music-hero-sub': "Hát hay không bằng hay hát (dù hàng xóm dọa báo công an)",

        // === WRITING PAGE ===
        'writing-hero-title': "Nhật Ký Tuổi Teen",
        'writing-hero-sub': "Viết để sau này đọc lại tự thấy xấu hổ",

        // === SPORTS PAGE ===
        'sports-hero-title': "Hành Xác Ký",
        'sports-hero-sub': "Chạy vì đam mê... ăn uống không lo béo"
    };

    // Store original content
    const originalContent = {};
    const elements = document.querySelectorAll('[data-crazy]');

    elements.forEach(el => {
        const key = el.getAttribute('data-crazy');
        // Store HTML to preserve icons
        originalContent[key] = el.innerHTML;
    });

    // Check localStorage
    if (localStorage.getItem('persona') === 'crazy') {
        toggle.checked = true;
        enableCrazyMode();
    }

    // Toggle Event
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            enableCrazyMode();
            localStorage.setItem('persona', 'crazy');
        } else {
            disableCrazyMode();
            localStorage.setItem('persona', 'serious');
        }
    });

    function enableCrazyMode() {
        body.classList.add('mode-crazy');

        elements.forEach(el => {
            const key = el.getAttribute('data-crazy');
            if (crazyContent[key]) {
                // Determine if we should use innerHTML (for icons) or textContent
                // Specifically for list items with icons, use innerHTML
                el.innerHTML = crazyContent[key];
            }
        });

        // Trigger generic typing effect or animation
        document.documentElement.style.setProperty('--font-body', '"Patrick Hand", cursive');
        document.documentElement.style.setProperty('--font-heading', '"Patrick Hand", cursive');
    }

    function disableCrazyMode() {
        body.classList.remove('mode-crazy');

        elements.forEach(el => {
            const key = el.getAttribute('data-crazy');
            if (originalContent[key]) {
                el.innerHTML = originalContent[key];
            }
        });

        // Reset Fonts
        document.documentElement.style.setProperty('--font-body', '"Inter", sans-serif');
        document.documentElement.style.setProperty('--font-heading', '"Cormorant Garamond", serif');
    }
});
