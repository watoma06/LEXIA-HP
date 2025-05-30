# 🌐 LEXIA-HP サイト構造・コンテンツガイド

**最終更新：** 2025年5月30日  
**サイト概要：** 愛知県碧南市のWEB制作会社コーポレートサイト

---

## 🏗️ サイト階層図

```
LEXIA-HP/
├── 📄 index.html          (トップページ - サイトの顔)
├── 🏢 about.html          (会社概要 - 企業情報)
├── 🛠️ services.html       (サービス一覧 - 主力コンテンツ)
├── 💼 portfolio.html      (制作実績 - 成果物紹介)
├── 📞 contact.html        (お問い合わせ - コンバージョン)
├── 🎨 style-optimized.css (メインスタイル - BEM設計)
├── ⚙️ script.js           (JavaScript機能)
└── 📁 description/        (プロジェクト文書)
    ├── README_SUMMARY.md
    ├── PROJECT_HANDOVER.md
    └── PROJECT_HANDOVER_SUMMARY.md
```

## 📋 各ページの内容・役割

### 🏠 `index.html` - トップページ
**役割：** サイトの顔として訪問者を迎え、全体概要を提供
**主要コンテンツ：**
- **ヒーローセクション** - キャッチコピー・メインビジュアル
- **サービス概要** - 4つの主力サービス紹介
- **制作実績ハイライト** - 注目プロジェクトの紹介
- **お客様の声** - 信頼性向上のための証言
- **会社概要** - 代表者メッセージ・企業理念
- **CTA（行動喚起）** - 問い合わせ・資料請求への導線

### 🏢 `about.html` - 会社概要
**役割：** 企業の信頼性・専門性をアピール
**主要コンテンツ：**
- **代表者プロフィール** - 経歴・専門分野・想い
- **企業データ** - 設立年・所在地・事業内容
- **企業理念・ビジョン** - 会社の価値観・目標
- **沿革・実績** - 会社の歩み・主要な成果
- **チーム紹介** - スタッフ情報・専門領域
- **アクセス情報** - 所在地・連絡先

### 🛠️ `services.html` - サービス一覧（★完成済み）
**役割：** 主力コンテンツとして詳細なサービス情報を提供
**主要コンテンツ：**
- **ヒーローセクション** - 統計データ付きメインビジュアル
  - 制作実績200+件、顧客満足度98%、平均返信時間24時間
- **タブナビゲーション** - 3つの情報カテゴリ
  - サービス一覧・料金比較・制作フロー
- **サービスカード** - 4つの主力サービス詳細
  - WEB制作・ロゴデザイン・ドローン撮影・SNS支援
  - 各サービスに人気バッジ・実績データ・具体的機能説明
- **料金比較表** - 3プラン詳細比較
  - ライト（5万円〜）・スタンダード（15万円〜）・プレミアム（30万円〜）
- **制作フロー** - 6ステップの詳細プロセス
- **お客様の声** - 星評価・成果数値付きレビュー3件
- **FAQ** - よくある質問4項目
- **CTA最適化** - 段階的コンタクト導線

### 💼 `portfolio.html` - 制作実績
**役割：** 技術力・デザイン力の証明、潜在顧客への訴求
**主要コンテンツ：**
- **実績ギャラリー** - フィルタリング機能付きポートフォリオ
- **カテゴリフィルタ** - すべて・WEB制作・ロゴデザイン・ドローン
- **実績詳細** - 各プロジェクトの詳細情報
  - 制作期間・使用技術・成果指標・お客様の声
- **ライトボックス機能** - 画像拡大表示
- **ビフォー・アフター** - 改善効果の可視化
- **業界別実績** - 様々な業種への対応実績

### 📞 `contact.html` - お問い合わせ
**役割：** コンバージョンポイント、顧客との接点創出
**主要コンテンツ：**
- **お問い合わせフォーム** - 名前・メール・件名・内容
- **連絡先情報** - 電話・メール・所在地
- **アクセスマップ** - Googleマップ埋め込み
- **営業時間・定休日** - 対応可能時間の明示
- **よくある質問** - 事前の疑問解決
- **段階的CTA** - 複数の接触方法提示

---

## 🎨 デザイン・技術仕様

### 技術基盤（全ページ共通）
- **BEM CSS設計** - コンポーネント指向の保守性高いCSS
- **レスポンシブデザイン** - モバイル・タブレット・デスクトップ対応
- **JavaScript機能** - バニラJSによる軽量実装
- **SEO最適化** - メタデータ・構造化データ完備
- **アクセシビリティ** - WCAG AA準拠
- **パフォーマンス** - GPU最適化・遅延読み込み対応

### デザインシステム
```css
カラーパレット：
- メインカラー: #FF6B00 (オレンジ)
- テキスト: #000000 (ブラック)
- 背景: #ffffff (ホワイト)
- アクセント: #eeeeee (ライトグレー)

タイポグラフィ：
- メインフォント: 'Noto Sans JP'
- 見出しフォント: 'Montserrat'
- 基本サイズ: 1rem (16px)

レイアウト：
- コンテナ幅: 1200px
- ブレークポイント: 768px (タブレット), 480px (モバイル)
```

## 🎯 services.html 成功モデル（他ページ適用の参考）

### ★完成済み成功パターン
services.htmlは最も充実したコンテンツ構成を持ち、他ページの改善モデルとなっています：

```
✅ ヒーローセクション強化
   - グラデーション背景で視覚的インパクト
   - 統計データ表示で信頼性向上
   - 具体的数値（制作実績200+、満足度98%、返信24時間）
   
✅ タブナビゲーション実装
   - サービス一覧・料金比較・制作フロー
   - ユーザビリティ向上とコンテンツ整理
   
✅ 充実したサービスカード
   - アイコン・人気バッジで視認性向上
   - 実績データと具体的機能説明
   - CTAボタンの最適配置
   
✅ 詳細料金比較表
   - 3プラン（ライト・スタンダード・プレミアム）
   - 機能比較とおすすめプラン表示
   - 透明性のある価格設定
   
✅ 制作フロー詳細説明
   - 6ステップの明確なプロセス
   - 各段階の詳細説明と期間
   
✅ お客様の声セクション
   - 星評価システム
   - 成果数値付きレビュー
   - 実際の顧客名・業種表示
   
✅ FAQ・CTA最適化
   - よくある質問で不安解消
   - 段階的コンタクト導線
   - 複数の接触方法提示
```

---

## 📊 サイト構成の完成度

| ページ | コンテンツ充実度 | 推奨改善ポイント |
|--------|------------------|------------------|
| **services.html** | ✅ **100%完成** | 完成済み・モデルケース |
| **about.html** | 🔄 **90%完成** | 企業ストーリー・チーム紹介強化 |
| **index.html** | 🔄 **70%完成** | 統計データ・お客様の声拡充 |
| **portfolio.html** | 🔄 **70%完成** | 実績詳細データ・成果指標追加 |
| **contact.html** | 🔄 **90%完成** | FAQ・複数CTA導線追加 |

---

## 🚀 サイトの特徴・強み

### 📱 ユーザーエクスペリエンス
- **直感的ナビゲーション** - 明確な情報階層
- **高速表示** - 最適化されたパフォーマンス
- **アクセシブル** - 全ユーザーに優しい設計
- **レスポンシブ** - あらゆるデバイスで最適表示

### 🎨 ビジュアルデザイン
- **統一感のあるデザイン** - 一貫したブランドイメージ
- **読みやすいタイポグラフィ** - 日本語最適化
- **効果的な色使い** - オレンジをアクセントとした親しみやすさ
- **モダンなレイアウト** - Grid・Flexboxによる柔軟な配置

### 🔍 SEO・マーケティング
- **検索エンジン最適化** - 適切なメタデータ設定
- **コンバージョン最適化** - 段階的CTA設計
- **信頼性向上** - お客様の声・実績数値の活用
- **SNS連携** - Open Graph対応でシェア促進

---

## 📈 期待される効果・目標

### ビジネス成果目標
- **問い合わせ率向上** - 月間+30%増加目標
- **滞在時間延長** - 平均2分以上のエンゲージメント
- **離脱率改善** - 60%以下の維持
- **ブランド認知** - 地域内での知名度向上

### 技術パフォーマンス目標
- **Lighthouse Score** - Performance 90+、Accessibility 95+
- **読み込み速度** - 3秒以内（3G環境）
- **モバイル対応** - 100%完全レスポンシブ
- **SEOスコア** - 検索順位上位表示

---

**このサイト構造により、LEXIA様の事業拡大とブランド価値向上を支援します。**  
**services.htmlの成功パターンを参考に、全ページの品質向上を継続的に実現してください。**
