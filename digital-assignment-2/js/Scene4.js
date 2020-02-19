class Scene4 extends Phaser.Scene {
    constructor() {
      super("endScreen");
    }

    preload() {
      this.load.image("alien_take_over", "assets/images/alien_take_over_1.jpg");

      // load font
      this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    }

    create() {
      // background of scene
      this.background = this.add.tileSprite(0, 0, config.width, config.height, "alien_take_over");
      this.background.setOrigin(0, 0);

      // draws box
      var graphics = this.add.graphics();
      graphics.fillStyle(0x51555B, .50);
      graphics.beginPath();
      graphics.lineTo(90,  200);  // top left
      graphics.lineTo(414, 200); // top right
      graphics.lineTo(414, 350); // bottom right
      graphics.lineTo(90,  350); // bottom left
      graphics.closePath();
      graphics.fillPath();

      // game over text
      this.gameOverText = this.add.bitmapText(
          config.width / 2 - 100,
          config.height / 2 - 120,
          "pixelFont",
          "Game Over",
          56 // font size
      );
      this.gameOverText.setTint("0xFFFFFF");

      // // score over text
      // this.gameOverText = this.add.bitmapText(
      //   config.width / 2 - 100,
      //   config.height / 2 - 80,
      //   "pixelFont",
      //   "Score: " + this.Scene.,
      //   48 // font size
      // );
      // this.gameOverText.setTint("0xFFFFFF");

      // restart text
      this.restartText = this.add.bitmapText(
        config.width / 2 - 80,
        config.height / 2 - 40,
        "pixelFont",
        "\nRestart: Ctrl+Shift R",
        22 // font size
      );
      this.restartText.setTint("0xFFFFFF");

      console.log(this.music);
      //scene.music.pause();
    }

    update() {

    }
}