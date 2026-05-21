@echo off
echo =========================================
echo Preparing to push changes to GitHub...
echo =========================================

echo.
echo [1/3] Staging all files...
git add .

echo.
echo [2/3] Committing changes...
git commit -m "Fix local DB integration, duplicate rescue team assignments, pagination capping, and dashboard statistics"

echo.
echo [3/3] Pushing to remote repository...
git push

echo.
echo =========================================
echo Done! If you see no errors above, your code has been pushed successfully.
echo =========================================
pause
