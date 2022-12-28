
let playersIdentity = ['Pas de joeur', 'Human'/*, 'Robot'*/]
let userActifList = [];
let indiceKeyUserActiflist = 0
let userTypeA = 1;
let userTypeB = 1;
let userTypeC = 1;
let userTypeD = 1;
let userActif;
let diceValue;
let pawnSelected;
let songStep = new Audio('songs/step.mp3');
var dead_sound = new Audio('assets/audio/dead.mp3');
var inout_sound = new Audio('assets/audio/inout.mp3');
var dice_sound = new Audio('songs/dice.mp3');
var winnerSound = new Audio('assets/audio/winner.mp3');
let safePlace = [0, 1, 2, 3];
let isSwitchToNextUser = true
let buttonActions;
let divElementUserActif;
let lastDiceValue = 0;
let showDiceFaceTemporary;
const PAWN_SIZE = 4;
const ROAD_SIZE=51.

function dice() {
    diceValue = getRandomInt(6)
    dice_sound.play()
    document.getElementById(userActif.buttonAction).innerText = diceValue;
    checkIfPawnCanMoveAndMakeItToVisible(diceValue)
}
const checkIfPawnCanMoveAndMakeItToVisible = (diceValue) => {
    let pawnsUserActif = userActif.pawns;
    let isPawnCanMove = false;
    if (diceValue == 1) {
        isSwitchToNextUser = false;
    }
    for (const pawnUserActif of pawnsUserActif) {
        if ((diceValue == 1 || pawnUserActif.status == "free") && pawnUserActif.currentPosition + diceValue < pawnUserActif.road.length + 1) {
            setPawnVisible(pawnUserActif)
            isPawnCanMove = true
        }
    }
    if (!isPawnCanMove) {
        switchToNextUser();
    }
}

const setPawnVisible = (pawnUserActif) => {
    document.getElementById(pawnUserActif.idAvatar).classList.add('canMove')
    document.getElementById(pawnUserActif.idAvatar).removeAttribute('disabled')
}
const resetAllPawnsVisibility = () => {
    for (const pawnDivElement of document.getElementsByClassName('pawn')) {
        pawnDivElement.classList.remove('canMove')
        pawnDivElement.setAttribute('disabled', true)
    }
}
function validateSelection() {

    if (userTypeA == 1 || userTypeA == 2) {
        userA.isActif = true;
        if (userTypeA == 2) userA.isBot = true
    }
    else {
        document.getElementById('button-user-one').classList.add('hidden')
    }

    if (userTypeB == 1 || userTypeB == 2) {
        userB.isActif = true;
        if (userTypeB == 2) userB.isBot = true
    }
    else {
        document.getElementById('button-user-two').classList.add('hidden')
    }

    if (userTypeC == 1 || userTypeC == 2) {
        userC.isActif = true;
        if (userTypeC == 2) userC.isBot = true
    }
    else {
        document.getElementById('button-user-tree').classList.add('hidden')
    }

    if (userTypeD == 1 || userTypeD == 2) {
        userD.isActif = true;
        if (userTypeA == 2) userA.isBot = true
    }
    else {
        document.getElementById('button-user-four').classList.add('hidden')
    }
    initPlayer(() => {
        // hide window control
        document.getElementsByClassName('container-control')[0].classList.add('hidden')
        divElementUserActif = document.getElementById(userActif.buttonAction).classList.add('active')
    })
}
function initPlayer(callback) {

    if (userA.isActif) {
        placePawnsForUserActifInHome(userA)
        userActifList.push(userA)
    }
    if (userB.isActif) {
        placePawnsForUserActifInHome(userB)
        userActifList.push(userB)
    }
    if (userC.isActif) {
        placePawnsForUserActifInHome(userC)
        userActifList.push(userC)
    }
    if (userD.isActif) {
        placePawnsForUserActifInHome(userD)
        userActifList.push(userD)
    }
    //check if number or player > 0
    if (userActifList.length >= 1) {
        userActifList[indiceKeyUserActiflist].isCurrentUser = true;
        resetAllPawnsVisibility()
        setCurentUserActif(userActifList[indiceKeyUserActiflist]);
        userActif = userActifList[indiceKeyUserActiflist];
        for (const userInlistActif of userActifList) {
            for (const pawn of userInlistActif.pawns) {
                document.getElementById(pawn.idAvatar).addEventListener('click', (e) => {
                    pawnSelected = getPawnByDivElement(pawn.idAvatar);
                    resetAllPawnsVisibility()
                    stepsMove(pawnSelected, diceValue)
                })
            }
        }
        callback();
    }
    else {
        alert("Selectionner deux jusqu'à quatre joeurs")
    }
}

function getPawnByDivElement(id) {
    for (const pawn of userActif.pawns) {
        if (pawn.idAvatar === id) {
            return pawn
        }
    }
}
function updateUser(user, pawnsIds = [], isActif = false, isBot = false, status = "home", currentPosition = 0, isCurrentUser = false) {
    if (user.isActif) {
        let pawn;
        for (const pawnsId of pawnsIds) {
            pawn = user.pawns[pawnsId - 1]
            pawn.status = status
            pawn.currentPosition = currentPosition
            if (currentPosition == 0) {
                document.getElementById(pawn.idAvatar).remove()
            }
        }
    }
    user.isActif = isActif;
    user.isBot = isBot;
    user.isCurrentUser = isCurrentUser;
}


async function stepsMove(user, step) {
    let currentPosition = user.currentPosition;
    let avatar = document.getElementById(user.idAvatar);
    let position;
    user.status = "free"
    for (let j = 0; j < step; j++) {

        if (user.road.length >= currentPosition + step) {
            if (j + currentPosition < user.road.length) {
                position = user.road[j + currentPosition]
                document.getElementsByClassName('step')[position].append(avatar);
                user.currentPosition = j + currentPosition
                user.currentPosition += 1
                songStep.play()
                await sleep(500)
            }

        }
        else {
            break
        }
    }
    for (const userInList of userActifList) {
        if (userActif === userInList) {
            continue;
        }
        else {
            for (const i of userActif.pawns) {
                for (const j of userInList.pawns) {
                    if (i.road[i.currentPosition] == j.road[j.currentPosition]) {

                        if (!safePlace.includes(j.road[j.currentPosition - 1])) {
                            while (j.currentPosition != 0) {
                                document.getElementsByClassName('step')[j.road[j.currentPosition - 1]].append(document.getElementById(j.idAvatar));
                                j.currentPosition -= 1
                                await sleep(100)
                            }
                            document.getElementById(userInList.homeId).append(document.getElementById(j.idAvatar))
                            isSwitchToNextUser = false;
                        }
                        j.status = "home"
                        dead_sound.play()
                    }
                    else {
                        continue
                    }
                }
            }
        }
    }
    resetAllPawnsVisibility()
    setNumberOfJourneysTraveledPerCent()

    if (isSwitchToNextUser) {
        switchToNextUser()
    }
    else {
        isSwitchToNextUser = true
    }
}
function setNumberOfJourneysTraveledPerCent(){
    let tempValue=0;
    let roadTotalSize=PAWN_SIZE*ROAD_SIZE
    userActif.pawns.forEach(pawn => {
        tempValue=pawn.currentPosition+tempValue;
        console.log("value" , tempValue);
    });
    console.log(userActif)
    console.log("value total" ,tempValue)
    console.log("value divise" ,Math.round(tempValue/roadTotalSize*100))
    document.getElementById(mapUserToColor(userActif)).innerText=Math.round(tempValue/roadTotalSize*100)+"%"
}
function switchToNextUser() {
    ++indiceKeyUserActiflist;
    //set Indice of user to next user
    if (userActifList.length - 1 < indiceKeyUserActiflist) {
        indiceKeyUserActiflist = 0
    }
    // set nex user 
    userActif = userActifList[indiceKeyUserActiflist]

    //set button next user 
    buttonActions = document.getElementsByClassName('action');
    //disable all button user
    disableButtonElement(buttonActions)
    //actif next button user
    divElementUserActif = document.getElementById(userActif.buttonAction);
    divElementUserActif.disabled = false
    divElementUserActif.classList.add('active')
    //make pawn user actif visible  
    removePawnsUserDivElementToFront();
    makePawnsUserDivElementToFront();

}

const makePawnsUserDivElementToFront = () => {
    for (const pawnUserActifDivElement of userActif.pawns) {
        document.getElementById(pawnUserActifDivElement.idAvatar).classList.add('zIndexMax')
    }
}
const removePawnsUserDivElementToFront = () => {
    for (const pawnUserActifDivElement of document.getElementsByClassName('pawn')) {
        pawnUserActifDivElement.classList.remove('zIndexMax')
    }
}
function disableButtonElement(buttons) {
    for (const buttonAction of buttonActions) {
        buttonAction.setAttribute('disabled', true)
        buttonAction.classList.remove('active')
    }
}
function resetPosition(user) {
    document.getElementById(user.idAvatart).remove();
    user.currentPosition = 0
    user.status = "hom"
    document.getElementById('home-user-One').innerHTML = userA.userAvatar;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function contentInitial(classInitialAvatar, avatar) {
    return `<div class="${classInitialAvatar}">${avatar}</div>`;
}
function getRandomInt(max = 7) {
    min = Math.ceil(1);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function setCurentUserActif(user) {
    let currenUser = document.getElementById(user.buttonAction)
    document.getElementsByClassName('action')[0].setAttribute('disabled', '')
    document.getElementsByClassName('action')[1].setAttribute('disabled', '')
    document.getElementsByClassName('action')[2].setAttribute('disabled', '')
    document.getElementsByClassName('action')[3].setAttribute('disabled', '')
    currenUser.removeAttribute('disabled', '')

}
function placePawnsForUserActifInHome(user) {
    for (i = 0; i < PAWN_SIZE; i++) {
        document.getElementById(user.homeId).insertAdjacentHTML('beforeend', user.pawns[i].userAvatar);
    }
}
function leave() {
    window.location = "/"
}
function selectPlayer(user) {
    const typeUserMax = playersIdentity.length - 1
    switch (user) {
        case "userA":
            userTypeA = userTypeA < typeUserMax ? ++userTypeA : 0;
            document.getElementById('purple-player').innerText = playersIdentity[userTypeA];
            break;
        case "userB":
            userTypeB = userTypeB < typeUserMax ? ++userTypeB : 0;
            document.getElementById('green-player').innerText = playersIdentity[userTypeB];
            break;
        case "userC":
            userTypeC = userTypeC < typeUserMax ? ++userTypeC : 0;
            document.getElementById('pink-player').innerText = playersIdentity[userTypeC];
            break;
        case "userD":
            userTypeD = userTypeD < typeUserMax ? ++userTypeD : 0;
            document.getElementById('blue-player').innerText = playersIdentity[userTypeD];
            break;

        default:
            break;
    }

}
function viewInstru() {
    document.getElementById('modal').classList.remove('hidden')
}
const hideInstru = () => {
    document.getElementById('modal').classList.add('hidden')
}
function mapUserToColor(user){
    switch (user.name) {
        case "userA":
            return "yellow"
        break;
        case "userB":
            return "green"
        break;
        case "userC":
            return "red"
        break;
        case "userD":
            return "blue"
        break;
    }
}