class Level0 extends Phaser.Scene {
    constructor() {
        super("Level0");
    }
    
    preload() {
        this.load.image("LEVEL_0", "./assets/maps/LEVEL_0/LEVEL_0.png");
        this.load.image("horizonal-border", "./assets/maps/LEVEL_0/horizontal_border.png");
        this.load.image("vertical-border", "./assets/maps/LEVEL_0/vertical_border.png");
        this.load.image("button", "./assets/gui/example_button.png")

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
        this.button_1 = this.add.image(800, 800,'button')//.setScrollFactor(0);
        
        // this.button_1.fi

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
        this.anims.create({
            key: "cupcake_anim",
            frames: this.anims.generateFrameNumbers("cupcake", frames[0, 1, 2]),
            frameRate: 20,
            repeat: -1
        });
        // this.anims.create({
        //     key: "cupcake_idle",
        //     frames: [{key: "cupcake", frame: 4}],
        //     frameRate: 20,
        //     repeat: -1
        // });
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
            this.player.play("sky_anim");
        } else if (this.key_2.isDown) { // blue
            this.player.texture = 'blue';
            this.player.play("blue_anim");
        } else if (this.key_3.isDown) { // cupcake
            this.player.texture = 'cupcake'; 
            this.player.play("cupcake_anim");
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
