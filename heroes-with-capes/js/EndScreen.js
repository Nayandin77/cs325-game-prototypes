class EndScreen extends Phaser.Scene {
    constructor() {
        super("EndScreen");
    }

    preload() {
        this.load.image("background_es", "./assets/backgrounds/end_screen_background.png");
    }

    create() {
        this.background_es = this.add.tileSprite(0, 0, config.width, config.height, "background_es");
        this.background_es.setOrigin(0, 0);

        this.key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (this.key_R.isDown) {
            this.scene.start('StartScreen');
        }

    }

}