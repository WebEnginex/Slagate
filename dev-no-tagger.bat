@echo off
echo Starting development server without component tagger...
set DISABLE_TAGGER=true
npm run dev
