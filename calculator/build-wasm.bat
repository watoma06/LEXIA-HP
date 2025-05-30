@echo off
echo Go WebAssembly料金計算機をビルドしています...

rem GOOS=js GOARCH=wasmを設定してビルド
set GOOS=js
set GOARCH=wasm
go build -o calculator.wasm calculator.go

if %errorlevel% equ 0 (
    echo ✅ calculator.wasmのビルドが完了しました
    for %%A in (calculator.wasm) do echo 📄 ファイルサイズ: %%~zA bytes
) else (
    echo ❌ ビルドに失敗しました
    exit /b 1
)

echo.
echo 🚀 料金計算機の統合が完了しました！
echo.
echo 必要なファイル:
echo   ✓ calculator.wasm (Go WebAssembly計算エンジン)
echo   ✓ wasm_exec.js (WebAssemblyサポート)
echo   ✓ price-calculator.js (JavaScript統合レイヤー)
echo   ✓ calculator.css (専用スタイル)
echo.
echo services.htmlを開いて料金比較タブをご確認ください。
