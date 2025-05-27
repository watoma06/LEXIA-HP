# LEXIA-HP ウェブサイト開発タスクリスト

## ✅ 完了済み（優先度：中）

### CSS コードの整理と最適化:
- ✅ **BEM命名規則の導入**: 全HTMLファイルでBEM方式を完全実装
- ✅ **最適化CSS作成**: `style-optimized.css` で全てのBEMクラスに対応、CSS変数とモジュラー構造を実装
- ✅ **JavaScript BEM対応**: `script.js` を新しいBEMクラス名に更新（ハンバーガーメニュー、ポートフォリオフィルタリング、ライトボックス、フローティングボタン）
- ✅ **UI/UX一貫性修正**: 全ページでヘッダー・フッター・ボタン・コンテナ構造を統一

### UI/UX の改善:
- ✅ **ライトボックス機能**: portfolio.htmlに画像クリックで拡大表示機能を実装
- ✅ **フローティングボタン**: トップページに問い合わせ誘導用の固定ボタンを追加
- ✅ **レスポンシブ対応**: 全デバイスサイズに対応したBEMベースのレスポンシブデザイン

## 📋 最優先タスク

### SEOとメタ情報の強化:
各ページ (index.html, about.html, services.html, portfolio.html, contact.html) の <head> に、description, canonical, Open Graph, Twitter Card, favicon を設定。
<title> を各ページの内容に合わせて最適化。

### アクセシビリティの向上:
各ページに「Skip to content」リンクを設置。
ナビゲーションのアクティブリンクに aria-current="page" を追加。
フォーム要素のフォーカススタイルを改善し、コントラスト比を確認。
ハンバーガーメニューの aria-expanded 属性を JavaScript で適切に制御。

### レスポンシブ対応の改善:
container の width: 90% を見直し、狭い画面での余白を調整。
font-size に rem を使用することを検討。
ブレークポイント (max-width: 768px) が適切か確認。

### コンテンツの具体化と充実:
services.html のサービス内容を具体的に記述し、料金や納期などの情報を追加。
portfolio.html に実績ごとの制作期間や成果などのデータを追加。
トップページに実績紹介やお客様の声セクションを追加。

## 📋 優先度：中

### JavaScript コードの改善:
ポートフォリオフィルタリングの表示制御を CSS クラスの付け外しで行うように変更。
スムーズスクロールに prefers-reduced-motion 対応を追加。
ハンバーガーメニューの操作性を改善（Escキーでのクローズ、フォーカストラップ）。

## 📋 優先度：低

### ダークモード対応:
prefers-color-scheme: dark メディアクエリを使用して、ダークモード用のスタイルを定義。

### アニメーションの追加:
transition や animation プロパティを使用して、より魅力的なアニメーションを追加。
prefers-reduced-motion に対応。

### モダンな技術の導入:
Web Components、CSS Grid、CSS Customプロパティなどの最新技術の活用を検討。

---

## 🎯 BEM実装完了サマリー

### 実装した BEM 構造:
- **ヘッダー**: `.header`, `.header__container`, `.header__logo`, `.nav`, `.nav__list`, `.nav__item`, `.nav__link`
- **ハンバーガーメニュー**: `.hamburger`, `.hamburger__line`, `.fullscreen-nav`, `.fullscreen-nav__list`
- **ヒーロー**: `.hero`, `.hero__container`, `.hero__title`, `.hero__subtitle`
- **ボタン**: `.btn`, `.btn--secondary`, `.btn--large`
- **ポートフォリオ**: `.portfolio-item`, `.portfolio-item__image`, `.portfolio-item__content`
- **フッター**: `.footer`, `.footer__container`, `.footer__catchphrase`, `.footer__copyright`

### 最適化された CSS ファイル:
- `style-optimized.css`: 完全なBEM対応、CSS変数、レスポンシブデザイン、パフォーマンス最適化
- `style.css`: 旧バージョン（後で削除可能）

### JavaScript 対応:
- 全てのインタラクティブ要素をBEMクラス名に対応済み
- ハンバーガーメニュー、ポートフォリオフィルタリング、ライトボックス、フローティングボタン機能が正常動作

**BEM実装進捗: 100% 完了** ✅
CSS グリッドや CSS Houdini を使用して、より高度なレイアウトや表現を実装。
PWA (Progressive Web App) 対応。
テストと自動化:
Google Analytics や Tag Manager を導入。
A/B テスト用のスクリプトを埋め込む。
GitHub Actions での自動ビルド・デプロイ環境を構築。
補足:

タスクの優先度は、ウェブサイトの目的やリソースによって調整してください。
各タスクはさらに細分化し、具体的な手順を明確にすると、より効率的に作業を進められます。
デザインの変更やコンテンツの追加は、SEO やアクセシビリティに影響を与える可能性があるため、注意が必要です。
