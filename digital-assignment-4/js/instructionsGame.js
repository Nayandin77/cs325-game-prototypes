class instructionsGame extends Phaser.Scene {
    constructor() {
        super("InstructionsGame");
    }
    
    preload() {
        this.load.image("instructions", "assets/instructions.png");
    }

    create() {
        // background of scene
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "instructions");
        this.background.setOrigin(0, 0);

        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (this.keyEnter.isDown) {
            this.scene.start("PlayGame");
        } 
    }
}
