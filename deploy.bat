@echo off
echo ========================================
echo Portfolio Deployment Helper
echo ========================================
echo.
echo This script will help you deploy your portfolio to Vercel
echo.

echo Step 1: Checking files...
if exist "index.html" (
    echo ✓ index.html found
) else (
    echo ✗ index.html not found
    pause
    exit /b 1
)

if exist "styles.css" (
    echo ✓ styles.css found
) else (
    echo ✗ styles.css not found
    pause
    exit /b 1
)

if exist "script.js" (
    echo ✓ script.js found
) else (
    echo ✗ script.js not found
    pause
    exit /b 1
)

if exist "vercel.json" (
    echo ✓ vercel.json found
) else (
    echo ✗ vercel.json not found
    pause
    exit /b 1
)

echo.
echo Step 2: Testing locally...
echo Starting local server on http://localhost:8000
echo Press Ctrl+C to stop the server when done testing
echo.
python -m http.server 8000

echo.
echo Step 3: Deployment Options
echo.
echo Choose your deployment method:
echo 1. Vercel Dashboard (Recommended)
echo 2. Vercel CLI
echo 3. Exit
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo ========================================
    echo Vercel Dashboard Deployment
    echo ========================================
    echo.
    echo 1. Go to https://vercel.com
    echo 2. Sign in with your GitHub account
    echo 3. Click "New Project"
    echo 4. Import your GitHub repository OR drag and drop this folder
    echo 5. Configure settings:
    echo    - Framework Preset: Other
    echo    - Build Command: (leave empty)
    echo    - Output Directory: (leave empty)
    echo    - Install Command: (leave empty)
    echo 6. Click "Deploy"
    echo.
    echo Your files are ready for deployment!
    pause
) else if "%choice%"=="2" (
    echo.
    echo ========================================
    echo Vercel CLI Deployment
    echo ========================================
    echo.
    echo Running Vercel CLI...
    vercel
) else (
    echo Exiting...
    pause
    exit /b 0
)

echo.
echo Deployment process completed!
pause 