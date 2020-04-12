class EndScreen extends Phaser.Scene {
    constructor() {
        super("EndScreen");
    }

    preload() {
        this.load.image("background", "./assets/backgrounds/background.png");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    }

    update() {

    }

}