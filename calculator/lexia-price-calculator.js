/**
 * LEXIA料金計算機 - 統合モジュール
 * Go WebAssembly + JavaScript + CSS統合版
 * リアルタイム料金計算とユーザーインターフェース
 */

// ========================================
// CSS スタイル定義（インライン）
// ========================================
const calculatorCSS = `
/* LEXIA料金計算機スタイル */
.price-calculator {
    margin: 2rem 0;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 12px;
    padding: 2rem;
    border: 2px solid #dee2e6;
    position: relative;
    overflow: hidden;
}

.price-calculator::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff6b00, #ff8c42);
}

.calculator-section {
    position: relative;
    z-index: 1;
}

.calculator-header {
    text-align: center;
    margin-bottom: 2rem;
}

.calculator-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    color: #ff6b00;
    margin-bottom: 0.5rem;
}

.calculator-icon {
    font-size: 1.5em;
    animation: pulse 2s infinite;
}

.calculator-subtitle {
    color: #6c757d;
    font-size: 1rem;
    margin: 0;
}

.calculator-form {
    background: #ffffff;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid #dee2e6;
}

.calculator-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-label {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.form-select {
    padding: 0.75rem;
    border: 2px solid #dee2e6;
    border-radius: 6px;
    background: #ffffff;
    font-size: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
}

.form-select:focus {
    outline: none;
    border-color: #ff6b00;
    box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
}

.form-select:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.6;
}

.page-count-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.form-range {
    flex: 1;
    height: 6px;
    background: #dee2e6;
    border-radius: 3px;
    outline: none;
    -webkit-appearance: none;
}

.form-range::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: #ff6b00;
    border-radius: 50%;
    cursor: pointer;
}

.page-count-value {
    font-weight: 600;
    color: #ff6b00;
    min-width: 80px;
}

.options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.option-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    border: 2px solid #dee2e6;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.option-item:hover {
    border-color: #ff6b00;
    background: rgba(255, 107, 0, 0.05);
}

.option-item.selected {
    border-color: #ff6b00;
    background: rgba(255, 107, 0, 0.1);
}

.option-checkbox {
    margin-right: 0.5rem;
}

.option-label {
    flex: 1;
    font-weight: 500;
}

.option-price {
    font-weight: 600;
    color: #ff6b00;
}

.calculator-result {
    transition: all 0.3s ease;
}

.calculating {
    opacity: 0.6;
    pointer-events: none;
}

.result-placeholder {
    text-align: center;
    padding: 2rem;
    color: #6c757d;
}

.placeholder-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 1rem;
}

.result-content {
    background: #ffffff;
    border-radius: 8px;
    padding: 1.5rem;
    border: 2px solid #28a745;
}

.result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.total-price {
    display: flex;
    flex-direction: column;
}

.price-label {
    font-size: 0.9rem;
    color: #6c757d;
    margin-bottom: 0.25rem;
}

.price-value {
    font-size: 2rem;
    font-weight: 700;
    color: #28a745;
}

.savings-badge {
    background: #ffc107;
    color: #212529;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
}

.breakdown-title {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #333;
}

.breakdown-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.breakdown-item {
    padding: 0.5rem;
    background: #f8f9fa;
    border-radius: 4px;
    border-left: 3px solid #ff6b00;
}

.recommendation {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: rgba(255, 107, 0, 0.1);
    border-radius: 6px;
    margin-bottom: 1.5rem;
}

.recommendation-icon {
    font-size: 1.2rem;
}

.result-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
}

.btn--primary {
    background: #ff6b00;
    color: white;
}

.btn--primary:hover {
    background: #e55a00;
    transform: translateY(-2px);
}

.btn--secondary {
    background: #6c757d;
    color: white;
}

.btn--secondary:hover {
    background: #5a6268;
    transform: translateY(-2px);
}

.timeline-info {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(40, 167, 69, 0.1);
    border-radius: 6px;
    border-left: 3px solid #28a745;
}

.timeline-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.timeline-icon {
    font-size: 1.2rem;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.notification--show {
    transform: translateX(0);
}

.notification--success {
    background: #28a745;
}

.notification--error {
    background: #dc3545;
}

.notification--info {
    background: #17a2b8;
}

.calculator-loading {
    text-align: center;
    padding: 2rem;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #ff6b00;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

.calculator-error {
    text-align: center;
    padding: 2rem;
    color: #dc3545;
}

.calculator-error h3 {
    color: #dc3545;
    margin-bottom: 1rem;
}

.calculator-error ul {
    text-align: left;
    max-width: 400px;
    margin: 1rem auto;
}

/* アニメーション */
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-in;
}

.animate-slide-in-up {
    animation: slideInUp 0.5s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideInUp {
    from { 
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
    .calculator-row {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .options-grid {
        grid-template-columns: 1fr;
    }
    
    .result-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .result-actions {
        flex-direction: column;
    }
    
    .price-calculator {
        padding: 1rem;
    }
}
`;

// ========================================
// Go WebAssembly 計算ロジック（JavaScript実装版）
// ========================================
class PriceCalculationEngine {
    constructor() {
        // 基本料金（サービス別・プラン別）
        this.webSiteRates = {
            'light': 150000,
            'standard': 250000,
            'premium': 400000,
        };
        
        this.webDesignRates = {
            'light': 80000,
            'standard': 150000,
            'premium': 250000,
        };
        
        this.logoDesignRates = {
            'light': 50000,
            'standard': 100000,
            'premium': 180000,
        };
        
        // オプション料金
        this.optionRates = {
            'cms': 50000,
            'seo_advanced': 30000,
            'analytics': 20000,
            'ssl': 10000,
            'multilingual': 100000,
            'ec_function': 150000,
        };
    }

    calculatePrice(serviceData) {
        try {
            const { serviceType, plan, pageCount, options } = serviceData;
            
            if (!serviceType || !plan) {
                return { error: 'サービスタイプとプランを選択してください' };
            }

            // 基本料金を取得
            let basePrice = this.getBasePrice(serviceType, plan);
            if (basePrice === 0) {
                return { error: '無効なサービスタイプまたはプランです' };
            }

            // ページ数による追加料金
            const pageMultiplier = this.getPageMultiplier(serviceType, pageCount);
            basePrice = Math.floor(basePrice * pageMultiplier);

            // オプション料金
            let optionPrice = 0;
            const selectedOptions = options || [];
            const breakdown = [`${this.getServiceDisplayName(serviceType)} ${this.getPlanDisplayName(plan)}: ¥${this.formatPrice(basePrice)}`];
            
            selectedOptions.forEach(option => {
                if (this.optionRates[option]) {
                    optionPrice += this.optionRates[option];
                    breakdown.push(`${this.getOptionDisplayName(option)}: ¥${this.formatPrice(this.optionRates[option])}`);
                }
            });

            // 総額
            let totalPrice = basePrice + optionPrice;

            // 割引計算
            const { discountAmount, discountDescription } = this.calculateDiscount(serviceType, selectedOptions, totalPrice);
            totalPrice -= discountAmount;

            if (discountAmount > 0) {
                breakdown.push(`割引: -¥${this.formatPrice(discountAmount)}`);
            }

            // おすすめプラン
            const recommendedPlan = this.getRecommendation(serviceType, plan, selectedOptions);

            return {
                basePrice,
                optionPrice,
                totalPrice,
                breakdown,
                savings: discountAmount,
                recommendedPlan,
                discountDescription
            };
            
        } catch (error) {
            return { error: `計算エラー: ${error.message}` };
        }
    }

    getBasePrice(serviceType, plan) {
        switch (serviceType) {
            case 'website':
                return this.webSiteRates[plan] || 0;
            case 'webdesign':
                return this.webDesignRates[plan] || 0;
            case 'logo':
                return this.logoDesignRates[plan] || 0;
            default:
                return 0;
        }
    }

    getPageMultiplier(serviceType, pageCount) {
        if (serviceType === 'website') {
            if (pageCount <= 5) return 1.0;
            if (pageCount <= 10) return 1.2;
            if (pageCount <= 20) return 1.5;
            return 2.0;
        }
        return 1.0;
    }

    calculateDiscount(serviceType, options, totalPrice) {
        let discountAmount = 0;
        let discountDescription = '';

        // 複数オプション割引
        if (options.length >= 3) {
            discountAmount += Math.floor(totalPrice * 0.1);
            discountDescription = '複数オプション割引 10%';
        }

        // 新規顧客割引（固定5%）
        const newCustomerDiscount = Math.floor(totalPrice * 0.05);
        discountAmount += newCustomerDiscount;
        
        if (discountDescription) {
            discountDescription += ' + 新規顧客割引 5%';
        } else {
            discountDescription = '新規顧客割引 5%';
        }

        return { discountAmount, discountDescription };
    }

    getRecommendation(serviceType, plan, options) {
        if (serviceType === 'website' && plan === 'light' && options.length >= 2) {
            return 'スタンダードプランがおすすめです。選択されたオプションを含めるとお得になります。';
        }
        if (serviceType === 'webdesign' && plan === 'premium' && options.length === 0) {
            return 'プレミアムプランをお選びの場合、CMS導入もご検討ください。';
        }
        return null;
    }

    getEstimatedTimeline(serviceData) {
        const { serviceType, plan, pageCount, options } = serviceData;
        
        let baseDays = 0;
        
        // サービス別基本日数
        switch (serviceType) {
            case 'website':
                baseDays = plan === 'light' ? 14 : plan === 'standard' ? 21 : 35;
                break;
            case 'webdesign':
                baseDays = plan === 'light' ? 7 : plan === 'standard' ? 14 : 21;
                break;
            case 'logo':
                baseDays = plan === 'light' ? 5 : plan === 'standard' ? 7 : 10;
                break;
        }

        // ページ数による追加
        if (serviceType === 'website' && pageCount > 5) {
            baseDays += Math.floor((pageCount - 5) * 1.5);
        }

        // オプションによる追加
        const optionDays = (options || []).length * 3;
        baseDays += optionDays;

        const weeks = Math.ceil(baseDays / 7);
        
        return {
            days: baseDays,
            weeks: weeks,
            description: `予想制作期間: ${baseDays}日（約${weeks}週間）`
        };
    }

    getServiceDisplayName(serviceType) {
        switch (serviceType) {
            case 'website': return 'WEBサイト制作';
            case 'webdesign': return 'WEBデザイン';
            case 'logo': return 'ロゴデザイン';
            default: return serviceType;
        }
    }

    getPlanDisplayName(plan) {
        switch (plan) {
            case 'light': return 'ライトプラン';
            case 'standard': return 'スタンダードプラン';
            case 'premium': return 'プレミアムプラン';
            default: return plan;
        }
    }

    getOptionDisplayName(option) {
        const names = {
            'cms': 'CMS導入',
            'seo_advanced': '高度SEO対策',
            'analytics': 'アナリティクス設定',
            'ssl': 'SSL証明書',
            'multilingual': '多言語対応',
            'ec_function': 'EC機能'
        };
        return names[option] || option;
    }

    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

// ========================================
// メインの料金計算機クラス
// ========================================
class LEXIAPriceCalculator {
    constructor(container) {
        this.container = container;
        this.engine = new PriceCalculationEngine();
        this.currentCalculation = null;
        this.animationTimeout = null;
        
        // DOM要素
        this.calculatorContainer = null;
        this.resultContainer = null;
        
        // バインドメソッド
        this.handleServiceChange = this.handleServiceChange.bind(this);
        this.handlePlanChange = this.handlePlanChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handlePageCountChange = this.handlePageCountChange.bind(this);
        
        // CSSを追加
        this.injectCSS();
    }

    async init() {
        // UI初期化
        this.createCalculatorUI();
        this.attachEventListeners();
        
        console.log('LEXIA料金計算機が初期化されました');
    }

    injectCSS() {
        // スタイルが既に追加されているかチェック
        if (document.getElementById('lexia-calculator-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'lexia-calculator-styles';
        style.textContent = calculatorCSS;
        document.head.appendChild(style);
    }

    createCalculatorUI() {
        // ローディング表示をクリア
        if (this.container) {
            this.container.innerHTML = '';
            this.container.className = 'price-calculator animate-on-scroll';
        }

        // 計算機コンテナを作成
        this.calculatorContainer = this.createCalculatorContainer();
        
        if (this.container) {
            this.container.appendChild(this.calculatorContainer);
        }
    }

    createCalculatorContainer() {
        const container = document.createElement('div');
        container.className = 'calculator-section';
        container.innerHTML = `
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
        `;
        
        return container;
    }

    attachEventListeners() {
        // サービス選択
        const serviceSelect = this.container.querySelector('#service-type');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', this.handleServiceChange);
        }

        // プラン選択
        const planSelect = this.container.querySelector('#plan-type');
        if (planSelect) {
            planSelect.addEventListener('change', this.handlePlanChange);
        }

        // ページ数スライダー
        const pageCountSlider = this.container.querySelector('#page-count');
        if (pageCountSlider) {
            pageCountSlider.addEventListener('input', this.handlePageCountChange);
        }

        // オプションチェックボックス
        const optionCheckboxes = this.container.querySelectorAll('.option-checkbox');
        optionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', this.handleOptionChange);
            
            // チェックボックスの親要素のスタイル更新
            checkbox.addEventListener('change', (e) => {
                const optionItem = e.target.closest('.option-item');
                if (optionItem) {
                    if (e.target.checked) {
                        optionItem.classList.add('selected');
                    } else {
                        optionItem.classList.remove('selected');
                    }
                }
            });
        });
    }

    handleServiceChange(event) {
        const serviceType = event.target.value;
        const planSelect = this.container.querySelector('#plan-type');
        
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
        const valueDisplay = this.container.querySelector('.page-count-value');
        if (valueDisplay) {
            valueDisplay.textContent = `${pageCount}ページ`;
        }
        this.calculatePrice();
    }

    handleOptionChange(event) {
        this.calculatePrice();
    }

    calculatePrice() {
        const serviceData = this.collectFormData();
        if (!serviceData.serviceType || !serviceData.plan) {
            this.clearResult();
            return;
        }

        try {
            const result = this.engine.calculatePrice(serviceData);
            
            if (result.error) {
                console.error('計算エラー:', result.error);
                return;
            }

            this.currentCalculation = result;
            this.displayResult(result);
            
        } catch (error) {
            console.error('料金計算エラー:', error);
        }
    }

    collectFormData() {
        const serviceType = this.container.querySelector('#service-type')?.value || '';
        const plan = this.container.querySelector('#plan-type')?.value || '';
        const pageCount = parseInt(this.container.querySelector('#page-count')?.value || '5');
        
        const options = [];
        const optionCheckboxes = this.container.querySelectorAll('.option-checkbox:checked');
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
        const resultContainer = this.container.querySelector('#calculator-result');
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
                            <span class="price-value">¥${this.engine.formatPrice(result.totalPrice)}</span>
                        </div>
                        ${result.savings > 0 ? `
                            <div class="savings-badge">
                                <span class="savings-text">¥${this.engine.formatPrice(result.savings)} お得！</span>
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
                        <button class="btn btn--primary" onclick="window.lexiaPriceCalculator?.requestQuote()">
                            この内容で見積もり依頼
                        </button>
                        <button class="btn btn--secondary" onclick="window.lexiaPriceCalculator?.saveCalculation()">
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

    displayTimeline() {
        const serviceData = this.collectFormData();
        
        try {
            const timeline = this.engine.getEstimatedTimeline(serviceData);
            
            const resultContainer = this.container.querySelector('#calculator-result');
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
        const resultContainer = this.container.querySelector('#calculator-result');
        if (!resultContainer) return;

        resultContainer.innerHTML = `
            <div class="result-placeholder">
                <span class="placeholder-icon">💡</span>
                <p>サービスとプランを選択すると、料金が自動計算されます</p>
            </div>
        `;
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
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// ========================================
// グローバル初期化とエクスポート
// ========================================

// DOMContentLoaded後に初期化
document.addEventListener('DOMContentLoaded', () => {
    // 料金計算機要素を探す
    const calculatorElement = document.getElementById('price-calculator');
    
    if (calculatorElement) {
        // 料金比較タブがアクティブになったときに初期化
        const pricingTab = document.getElementById('tab-pricing');
        
        if (pricingTab) {
            // タブクリック時の初期化
            pricingTab.addEventListener('click', () => {
                setTimeout(() => {
                    if (!window.lexiaPriceCalculator) {
                        console.log('料金計算機を初期化中...');
                        window.lexiaPriceCalculator = new LEXIAPriceCalculator(calculatorElement);
                        window.lexiaPriceCalculator.init().catch(error => {
                            console.error('料金計算機の初期化に失敗しました:', error);
                            calculatorElement.innerHTML = `
                                <div class="calculator-error">
                                    <h3>料金計算機の読み込みに失敗しました</h3>
                                    <p>エラー: ${error.message}</p>
                                    <p>お手数ですが、お問い合わせフォームからご相談ください。</p>
                                </div>
                            `;
                        });
                    }
                }, 100);
            });
            
            // 料金比較タブが最初からアクティブな場合は即座に初期化
            if (pricingTab.classList.contains('tab-btn--active')) {
                window.lexiaPriceCalculator = new LEXIAPriceCalculator(calculatorElement);
                window.lexiaPriceCalculator.init().catch(error => {
                    console.error('料金計算機の初期化に失敗しました:', error);
                    calculatorElement.innerHTML = `
                        <div class="calculator-error">
                            <h3>料金計算機の読み込みに失敗しました</h3>
                            <p>エラー: ${error.message}</p>
                            <p>お手数ですが、お問い合わせフォームからご相談ください。</p>
                        </div>
                    `;
                });
            }
        } else {
            // タブがない場合（他のページなど）は即座に初期化
            window.lexiaPriceCalculator = new LEXIAPriceCalculator(calculatorElement);
            window.lexiaPriceCalculator.init().catch(error => {
                console.error('料金計算機の初期化に失敗しました:', error);
                calculatorElement.innerHTML = `
                    <div class="calculator-error">
                        <h3>料金計算機の読み込みに失敗しました</h3>
                        <p>エラー: ${error.message}</p>
                        <p>お手数ですが、お問い合わせフォームからご相談ください。</p>
                    </div>
                `;
            });
        }
    }
});

// Export for global access
window.LEXIAPriceCalculator = LEXIAPriceCalculator;
