@echo off
echo Starting ResQNet Backend Server...
start cmd /k "cd backend && npm start"

echo Starting ResQNet Frontend Server...
start cmd /k "cd frontend && npm start"

echo Both servers are starting up!
echo Please wait about 30-60 seconds for React to finish compiling.
echo Once it says "Compiled successfully!", you can go to http://localhost:3000
