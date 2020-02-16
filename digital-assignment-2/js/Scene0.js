class Scene0 extends Phaser.Scene {
    constructor() {
      super("titleScreen");
    }

    preload() {        
        // load cyber_female image
        this.load.image("cyber_female", "assets/images/cyber_female_sm.png");

        // load font
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

        // load sounds in both formats mp3 and ogg
        this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
        this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
        this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);
        this.load.audio("music", "assets/sounds/Straplocked - The Breakthrough (feat. MandiMae).mp3");
    }

    create() {
        // background of scene
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "cyber_female");
        this.background.setOrigin(0, 0);

        // draws box
        var graphics = this.add.graphics();
        graphics.fillStyle(0x565656, .35);
        graphics.beginPath();
        graphics.lineTo(90,  200);  // top left
        graphics.lineTo(394, 200); // top right
        graphics.lineTo(394, 350); // bottom right
        graphics.lineTo(90,  350); // bottom left
        graphics.closePath();
        graphics.fillPath();

        // text
        this.menuText = this.add.bitmapText(
            config.width / 2 - 150,
            config.height / 2 - 145,
            "pixelFont",
            "    Welcome to\nIsland Protector 2",
            42 // font size
        );
        this.menuText.setTint("0xF7FAFF");

        this.enterText = this.add.bitmapText(
            config.width / 2 - 120,
            config.height / 2 - 40,
            "pixelFont",
            "Hit Enter to play!",
            36 // font size
        );
        this.enterText.setTint("0xF7FAFF");

        this.instructionsText = this.add.bitmapText(
            config.width / 2 - 227,
            config.height - 110,
            "pixelFont",
            "TO MOVE: arrow keys\nTO SHOOT: space bar\n\nLives: 3",
            26 // font size
        );
        this.instructionsText.setTint("0xF7FAFF");

        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (this.keyEnter.isDown) {
            this.scene.start("bootCutscene");
        } 
    }

}
