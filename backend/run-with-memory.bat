@echo off
echo Starting PGVaale Backend with optimized memory settings...
echo.

set JAVA_OPTS=-Xmx384m -Xms128m -XX:+UseG1GC -XX:MaxGCPauseMillis=200

echo Using JVM options: %JAVA_OPTS%
echo.

gradlew.bat bootRun -Dorg.gradle.jvmargs="%JAVA_OPTS%"

pause
