class StartScreen extends Phaser.Scene {
    constructor() {
        super("StartScreen");
    }
    
    
    preload() {
        this.load.image("background", "./assets/backgrounds/background.png");
        this.load.audio("start_screen_music", 
            ["./assets/media/start_screen/Sad Piano Music - The Last Battle (Original Composition).ogg", 
            "./assets/media/start_screen/Sad Piano Music - The Last Battle (Original Composition).mp3"]);
        this.load.bitmapFont("pixelFont", "./assets/font/font.png", "assets/font/font.xml");
    }

    create() {
        // Background
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);

        // Title Box
        var graphics = this.add.graphics();
        graphics.fillStyle(0x565656, .55);
        graphics.beginPath();
        graphics.lineTo(100,  50);  // top left
        graphics.lineTo(700, 50); // top right
        graphics.lineTo(700, 150); // bottom right
        graphics.lineTo(100,  150); // bottom left
        graphics.closePath();
        graphics.fillPath();

        // Title Text
        this.menuText = this.add.bitmapText(
            config.width / 2 - 200,
            80,
            "pixelFont",
            "Heroes with Capes",
            60 // font size
        ); this.menuText.setTint("0xF7FAFF");

        // Enter Text
        this.enterText = this.add.bitmapText(
            config.width / 2 - 100,
            570,
            "pixelFont",
            "Hit Enter to Play",
            36 // font size
        );
        this.enterText.setTint("0xF7FAFF");

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
