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
    }    // スムーズスクロール（prefers-reduced-motion対応）
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // ユーザーのモーション設定を確認
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                targetElement.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    });    // ハンバーガーメニューとフルスクリーンナビゲーション
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const fullscreenNav = document.querySelector('.fullscreen-nav');
    const navLinks = document.querySelectorAll('.fullscreen-nav ul li a');

    if (hamburgerMenu && fullscreenNav) {
        // メニューを開く/閉じる関数
        function toggleMenu(open = null) {
            const isCurrentlyOpen = fullscreenNav.classList.contains('active');
            const shouldOpen = open !== null ? open : !isCurrentlyOpen;
            
            if (shouldOpen) {
                hamburgerMenu.classList.add('active');
                fullscreenNav.classList.add('active');
                fullscreenNav.setAttribute('aria-hidden', 'false');
                hamburgerMenu.setAttribute('aria-expanded', 'true');
                hamburgerMenu.setAttribute('aria-label', 'メニューを閉じる');
                document.body.style.overflow = 'hidden';
                
                // フォーカスを最初のナビリンクに移動
                const firstNavLink = fullscreenNav.querySelector('a');
                if (firstNavLink) {
                    firstNavLink.focus();
                }
            } else {
                hamburgerMenu.classList.remove('active');
                fullscreenNav.classList.remove('active');
                fullscreenNav.setAttribute('aria-hidden', 'true');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
                hamburgerMenu.setAttribute('aria-label', 'メニューを開く');
                document.body.style.overflow = '';
                
                // フォーカスをハンバーガーメニューに戻す
                hamburgerMenu.focus();
            }
        }

        hamburgerMenu.addEventListener('click', function() {
            toggleMenu();
        });

        // Escキーでメニューを閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && fullscreenNav.classList.contains('active')) {
                toggleMenu(false);
            }
        });

        // フルスクリーンナビのリンククリックでメニューを閉じる
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (fullscreenNav.classList.contains('active')) {
                    toggleMenu(false);
                }
            });
        });

        // フォーカストラップ（簡易版）
        fullscreenNav.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                const focusableElements = fullscreenNav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
});
