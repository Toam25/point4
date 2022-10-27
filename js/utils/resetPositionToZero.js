function resetPosition(user){
    document.getElementById(user.idAvatart).remove();
    user.currentPosition=0
    user.status="home"
    document.getElementById('home-user-One').innerHTML =userA.userAvatar;
 }