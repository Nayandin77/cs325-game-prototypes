class Scene0 extends Phaser.Scene {
    constructor() {
      super("titleScreen");
    }

    preload() {

    }

    create() {
        this.add.text(20, 20, "Loading game...");
    }

}