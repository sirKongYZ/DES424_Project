*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${url}      http://127.0.0.1:5500/index.html
${browser}  chrome
${delay}    2
${EXPECT1}  Food2
${EXPECT2}  Food9
${EXPECT3}  Food1
${EXPECT4}  2
${Expect5}  $500

@{expected_values}    Food2     Food3      Food9      Food1      Food4
*** Test Cases ***

1.Open Browser
    Open Browser    ${url}    ${browser}    
    Set Selenium Speed    1

2.choose table
    Click Element   xpath:/html/body/div[1]/header/form/select
    Click Element   xpath:/html/body/div[1]/header/form/select/option[3]
    
3.click menu bar : Food
    Click Element   xpath:/html/body/div[1]/div[1]/a[1] 
    
4.Check first food name
    ${result1}=    Get Text    xpath=/html/body/div[1]/div[2]/div[1]/h2
    Log To Console    ${result1}
    Should Contain    ${result1}    ${EXPECT1}
    
5.Add menu 1 and 2
    Click Element   xpath:/html/body/div[1]/div[2]/div[1]/button
    Click Element   xpath:/html/body/div[1]/div[2]/div[2]/button

6.click menu bar : Drinks
    Click Element   xpath:/html/body/div[1]/div[1]/a[2]

7.Check first drink name
    ${result2}=    Get Text    xpath=/html/body/div[1]/div[2]/div/h2 
    Log To Console    ${result2}
    Should Contain    ${result2}    ${EXPECT2}

8.Add menu 1
    Click Element   xpath:/html/body/div[1]/div[2]/div[1]/button

9.click menu bar : Desserts
    Click Element   xpath:/html/body/div[1]/div[1]/a[3]

10.Check first dessert name
    ${result3}=    Get Text    xpath=/html/body/div[1]/div[2]/div[1]/h2
    Log To Console    ${result3}
    Should Contain    ${result3}    ${EXPECT3}

11.Add menu 1 and 2
    Click Element   xpath:/html/body/div[1]/div[2]/div[1]/button
    Click Element   xpath:/html/body/div[1]/div[2]/div[2]/button

12.Go to cart list 
    Click Element   xpath:/html/body/div[1]/header/div[2]

13.Check added menu names in cart
    FOR    ${expected}    IN    @{expected_values}
        ${xpath}    Set Variable    xpath=/html/body/div[2]/div
        ${result4}    Get Text    ${xpath}
        Log To Console    ${result4}
        Should Contain    ${result4}    ${expected}
    END

14.Add quantity of the firt item in cart
    Click Element   xpath:/html/body/div[2]/div[1]/div[1]/div[4]/span[3]

15.Check quantity of the first item in cart
    ${result5}=    Get Text    xpath=/html/body/div[2]/div[1]/div/div[4]/span[2]
    Log To Console    ${result5}
    Should Contain    ${result5}    ${EXPECT4}

16.Check price of the first item in cart 
    ${result6}=    Get Text    xpath=/html/body/div[2]/div[1]/div[1]/div[3]
        Should Contain    ${result6}    ${EXPECT5}

17.Close cart list
    Click Element   xpath:/html/body/div[2]/div[2]/button[1]

18.Reopen cart list 
    Click Element   xpath:/html/body/div[1]/header/div[2]

19.Check out 
    Click Element   xpath:/html/body/div[2]/div[2]/button[2]

20.Close the Browser
    Close All Browsers

    
    




    

    


    
      

   

*** Keywords ***
# Your other keywords, if any


