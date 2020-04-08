class StartScreen extends Phaser.Scene {
    constructor() {
        super("StartScreen");
    }
    
    
    preload() {
        this.load.image("background", "./assets/backgrounds/background.png");
        this.load.audio("start_screen_music", 
            ["./assets/media/start_screen/Sad Piano Music - The Last Battle (Original Composition).ogg", 
            "./assets/media/start_screen/Sad Piano Music - The Last Battle (Original Composition).mp3"]);
        let a = 5;
    }

    create() {
        // Background
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);

        // Enter Key
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Set Music Settings 
        var musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        // Music
        this.SC_music = this.sound.add("start_screen_music");
        this.SC_music.play(musicConfig);
    }

    update() {
        if (this.keyEnter.isDown) {
            this.SC_music.stop();
            this.scene.start("CutScene");
        } 
    }
}
