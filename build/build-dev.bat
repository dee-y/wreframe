@echo off
title wrframe-build-files
echo ----------------------------------------------------------------------------
echo Converting less files
CALL :CSSFUNC
echo CSS Files Generated
CALL :JSFUNC
EXIT /B 0
cd "F:/DEV/wreframe/build"

:CSSFUNC
cd "F:/DEV/wreframe/lib/less"
call lessc main.less ../css/main.css
EXIT /B 0

:JSFUNC
echo ----------------------------------------------------------------------------
echo Converting JS Files
cd "F:/DEV/wreframe/"
echo Concating JS Files in Process
echo Uglify JS Files in Process
call gulp
echo ----------------------------------------------------------------------------
EXIT /B 0