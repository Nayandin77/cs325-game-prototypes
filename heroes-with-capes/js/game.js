var dat = {
  sky: {
    "movement": 500,
    "q": "grenade",
    "e": "kill-all",
    "ammo": 30,
    "animations": "",
    "bullet_speed": 400,
  }
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