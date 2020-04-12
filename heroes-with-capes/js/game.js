var dat = {
  sky: {
    "texture": 'sky',
    "gui": 'button-1',
    "movement": 200,
    "q": "grenade",
    "e": "throw-saber",
    "ammo": 30,
    "bullet_speed": 400,
  },
  blue: {
    "texture": 'blue',
    "gui": 'button-2',
    "movement": 150,
    "q": "",
    "e": "",
    "ammo": 16,
    "bullet_speed": 500,
  },
  cupcake: {
    "texture": 'cupcake',
    "gui": 'button-3',
    "movement": 120,
    "q": "",
    "e": "",
    "ammo": 99,
    "bullet_speed": 500,
  },
  green: {
    "texture": 'green',
    "gui": 'button-4',
    "movement": 130,
    "q": "",
    "e": "",
    "ammo": 10,
    "bullet_speed": 500,
  },
  red: {
    "texture": 'red',
    "gui": 'button-5',
    "movement": 175,
    "q": "",
    "e": "",
    "ammo": 40,
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