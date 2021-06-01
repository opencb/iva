@echo off
    setlocal enableextensions disabledelayedexpansion

rem set the username using a plain prompt
	SET /p username=Enter your Opencga Username [ENTER]:
	rem this doesnt work?
	if not defined username (
        echo Username must be defined
		goto :eof
    )

rem Call the subroutine to get the password
    call :getPassword password
	if not defined password (
        echo Password must be defined
		goto :eof
    )

rem set the study using a plain prompt
	SET /p studies=Enter the the FQN (comma-separated) of the studies you want to test [ENTER]:
	if not defined studies (
        echo At least one study must be defined
		goto :eof
    )

rem iterate over studies and run the test defined in --spec
for %%a in ("%studies:,=" "%") do (
echo %%~a
(if exist mochawesome-report rmdir /S/Q mochawesome-report) && npx cypress run --env username=%username%,password=%password%,study=%%~a --headless --spec \"cypress/integration/003-header-bar-post-login.spec.js\" & npx mochawesome-merge mochawesome-report/*.json -o mochawesome-report/cypress-combined-report.json && ^
npx marge --reportFilename report.html --charts --timestamp _HH-MM_dd-mm-yyyy --reportPageTitle IVA --reportTitle IVA --reportDir ./report mochawesome-report/cypress-combined-report.json && ^
(if exist mochawesome-report rmdir /S/Q mochawesome-report)
)


rem End of the process
    endlocal
    exit /b


rem Subroutine to get the password
:getPassword returnVar
    setlocal enableextensions disabledelayedexpansion
    set "_password="

    rem We need a backspace to handle character removal
    for /f %%a in ('"prompt;$H&for %%b in (0) do rem"') do set "BS=%%a"

    rem Prompt the user
    set /p "=Enter your Opencga Password [ENTER]: " <nul

:keyLoop
    rem retrieve a keypress
    set "key="
    for /f "delims=" %%a in ('xcopy /l /w "%~f0" "%~f0" 2^>nul') do if not defined key set "key=%%a"
    set "key=%key:~-1%"

    rem handle the keypress
    rem     if No keypress (enter), then exit
    rem     if backspace, remove character from password and console
    rem     else add character to password and go ask for next one
    if defined key (
        if "%key%"=="%BS%" (
            if defined _password (
                set "_password=%_password:~0,-1%"
                setlocal enabledelayedexpansion & set /p "=!BS! !BS!"<nul & endlocal
            )
        ) else (
            set "_password=%_password%%key%"
            set /p "=*"<nul
        )
        goto :keyLoop
    )
    echo(
    rem return password to caller
    if defined _password ( set "exitCode=0" ) else ( set "exitCode=1" )
    endlocal & set "%~1=%_password%" & exit /b %exitCode%
