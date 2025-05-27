document.addEventListener('DOMContentLoaded', function() {
    // ===================================
    // ポートフォリオフィルタリング機能
    // ===================================
    const filterButtons = document.querySelectorAll('.portfolio-filters__btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('portfolio-filters__btn--active'));
                
                // Add active class to the clicked button
                this.classList.add('portfolio-filters__btn--active');

                const filterValue = this.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const itemCategories = item.getAttribute('data-category');
                    
                    // CSSクラスによる表示制御に変更
                    if (filterValue === 'all' || (itemCategories && itemCategories.includes(filterValue))) {
                        item.classList.remove('portfolio-item--hidden');
                        item.classList.add('portfolio-item--visible');
                    } else {
                        item.classList.remove('portfolio-item--visible');
                        item.classList.add('portfolio-item--hidden');
                    }
                });
            });
        });
    }

    // ===================================
    // スムーズスクロール（prefers-reduced-motion対応）
    // ===================================
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
    });

    // ===================================
    // ハンバーガーメニューとフルスクリーンナビゲーション
    // ===================================
    const hamburgerMenu = document.querySelector('.hamburger');
    const fullscreenNav = document.querySelector('.fullscreen-nav');
    const navLinks = document.querySelectorAll('.fullscreen-nav__link');

    if (hamburgerMenu && fullscreenNav) {
        // メニューを開く/閉じる関数
        function toggleMenu(open = null) {
            const isCurrentlyOpen = fullscreenNav.classList.contains('fullscreen-nav--active');
            const shouldOpen = open !== null ? open : !isCurrentlyOpen;
            
            if (shouldOpen) {
                hamburgerMenu.classList.add('hamburger--active');
                fullscreenNav.classList.add('fullscreen-nav--active');
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
                hamburgerMenu.classList.remove('hamburger--active');
                fullscreenNav.classList.remove('fullscreen-nav--active');
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
            if (e.key === 'Escape' && fullscreenNav.classList.contains('fullscreen-nav--active')) {
                toggleMenu(false);
            }
        });

        // フルスクリーンナビのリンククリックでメニューを閉じる
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (fullscreenNav.classList.contains('fullscreen-nav--active')) {
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

    // ===================================
    // ライトボックス機能
    // ===================================
    const portfolioImages = document.querySelectorAll('.portfolio-item__image, .featured-project-item__image');
    
    if (portfolioImages.length > 0) {
        // ライトボックス要素を作成
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox__content">
                <button class="lightbox__close" aria-label="ライトボックスを閉じる">&times;</button>
                <img class="lightbox__image" src="" alt="">
                <div class="lightbox__caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        const lightboxImage = lightbox.querySelector('.lightbox__image');
        const lightboxCaption = lightbox.querySelector('.lightbox__caption');
        const lightboxClose = lightbox.querySelector('.lightbox__close');
        
        // 画像クリックでライトボックス表示
        portfolioImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                lightboxImage.src = this.src;
                lightboxImage.alt = this.alt;
                lightboxCaption.textContent = this.alt;
                lightbox.classList.add('lightbox--active');
                document.body.style.overflow = 'hidden';
                
                // フォーカスを閉じるボタンに移動
                lightboxClose.focus();
            });
        });
        
        // ライトボックスを閉じる機能
        function closeLightbox() {
            lightbox.classList.remove('lightbox--active');
            document.body.style.overflow = '';
        }
        
        lightboxClose.addEventListener('click', closeLightbox);
          // 背景クリックで閉じる
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Escキーで閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('lightbox--active')) {
                closeLightbox();
            }
        });    }

    // ===================================
    // アニメーション - タイピングエフェクト
    // ===================================
    
    function initTypingEffect() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.getAttribute('data-typing-speed')) || 80;
            
            element.textContent = '';
            element.style.borderRight = '2px solid var(--color-accent)';
            element.style.display = 'inline-block';
              let index = 0;
            const typeInterval = setInterval(() => {
                element.textContent += text[index];
                index++;
                
                if (index >= text.length) {
                    clearInterval(typeInterval);
                    // タイピング完了後、カーソルのブリンクを停止
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, speed);
        });
    }
      // 初期化関数を呼び出し
    initTypingEffect();
});
