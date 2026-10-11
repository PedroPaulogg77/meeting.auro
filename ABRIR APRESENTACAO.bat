@echo off
rem Abre a apresentacao AURO em tela cheia (modo quiosque) no Chrome, com som de video liberado.
rem Para sair: Alt+F4
set "ARQ=%~dp0index.html"
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%LocalAppData%\Google\Chrome\Application\chrome.exe"
if exist "%CHROME%" (
  start "" "%CHROME%" --kiosk --autoplay-policy=no-user-gesture-required --user-data-dir="%TEMP%\auro-apresentacao" "file:///%ARQ:\=/%"
) else (
  start "" "%ARQ%"
)
