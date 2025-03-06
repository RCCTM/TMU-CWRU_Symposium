document.addEventListener('DOMContentLoaded', function () {
  
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.site-header');

    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });

        document.addEventListener('click', function (e) {
            if (!header.contains(e.target) && mainNav.classList.contains('active')) {
                menuBtn.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    }

    let lastScroll = 0;
    let scrollTimer;

    window.addEventListener('scroll', function () {
        clearTimeout(scrollTimer);

        scrollTimer = setTimeout(function () {
            const currentScroll = window.pageYOffset;

            if (currentScroll > lastScroll && currentScroll > 100) {
                
                header.style.transform = 'translateY(-100%)';
                if (mainNav.classList.contains('active')) {
                    menuBtn.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            } else {
              
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        }, 100);
    });


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


function initSlider() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; 

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    setInterval(nextSlide, slideInterval);

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

document.addEventListener('DOMContentLoaded', function () {
    initSlider();
    validateForm('contactForm');
});