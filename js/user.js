class User {
  status = 'home'
  currentPosition = 0
  constructor(name, idAvatar, idRoad) {
    this.name = name;
    this.road = this.step(idRoad);
    this.idAvatar = idAvatar;
    this.userAvatar = `<div id="${idAvatar}" class="pawn"></div>`
  }


  step(id) {
    switch (id) {
      case 1:
        return [17, 13, 9, 5, 4, 8, 12, 16, 0, 23, 22, 21, 20, 24, 28, 32, 33, 34, 35, 2, 56, 60, 64, 68, 69, 70, 71, 67, 63, 59, 3, 52, 53, 54, 55, 51, 47, 43, 42, 41, 40, 1, 19, 15, 11, 7, 6, 10, 14, 18, 36]
        break
      case 2:
        return [31, 30, 29, 28, 32, 33, 34, 35, 2, 56, 60, 64, 68, 69, 70, 71, 67, 63, 59, 3, 52, 53, 54, 55, 51, 47, 43, 42, 41, 40, 1, 19, 15, 11, 7, 6, 5, 4, 8, 12, 16, 0, 23, 22, 21, 20, 24, 25, 26, 27, 37]

        break
      case 3:
        return [58, 62, 66, 70, 71, 67, 63, 59, 3, 52, 53, 54, 55, 51, 47, 43, 42, 41, 40, 1, 19, 15, 11, 7, 6, 5, 4, 8, 12, 16, 0, 23, 22, 21, 20, 24, 28, 32, 33, 34, 35, 2, 56, 60, 64, 68, 69, 65, 61, 57, 39]

        break
      case 4:
        return [44, 45, 46, 47, 43, 42, 41, 40, 1, 19, 15, 11, 7, 6, 5, 4, 8, 12, 16, 0, 23, 22, 21, 20, 24, 28, 32, 33, 34, 35, 2, 56, 60, 64, 68, 69, 70, 71, 67, 63, 59, 3, 52, 53, 54, 55, 51, 50, 49, 48, 38]
        break
      default:
        return []
        break;

    }
  }
}

let userA1 = new User("userA1", 'avatarUserA1', 1);
let userA2 = new User("userA2", 'avatarUserA2', 1);
let userA3 = new User("userA3", 'avatarUserA3', 1);
let userA4 = new User("userA4", 'avatarUserA4', 1);

let userB1 = new User("userB1", 'avatarUserB1', 4);
let userB2 = new User("userB2", 'avatarUserB2', 4);
let userB3 = new User("userB3", 'avatarUserB3', 4);
let userB4 = new User("userB4", 'avatarUserB4', 4);

let userC1 = new User("userC1", 'avatarUserC1', 3);
let userC2 = new User("userC2", 'avatarUserC2', 3);
let userC3 = new User("userC3", 'avatarUserC3', 3);
let userC4 = new User("userC4", 'avatarUserC4', 3);


let userD1 = new User("userD1", 'avatarUserD1', 2);
let userD2 = new User("userD2", 'avatarUserD2', 2);
let userD3 = new User("userD3", 'avatarUserD3', 2);
let userD4 = new User("userD4", 'avatarUserD4', 2);

let userA = {
  isBot: false,
  isActif: false,
  name: "userA",
  isCurrentUser: false,
  homeId: 'home-user-one',
  buttonAction: "button-user-one",
  "pawns": [userA1, userA2, userA3, userA4]
}
let userB = {
  isBot: false,
  isActif: false,
  name: "userB",
  isCurrentUser: false,
  homeId: 'home-user-two',
  buttonAction: "button-user-two",
  "pawns": [userB1, userB2, userB3, userB4]
}
let userC = {
  isBot: false,
  isActif: false,
  name: "userC",
  isCurrentUser: false,
  homeId: 'home-user-tree',
  buttonAction: "button-user-tree",
  "pawns": [userC1, userC2, userC3, userC4]
}
let userD = {
  isBot: false,
  isActif: false,
  name: "userD",
  isCurrentUser: false,
  homeId: 'home-user-four',
  buttonAction: "button-user-four",
  "pawns": [userD1, userD2, userD3, userD4]
}