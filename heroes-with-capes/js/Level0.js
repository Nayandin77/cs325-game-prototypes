class Level0 extends Phaser.Scene {
    constructor() {
        super("Level0");
    }
    
    preload() {
        this.load.image("LEVEL_0", "./assets/maps/LEVEL_0/LEVEL_0.png");
        this.load.image("horizonal-border", "./assets/maps/LEVEL_0/horizontal_border.png");
        this.load.image("vertical-border", "./assets/maps/LEVEL_0/vertical_border.png");
        this.load.image('bullet', 'assets/spritesheets/bullets/bullet6.png');
        this.load.image('target', 'assets/spritesheets/reticle.png');

        // GUI Preload
        this.load.image("button-1", "./assets/gui/no_white/character_button_1.png");
        this.load.image("button-2", "./assets/gui/no_white/character_button_2.png");
        this.load.image("button-3", "./assets/gui/no_white/character_button_3.png");
        this.load.image("button-4", "./assets/gui/no_white/character_button_4.png");
        this.load.image("button-5", "./assets/gui/no_white/character_button_5.png");
        this.load.image("Q0E0", "./assets/gui/no_white/Q_0_E_0.png");
        this.load.image("Q1E0", "./assets/gui/no_white/Q_1_E_0.png");
        this.load.image("Q0E1", "./assets/gui/no_white/Q_0_E_1.png");
        this.load.image("Q1E1", "./assets/gui/no_white/Q_1_E_1.png");

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
        this.character_button = this.physics.add.sprite(800, 1050, 'button-1').setScale(.75,.75);
        this.special_button = this.physics.add.sprite(1100, 950, 'Q1E1').setScale(.75,.75);

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
        // this.key_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // Add 2 groups for Bullet objects
        this.playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
        this.reticle = this.physics.add.sprite(800, 700, 'target');
        this.hp1 = this.add.image(-350, -250, 'target').setScrollFactor(0.5, 0.5);
        this.hp2 = this.add.image(-300, -250, 'target').setScrollFactor(0.5, 0.5);
        this.hp3 = this.add.image(-250, -250, 'target').setScrollFactor(0.5, 0.5);

        this.reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25);
        this.hp1.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        this.hp2.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        this.hp3.setOrigin(0.5, 0.5).setDisplaySize(50, 50);

        // Set camera properties
        this.cameras.main.startFollow(this.player);

        // Fires bullet from player on left click of mouse
        this.input.on('pointerdown', function (pointer, time, lastFired) {
            if (this.player.active === false)
                return;

            // Get bullet from bullets group
            var bullet = this.playerBullets.get().setActive(true).setVisible(true);

            if (bullet) {
                bullet.fire(this.player, this.reticle);
                // this.physics.add.collider(enemy, bullet, enemyHitCallback);
            }
        }, this);


        // Pointer lock will only work after mousedown
        game.canvas.addEventListener('mousedown', function () {
            game.input.mouse.requestPointerLock();
        });

        // Move reticle upon locked pointer move
        this.input.on('pointermove', function (pointer) {
            if (this.input.mouse.locked)
            {
                this.reticle.x += pointer.movementX;
                this.reticle.y += pointer.movementY;
            }
        }, this);

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
        this.cameras.main.setBounds(0,0,1600,1600);
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

        // Update Character & GUI
        if (this.key_1.isDown) { // sky
            this.player.texture = 'sky';
            this.player.data = dat.sky;
            this.player.play("sky_anim");
            this.character_button.setTexture('button-1');
        } else if (this.key_2.isDown) { // blue
            this.player.texture = 'blue';
            this.player.play("blue_anim");
            this.character_button.setTexture('button-2');
        } else if (this.key_3.isDown) { // cupcake
            this.player.texture = 'cupcake'; 
            this.player.play("cupcake_anim");
            this.character_button.setTexture('button-3');
        } else if (this.key_4.isDown) { // green
            this.player.texture = 'green'; 
            this.player.play("green_anim");
            this.character_button.setTexture('button-4');
        } else if (this.key_5.isDown) { // red
            this.player.texture = 'red'; 
            this.player.play("red_anim");
            this.character_button.setTexture('button-5');
        }

        // Rotates player to face towards reticle
        this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y);

        // Make reticle move with player
        this.reticle.body.velocity.x = this.player.body.velocity.x;
        this.reticle.body.velocity.y = this.player.body.velocity.y;

        // Make buttons move with player
        this.character_button.body.velocity.x = this.player.body.velocity.x;
        this.character_button.body.velocity.y = this.player.body.velocity.y;
        this.special_button.body.velocity.x = this.player.body.velocity.x;
        this.special_button.body.velocity.y = this.player.body.velocity.y;
        

        // Constrain position of constrainReticle
        this.constrainReticle(this.reticle);
    }

    constrainReticle (reticle) {
        var distX = reticle.x-this.player.x; // X distance between player & reticle
        var distY = reticle.y-this.player.y; // Y distance between player & reticle

        // Ensures reticle cannot be moved offscreen (player follow)
        if (distX > 800)
            reticle.x = this.player.x+800;
        else if (distX < -800)
            reticle.x = this.player.x-800;

        if (distY > 600)
            reticle.y = this.player.y+600;
        else if (distY < -600)
            reticle.y = this.player.y-600;
    }
}
