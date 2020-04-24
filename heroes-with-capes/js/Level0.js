class Level0 extends Phaser.Scene {
    constructor() {
        super("Level0");
    }
    
    preload() {
        /* Map ..................................................... */
        this.load.tilemapCSV("level_0", "./assets/maps/LEVEL_0/level0.csv");
        this.load.image('tiles', './assets/maps/LEVEL_0/IceTileset.png');

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
        this.map = this.make.tilemap({key: 'level_0', tileWidth: 32, tileHeight: 32});
        this.tileset = this.map.addTilesetImage("tiles");
        this.layer = this.map.createStaticLayer(0, this.tileset, 0, 0);
        this.layer.setCollisionBetween(42,43);
        
        this.layer.setTileIndexCallback([42,43], this.bulletCollision, this)

        // Set world bounds
        this.physics.world.setBounds(0, 0, 1600, 1600);
        
        /* Player Configuration ..................................................... */
        this.player = this.physics.add.sprite(800, 800, 'sky'); // default character loads 'sky'
        this.player.setData({'current': dat.sky, 'sky': dat.sky, 'blue': dat.blue, 'cupcake': dat.cupcake, 'green': dat.green, 'red': dat.red}); // load player data
        this.player.health = dat.player.health;
        this.player.enableBody();
        this.player.setCollideWorldBounds(true);

        // Obstacles
        this.physics.add.collider(this.player, this.layer);

        /* Enemy Configuration ..................................................... */
        this.enemyHumanGroup = this.physics.add.group();
        this.enemy_human_1 = this.physics.add.sprite(192, 160, 'human').setCollideWorldBounds(true);
        this.enemy_human_1.setData({'data': dat.enemy_human});
        this.enemy_human_1.lastFired = 0;
        this.enemy_human_1.health = 3;

        this.enemy_human_2 = this.physics.add.sprite(192, 256, 'human').setCollideWorldBounds(true);
        this.enemy_human_2.setData({'data': dat.enemy_human});
        this.enemy_human_2.lastFired = 0;
        this.enemy_human_2.health = 3;

        this.enemy_human_3 = this.physics.add.sprite(288, 192, 'human').setCollideWorldBounds(true);
        this.enemy_human_3.setData({'data': dat.enemy_human});
        this.enemy_human_3.lastFired = 0;
        this.enemy_human_3.health = 3;


        this.enemy_robot_1 = this.physics.add.sprite(39*32, 34*32, 'robot').setScale(.1, .1).setCollideWorldBounds(true);
        this.enemy_robot_1.setData({'data': dat.enemy_robot});
        this.enemy_robot_1.lastFired = 0;
        this.enemy_robot_1.health = 4;

        this.enemy_robot_2 = this.physics.add.sprite(31*32, 34*32, 'robot').setScale(.1, .1).setCollideWorldBounds(true);
        this.enemy_robot_2.setData({'data': dat.enemy_robot});
        this.enemy_robot_2.lastFired = 0;
        this.enemy_robot_2.health = 4;

        this.enemy_robot_3 = this.physics.add.sprite(21*32, 34*32, 'robot').setScale(.1, .1).setCollideWorldBounds(true);
        this.enemy_robot_3.setData({'data': dat.enemy_robot});
        this.enemy_robot_3.lastFired = 0;
        this.enemy_robot_3.health = 4;


        this.enemy_alien_1 = this.physics.add.sprite(37*32, 11*32, 'alien').setScale(.5, .5).setCollideWorldBounds(true);
        this.enemy_alien_1.setData({'data': dat.enemy_alien});
        this.enemy_alien_1.lastFired = 0;
        this.enemy_alien_1.health = 5;

        this.enemy_alien_2 = this.physics.add.sprite(43*32, 11*32, 'alien').setScale(.5, .5).setCollideWorldBounds(true);
        this.enemy_alien_2.setData({'data': dat.enemy_alien});
        this.enemy_alien_2.lastFired = 0;
        this.enemy_alien_2.health = 5;

        
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
        this.ammoCapacity = this.player.getData('current').ammo;
        this.ammo = this.ammoCapacity; // from the start, but when shot needs to go down // this.ammo--;
        this.ammoText = this.add.bitmapText(575, 540, "pixelFont", "Ammo: " + this.ammo + '/' + this.ammoCapacity, 44).setScrollFactor(0);

        // Health Points
        this.player.hp1 = this.add.image(30, 555, 'hp').setScrollFactor(0).setScale(.12, .12);
        this.player.hp2 = this.add.image(61, 555, 'hp').setScrollFactor(0).setScale(.12, .12);
        this.player.hp3 = this.add.image(92, 555, 'hp').setScrollFactor(0).setScale(.12, .12);
        this.player.hp4 = this.add.image(123, 555, 'hp').setScrollFactor(0).setScale(.12, .12);
        this.player.hp5 = this.add.image(154, 555, 'hp').setScrollFactor(0).setScale(.12, .12);

        // Player Name
        this.playerName = this.add.bitmapText(50, 510, "pixelFont", this.player.getData('current').name, 28).setScrollFactor(0);


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

        this.bulletCounter = 0; // bullet tracker

        // Fires bullet from player on left click of mouse
        this.input.on('pointerdown', function (pointer, time, lastFired) {
            if (this.player.active === false)
                return;

            // Get bullet from bullets group
            var bullet = this.playerBullets.get().setActive(true).setVisible(true).setTexture(this.player.getData('current').bullet);

            if (bullet) {
                this.bulletCounter = true; // important to track bullets
                bullet.fire(this.player, this.reticle);
                this.physics.add.collider(this.layer, bullet, this.wallCallback);
                this.physics.add.collider(this.enemy_human_1, bullet, this.enemyHitCallback);
                this.physics.add.collider(this.enemy_human_2, bullet, this.enemyHitCallback);
                this.physics.add.collider(this.enemy_human_3, bullet, this.enemyHitCallback);
                this.physics.add.collider(this.enemy_robot_1, bullet, this.enemyHitCallback);
                this.physics.add.collider(this.enemy_robot_2, bullet, this.enemyHitCallback);
                this.physics.add.collider(this.enemy_robot_3, bullet, this.enemyHitCallback);
                this.physics.add.collider(this.enemy_alien_1, bullet, this.enemyHitCallback);
                this.physics.add.collider(this.enemy_alien_2, bullet, this.enemyHitCallback);

            }
        }, this);

        // Pointer lock will only work after mousedown
        game.canvas.addEventListener('mousedown', function () {
            game.input.mouse.requestPointerLock();
        });

        // Move reticle upon locked pointer move
        this.input.on('pointermove', function (pointer) {
            if (this.input.mouse.locked) {
                this.reticle.x += pointer.movementX;
                this.reticle.y += pointer.movementY;
            }
        }, this);

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
        }
        
        if (this.key_1.isDown || this.key_2.isDown || this.key_3.isDown || this.key_4.isDown || this.key_5.isDown) { // default for all
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
        this.enemy_human_1.rotation = Phaser.Math.Angle.Between(this.enemy_human_1.x, this.enemy_human_1.y, this.player.x, this.player.y);
        this.enemy_human_2.rotation = Phaser.Math.Angle.Between(this.enemy_human_2.x, this.enemy_human_2.y, this.player.x, this.player.y);
        this.enemy_human_3.rotation = Phaser.Math.Angle.Between(this.enemy_human_3.x, this.enemy_human_3.y, this.player.x, this.player.y);
        this.enemy_robot_1.rotation = Phaser.Math.Angle.Between(this.enemy_robot_1.x, this.enemy_robot_1.y, this.player.x, this.player.y);
        this.enemy_robot_2.rotation = Phaser.Math.Angle.Between(this.enemy_robot_2.x, this.enemy_robot_2.y, this.player.x, this.player.y);
        this.enemy_robot_3.rotation = Phaser.Math.Angle.Between(this.enemy_robot_3.x, this.enemy_robot_3.y, this.player.x, this.player.y);

        this.enemy_alien_1.rotation = Phaser.Math.Angle.Between(this.enemy_alien_1.x, this.enemy_alien_1.y, this.player.x, this.player.y);
        this.enemy_alien_2.rotation = Phaser.Math.Angle.Between(this.enemy_alien_2.x, this.enemy_alien_2.y, this.player.x, this.player.y);


        // Make reticle move with player
        this.reticle.body.velocity.x = this.player.body.velocity.x;
        this.reticle.body.velocity.y = this.player.body.velocity.y;
        
        // Constrain position of constrainReticle
        this.constrainReticle(this.reticle);

        // Make enemy fire
        this.enemyFire(this.enemy_human_1, this.player, this.enemy_human_1.getData('data').time, this, this.enemy_human_1.getData('data').bullet);
        this.enemyFire(this.enemy_human_2, this.player, this.enemy_human_2.getData('data').time, this, this.enemy_human_2.getData('data').bullet);
        this.enemyFire(this.enemy_human_3, this.player, this.enemy_human_3.getData('data').time, this, this.enemy_human_3.getData('data').bullet);
        this.enemyFire(this.enemy_robot_1, this.player, this.enemy_robot_1.getData('data').time, this, this.enemy_robot_1.getData('data').bullet);
        this.enemyFire(this.enemy_robot_2, this.player, this.enemy_robot_2.getData('data').time, this, this.enemy_robot_2.getData('data').bullet);
        this.enemyFire(this.enemy_robot_3, this.player, this.enemy_robot_3.getData('data').time, this, this.enemy_robot_3.getData('data').bullet);
        this.enemyFire(this.enemy_alien_1, this.player, this.enemy_alien_1.getData('data').time, this, this.enemy_alien_1.getData('data').bullet);

        // Check Health
        if (this.player.health <= 0) {
            this.scene.start("EndScreen");
        }

        // Locate Player 
        if ((this.player.x >= 600) && (this.player.x <= 945) && (this.player.y <= 130)) {
            this.scene.start("Level1"); // if reaching the Level 1 Zone, switch levels
        }

        if (this.bulletCounter == true) {
            this.ammo -= 1;
            this.bulletCounter = false;
            this.ammoText.setText("Ammo: " + this.ammo + '/' + this.ammoCapacity);
        }

        if (this.ammo == 0) {
            this.ammo = this.ammoCapacity;
            this.bulletCounter = 0;
            this.ammoText.setText("Ammo: " + this.ammo + '/' + this.ammoCapacity);
        }

        // this.playerWall = this.physics.add.collider(this.player, this.wallGroup);
        // this.bulletWall = this.physics.add.collider(this.playerBullets, this.wallGroup);

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
            // enemyHit.health = enemyHit.getData('data').health -= 1;
            enemyHit.health -= 1;
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
            // playerHit.health = playerHit.health - 1; // disabled for now, in Level 0
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
            else if (playerHit.health == 0) {
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
            bullet.speed = enemy.getData('data').movement / 400;

            if (bullet) {
                bullet.fire(enemy, player);
                // Add collider between (bullet and player) and (bullet and wall)
                this.physics.add.collider(this.layer, bullet, this.wallCallback);
                this.physics.add.collider(this.player, bullet, this.playerHitCallback);
            }
        }
    }

    // Destroy bullet if hits a wall
    wallCallback(bulletHit, layer) {
        if (bulletHit.active === true) {
           // Destroy bullet
           bulletHit.setActive(false).setVisible(false);
        }
    }

    bulletCollision(random, layer) {
        if(random.type == 'Sprite')
            return 0;// do nothing
        if(random.type == 'Image')
            this.wallCallback(random, layer);        
    }

}
