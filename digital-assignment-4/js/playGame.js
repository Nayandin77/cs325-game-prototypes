class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    
    preload() {
        this.load.image("chicken", "assets/chicken.png");
        this.load.image("farmer", "assets/farmer_no_White.png");
        this.load.image("egg", "assets/egg.png");

        // load font
        this.load.bitmapFont("pixelFont", "assets/font.png", "assets/font.xml");

        // load sounds in both formats mp3 and ogg
        this.load.audio("throw", ["./assets/throw.ogg", "assets/throw.mp3./"]);
    }
    create() {
        this.throwSound = this.sound.add("throw");
        this.throwSound.volume = 0.2;

        // determine the offset to make path always stand in the center of the stage
        let offset = new Phaser.Math.Vector2((game.config.width - gameOptions.pathWidth) / 2, (game.config.height - gameOptions.pathHeight) / 2);

        // building a path using lines and ellipses. Ellipses are used to create
        // circle arcs and build the curves
        this.path = new Phaser.Curves.Path(offset.x + gameOptions.curveRadius, offset.y);
        this.path.lineTo(offset.x + gameOptions.pathWidth - gameOptions.curveRadius, offset.y);
        this.path.ellipseTo(-gameOptions.curveRadius, -gameOptions.curveRadius, 90, 180, false, 0);
        this.path.lineTo(offset.x + gameOptions.pathWidth, offset.y + gameOptions.pathHeight - gameOptions.curveRadius);
        this.path.ellipseTo(-gameOptions.curveRadius, -gameOptions.curveRadius, 180, 270, false, 0);
        this.path.lineTo(offset.x + gameOptions.curveRadius, offset.y + gameOptions.pathHeight);
        this.path.ellipseTo(-gameOptions.curveRadius, -gameOptions.curveRadius, 270, 0, false, 0);
        this.path.lineTo(offset.x, offset.y + gameOptions.curveRadius);
        this.path.ellipseTo(-gameOptions.curveRadius, -gameOptions.curveRadius, 0, 90, false, 0);

        // drawing the path
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(4, 0x8B4513, 1);
        this.path.draw(this.graphics);

        // egg is the bullet trajectory
        this.egg = this.add.sprite(game.config.width / 2, game.config.height / 2, "egg");
        this.egg.setOrigin(0, 0.5);
        this.egg.displayWidth = 1904;
        this.egg.displayHeight = 112;
        this.egg.setScale(.25,.25);
        this.egg.visible = false;

        // the rotating farmer
        this.farmer = this.add.sprite(game.config.width / 2, game.config.height / 2, "farmer");
        this.farmer.setScale(2,2);

        this.score = 0;
        this.scoreText = this.add.bitmapText(
            config.width / 2 - 60,
            config.height / 2 - 160,
            "pixelFont",
            ("Score: " + this.score),
            36 // font size
        );
        this.scoreText.setTint("0xF7FAFF");

        this.timer = 2400;
        this.timeText = this.add.bitmapText(
            config.width / 2 - 60,
            config.height / 2 - 120,
            "pixelFont",
            "Time: " + (this.timer / 40),
            36 // font size
        );
        this.timeText.setTint("0xF7FAFF");

        // the group of targets
        this.targets = this.add.group();
        for(let i = 0; i < gameOptions.targets; i++){

            // target aren't sprites but followers!!!!
            let target = this.add.follower(this.path, offset.x + gameOptions.curveRadius, offset.y, "chicken");
            target.alpha = 1.0;
            target.setScale(2.5,2.5)
            this.targets.add(target);

            // the core of the script: targets run along the path starting from a random position
            target.startFollow({
                duration: Phaser.Math.RND.between(gameOptions.targetSpeed.min, gameOptions.targetSpeed.max),
                repeat: -1,
                rotateToPath: true,
                verticalAdjust: true,
                startAt: Phaser.Math.RND.frac()
            });
        }

        // tween to rotate the farmer
        this.gunTween = this.tweens.add({
            targets: [this.farmer],
            angle: 360,
            duration: gameOptions.gunSpeed,
            repeat: -1,
            callbackScope: this,
            onRepeat: function(){

                // each round, farmer angular speed decreases
                this.gunTween.timeScale = Math.max(2, this.gunTween.timeScale * gameOptions.gunFriction);
            }
        });

        this.time.addEvent({
            delay: 1000,
            repeat: -1,
            callbackScope: this,
            callback: function() {
                this.timer -= 40;
                this.timeText.text = "Time: " + (this.timer / 40);
                if (this.timer <= 0) {
                    this.scene.start("EndGame");
                }
            }
        });

        // waiting for user input
        this.input.on("pointerdown", function(pointer){
            this.throwSound.play();

            // we say we can fire when the fire line is not visible
            if(!this.egg.visible){
                this.egg.visible = true;
                this.egg.angle = this.farmer.angle;

                // farmer angular speed increases
                this.gunTween.timeScale = Math.min(gameOptions.maxGunSpeedMultiplier, this.gunTween.timeScale * gameOptions.gunThrust);

                // fire line disappears after 50 milliseconds
                this.time.addEvent({
                    delay: 50,
                    callbackScope: this,
                    callback: function(){
                        this.egg.visible = false;
                    }
                });

                // calculate the line of fire starting from sprite angle
                let radians = Phaser.Math.DegToRad(this.egg.angle);
                let fireStartX = game.config.width / 2;
                let fireStartY = game.config.height / 2;
                let fireEndX = fireStartX + game.config.height / 2 * Math.cos(radians);
                let fireEndY = fireStartY + game.config.height / 2 * Math.sin(radians);
                let lineOfFire = new Phaser.Geom.Line(fireStartX, fireStartY, fireEndX, fireEndY);

                // loop through all targets
                this.targets.getChildren().forEach(function(target){
                    if(target.visible){

                        // get target bounding box
                        let bounds = target.getBounds();

                        // check if the line intersect the bounding box
                        if(Phaser.Geom.Intersects.LineToRectangle(lineOfFire, bounds)){

                            // target HIT!!!! hide it for 3 seconds
                            target.visible = false;
                            this.score += 10;
                            this.scoreText.text = "Score: " + this.score;
                            this.time.addEvent({
                                delay: 3000,
                                callback: function(){
                                    target.visible = true;
                                }
                            });
                        }
                    }
                }.bind(this))
            }
        }, this);
    }
};
