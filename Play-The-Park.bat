@echo off
cd /d %~dp0
if not exist node_modules\three call npm install
set CHROME=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe
if exist %CHROME% start %CHROME% http://127.0.0.1:3000/doors/
if not exist %CHROME% start http://127.0.0.1:3000/doors/
node server.js
