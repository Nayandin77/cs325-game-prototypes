var dat = {
  player: {
    "health": 5,
  },
  enemy_human: {
    "health": 3,
    "movement": 200,
    "time": 1000,
    "bullet": 'enemy-human-bullet',
  },
  enemy_robot: {
    "health": 5,
    "movement": 150,
    "time": 1500,
    "bullet": 'enemy-robot-bullet',
  },
  enemy_alien: {
    "health": 4,
    "movement": 250,
    "time": 850,
    "bullet": 'enemy-alien-bullet',
  },
  sky: {
    "name": 'Sky',
    "texture": 'sky',
    "bullet": 'bullet-sky',
    "gui": 'button-1',
    "movement": 200,
    "q": "grenade",
    "e": "throw-saber",
    "ammo": 30,
    "bullet_speed": 400,
  },
  blue: {
    "name": 'Blue',
    "texture": 'blue',
    "bullet": 'bullet-blue',
    "gui": 'button-2',
    "movement": 150,
    "q": "",
    "e": "",
    "ammo": 16,
    "bullet_speed": 500,
  },
  cupcake: {
    "name": 'Cupcake',
    "texture": 'cupcake',
    "bullet": 'bullet-cupcake',
    "gui": 'button-3',
    "movement": 120,
    "q": "",
    "e": "",
    "ammo": 99,
    "bullet_speed": 500,
  },
  green: {
    "name": 'Green',
    "texture": 'green',
    "bullet": 'bullet-green',
    "gui": 'button-4',
    "movement": 130,
    "q": "",
    "e": "",
    "ammo": 10,
    "bullet_speed": 500,
  },
  red: {
    "name": 'Red',
    "texture": 'red',
    "bullet": 'bullet-red',
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
    scene: [StartScreen, CutScene, Level0, EndScreen],
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
          debug: false,
          debugShowVelocity: false
      }
    }
  }
  
var game = new Phaser.Game(config);