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
node build-js.js
exit