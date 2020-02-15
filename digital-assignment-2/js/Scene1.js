class Scene1 extends Phaser.Scene {
    constructor() {
      super("bootCutscene");
    }

    preload() {
        
    }

    create() {
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

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
    }

    update() {
        // if (this.keyEnter.isDown) {
        //     this.scene.start("bootGame");
        // }
        
        /* TO DO - ADD TIMER OF 27.5 SECONDS UNTIL BOOTS TO GAME*/
    }
}