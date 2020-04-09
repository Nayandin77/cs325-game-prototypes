class Level0 extends Phaser.Scene {
    constructor() {
        super("Level0");
    }
    
    preload() {
        this.load.image("LEVEL_0", "./assets/maps/LEVEL_0/LEVEL_0.png");
        this.load.image("horizonal-border", "./assets/maps/LEVEL_0/horizontal_border.png");
        this.load.image("vertical-border", "./assets/maps/LEVEL_0/vertical_border.png");
        // this.load.image("button", "./assets/gui/example_button.png")

        // this.load.audio("start_screen_music", 
        //     ["./assets/media/start_screen/Sad Piano Music - The Last Battle (Original Composition).ogg", 
        //     "./assets/media/start_screen/Sad Piano Music - The Last Battle (Original Composition).mp3"]);

        this.load.spritesheet("sky", "./assets/spritesheets/sky.png",{
            frameWidth: 30,
            frameHeight: 47
        });
        this.load.spritesheet("blue", "./assets/spritesheets/blue_temp.png",{
            frameWidth: 30,
            frameHeight: 47
        });
        this.load.spritesheet("cupcake", "./assets/spritesheets/cupcake_trans.png",{
            frameWidth: 28,
            frameHeight: 48
        });
        this.load.spritesheet("red", "./assets/spritesheets/red_temp.png",{
            frameWidth: 30,
            frameHeight: 47
        });
        this.load.spritesheet("green", "./assets/spritesheets/green_temp.png",{
            frameWidth: 30,
            frameHeight: 47
        });

        this.load.spritesheet("beam", "./assets/spritesheets/beam.png",{
            frameWidth: 16,
            frameHeight: 16
        });
    }

    create() {
        
        /* MAP DESIGN */

        // Background
        this.background = this.add.tileSprite(0, 0, 1600, 1600, "LEVEL_0");
        this.background.setOrigin(0, 0);

        // // Obstacles  fix
        // var walls = this.add.group();
        // walls.enableBody = true;
        // walls.immovable = true;
        
        // border.body.immovable = true;

        /* GUI DESIGN */
        // this.button_1 = this.add.image(800, 800,'button')//.setScrollFactor(0);
    

        /* ANIMATION */
        this.anims.create({ // sky's animation
            key: "sky_anim",
            frames: this.anims.generateFrameNumbers("sky"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "blue_anim",
            frames: this.anims.generateFrameNumbers("blue"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({ // sky's animation
            key: "red_anim",
            frames: this.anims.generateFrameNumbers("red"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "green_anim",
            frames: this.anims.generateFrameNumbers("green"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "cupcake_anim", // _idle
            frames: [{ key: "cupcake", frame: 3 }],
            frameRate: 20,
            repeat: -1
        });
        // this.anims.create({
        //     key: "cupcake_left",
        //     frames: this.anims.generateFrameNumbers("cupcake", { start: 0, end: 3}),
        //     frameRate: 20,
        //     repeat: -1
        // });
        // this.anims.create({
        //     key: "cupcake_right",
        //     frames: this.anims.generateFrameNumbers("cupcake", { start: 4, end: 7}),
        //     frameRate: 20,
        //     repeat: -1
        // });
        this.anims.create({
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate: 20,
            repeat: -1
        });

        this.player = this.physics.add.sprite(800, 800, 'sky'); //default character loads 'sky'
        this.player.data = dat.sky;
        this.player.play("sky_anim");
        this.player.enableBody();
        // this.player.setCollideWorldBounds(true, 2000, 2000);


        this.projectiles = this.add.group();

        /* CONTROLS */

        // Movement Controls
        this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // Special Controls
        this.key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Changing Character Controls
        this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.key_4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        this.key_5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);

        // Reload Key
        this.key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Shoot Key
        this.key_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // // Set Music Settings 
        // var musicConfig = {
        //     mute: false,
        //     volume: 0.5,
        //     rate: 1,
        //     detune: 0,
        //     seek: 0,
        //     loop: false,
        //     delay: 0
        // }

        // // Music
        // this.SC_music = this.sound.add("start_screen_music");
        // this.SC_music.play(musicConfig);
    }

    update() {
        window.scene = this; // testing purposes
        
        // Camera
        this.cameras.main.setBounds(0,0,2000,2000);
        this.cameras.main.startFollow(this.player);
            

        // Update Movement
        if (this.key_left.isDown) { //  Move Left
            this.player.body.velocity.x = -200;
            this.player.body.velocity.y = 0;
        } else if (this.key_right.isDown) { //  Move Right
            this.player.body.velocity.x = 200;
            this.player.body.velocity.y = 0; 
            // player.animations.play('right');
        } else if (this.key_up.isDown) { //  Move  Up
            this.player.body.velocity.x = 0; 
            this.player.body.velocity.y = -200;
        } else if (this.key_down.isDown) { //  Move Down
            this.player.body.velocity.x = 0; 
            this.player.body.velocity.y = 200; 
        } else { //  Stand still
            this.player.body.velocity.x = 0; 
            this.player.body.velocity.y = 0; 
        }

        // Update Character
        if (this.key_1.isDown) { // sky
            this.player.texture = 'sky';
            this.player.data = dat.sky;
            this.player.play("sky_anim");
        } else if (this.key_2.isDown) { // blue
            this.player.texture = 'blue';
            this.player.play("blue_anim");
        } else if (this.key_3.isDown) { // cupcake
            this.player.texture = 'cupcake'; 
            this.player.play("cupcake_anim");
        } else if (this.key_4.isDown) { // cupcake
            this.player.texture = 'cupcake'; 
            this.player.play("green_anim");
        } else if (this.key_5.isDown) { // cupcake
            this.player.texture = 'cupcake'; 
            this.player.play("red_anim");
            console.log("hi");
        }

        // Shoot
        if (this.key_space.isDown) {
            if (this.key_left.isDown)
                this.shootBeam('L');
            if (this.key_right.isDown)
                this.shootBeam('R');
            if (this.key_up.isDown)
                this.shootBeam('U');
            if (this.key_down.isDown || !this.key_up.isDown) {
                this.shootBeam('D');
            }
        }

        
    }

    shootBeam(letter) {
        var beam = new Beam(this);
        switch(letter) {
            case 'L': // left
                // beam.body.velocity.x = -500;
                // beam.body.velocity.y = 0;
                beam.rotation = 90;
            case 'R': // right
                beam.body.velocity.x = 500;
                beam.body.velocity.y = 0;
            case 'U': // up
                beam.body.velocity.x = 0;
                beam.body.velocity.y = -500;
            case 'D': // down
                beam.body.velocity.x = 0;    
                beam.body.velocity.y = 500;
            default:
                beam.body.velocity.x = 0;
                beam.body.velocity.y = -500;
                console.log(beam);
        }
    }
}
