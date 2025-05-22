document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.portfolio-filters button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to the clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const itemCategories = item.getAttribute('data-category');
                    if (filterValue === 'all' || (itemCategories && itemCategories.includes(filterValue))) {
                        item.style.display = ''; // Or 'block', 'flex', etc., depending on your layout
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // スムーズスクロール
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ハンバーガーメニューとフルスクリーンナビゲーション
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const fullscreenNav = document.querySelector('.fullscreen-nav'); // HTMLに追加する必要あり
    const navLinks = document.querySelectorAll('.fullscreen-nav ul li a');

    if (hamburgerMenu && fullscreenNav) {
        hamburgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            fullscreenNav.classList.toggle('active');
            // bodyにoverflow: hiddenをトグルして背景スクロールを防ぐ
            document.body.style.overflow = fullscreenNav.classList.contains('active') ? 'hidden' : '';
            // aria-expanded属性を更新
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // フルスクリーンナビのリンククリックでメニューを閉じる
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (fullscreenNav.classList.contains('active')) {
                    hamburgerMenu.classList.remove('active');
                    fullscreenNav.classList.remove('active');
                    document.body.style.overflow = '';
                    hamburgerMenu.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
});
