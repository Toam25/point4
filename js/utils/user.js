class User {
    status ='home';
    currentPosition = 0;
    isCurrentUser=false;

    constructor(name,idAvatar,userAvatar,roadId){
        console.log(idAvatar)
            this.road=road(roadId)
            this.idAvatar=idAvatar
            this.name=name
            this.userAvatar=userAvatar
    }

    getName(){
       return  this.name;
    }
    setName(name){
        this.name=name
    };

    getStatus(){
        return  this.status;
     }
     setStatus(status){
         this.status=status
     };
     
     getIsCurrentUser(){
        return  this.isCurrentUser;
     }
     setIsCurrentUser(isCurrentUser){
         this.isCurrentUser=isCurrentUser
     };
     getCurrentPosition(){
        return  this.currentPosition;
     }
     setCurrentPosition(currentPosition){
         this.currentPosition=currentPosition
     };
    
 
    
     getDivUserAvatar(){
        return  this.userAvatar;
     }
     setDivUserAvatar(divUserAvatar){
         this.userAvatar=divUserAvatar
     };

     getIdAvatarInHtml(){
        return  this.idAvatar;
     }
     setIdAvatarInHtml(idAvatar){
         this.idAvatar=idAvatar
     };

     getRoad(){
        return  this.road;
     }
     setRoad(road){
         this.road=road
     };
}