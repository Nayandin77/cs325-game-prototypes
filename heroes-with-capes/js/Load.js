class Load extends Phaser.Scene {
    constructor() {
        super("Load");
    }
    
    preload() {
        this.load.image("background", "./assets/background.png");
        // this.load.audio("chicken", ["./assets/chicken.ogg", "./assets/chicken.mp3"]);
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);
    }

    update() {
        // if (this.keyEnter.isDown) {
        //     this.scene.start("InstructionsGame");
        // } 
    }
}
