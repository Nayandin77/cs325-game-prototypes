class Level0 extends Phaser.Scene {
    constructor() {
        super("Level0");
    }
    
    preload() {
        /* Map ..................................................... */
        this.load.image("LEVEL_0", "./assets/maps/LEVEL_0/LEVEL_0.png");
        this.load.image("horizonal-border", "./assets/maps/LEVEL_0/horizontal_border.png");
        this.load.image("vertical-border", "./assets/maps/LEVEL_0/vertical_border.png");

        /* GUI ..................................................... */
        this.load.image("gui-background", "./assets/gui/gui_background.png");
        this.load.image("button-1", "./assets/gui/character_button_1.png");
        this.load.image("button-2", "./assets/gui/character_button_2.png");
        this.load.image("button-3", "./assets/gui/character_button_3.png");
        this.load.image("button-4", "./assets/gui/character_button_4.png");
        this.load.image("button-5", "./assets/gui/character_button_5.png");
        this.load.image("Q0E0", "./assets/gui/Q_0_E_0.png");
        this.load.image("Q1E0", "./assets/gui/Q_1_E_0.png");
        this.load.image("Q0E1", "./assets/gui/Q_0_E_1.png");
        this.load.image("Q1E1", "./assets/gui/Q_1_E_1.png");
        this.load.image("target", "./assets/gui/reticle.png");

        /* Health Points */
        this.load.image("hp", "./assets/gui/hp.png")

        /* Playable Characters Sprites & Player Bullets ..................................................... */
        this.load.image("bullet-sky", "./assets/spritesheets/bullets/bullet-sky.png"); // sky's bullet
        this.load.spritesheet("sky", "./assets/spritesheets/characters/sky.png",{ // sky
            frameWidth: 66,
            frameHeight: 60
        });
        this.load.image("bullet-blue", "./assets/spritesheets/bullets/bullet-blue.png"); // blue's bullet
        this.load.spritesheet("blue", "./assets/spritesheets/characters/blue.png",{ // blue
            frameWidth: 66,
            frameHeight: 60
        });
        this.load.image("bullet-cupcake", "./assets/spritesheets/bullets/bullet-cupcake.png"); // cupcake's bullet
        this.load.spritesheet("cupcake", "./assets/spritesheets/characters/cupcake.png",{ // cupcake
            frameWidth: 66,
            frameHeight: 60
        });
        this.load.image("bullet-red", "./assets/spritesheets/bullets/bullet-red.png"); // red's bullet
        this.load.spritesheet("red", "./assets/spritesheets/characters/red.png",{ // red
            frameWidth: 66,
            frameHeight: 60
        });
        this.load.image("bullet-green", "./assets/spritesheets/bullets/bullet-green.png"); // green's bullet
        this.load.spritesheet("green", "./assets/spritesheets/characters/green.png",{ // green
            frameWidth: 66,
            frameHeight: 60
        });

        /* Enemy Sprites & Enemy Bullets ..................................................... */
        this.load.image("enemy-human-bullet", "./assets/spritesheets/bullets/enemy-human-bullet.png"); // human's bullet
        this.load.spritesheet("human", "./assets/spritesheets/characters/human.png",{ // human
            frameWidth: 66,
            frameHeight: 60
        });
        this.load.image("enemy-robot-bullet", "./assets/spritesheets/bullets/enemy-robot-bullet.png"); // robot's bullet
        this.load.spritesheet("robot", "./assets/spritesheets/characters/robot.png",{ // robot
            frameWidth: 971,
            frameHeight: 823
        });
        this.load.image("enemy-alien-bullet", "./assets/spritesheets/bullets/enemy-alien-bullet.png"); // alien's bullet
        this.load.spritesheet("alien", "./assets/spritesheets/characters/alien.png",{ // alien
            frameWidth: 122,
            frameHeight: 177
        }); 

        // this.load.spritesheet("beam", "./assets/spritesheets/beam.png",{ // can possibly use this for speical attack
        //     frameWidth: 16,
        //     frameHeight: 16
        // });

        /* Songs / Sounds ..................................................... */
        // this.load.audio("start_screen_music", 
        //     ["./assets/media/start_screen/Sad Piano Music - The Last Battle (Original Composition).ogg", 
        //     "./assets/media/start_screen/Sad Piano Music - The Last Battle (Original Composition).mp3"]);

    }

    create() {
        
        /* MAP DESIGN ..................................................... */

        // Background
        this.background = this.add.tileSprite(0, 0, 1600, 1600, "LEVEL_0");
        this.background.setOrigin(0, 0);

        // Set world bounds
        this.physics.world.setBounds(0, 0, 1600, 1600);

        // // Obstacles  fix
        // var walls = this.add.group();
        // walls.enableBody = true;
        // walls.immovable = true;
        
        // border.body.immovable = true;

        /* Player Configuration */
        this.player = this.physics.add.sprite(800, 800, 'sky'); // default character loads 'sky'
        this.player.setData({'current': dat.sky, 'sky': dat.sky, 'blue': dat.blue, 'cupcake': dat.cupcake, 'green': dat.green, 'red': dat.red}); // load player data
        // this.player.health = dat.player.health;
        this.player.enableBody();
        this.player.setCollideWorldBounds(true);

        /* Enemy Configuration */
        this.enemy_human = this.physics.add.sprite(300, 600, 'human').setCollideWorldBounds(true);
        this.enemy_human.data = dat.enemy_human;
        this.enemy_human.health = this.enemy_human.data.health;
        this.enemy_human.lastFired = 0;

        this.enemy_robot = this.physics.add.sprite(300, 700, 'robot').setScale(.1, .1).setCollideWorldBounds(true);
        this.enemy_robot.data = dat.enemy_robot;
        this.enemy_robot.health = this.enemy_robot.data.health;
        this.enemy_robot.lastFired = 0;

        this.enemy_alien = this.physics.add.sprite(300, 800, 'alien').setScale(.5, .5).setCollideWorldBounds(true);
        this.enemy_alien.data = dat.enemy_alien;
        this.enemy_alien.health = this.enemy_alien.data.health;
        this.enemy_alien.lastFired = 0;
        

        /* GUI DESIGN ..................................................... */

        //// Top Bar
        this.gui_top_bar = this.add.graphics();
        this.gui_top_bar.setScrollFactor(0);
        this.gui_top_bar.fillStyle(0x000000, 1); // hex, alpha
        this.gui_top_bar.beginPath();
        this.gui_top_bar.moveTo(0, 0);
        this.gui_top_bar.lineTo(0, 0);
        this.gui_top_bar.lineTo(config.width, 0);
        this.gui_top_bar.lineTo(config.width, 30);
        this.gui_top_bar.lineTo(0, 30);
        this.gui_top_bar.closePath();
        this.gui_top_bar.fillPath();

        // Level Name Text
        this.levelText = this.add.bitmapText(config.width / 2 - 150, 6, "pixelFont", "Level 0 - Play Around Room", 36).setScrollFactor(0);
        // time & score up for debate

        //// Bottom Bar
        this.gui_background = this.physics.add.sprite(400, 300, 'gui-background').setScale(.5,.5).setScrollFactor(0); // bottom bar background
        this.character_button = this.physics.add.sprite(400, 550, 'button-1').setScale(.6,.6).setScrollFactor(0); // 1-5 buttons
        this.special_button = this.physics.add.sprite(700, 500, 'Q1E1').setScale(.6,.6).setScrollFactor(0); // q,e buttons

        // Ammo Text
        this.ammoCapacity = this.player.getData('ammo');
        this.ammo = this.ammoCapacity; // from the start, but when shot needs to go down // this.ammo--;
        this.ammoText = this.add.bitmapText(575, 540, "pixelFont", "Ammo: " + this.ammo + '/' + this.ammoCapacity, 44).setScrollFactor(0);

        // Health Points
        this.player.hp1 = this.add.image(30, 555, 'hp').setScrollFactor(0).setScale(.12, .12);
        this.player.hp2 = this.add.image(61, 555, 'hp').setScrollFactor(0).setScale(.12, .12);
        this.player.hp3 = this.add.image(92, 555, 'hp').setScrollFactor(0).setScale(.12, .12);
        this.player.hp4 = this.add.image(123, 555, 'hp').setScrollFactor(0).setScale(.12, .12);
        this.player.hp5 = this.add.image(154, 555, 'hp').setScrollFactor(0).setScale(.12, .12);

        // Player Name
        this.playerName = this.add.bitmapText(50, 510, "pixelFont", this.player.getData('name'), 28).setScrollFactor(0);


        /* CONTROLS ..................................................... */

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


        /* Logic */

        // Shooting Logic
        // Add 2 groups for Bullet objects, player / enemy
        this.playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
        this.enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
        this.reticle = this.physics.add.sprite(800, 700, 'target');
        
        // Reticle 
        this.reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25);

        // Set camera properties
        this.cameras.main.startFollow(this.player);

        // Fires bullet from player on left click of mouse
        this.input.on('pointerdown', function (pointer, time, lastFired) {
            if (this.player.active === false)
                return;

            // Get bullet from bullets group
            var bullet = this.playerBullets.get().setActive(true).setVisible(true).setTexture(this.player.getData('current').bullet);

            if (bullet) {
                // console.log(bullet);
                bullet.fire(this.player, this.reticle);
                this.physics.add.collider(this.enemy_human, bullet, this.enemyHitCallback);
                this.physics.add.collider(this.enemy_robot, bullet, this.enemyHitCallback);
                this.physics.add.collider(this.enemy_alien, bullet, this.enemyHitCallback);
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

        /* Music Config ..................................................... */
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
        this.time = 1000;

    }

    update(time) {
        window.scene = this; // testing purposes
        
        /* Camera ..................................................... */
        this.cameras.main.setBounds(0,0,1600,1600);
        this.cameras.main.startFollow(this.player);

        /* Update Movement ..................................................... */
        if (this.key_left.isDown) { //  Move Left
            this.player.body.velocity.x = this.player.getData('current').movement * -1;
            this.player.body.velocity.y = 0;
        } else if (this.key_right.isDown) { //  Move Right
            this.player.body.velocity.x = this.player.getData('current').movement;
            this.player.body.velocity.y = 0; 
            // player.animations.play('right');
        } else if (this.key_up.isDown) { //  Move  Up
            this.player.body.velocity.x = 0; 
            this.player.body.velocity.y = this.player.getData('current').movement * -1;
        } else if (this.key_down.isDown) { //  Move Down
            this.player.body.velocity.x = 0; 
            this.player.body.velocity.y = this.player.getData('current').movement; 
        } else { //  Stand still
            this.player.body.velocity.x = 0; 
            this.player.body.velocity.y = 0; 
        }

        /* Update Character & GUI ..................................................... */
        if (this.key_1.isDown) { // sky
            this.player.setData({'current': this.player.getData('sky')});
            // this.player.data = dat.sky;
        } else if (this.key_2.isDown) { // blue
            // this.player.data = dat.blue;
            this.player.setData({'current': this.player.getData('blue')});
        } else if (this.key_3.isDown) { // cupcake
            // this.player.data = dat.cupcake;
            this.player.setData({'current': this.player.getData('cupcake')});
        } else if (this.key_4.isDown) { // green
            // this.player.data = dat.green;
            this.player.setData({'current': this.player.getData('green')});
        } else if (this.key_5.isDown) { // red
            // this.player.data = dat.red;
            this.player.setData({'current': this.player.getData('red')});
        } if (this.key_1 || this.key_2 || this.key_3 || this.key_4 || this.key_5) { // default for all
            this.player.setTexture(this.player.getData('current').texture);
            this.character_button.setTexture(this.player.getData('current').gui);
            this.ammoCapacity = this.player.getData('current').ammo;
            this.ammo = this.ammoCapacity;
            this.ammoText.setText("Ammo: " + this.ammo + '/' + this.ammoCapacity);
            this.playerName.setText(this.player.getData('current').name);
        }

        /* Update Special Attacks ..................................................... */


        /* Update Reticle Behavior..................................................... */

        // Rotates player to face towards reticle
        this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y);

        // Rotates enemies to face towards player
        this.enemy_human.rotation = Phaser.Math.Angle.Between(this.enemy_human.x, this.enemy_human.y, this.player.x, this.player.y);
        this.enemy_robot.rotation = Phaser.Math.Angle.Between(this.enemy_robot.x, this.enemy_robot.y, this.player.x, this.player.y);
        this.enemy_alien.rotation = Phaser.Math.Angle.Between(this.enemy_alien.x, this.enemy_alien.y, this.player.x, this.player.y);

        // Make reticle move with player
        this.reticle.body.velocity.x = this.player.body.velocity.x;
        this.reticle.body.velocity.y = this.player.body.velocity.y;
        
        // Constrain position of constrainReticle
        this.constrainReticle(this.reticle);

        // Make enemy fire
        this.enemyFire(this.enemy_human, this.player, dat.enemy_human.time, this, this.enemy_human.data.bullet);
        this.enemyFire(this.enemy_robot, this.player, dat.enemy_robot.time, this, this.enemy_robot.data.bullet);
        this.enemyFire(this.enemy_alien, this.player, dat.enemy_alien.time, this, this.enemy_alien.data.bullet);

        // Check Health
        if (this.player.health <= 0) {
            // game.scene.stop("Level0");
            // this.scene.stop();
            // console.log(this.player.health);
            this.scene.start("EndScreen"); // fix this
        }

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

    // Reduce health of enemy if shot
    enemyHitCallback(enemyHit, bulletHit) {
        if (bulletHit.active === true && enemyHit.active === true) {
            enemyHit.health = enemyHit.health - 1;
            console.log("Enemy hp: ", enemyHit.health);

            // Kill enemy if health <= 0
            if (enemyHit.health <= 0) {
            enemyHit.setActive(false).setVisible(false);
            }

            // Destroy bullet
            bulletHit.setActive(false).setVisible(false);
        }
    }

    playerHitCallback(playerHit, bulletHit) {
        // Reduce health of player
        if (bulletHit.active === true && playerHit.active === true) {
            playerHit.health = playerHit.health - 1;
            console.log("Player hp: ", playerHit.health);

            // Kill hp sprites and kill player if health <= 0
            if (playerHit.health == 4) {
                playerHit.hp1.destroy();
            }
            else if (playerHit.health == 3) {
                playerHit.hp2.destroy();
            }
            else if (playerHit.health == 2) {
                playerHit.hp3.destroy();
            }
            else if (playerHit.health == 1) {
                playerHit.hp4.destroy();
            }
            else {
                playerHit.hp5.destroy();
                // Game over state should execute here
            }
            // Destroy bullet
            bulletHit.setActive(false).setVisible(false);
        }
    }

    // Enemy Shooting
    enemyFire(enemy, player, time, gameObject, bullet_t) {
        enemy.lastFired -= 10; // reduces time from last shot

        // console.log(time, enemy.lastFired, time - enemy.lastFired);
        if (enemy.active === false) 
            return;
        if ((time - enemy.lastFired) >= 1000) {
            enemy.lastFired = time;

            // Get bullet from bullets group
            var bullet = this.enemyBullets.get().setActive(true).setVisible(true).setTexture(bullet_t);

            if (bullet) {
                bullet.fire(enemy, player);
                // Add collider between bullet and player
                this.physics.add.collider(this.player, bullet, this.playerHitCallback);
            }
        }
    }

}
