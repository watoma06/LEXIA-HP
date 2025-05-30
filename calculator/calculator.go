package main

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"syscall/js"
)

// 料金計算機の構造体
type PriceCalculator struct {
	// 基本料金（サービス別・プラン別）
	WebSiteRates    map[string]int
	WebDesignRates  map[string]int
	LogoDesignRates map[string]int
	
	// オプション料金
	OptionRates map[string]int
}

// サービス項目の構造体
type ServiceItem struct {
	ServiceType string `json:"serviceType"`
	Plan        string `json:"plan"`
	PageCount   int    `json:"pageCount"`
	Options     []string `json:"options"`
}

// 計算結果の構造体
type CalculationResult struct {
	BasePrice    int      `json:"basePrice"`
	OptionPrice  int      `json:"optionPrice"`
	TotalPrice   int      `json:"totalPrice"`
	Breakdown    []string `json:"breakdown"`
	Savings      int      `json:"savings"`
	RecommendedPlan string `json:"recommendedPlan"`
}

// グローバル変数として計算機を初期化
var calculator *PriceCalculator

func main() {
	// 計算機の初期化
	calculator = &PriceCalculator{
		WebSiteRates: map[string]int{
			"light":    150000,
			"standard": 250000,
			"premium":  400000,
		},
		WebDesignRates: map[string]int{
			"light":    80000,
			"standard": 150000,
			"premium":  250000,
		},
		LogoDesignRates: map[string]int{
			"light":    50000,
			"standard": 100000,
			"premium":  180000,
		},
		OptionRates: map[string]int{
			"cms":           50000,
			"seo_advanced":  30000,
			"analytics":     20000,
			"ssl":           10000,
			"multilingual":  100000,
			"ec_function":   150000,
			"backup":        15000,
			"speed_opt":     40000,
			"custom_form":   25000,
			"social_login":  20000,
		},
	}

	// JavaScript関数をエクスポート
	js.Global().Set("calculatePrice", js.FuncOf(calculatePrice))
	js.Global().Set("getRecommendation", js.FuncOf(getRecommendation))
	js.Global().Set("getBulkDiscount", js.FuncOf(getBulkDiscount))
	js.Global().Set("getEstimatedTimeline", js.FuncOf(getEstimatedTimeline))
	
	// WebAssemblyの準備完了をJavaScriptに通知
	js.Global().Get("console").Call("log", "Go WebAssembly Price Calculator Ready!")
	js.Global().Call("dispatchEvent", js.Global().Get("Event").New("wasmReady"))

	// メインループ（WebAssemblyを生かし続ける）
	<-make(chan bool)
}

// メイン計算関数
func calculatePrice(this js.Value, args []js.Value) interface{} {
	if len(args) < 1 {
		return map[string]interface{}{"error": "引数が不足しています"}
	}

	// JSON文字列をパース
	serviceDataStr := args[0].String()
	var serviceItem ServiceItem
	if err := json.Unmarshal([]byte(serviceDataStr), &serviceItem); err != nil {
		return map[string]interface{}{"error": "データ形式が無効です: " + err.Error()}
	}

	// 基本料金を計算
	basePrice := calculator.getBasePrice(serviceItem.ServiceType, serviceItem.Plan)
	if basePrice == 0 {
		return map[string]interface{}{"error": "無効なサービスタイプまたはプランです"}
	}

	// ページ数による追加料金
	pageAdjustment := calculator.calculatePageAdjustment(serviceItem.ServiceType, serviceItem.Plan, serviceItem.PageCount)
	
	// オプション料金を計算
	optionPrice := calculator.calculateOptionPrice(serviceItem.Options)
	
	// 総合料金
	totalPrice := basePrice + pageAdjustment + optionPrice
	
	// 割引計算
	discount := calculator.calculateDiscount(totalPrice, serviceItem.ServiceType, len(serviceItem.Options))
	finalPrice := totalPrice - discount
	
	// 詳細内訳
	breakdown := calculator.generateBreakdown(serviceItem, basePrice, pageAdjustment, optionPrice, discount)
	
	// おすすめプラン提案
	recommendedPlan := calculator.getRecommendedPlan(serviceItem)

	result := CalculationResult{
		BasePrice:       basePrice + pageAdjustment,
		OptionPrice:     optionPrice,
		TotalPrice:      finalPrice,
		Breakdown:       breakdown,
		Savings:         discount,
		RecommendedPlan: recommendedPlan,
	}

	// JavaScript形式で返す
	resultMap := map[string]interface{}{
		"basePrice":       result.BasePrice,
		"optionPrice":     result.OptionPrice,
		"totalPrice":      result.TotalPrice,
		"breakdown":       result.Breakdown,
		"savings":         result.Savings,
		"recommendedPlan": result.RecommendedPlan,
	}

	return resultMap
}

// 基本料金取得
func (pc *PriceCalculator) getBasePrice(serviceType, plan string) int {
	switch serviceType {
	case "website":
		return pc.WebSiteRates[plan]
	case "webdesign":
		return pc.WebDesignRates[plan]
	case "logo":
		return pc.LogoDesignRates[plan]
	default:
		return 0
	}
}

// ページ数による料金調整
func (pc *PriceCalculator) calculatePageAdjustment(serviceType, plan string, pageCount int) int {
	baseLimits := map[string]map[string]int{
		"website": {
			"light":    5,
			"standard": 10,
			"premium":  20,
		},
		"webdesign": {
			"light":    3,
			"standard": 8,
			"premium":  15,
		},
	}

	pricePerPage := map[string]int{
		"light":    15000,
		"standard": 20000,
		"premium":  25000,
	}

	if limits, exists := baseLimits[serviceType]; exists {
		if baseLimit, exists := limits[plan]; exists {
			if pageCount > baseLimit {
				extraPages := pageCount - baseLimit
				return extraPages * pricePerPage[plan]
			}
		}
	}
	return 0
}

// オプション料金計算
func (pc *PriceCalculator) calculateOptionPrice(options []string) int {
	total := 0
	for _, option := range options {
		if price, exists := pc.OptionRates[option]; exists {
			total += price
		}
	}
	return total
}

// 割引計算
func (pc *PriceCalculator) calculateDiscount(totalPrice int, serviceType string, optionCount int) int {
	discount := 0

	// 複数オプション割引（3つ以上で10%オフ）
	if optionCount >= 3 {
		discount += int(float64(totalPrice) * 0.1)
	}

	// 高額プロジェクト割引（50万円以上で5%オフ）
	if totalPrice >= 500000 {
		discount += int(float64(totalPrice) * 0.05)
	}

	// 新規顧客割引（15%オフ、最大10万円まで）
	newCustomerDiscount := int(float64(totalPrice) * 0.15)
	if newCustomerDiscount > 100000 {
		newCustomerDiscount = 100000
	}
	
	// 最も有利な割引を適用
	if newCustomerDiscount > discount {
		discount = newCustomerDiscount
	}

	return discount
}

// 内訳詳細生成
func (pc *PriceCalculator) generateBreakdown(item ServiceItem, basePrice, pageAdjustment, optionPrice, discount int) []string {
	breakdown := []string{}

	// サービス基本料金
	serviceNames := map[string]string{
		"website":   "WEBサイト制作",
		"webdesign": "WEBデザイン",
		"logo":      "ロゴデザイン",
	}
	
	planNames := map[string]string{
		"light":    "ライトプラン",
		"standard": "スタンダードプラン",
		"premium":  "プレミアムプラン",
	}

	breakdown = append(breakdown, fmt.Sprintf("%s（%s）: ¥%s", 
		serviceNames[item.ServiceType], 
		planNames[item.Plan], 
		formatPrice(basePrice)))

	// ページ追加料金
	if pageAdjustment > 0 {
		breakdown = append(breakdown, fmt.Sprintf("追加ページ料金: ¥%s", formatPrice(pageAdjustment)))
	}

	// オプション詳細
	if optionPrice > 0 {
		breakdown = append(breakdown, fmt.Sprintf("オプション料金: ¥%s", formatPrice(optionPrice)))
	}

	// 割引詳細
	if discount > 0 {
		breakdown = append(breakdown, fmt.Sprintf("割引適用: -¥%s", formatPrice(discount)))
	}

	return breakdown
}

// おすすめプラン提案
func (pc *PriceCalculator) getRecommendedPlan(item ServiceItem) string {
	switch item.ServiceType {
	case "website":
		if item.PageCount <= 5 {
			return "ライトプランがお手頃でおすすめです"
		} else if item.PageCount <= 10 {
			return "スタンダードプランがバランス良くおすすめです"
		} else {
			return "プレミアムプランで充実した機能をご利用ください"
		}
	case "webdesign":
		return "デザイン重視でしたらスタンダードプラン以上がおすすめです"
	case "logo":
		return "ブランディング全体をお考えでしたらプレミアムプランがおすすめです"
	default:
		return "詳細なご相談をお受けいたします"
	}
}

// レコメンデーション関数
func getRecommendation(this js.Value, args []js.Value) interface{} {
	if len(args) < 1 {
		return "無効な引数です"
	}

	budget := args[0].Int()
	
	recommendations := []string{}
	
	if budget < 100000 {
		recommendations = append(recommendations, "ロゴデザイン（ライトプラン）からスタートされることをおすすめします")
	} else if budget < 200000 {
		recommendations = append(recommendations, "WEBデザイン（スタンダードプラン）が最適です")
		recommendations = append(recommendations, "ロゴデザインとセットにすると効果的です")
	} else if budget < 300000 {
		recommendations = append(recommendations, "WEBサイト制作（ライト〜スタンダードプラン）がおすすめです")
	} else {
		recommendations = append(recommendations, "フルセットのブランディングパッケージをご提案いたします")
		recommendations = append(recommendations, "SEO対策やCMS導入も含めた総合的なサービスが可能です")
	}
	
	return recommendations
}

// 一括割引計算
func getBulkDiscount(this js.Value, args []js.Value) interface{} {
	if len(args) < 1 {
		return 0
	}

	totalAmount := args[0].Int()
	
	// 一括発注割引ロジック
	if totalAmount >= 1000000 {
		return 0.20 // 20%割引
	} else if totalAmount >= 500000 {
		return 0.15 // 15%割引
	} else if totalAmount >= 300000 {
		return 0.10 // 10%割引
	} else if totalAmount >= 150000 {
		return 0.05 // 5%割引
	}
	
	return 0
}

// 制作期間見積もり
func getEstimatedTimeline(this js.Value, args []js.Value) interface{} {
	if len(args) < 1 {
		return map[string]interface{}{"error": "引数が不足しています"}
	}

	serviceDataStr := args[0].String()
	var serviceItem ServiceItem
	if err := json.Unmarshal([]byte(serviceDataStr), &serviceItem); err != nil {
		return map[string]interface{}{"error": "データ形式が無効です"}
	}

	baseDays := map[string]map[string]int{
		"website": {
			"light":    14, // 2週間
			"standard": 21, // 3週間
			"premium":  35, // 5週間
		},
		"webdesign": {
			"light":    7,  // 1週間
			"standard": 14, // 2週間
			"premium":  21, // 3週間
		},
		"logo": {
			"light":    5,  // 5日
			"standard": 10, // 10日
			"premium":  14, // 2週間
		},
	}

	days := baseDays[serviceItem.ServiceType][serviceItem.Plan]
	
	// ページ数による調整
	if serviceItem.PageCount > 10 {
		days += (serviceItem.PageCount - 10) * 2
	}
	
	// オプション数による調整
	days += len(serviceItem.Options) * 2

	weeks := float64(days) / 7.0
	
	return map[string]interface{}{
		"days":  days,
		"weeks": fmt.Sprintf("%.1f", weeks),
		"description": fmt.Sprintf("約%d日（%.1f週間）での完成予定です", days, weeks),
	}
}

// 価格フォーマット関数
func formatPrice(price int) string {
	priceStr := strconv.Itoa(price)
	if len(priceStr) <= 3 {
		return priceStr
	}

	var result strings.Builder
	for i, digit := range priceStr {
		if i > 0 && (len(priceStr)-i)%3 == 0 {
			result.WriteString(",")
		}
		result.WriteRune(digit)
	}
	return result.String()
}
