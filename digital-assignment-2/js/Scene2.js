class Scene2 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.spritesheet("enemy_ship_1", "assets/spritesheets/enemy_ship_1.png",{
      frameWidth: 20,
      frameHeight: 34
    });
    this.load.spritesheet("enemy_ship_2", "assets/spritesheets/enemy_ship_2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("enemy_ship_3", "assets/spritesheets/enemy_ship_3.png",{
      frameWidth: 41,
      frameHeight: 37
    });
    this.load.spritesheet("boss", "assets/spritesheets/boss_ship_v3.png",{
      frameWidth: 450,
      frameHeight: 200
    });
    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", "assets/spritesheets/player_plane.png",{
      frameWidth: 39,
      frameHeight: 52
    });
    this.load.spritesheet("beam", "assets/spritesheets/beam.png",{
      frameWidth: 16,
      frameHeight: 16
    });
  
  }

  create() {
    this.scene.start("playGame");

    this.anims.create({
      key: "enemy_ship_1_anim",
      frames: this.anims.generateFrameNumbers("enemy_ship_1"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "enemy_ship_2_anim",
      frames: this.anims.generateFrameNumbers("enemy_ship_2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "enemy_ship_3_anim",
      frames: this.anims.generateFrameNumbers("enemy_ship_3"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "boss_anim",
      frames: this.anims.generateFrameNumbers("boss"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });

  }
}
