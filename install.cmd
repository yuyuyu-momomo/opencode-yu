@echo off
chcp 65001 >nul
node "%~dp0dist\install.mjs" %*
if errorlevel 1 (
  echo 安装失败，请确认已安装 Node.js 22 或更新版本。
)
pause
