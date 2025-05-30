#!/bin/bash

# Go WebAssemblyビルドスクリプト
echo "Go WebAssembly料金計算機をビルドしています..."

# GOOS=js GOARCH=wasmを設定してビルド
GOOS=js GOARCH=wasm go build -o calculator.wasm calculator.go

if [ $? -eq 0 ]; then
    echo "✅ calculator.wasmのビルドが完了しました"
    echo "📄 ファイルサイズ: $(ls -lh calculator.wasm | awk '{print $5}')"
else
    echo "❌ ビルドに失敗しました"
    exit 1
fi

echo ""
echo "🚀 料金計算機の統合が完了しました！"
echo ""
echo "必要なファイル:"
echo "  ✓ calculator.wasm (Go WebAssembly計算エンジン)"
echo "  ✓ wasm_exec.js (WebAssemblyサポート)"
echo "  ✓ price-calculator.js (JavaScript統合レイヤー)"
echo "  ✓ calculator.css (専用スタイル)"
echo ""
echo "services.htmlを開いて料金比較タブをご確認ください。"
