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
        });
    }

    // ===================================
    // アニメーション - スクロールトリガー機能
    // ===================================
    
    // Intersection Observer を使用してスクロールアニメーションを実装
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in-view');
                // 一度アニメーションが実行されたら監視を停止
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // スクロールアニメーションを適用する要素を監視
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        // 要素を初期状態で非表示にする
        element.classList.add('animate-not-in-view');
        animationObserver.observe(element);
    });

    // ===================================
    // アニメーション - ページ読み込み時の初期アニメーション
    // ===================================
    
    // ページ読み込み完了後に初期アニメーションを開始
    window.addEventListener('load', function() {
        // モーション設定を確認
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!prefersReducedMotion) {
            // ヒーローセクションのアニメーション
            const heroTitle = document.querySelector('.hero__title');
            const heroSubtitle = document.querySelector('.hero__subtitle');
            const heroButtons = document.querySelectorAll('.hero__btn');
            
            // タイトルはタイピングエフェクトが適用されるのでそのままにする
            if (heroSubtitle) {
                setTimeout(() => {
                    heroSubtitle.classList.add('animate-fade-in');
                }, 500);
            }
            heroButtons.forEach((btn, index) => {
                setTimeout(() => {
                    btn.classList.add('animate-scale-in');
                }, 1500 + (index * 200));
            });
            
            // ページタイトル要素にフェードインを適用
            const pageTitle = document.querySelector('.about__title, .services__title, .portfolio__title, .contact__title');
            if (pageTitle) {
                setTimeout(() => {
                    pageTitle.classList.add('animate-fade-in');
                }, 300);
            }
        }
    });
    
    // ===================================
    // アニメーション - ホバーエフェクト
    // ===================================
      // ポートフォリオアイテムにホバーアニメーションを追加
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.classList.add('animate-hover-lift');
    });

    // ボタンにホバーアニメーションを追加
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.classList.add('animate-hover-scale');
    });

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

    // ===================================
    // アニメーション - ステガードアニメーション
    // ===================================
    
    function initStaggeredAnimations() {
        const staggerContainers = document.querySelectorAll('.animate-stagger');
        
        staggerContainers.forEach(container => {
            // 子要素を初期状態で非表示にする
            const children = container.children;
            for (let i = 0; i < children.length; i++) {
                children[i].classList.add('animate-stagger-item-hidden');
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-stagger-active');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            observer.observe(container);
        });    }
    
    // ===================================
    // GPU最適化 - will-changeプロパティの管理
    // ===================================
    
    function optimizeGPUMemory() {
        // アニメーション完了後にwill-changeをリセットしてメモリを解放
        const animatedElements = document.querySelectorAll('[class*="animate-"]');
        
        animatedElements.forEach(element => {
            element.addEventListener('animationend', function() {
                // アニメーション完了後にwill-changeをautoに設定してGPUメモリを解放
                this.style.willChange = 'auto';
            });
            
            element.addEventListener('transitionend', function() {
                // トランジション完了後にwill-changeをautoに設定
                this.style.willChange = 'auto';
            });
        });
        
        // ホバーエフェクト用の最適化
        const hoverElements = document.querySelectorAll('.animate-hover-scale, .animate-hover-lift');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.willChange = 'transform';
            });
            
            element.addEventListener('mouseleave', function() {
                // ホバー終了後少し遅延してwill-changeをリセット
                setTimeout(() => {
                    this.style.willChange = 'auto';
                }, 300);
            });
        });
    }
    
    // ===================================
    // パフォーマンス監視とアニメーション最適化
    // ===================================
    
    function initPerformanceOptimization() {
        // FPS監視（開発用）
        let frameCount = 0;
        let lastTime = performance.now();
        
        function measureFPS() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // 低FPS検出時にアニメーションを簡素化
                if (fps < 30) {
                    console.warn('Low FPS detected, simplifying animations');
                    document.documentElement.classList.add('low-performance');
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        }
        
        // デバッグモードでのみFPS監視を有効化
        if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
            measureFPS();
        }
        
        // IntersectionObserverのパフォーマンス最適化
        const observerConfig = {
            threshold: [0, 0.1, 0.5, 1],
            rootMargin: '50px 0px -100px 0px'
        };
        
        // 画面外の要素のアニメーションを一時停止
        const performanceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                
                if (entry.intersectionRatio === 0) {
                    // 画面外の場合、アニメーションを一時停止
                    element.style.animationPlayState = 'paused';
                } else if (entry.intersectionRatio > 0.1) {
                    // 画面内の場合、アニメーションを再開
                    element.style.animationPlayState = 'running';
                }
            });
        }, observerConfig);
        
        // アニメーション要素を監視対象に追加
        const animatedElements = document.querySelectorAll('[class*="animate-"]');
        animatedElements.forEach(element => {
            performanceObserver.observe(element);
        });
    }
    
    // ===================================
    // レスポンシブ画像の遅延読み込み最適化
    // ===================================
    
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // 画像読み込み前にスケルトンアニメーションを表示
                        img.style.backgroundColor = '#f0f0f0';
                        img.style.backgroundImage = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
                        img.style.backgroundSize = '200% 100%';
                        img.style.animation = 'loading-skeleton 1.5s infinite';
                        
                        // 実際の画像を読み込み
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.onload = () => {
                                img.style.animation = '';
                                img.style.backgroundImage = '';
                            };
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            // data-src属性を持つ画像要素を遅延読み込み対象に
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }    // 初期化関数を呼び出し
    initTypingEffect();
    initStaggeredAnimations();
    optimizeGPUMemory();
    initPerformanceOptimization();
    initLazyLoading();
    initPerformanceOptimization();
    initLazyLoading();
});
