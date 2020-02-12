var gameSettings = {
    playerSpeed: 400,
    maxPowerups: 4,
    powerUpVel: 80,
  }
  
  var config = {
    width: 700,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
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
  