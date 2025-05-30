/**
 * LEXIA料金計算機 - Go WebAssembly統合
 * リアルタイム料金計算とユーザーインターフェース
 */

class LEXIAPriceCalculator {
    constructor() {
        this.wasmReady = false;
        this.currentCalculation = null;
        this.animationTimeout = null;
        
        // 料金計算機のDOM要素
        this.calculatorContainer = null;
        this.resultContainer = null;
        
        // バインドメソッド
        this.handleServiceChange = this.handleServiceChange.bind(this);
        this.handlePlanChange = this.handlePlanChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handlePageCountChange = this.handlePageCountChange.bind(this);
        
        this.init();
    }

    async init() {
        // WebAssemblyの読み込み
        await this.loadWebAssembly();
        
        // UI初期化
        this.createCalculatorUI();
        this.attachEventListeners();
        
        console.log('LEXIA料金計算機が初期化されました');
    }

    async loadWebAssembly() {
        return new Promise((resolve, reject) => {
            // WebAssemblyが準備完了を待機
            const wasmReadyHandler = () => {
                this.wasmReady = true;
                console.log('Go WebAssembly準備完了');
                resolve();
            };

            if (window.Go) {
                const go = new Go();
                WebAssembly.instantiateStreaming(fetch('calculator.wasm'), go.importObject)
                    .then((result) => {
                        go.run(result.instance);
                        // wasmReady イベントを待機
                        window.addEventListener('wasmReady', wasmReadyHandler);
                    })
                    .catch(reject);
            } else {
                // Go WebAssemblyサポートスクリプトが読み込まれていない場合
                const script = document.createElement('script');
                script.src = 'wasm_exec.js';
                script.onload = () => {
                    const go = new Go();
                    WebAssembly.instantiateStreaming(fetch('calculator.wasm'), go.importObject)
                        .then((result) => {
                            go.run(result.instance);
                            window.addEventListener('wasmReady', wasmReadyHandler);
                        })
                        .catch(reject);
                };
                document.head.appendChild(script);
            }
        });
    }

    createCalculatorUI() {
        // 料金比較タブに計算機を追加
        const pricingSection = document.querySelector('#pricing-comparison');
        if (!pricingSection) {
            console.error('料金比較セクションが見つかりません');
            return;
        }

        // 計算機コンテナを作成
        this.calculatorContainer = this.createCalculatorContainer();
        
        // 既存の料金表の後に挿入
        const pricingTable = pricingSection.querySelector('.pricing-table');
        if (pricingTable) {
            pricingTable.parentNode.insertBefore(this.calculatorContainer, pricingTable.nextSibling);
        } else {
            pricingSection.appendChild(this.calculatorContainer);
        }
    }

    createCalculatorContainer() {
        const container = document.createElement('div');
        container.className = 'price-calculator animate-on-scroll';
        container.innerHTML = `
            <div class="calculator-section">
                <div class="calculator-header">
                    <h4 class="calculator-title">
                        <span class="calculator-icon">🧮</span>
                        リアルタイム料金計算機
                    </h4>
                    <p class="calculator-subtitle">
                        あなたのプロジェクトに最適な料金を即座に計算します
                    </p>
                </div>

                <div class="calculator-form">
                    <div class="calculator-row">
                        <div class="form-group">
                            <label for="service-type" class="form-label">サービス種類</label>
                            <select id="service-type" class="form-select">
                                <option value="">サービスを選択してください</option>
                                <option value="website">WEBサイト制作</option>
                                <option value="webdesign">WEBデザイン</option>
                                <option value="logo">ロゴデザイン</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="plan-type" class="form-label">プラン</label>
                            <select id="plan-type" class="form-select" disabled>
                                <option value="">まずサービスを選択してください</option>
                            </select>
                        </div>
                    </div>

                    <div class="calculator-row">
                        <div class="form-group">
                            <label for="page-count" class="form-label">ページ数</label>
                            <div class="page-count-container">
                                <input type="range" id="page-count" class="form-range" 
                                       min="1" max="30" value="5">
                                <span class="page-count-value">5ページ</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">オプション機能</label>
                        <div class="options-grid">
                            <label class="option-item">
                                <input type="checkbox" value="cms" class="option-checkbox">
                                <span class="option-label">CMS導入</span>
                                <span class="option-price">+¥50,000</span>
                            </label>
                            <label class="option-item">
                                <input type="checkbox" value="seo_advanced" class="option-checkbox">
                                <span class="option-label">高度SEO対策</span>
                                <span class="option-price">+¥30,000</span>
                            </label>
                            <label class="option-item">
                                <input type="checkbox" value="analytics" class="option-checkbox">
                                <span class="option-label">アナリティクス設定</span>
                                <span class="option-price">+¥20,000</span>
                            </label>
                            <label class="option-item">
                                <input type="checkbox" value="ssl" class="option-checkbox">
                                <span class="option-label">SSL証明書</span>
                                <span class="option-price">+¥10,000</span>
                            </label>
                            <label class="option-item">
                                <input type="checkbox" value="multilingual" class="option-checkbox">
                                <span class="option-label">多言語対応</span>
                                <span class="option-price">+¥100,000</span>
                            </label>
                            <label class="option-item">
                                <input type="checkbox" value="ec_function" class="option-checkbox">
                                <span class="option-label">EC機能</span>
                                <span class="option-price">+¥150,000</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="calculator-result" id="calculator-result">
                    <div class="result-placeholder">
                        <span class="placeholder-icon">💡</span>
                        <p>サービスとプランを選択すると、料金が自動計算されます</p>
                    </div>
                </div>
            </div>
        `;
        
        return container;
    }

    attachEventListeners() {
        // サービス選択
        const serviceSelect = document.getElementById('service-type');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', this.handleServiceChange);
        }

        // プラン選択
        const planSelect = document.getElementById('plan-type');
        if (planSelect) {
            planSelect.addEventListener('change', this.handlePlanChange);
        }

        // ページ数スライダー
        const pageCountSlider = document.getElementById('page-count');
        if (pageCountSlider) {
            pageCountSlider.addEventListener('input', this.handlePageCountChange);
        }

        // オプションチェックボックス
        const optionCheckboxes = document.querySelectorAll('.option-checkbox');
        optionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', this.handleOptionChange);
        });
    }

    handleServiceChange(event) {
        const serviceType = event.target.value;
        const planSelect = document.getElementById('plan-type');
        
        if (!serviceType) {
            planSelect.disabled = true;
            planSelect.innerHTML = '<option value="">まずサービスを選択してください</option>';
            this.clearResult();
            return;
        }

        // プラン選択肢を更新
        planSelect.disabled = false;
        planSelect.innerHTML = `
            <option value="">プランを選択してください</option>
            <option value="light">ライトプラン</option>
            <option value="standard">スタンダードプラン（推奨）</option>
            <option value="premium">プレミアムプラン</option>
        `;

        this.calculatePrice();
    }

    handlePlanChange(event) {
        this.calculatePrice();
    }

    handlePageCountChange(event) {
        const pageCount = event.target.value;
        const valueDisplay = document.querySelector('.page-count-value');
        if (valueDisplay) {
            valueDisplay.textContent = `${pageCount}ページ`;
        }
        this.calculatePrice();
    }

    handleOptionChange(event) {
        this.calculatePrice();
    }

    async calculatePrice() {
        if (!this.wasmReady) {
            console.log('WebAssembly準備中...');
            return;
        }

        const serviceData = this.collectFormData();
        if (!serviceData.serviceType || !serviceData.plan) {
            this.clearResult();
            return;
        }

        try {
            // Go WebAssembly関数を呼び出し
            const result = window.calculatePrice(JSON.stringify(serviceData));
            
            if (result.error) {
                console.error('計算エラー:', result.error);
                return;
            }

            this.displayResult(result);
            
        } catch (error) {
            console.error('料金計算エラー:', error);
        }
    }

    collectFormData() {
        const serviceType = document.getElementById('service-type')?.value || '';
        const plan = document.getElementById('plan-type')?.value || '';
        const pageCount = parseInt(document.getElementById('page-count')?.value || '5');
        
        const options = [];
        const optionCheckboxes = document.querySelectorAll('.option-checkbox:checked');
        optionCheckboxes.forEach(checkbox => {
            options.push(checkbox.value);
        });

        return {
            serviceType,
            plan,
            pageCount,
            options
        };
    }

    displayResult(result) {
        const resultContainer = document.getElementById('calculator-result');
        if (!resultContainer) return;

        // アニメーション用のクラス追加
        resultContainer.classList.add('calculating');

        // 少し遅延してからリザルトを表示（スムーズなアニメーション）
        setTimeout(() => {
            resultContainer.innerHTML = `
                <div class="result-content animate-fade-in">
                    <div class="result-header">
                        <div class="total-price">
                            <span class="price-label">お見積もり総額</span>
                            <span class="price-value">¥${this.formatPrice(result.totalPrice)}</span>
                        </div>
                        ${result.savings > 0 ? `
                            <div class="savings-badge">
                                <span class="savings-text">¥${this.formatPrice(result.savings)} お得！</span>
                            </div>
                        ` : ''}
                    </div>

                    <div class="result-breakdown">
                        <h5 class="breakdown-title">料金内訳</h5>
                        <div class="breakdown-list">
                            ${result.breakdown.map(item => `
                                <div class="breakdown-item">
                                    <span class="breakdown-text">${item}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    ${result.recommendedPlan ? `
                        <div class="recommendation">
                            <span class="recommendation-icon">💡</span>
                            <span class="recommendation-text">${result.recommendedPlan}</span>
                        </div>
                    ` : ''}

                    <div class="result-actions">
                        <button class="btn btn--primary" onclick="priceCalculator.requestQuote()">
                            この内容で見積もり依頼
                        </button>
                        <button class="btn btn--secondary" onclick="priceCalculator.saveCalculation()">
                            計算結果を保存
                        </button>
                    </div>
                </div>
            `;
            
            resultContainer.classList.remove('calculating');
            
            // 制作期間も表示
            this.displayTimeline();
            
        }, 300);
    }

    async displayTimeline() {
        const serviceData = this.collectFormData();
        
        try {
            const timeline = window.getEstimatedTimeline(JSON.stringify(serviceData));
            
            const resultContainer = document.getElementById('calculator-result');
            const timelineElement = document.createElement('div');
            timelineElement.className = 'timeline-info animate-slide-in-up';
            timelineElement.innerHTML = `
                <div class="timeline-content">
                    <span class="timeline-icon">⏱️</span>
                    <span class="timeline-text">${timeline.description}</span>
                </div>
            `;
            
            resultContainer.appendChild(timelineElement);
            
        } catch (error) {
            console.error('制作期間計算エラー:', error);
        }
    }

    clearResult() {
        const resultContainer = document.getElementById('calculator-result');
        if (!resultContainer) return;

        resultContainer.innerHTML = `
            <div class="result-placeholder">
                <span class="placeholder-icon">💡</span>
                <p>サービスとプランを選択すると、料金が自動計算されます</p>
            </div>
        `;
    }

    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    requestQuote() {
        const calculation = this.collectFormData();
        
        // お問い合わせフォームにデータを事前入力してリダイレクト
        const params = new URLSearchParams({
            service: calculation.serviceType,
            plan: calculation.plan,
            pages: calculation.pageCount,
            options: calculation.options.join(','),
            from: 'calculator'
        });
        
        window.location.href = `contact.html?${params.toString()}`;
    }

    saveCalculation() {
        const calculation = this.collectFormData();
        const result = this.currentCalculation;
        
        const savedData = {
            ...calculation,
            ...result,
            timestamp: new Date().toISOString()
        };
        
        // ローカルストレージに保存
        localStorage.setItem('lexia_price_calculation', JSON.stringify(savedData));
        
        // 保存完了メッセージ
        this.showNotification('計算結果を保存しました', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('notification--show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('notification--show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// グローバルインスタンス
let priceCalculator;

// DOMContentLoaded後に初期化
document.addEventListener('DOMContentLoaded', () => {
    // タブ切り替えで料金比較が表示された時に初期化
    const pricingTab = document.getElementById('tab-pricing');
    if (pricingTab) {
        pricingTab.addEventListener('click', () => {
            setTimeout(() => {
                if (!priceCalculator) {
                    priceCalculator = new LEXIAPriceCalculator();
                }
            }, 100);
        });
    }
});

// Export for global access
window.LEXIAPriceCalculator = LEXIAPriceCalculator;
