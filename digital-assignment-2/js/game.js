var gameSettings = {
    playerSpeed: 400,
    maxPowerups: 4,
    powerUpVel: 80,
  }
  
  var config = {
    width: 494,
    height: 700,
    backgroundColor: 0x000000,
    parent: 'game',
    scene: [Scene0, Scene1, Scene2, Scene3],
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
  