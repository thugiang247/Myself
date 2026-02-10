const mindBoxData = [
    {
        text: "Mọi sự khôn ngoan của con người được tổng hợp lại trong hai từ: Chờ đợi và Hy vọng.",
        book: "Bá tước Monte Cristo",
        author: "Alexandre Dumas",
        thought: "Kiên nhẫn là kỹ năng khó nhất tôi từng học, nhưng cũng là kỹ năng giá trị nhất. Đôi khi, không làm gì cả lại là hành động sáng suốt nhất."
    },
    {
        text: "Mỗi người đều có một đích đến, nhưng không phải ai cũng biết mình đang đi đâu.",
        book: "Nhà Giả Kim",
        author: "Paulo Coelho",
        thought: "Tôi từng lạc lối giữa Cơ khí và IT. Nhưng rồi tôi nhận ra, con đường nào cũng dẫn về 'Đại Lộ', miễn là mình dám bước đi."
    },
    {
        text: "Một người lính ngự lâm không bao giờ bỏ rơi bạn bè.",
        book: "Ba người lính ngự lâm",
        author: "Alexandre Dumas",
        thought: "Trong team work, kỹ năng còn có thể học, nhưng sự tin tưởng thì không thể dạy được."
    },
    {
        text: "Con người không được sinh ra để tan biến đi như một hạt cát vô danh. Họ sinh ra để in dấu lại trên mặt đất, in dấu lại trong trái tim người khác.",
        book: "Thép đã tôi thế đấy",
        author: "Nikolai Ostrovsky",
        thought: "Câu này luôn nhắc nhở tôi: Code không chỉ chạy được, nó phải giải quyết vấn đề thực sự cho ai đó."
    },
    {
        text: "Đừng bao giờ đánh giá thấp sức mạnh của những kẻ ngu ngốc với số lượng đông đảo.",
        book: "Chiến tranh giữa các vì sao",
        author: "George Lucas",
        thought: "Đôi khi, sai lầm phổ biến nhất trong debug là giả định rằng hệ thống hoạt động logic, trong khi lỗi nằm ở input ngớ ngẩn nhất."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const boxContainer = document.getElementById('mind-box-container');
    if (!boxContainer) return;

    // Create UI Structure
    boxContainer.innerHTML = `
        <div class="mind-box">
            <div class="box-lid">
                <div class="lid-icon"><i class="fas fa-brain"></i></div>
                <div class="lid-text" data-crazy="books-mind-lid">Hộp Tư Duy</div>
                <div class="lid-sub" data-crazy="books-mind-sub">Nhấn để mở</div>
            </div>
            <div class="box-content">
                <div class="quote-display"></div>
                <div class="quote-source-display"></div>
                <div class="my-thought"></div>
            </div>
            <div class="box-particles"></div>
        </div>
        <button id="openBoxBtn" class="mind-btn" data-crazy="books-btn-random">
            <i class="fas fa-random"></i> Rút một bài học
        </button>
    `;

    const mindBox = boxContainer.querySelector('.mind-box');
    const btn = document.getElementById('openBoxBtn');
    const quoteText = boxContainer.querySelector('.quote-display');
    const quoteSource = boxContainer.querySelector('.quote-source-display');
    const myThought = boxContainer.querySelector('.my-thought');

    let isOpened = false;

    btn.addEventListener('click', () => {
        if (isOpened) {
            // Reset box to closed state first
            mindBox.classList.remove('open');
            btn.innerHTML = '<i class="fas fa-random"></i> Rút một bài học';
            isOpened = false;

            // Wait for close animation then open new
            setTimeout(() => {
                showRandomQuote();
            }, 600);
        } else {
            showRandomQuote();
        }
    });

    function showRandomQuote() {
        // 1. Get Random Data
        const randomItem = mindBoxData[Math.floor(Math.random() * mindBoxData.length)];

        // 2. Update Content
        quoteText.textContent = `"${randomItem.text}"`;
        quoteSource.innerHTML = `<i class="fas fa-book"></i> ${randomItem.book} <span>— ${randomItem.author}</span>`;
        myThought.innerHTML = `<span class="thought-label">Suy ngẫm:</span> ${randomItem.thought}`;

        // 3. Animate Open
        mindBox.classList.add('open');
        btn.innerHTML = '<i class="fas fa-redo"></i> Rút bài khác';
        isOpened = true;

        // 4. Particle Effect
        createParticles();
    }

    function createParticles() {
        const particlesContainer = boxContainer.querySelector('.box-particles');
        particlesContainer.innerHTML = '';

        for (let i = 0; i < 20; i++) {
            const p = document.createElement('span');
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 0.5 + 's';
            particlesContainer.appendChild(p);
        }
    }
});
