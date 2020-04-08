class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene){
  
      var x = scene.player.x;
      var y = scene.player.y - 32;
  
      super(scene, x, y, "beam");
  
      scene.add.existing(this);
  
      this.play("beam_anim").setScale(1,1);
      scene.physics.world.enableBody(this);
      this.body.velocity.y = 0;
      this.body.velocity.x = 0;
  
      scene.projectiles.add(this);
    }
  
  
    update(){
      if(this.y < 32 ){
        this.destroy();
      }
    }
  }
  