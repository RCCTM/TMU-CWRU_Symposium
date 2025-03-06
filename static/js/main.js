// 導航欄控制
document.addEventListener('DOMContentLoaded', function () {
    // 移動端菜單控制
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.site-header');

    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // 点击菜单项后关闭菜单
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });

        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function (e) {
            if (!header.contains(e.target) && mainNav.classList.contains('active')) {
                menuBtn.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    }

    // 滚动时隐藏/显示导航栏
    let lastScroll = 0;
    let scrollTimer;

    window.addEventListener('scroll', function () {
        clearTimeout(scrollTimer);

        scrollTimer = setTimeout(function () {
            const currentScroll = window.pageYOffset;

            if (currentScroll > lastScroll && currentScroll > 100) {
                // 向下滚动
                header.style.transform = 'translateY(-100%)';
                if (mainNav.classList.contains('active')) {
                    menuBtn.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            } else {
                // 向上滚动
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        }, 100);
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 幻燈片控制
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5秒切換一次

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // 自動播放
    setInterval(nextSlide, slideInterval);

    // 觸摸滑動支持
    let touchStartX = 0;
    let touchEndX = 0;

    const slider = document.querySelector('.slider-container');

    slider.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // 向左滑動
                nextSlide();
            } else {
                // 向右滑動
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                slides[currentSlide].classList.add('active');
            }
        }
    }
}

// 圖片延遲加載
document.addEventListener('DOMContentLoaded', function () {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// 表單驗證
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (isValid) {
            // 表單提交邏輯
            form.submit();
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', function () {
    initSlider();
    validateForm('contactForm');
});