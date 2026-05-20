@echo off
echo =========================================
echo Preparing to push changes to GitHub...
echo =========================================

echo.
echo [1/3] Staging all files...
git add .

echo.
echo [2/3] Committing changes...
git commit -m "Fix role-based access visibility, fix broken routing buttons, and add Chatbot quick-action functionality"

echo.
echo [3/3] Pushing to remote repository...
git push

echo.
echo =========================================
echo Done! If you see no errors above, your code has been pushed successfully.
echo =========================================
pause
