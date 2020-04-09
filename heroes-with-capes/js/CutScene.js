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

        // CutScene Text 1
        this.cutSceneText = this.add.bitmapText(
            15, 250, "pixelFont", 
            "Mission: \"Heroes with Capes\" is a go.\nEarth is under attack, humans\nfrom planet X95, aliens from\nplanet Y91, and robots from Mars\nare attacking us. They have\ncombined their efforts into one.",
            22 // font size
        ); this.cutSceneText.setTint("0xF7FAFF");

        // CutScene Text 1
        this.cutSceneText = this.add.bitmapText(
            530, 250, "pixelFont", 
            "Earth is going to be destroyed\nsoon. We need to find their VIP\nand take them out. Intel reports\nthat there are the three targets\nlocated in 'London', 'New York',\nand 'Hong Kong'. Take them out",
            22 // font size
        ); this.cutSceneText.setTint("0xF7FAFF");

        

        // Enter Text
        this.enterText = this.add.bitmapText(
            config.width / 2 - 90,
            570,
            "pixelFont",
            "Hit Enter to Continue",
            28 // font size
        );
        this.enterText.setTint("0xF7FAFF");

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
