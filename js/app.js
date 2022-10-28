
let playersIdentity = ['Pas de joeur', 'Personne', 'Robot']
let steps = document.getElementsByClassName('step')
let userActifList=[];
let userTypeA = 1;
let userTypeB = 1;
let userTypeC = 1;
let userTypeD = 1;
let userActif;
let diceValue;
let songStep = new Audio('songs/step.mp3');
    var dead_sound = new Audio('assets/audio/dead.mp3');
    var inout_sound = new Audio('assets/audio/inout.mp3');
    var dice_sound = new Audio('assets/audio/dice.mp3');
    var winnerSound = new Audio('assets/audio/winner.mp3');
    let safePlace = [0,1,2,3];
const PAWN_SIZE = 4;

function dice (){
    diceValue=getRandomInt()
    document.getElementById(userActif.buttonAction).innerText=diceValue
    stepsMove(userActif.pawns[0],diceValue)
}






function selectPlayer(user) {
    switch (user) {
        case "userA":
            userTypeA = userTypeA < 2 ? ++userTypeA : 0;
            document.getElementById('purple-player').innerText = playersIdentity[userTypeA];
            break;
        case "userB":
            userTypeB = userTypeB < 2 ? ++userTypeB : 0;
            document.getElementById('green-player').innerText = playersIdentity[userTypeB];
            break;
        case "userC":
            userTypeC = userTypeC < 2 ? ++userTypeC : 0;
            document.getElementById('pink-player').innerText = playersIdentity[userTypeC];
            break;
        case "userD":
            userTypeD = userTypeD < 2 ? ++userTypeD : 0;
            document.getElementById('blue-player').innerText = playersIdentity[userTypeD];
            break;

        default:
            break;
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
    initPlayer(()=>{
        document.getElementsByClassName('container-control')[0].classList.add('hidden')
    })
}
function initPlayer(callback){
    
     if(userA.isActif){
        placePawnsForUserActifInHome(userA)
        userActifList.push(userA)
     }
     if(userB.isActif){
        placePawnsForUserActifInHome(userB)
        userActifList.push(userB)
     }
     if(userC.isActif){
        placePawnsForUserActifInHome(userC)
        userActifList.push(userC)
     }
     if(userD.isActif){
        placePawnsForUserActifInHome(userD)
        userActifList.push(userD)
     }
     //check if number or player > 0
     if(userActifList.length>1){
        userActifList[0].isCurrentUser=true;
        setCurentUserActif(userActifList[0]);
        userActif=userActifList[0];
        callback();
     }
     else{
        alert("Selectionner deux jusqu'à quatre joeurs")
     }
}
function placePawnsForUserActifInHome(user){
    for (i= 0; i < PAWN_SIZE; i++) {
        document.getElementById(user.homeId).insertAdjacentHTML('beforeend',user.pawns[i].userAvatar);
    }
}
function leave() {
    document.getElementsByClassName('container-control')[0].classList.remove('hidden')
    resetSelectePlayer()
    updateUser(userA,true,[1,2,3,4]);
    updateUser(userB,true,[1,2,3,4]);
    updateUser(userC,true,[1,2,3,4]);
    updateUser(userD,true,[1,2,3,4]);
 
}
function updateUser(user,pawnsIds=[],isActif=false,isBot=false,status="home",currentPosition=0,isCurrentUser=false) {
    if(user.isActif){
        let pawn;
        for (const pawnsId of pawnsIds) {
            pawn=user.pawns[pawnsId-1]
            pawn.status = status
            pawn.currentPosition=currentPosition
            if(currentPosition==0){
                document.getElementById(pawn.idAvatar).remove()
            }
        }
    }
    user.isActif = isActif;
    user.isBot = isBot;
    user.isCurrentUser = isCurrentUser;
}
function resetSelectePlayer(){
        userTypeA = 1;
        userTypeB = 1;
        userTypeC = 1;
        userTypeD = 1;
        userActifList=[]
        document.getElementById('purple-player').innerText = playersIdentity[userTypeA];
        document.getElementById('green-player').innerText = playersIdentity[userTypeB];
        document.getElementById('pink-player').innerText = playersIdentity[userTypeC];
        document.getElementById('blue-player').innerText = playersIdentity[userTypeD];
 
}
function setCurentUserActif(user){
    let currenUser = document.getElementById(user.buttonAction)
    document.getElementsByClassName('action')[0].setAttribute('disabled','')
    document.getElementsByClassName('action')[1].setAttribute('disabled','')
    document.getElementsByClassName('action')[2].setAttribute('disabled','')
    document.getElementsByClassName('action')[3].setAttribute('disabled','')
    currenUser.removeAttribute('disabled','')
    
}
function getRandomInt(max=7) {
    min = Math.ceil(1);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    return 1;
}

async function stepsMove (user,step){
    
    let currentPosition=user.currentPosition;

    if(user.status=="free"){
        for(let j=0;j<step; j++){
            if(user.road.length===currentPosition+step){
                console.log('egale')
                document.getElementById(user.idAvatart).remove();

                console.log("user.road.length",user.road.length)
                console.log("currentPosition+step",currentPosition+step)
                console.log("currentPosition+j",currentPosition+j)
                if(user.road.length==currentPosition+j){
                     document.getElementById('arrived-user-one').insertAdjacentHTML('beforeend',user.userAvatar)
                     winnerSound.play()
                     alert("you win");
                    break;
                }
                else{
                    steps[user.road[j+currentPosition]].insertAdjacentHTML('beforeend',user.userAvatar);
                }
                songStep.play()
                resetPosition(user)
                // clearInterval(robot)
            }
            else if(user.road.length>currentPosition+step){
                  if(j+currentPosition>user.road.length){
                        console.log('pas assez');
                        break;
                    }
                    else{
                          document.getElementById(user.idAvatart).remove();
                          steps[user.road[j+currentPosition]].insertAdjacentHTML('beforeend',user.userAvatar);
                          user.currentPosition=j+currentPosition
                    }
                    user.currentPosition+=1
                    songStep.play()
                    await sleep(500)
            }
          
        }
    }
    else if(step==1){
        user.status="free"
        user.currentPosition=1;
        songStep.play()
        console.log(user.idAvatar)
        document.getElementById(user.idAvatart).remove();
        steps[user.road[0]].insertAdjacentHTML('beforeend',user.userAvatar);
    }

     console.log("user.road.endd finale ",user.currentPosition)
}
 
 function resetPosition(user){
    document.getElementById(user.idAvatart).remove();
    user.currentPosition=0
    user.status="hom"
    document.getElementById('home-user-One').innerHTML =userA.userAvatar;
 }
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}