


    let songStep = new Audio('songs/step.mp3');
    var dead_sound = new Audio('assets/audio/dead.mp3');
    var inout_sound = new Audio('assets/audio/inout.mp3');
    var dice_sound = new Audio('assets/audio/dice.mp3');
    var winnerSound = new Audio('assets/audio/winner.mp3');
    let safePlace = [0,1,2,3];

    let stepUserA=[17,13,9,5,4,8,12,16,0,23,22,21,20,24,28,32,33,34,35,2,52,56,60,64,65,66,67,63,59,55,3,48,49,50,51,47,43,39,38,37,36,1,19,15,11,7,6,10,14,18,"win"]
    let stepUserB=[31,30,29,28,32,33,34,35,2,52,56,60,64,65,66,67,63,59,55,3,48,49,50,51,47,43,39,38,37,36,1,19,15,11,7,6,5,4,8,12,16,0,23,22,21,20,24,25,26,27]
    let stepUserC=[54,58,62,66,67,63,59,55,3,48,49,50,51,47,43,39,38,37,36,1,19,15,11,7,6,5,4,8,12,16,0,23,22,21,20,24,24,28,32,33,34,35,2,52,56,60,64,65,61,57,53]
    let stepUserD=[40,41,42,43,39,38,37,36,1,19,15,11,7,6,5,4,8,12,16,0,23,22,21,20,24,24,28,32,33,34,35,2,52,56,60,64,65,66,67,63,59,55,3,48,49,50,51,47,46,45,44]
    
    let userA={
        name: "",
        road : stepUserA,
        idAvatart : "avatarUserA1",
        userAvatar: `<div id="avatarUserA1" class="avatarUserA1"></div>`,
        status : 'home',
        currentPosition : 0,
        isCurrentUser : false
    }
    let steps = document.getElementsByClassName('step')
    async function  userOneAction(){
        let userActionButton = document.getElementById('button-user-one');
        let randomValueForStepUser=0;
        for(let i=0;i<1; i++){
            randomValueForStepUser =getRandomInt(6)
            userActionButton.innerText=randomValueForStepUser;
            await sleep(200)
        }
        step = randomValueForStepUser;
        stepsMove(userA,step)
    }
    // let robot=setInterval(()=>{
    //     userActionA()
    // },5000)

    function getRandomInt(max) {
        min = Math.ceil(1);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
        return 1;
      }
    document.getElementById('home-user-One').innerHTML =userA.userAvatar;
    for(let i=0; i<steps.length; i++){
        const para = document.createElement("p");
        const node = document.createTextNode("This is a paragraph.");
        steps[i].textContent=i;
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