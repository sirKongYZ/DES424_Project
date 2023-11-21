*** Settings ***
Library    SeleniumLibrary
Library    BuiltIn

*** Variables ***
${url}      http://127.0.0.1:5500/kitchen-dessert.html
${browser}  chrome
${EXPECT1}  Completed

*** Test Cases ***

1.Open Browser
    Open Browser    ${url}    ${browser}    
    Set Selenium Speed    2

    Sleep    5s


2.click check
    Click Element   xpath:/html/body/div/table/tbody/tr[1]/td[6]/button

    Sleep    3s
    
 
3.Check status 
    ${result1}=    Get Text    xpath=/html/body/div/table/tbody/tr[1]/td[6]
    Log To Console    ${result1}
    Should Contain    ${result1}    ${EXPECT1}
    
