var config = {
    width: 600,
    height: 800,
    backgroundColor: 0x000000,
    parent: 'game',
    scene: [Load],
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