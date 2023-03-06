const makeMovePawnByABot = (user) => {
    let buttonActionHtmlForBot = document.getElementById(user.buttonAction);
    buttonActionHtmlForBot.click();
    buttonActionHtmlForBot.setAttribute('disabled', true)
    console.log(user);
    console.log(buttonActionHtmlForBot)
    console.log(diceValue)

}