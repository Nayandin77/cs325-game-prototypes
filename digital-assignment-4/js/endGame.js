class endGame extends Phaser.Scene {
    constructor() {
        super("EndGame");
    }
    
    preload() {
        this.load.image("end", "assets/end.png");
    }

    create() {
        // background of scene
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "end");
        this.background.setOrigin(0, 0);

        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (this.keyEnter.isDown) {
            this.scene.start("PlayGame");
        } 
    }
}
