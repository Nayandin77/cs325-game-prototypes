var dat = {
  sky: {
    "movement": 200,
    "q": "grenade",
    "e": "throw-saber",
    "ammo": 30,
    "bullet_speed": 400,
  },
  blue: {
    "movement": 150,
    "q": "",
    "e": "",
    "ammo": 15,
    "bullet_speed": 500,
  },
  cupcake: {
    "movement": 120,
    "q": "",
    "e": "",
    "ammo": 15,
    "bullet_speed": 500,
  },
  green: {
    "movement": 130,
    "q": "",
    "e": "",
    "ammo": 15,
    "bullet_speed": 500,
  },
  red: {
    "movement": 175,
    "q": "",
    "e": "",
    "ammo": 15,
    "bullet_speed": 500,
  },
}

var config = {
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    parent: 'game',
    scene: [StartScreen, CutScene, Level0],
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade:{
          debug: false,
          debugShowVelocity: false
      }
    }
  }
  
var game = new Phaser.Game(config);