@echo off
title wrframe-build-files
echo ----------------------------------------------------------------------------
echo Converting less files
cd "F:/DEV/wreframe/lib/less"
start /b lessc main.less ../css/main.css
echo CSS Files Generated
echo ----------------------------------------------------------------------------
echo Converting JS Files
cd "F:/DEV/wreframe/build"
echo Concating JS Files in Process
echo Uglify JS Files in Process
node build-js.js
echo ----------------------------------------------------------------------------
exit