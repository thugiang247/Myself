# Portfolio App Map

## Giới thiệu App
Đây là một ứng dụng portfolio cá nhân để giới thiệu bản thân, sử dụng HTML, CSS, và JavaScript. App bao gồm các phần: Hero, About, Interests, Footer, với các hiệu ứng animation như parallax, tilt effects, và smooth scrolling. Website được thiết kế responsive với mobile menu và dark mode support.

## Danh sách File JS

### js/animations.js
File này xử lý tất cả các animations chính của app.

**Các hàm và biến chính:**
- `observer` (IntersectionObserver): Quan sát các section để thêm class 'visible' khi scroll vào view.
- `blockObserver` (IntersectionObserver): Quan sát interest blocks để tạo staggered opacity animation.
- Event listener cho smooth scroll trên navigation links.
- `shapeStates` (array): Lưu trạng thái current/target cho các floating shapes.
- `updateParallaxTargets()`: Cập nhật target Y và rotation cho parallax dựa trên scroll.
- `animateParallax()`: Animation loop sử dụng requestAnimationFrame cho smooth parallax.
- `tiltCards` (NodeList): Các elements có data-tilt attribute.
- `animateTilt()` (hàm trong loop): Animation cho 3D tilt effect với lerp smoothing.
- `hero`, `heroContent`: Elements cho hero section.
- `animateHeroParallax()`: Animation loop cho mouse parallax trên hero.

**Notes:** Sử dụng lerp cho smooth transitions. Có thể tùy chỉnh speed thông qua data-speed attribute.

### js/main.js
Xử lý dark mode và navbar effects.

**Các hàm và biến chính:**
- Event listener cho dark mode detection sử dụng prefers-color-scheme.
- `navbar`: Element navbar.
- Event listener cho thêm class 'scrolled' khi scroll > 50px.

**Notes:** Dark mode tự động dựa trên system preference.

### js/navigation.js
Xử lý mobile menu toggle.

**Các hàm và biến chính:**
- `menuToggle`: Button toggle menu.
- `navLinks`: Container của nav links.
- Event listener cho toggle active class và icon.
- Event listeners trên nav links để close menu khi click.

**Notes:** Menu toggle giữa icon bars và times.

### js/progress.js
Xử lý progress bar và utility.

**Các hàm và biến chính:**
- `lerp(start, end, factor)`: Utility hàm cho linear interpolation.
- `progressBar`: Element progress bar.
- `currentProgress`, `targetProgress`: Biến cho smooth animation.
- `updateProgressBar()`: Tính target progress dựa trên scroll position.
- `animateProgressBar()`: Animation loop sử dụng lerp.

**Notes:** Progress bar hiển thị phần trăm scroll của page. Sử dụng lerp để smooth.

## Notes cho Developer
- **Customization:** Để thêm animations mới, sử dụng IntersectionObserver hoặc requestAnimationFrame loops.
- **Performance:** Các animations sử dụng transform và opacity để tối ưu GPU.
- **Responsive:** Kiểm tra animations trên mobile devices.
- **Dependencies:** Không có external JS dependencies ngoài vanilla JS.
- **Extending:** Thêm data attributes cho các effects mới như đã làm với data-speed và data-tilt.