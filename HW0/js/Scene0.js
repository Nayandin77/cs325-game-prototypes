class Scene0 extends Phaser.Scene {
    constructor() {
      super("titleScreen");
    }

    preload() {        
        this.load.image("sea", "assets/images/sea.png");

        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

        // 1.1 load sounds in both formats mp3 and ogg
        this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
        this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
        this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);
        this.load.audio("music", "assets/sounds/Barren Gates & Jon Becker - Pray That You'll Be Dead To Me.mp3");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "sea");
        this.background.setOrigin(0, 0);

        // 2.1 create music
        this.music = this.sound.add("music");

        var musicConfig = {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

    this.music.play(musicConfig);

        var graphics = this.add.graphics();
        graphics.fillStyle(0x565656, .35);
        graphics.beginPath();
        
        graphics.lineTo(150, 150);  // top left
        graphics.lineTo(550, 150); // top right
        graphics.lineTo(550, 350); // bottom right
        graphics.lineTo(150, 350); // bottom left
       
        graphics.closePath();
        graphics.fillPath();

        this.menu = this.add.bitmapText(
            config.width / 2 - 150,
            config.height / 2 - 120,
            "pixelFont",
            "    Welcome to\nIsland Protector 1",
            48 // font size
        );
        this.menu.setTint("0xF7FAFF");

        this.enter = this.add.bitmapText(
            config.width / 2 - 120,
            config.height / 2,
            "pixelFont",
            "Hit Enter to play!",
            42 // font size
        );
        this.enter.setTint("0xF7FAFF");

        this.instructions = this.add.bitmapText(
            config.width / 2 - 260,
            config.height - 110,
            "pixelFont",
            "TO MOVE: arrow keys     TO SHOOT: space bar\n\nShoot enemies and earn a high score!\nUnlimited lives & Unlimited time.",
            32 // font size
        );
        this.enter.setTint("0xF7FAFF");

        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (this.keyEnter.isDown) {
            this.scene.start("bootGame");
        } 
    }

}