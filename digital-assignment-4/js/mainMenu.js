class mainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }
    
    preload() {
        this.load.image("background", "./assets/background.png");
        this.load.audio("chicken", ["./assets/chicken.ogg", "./assets/chicken.mp3"]);
    }

    create() {
        this.music = this.sound.add("chicken");
        var musicConfig = {
            mute: false,
            volume: 0.7,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);
        console.log(this.music);

        // background of scene
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);

        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (this.keyEnter.isDown) {
            this.scene.start("InstructionsGame");
        } 
    }
}
