class Scene3 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  preload() {
    // load background image
    this.load.image("background", "assets/images/background.png");
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    this.ship1 = this.add.sprite(config.width / 2 - 50, config.height, "enemy_ship_1");
    this.ship2 = this.add.sprite(config.width / 2, config.height, "enemy_ship_2").setScale(1.3,1.3);
    this.ship3 = this.add.sprite(config.width / 2 + 50, config.height, "enemy_ship_3");
    //this.boss  = this.add.sprite(config.width / 2, 140, "boss");
    this.boss  = this.add.sprite(-500, -500, "boss"); // spawns boss way outside

    // Physics for enemies
    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);
    this.enemies.add(this.boss); // need to modify

    console.log(this.enemies.get("boss"));

    // Plays animation
    this.ship1.play("enemy_ship_1_anim");
    this.ship2.play("enemy_ship_2_anim");
    this.ship3.play("enemy_ship_3_anim");
    this.boss.play("boss_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();
    this.boss.setInteractive();    

    this.input.on('gameobjectdown', this.destroyShip, this);

    this.physics.world.setBoundsCollision();

    this.powerUps = this.physics.add.group();

    // Spawning in powerUps
    for (var i = 0; i < gameSettings.maxPowerups; i++) {
      var powerUp = this.physics.add.sprite(16, 16, "power-up").setScale(1,1);
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      powerUp.setVelocity(gameSettings.powerUpVel, gameSettings.powerUpVel);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }

    // controls to the game
    this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player").setScale(1.2,1.2);
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    // counter for beams & beam controller
    this.beam_counter = 1;

    // spacebar to shoot
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.projectiles = this.add.group();

    this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
      projectile.destroy();
    });

    // if player interacts with other objects
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

    // setting black bar at the top
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 40);
    graphics.lineTo(0, 40);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();

    // score text
    this.score = 0;
    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel = this.add.bitmapText(10, 10, "pixelFont", "SCORE " + scoreFormated , 25);

    // title text
    this.titleLabel = this.add.bitmapText(config.width / 2 - 90, 10, "pixelFont", "Island Protector 2", 25);

    // player lives text
    this.player.lives = 3;
    this.playerLabel = this.add.text(config.width - 140, 10, ("Lives: " + this.player.lives));
    this.playerLabel.setFont("pixelFont")
    this.playerLabel.setFontSize(16);

    // set the time ~ 120 seconds
    this.timeInSeconds = 4800;
    this.text = this.add.text(config.width - 40, 10, ("%d",this.timeInSeconds));
    this.text.setFont("pixelFont")
    this.text.setFontSize(16);

    // create the sounds to be used
    this.beamSound = this.sound.add("audio_beam");
    this.explosionSound = this.sound.add("audio_explosion");
    this.pickupSound = this.sound.add("audio_pickup");

  }

  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);
    this.pickupSound.play();
    this.score += 1000;
    this.beam_counter++;
  }

  hurtPlayer(player, enemy) {
    this.player.lives--
    this.playerLabel.setText("Lives: "+ this.player.lives);

    this.resetShipPos(enemy);

    // don't hurt the player if it is invincible
    if(this.player.alpha < 1){
        return;
    }

    // spawn a explosion animation
    var explosion = new Explosion(this, player.x, player.y);

    // disable the player and hide it
    player.disableBody(true, true);

    // after a time enable the player again
    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false
    });
  }

  resetPlayer(){
    // nable the player again
    var x = config.width / 2 - 8;
    var y = config.height + 64;
    this.player.enableBody(true, x, y, true, true);

    // make the player transparent to indicate invulnerability
    this.player.alpha = 0.5;
  
    // move the ship from outside the screen to its original position
    var tween = this.tweens.add({
      targets: this.player,
      y: config.height - 64,
      ease: 'Power1',
      duration: 1500,
      repeat:0,
      onComplete: function(){
        this.player.alpha = 1;
      },
      callbackScope: this
    });
  }

  hitEnemy(projectile, enemy) {
    var explosion = new Explosion(this, enemy.x, enemy.y);

    projectile.destroy();
    this.resetShipPos(enemy);
    this.score += 15;

     var scoreFormated = this.zeroPad(this.score, 6);
     this.scoreLabel.text = "SCORE " + scoreFormated;

     this.explosionSound.play();
  }


  zeroPad(number, size){
      var stringNumber = String(number);
      while(stringNumber.length < (size || 2)){
        stringNumber = "0" + stringNumber;
      }
      return stringNumber;
  }

  update() {
    this.moveShip(this.ship1, 4);
    this.moveShip(this.ship2, 3);
    this.moveShip(this.ship3, 4);

    this.background.tilePositionY -= 0.5;

    this.movePlayerManager();

    // Beam 
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if(this.player.active){
          if (this.beam_counter == 1) {
            this.shootBeam();
          }
          if (this.beam_counter == 2) {
            this.shootBeam();
            this.shootBeam_outer_1();
          }
          if (this.beam_counter == 3) {
            this.shootBeam();
            this.shootBeam_outer_1();
            this.shootBeam_inner_1();
          }
          if (this.beam_counter == 4) {
            this.shootBeam();
            this.shootBeam_outer_1();
            this.shootBeam_inner_1();
            this.shootBeam_inner_2();
          }
          if (this.beam_counter == 5) {
            this.shootBeam();
            this.shootBeam_outer_1();
            this.shootBeam_outer_2();
            this.shootBeam_inner_1();
            this.shootBeam_inner_2();
          }
      }
    }

    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }

    // time logic
    this.text.setText((Math.floor(this.timeInSeconds / 40)));
    this.timeInSeconds--;

    if (this.timeInSeconds <= 0) {
      this.scene.start("titleScreen");
    }

    if (this.player.lives < 0) {
      this.scene.start("endScreen");
    }

    if (this.timeInSeconds == 4600) {
      // var b = this.enemies.get("boss");
      // b. setXY(config.width / 2, 140);
    }

  }

  shootBeam() {
      var beam = new Beam(this);
      beam.y += 8;
  }

  shootBeam_outer_1() {
    var beam1 = new Beam(this);
    var beam2 = new Beam(this);
    beam1.x -= 26;
    beam1.y += 30;
    beam2.x += 26;
    beam2.y += 30;
  }

  shootBeam_outer_2() {
    var beam1 = new Beam(this);
    var beam2 = new Beam(this);
    beam1.x -= 20;
    beam1.y += 28;
    beam2.x += 20;
    beam2.y += 28;
  }

  shootBeam_inner_1() {
    var beam1 = new Beam(this);
    var beam2 = new Beam(this);
    beam1.x -= 10;
    beam1.y += 25;
    beam2.x += 10;
    beam2.y += 25;
  }

  shootBeam_inner_2() {
    var beam1 = new Beam(this);
    var beam2 = new Beam(this);
    beam1.x -= 5;
    beam1.y += 20;
    beam2.x += 5;
    beam2.y += 20;
  }

  // Player Movement
  movePlayerManager() {
    this.player.setVelocity(0);

    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed);
    }
  }

  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > config.height) {
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship) {
    ship.y = 0;
    var randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  }

  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

}
