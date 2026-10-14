@echo off
chcp 65001 >nul
title AURO - Atualizar textos
echo.
echo  AURO Taguatinga - atualizar os textos a partir da planilha
echo  (precisa de internet so agora; depois a apresentacao roda offline)
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0engine\atualizar-textos.ps1"
echo.
pause
