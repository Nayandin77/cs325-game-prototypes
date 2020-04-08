class CutScene extends Phaser.Scene {
    constructor() {
        super("CutScene");
    }
    
    preload() {
        this.load.image("cut_scene", "./assets/backgrounds/cut_scene_background.jpg");
        this.load.audio("cut_scene", 
            ["./assets/media/cut_scene/Sad Strings - War Original Composition.ogg", 
            "./assets/media/cut_scene/Sad Strings - War Original Composition.mp3"]);
    }

    create() {
        // Background
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "cut_scene");
        this.background.setOrigin(0, 0);

        // Enter Key
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Set Music Settings 
        var musicConfig = {
            mute: false,
            volume: 0.4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        // Music
        this.CS_music = this.sound.add("cut_scene");
        this.CS_music.play(musicConfig);
    }

    update() {
        if (this.keyEnter.isDown) {
            this.CS_music.stop();
            this.scene.start("Level0");
        } 
    }
}
