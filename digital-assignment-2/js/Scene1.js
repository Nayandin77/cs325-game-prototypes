class Scene1 extends Phaser.Scene {
    constructor() {
      super("bootCutscene");
    }

    preload() {
        // load cyber_female image
        this.load.image("cyber_female_computer", "assets/images/cyber_female_computer.png");
    }

    create() {
        // background of scene
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "cyber_female_computer");
        this.background.setOrigin(0, 0);
        this.background.alpha = 0;

        // load font
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");


        this.music = this.sound.add("music");

        var musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        this.music.play(musicConfig);
        //console.log(this.music);

        // time until game begins
        this.timeInSeconds = 1630; // roughly 27.5 seconds
        this.timeInSeconds = 0;  // testing purposes
        this.text = this.add.text(config.width - 30, 10, ("%d",this.timeInSeconds));

        // setting black bar at the bottom
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(config.width, config.height);
        graphics.lineTo(config.width, config.height);
        graphics.lineTo(config.width, config.height - 120);
        graphics.lineTo(0, config.height - 120);
        graphics.lineTo(0, config.height);
        graphics.closePath();
        graphics.fillPath();

        // story text
        this.storyText = this.add.bitmapText(20, config.height - 100, "pixelFont",
            "   In the Post-Nuclear Earth, Cyber Islands are the last\nremaining surface Earth has. Now aliens are planning their\nattack to destroy Earth completely. You, Alice, is the last cyber\nfighter jet left to protect Earth. Go and defend our world.",
            20 // font size
        );
    }

    update() {
        // text displaying how much time is left before the game actualy starts
        this.text.setText((Math.floor(this.timeInSeconds / 60)));
        this.timeInSeconds--;

        if(this.background.alpha != 1) {
            this.background.alpha+=0.002;
        }

        if(this.timeInSeconds <= 0) {
            this.scene.start("bootGame");
        }

    }
}