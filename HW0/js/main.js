"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', 
            { 
                preload: preload, 
                create: create, 
                update: update 
            });

    function preload() {

        game.load.image('my_sky', './assets/my_sky.png');
        game.load.image('ground', './assets/platform.png');
        game.load.image('coin', './assets/coin.png');
        game.load.image('tile', './assets/platform_small.png');
        game.load.spritesheet('dude', './assets/dude.png', 32, 48);
        game.load.audio('adventure', './assets/audio/JJD - Adventure.mp3');
        game.load.audio('coin-collected', './assets/audio/Coin-Collected.mp3');
    }

    var player;
    var platforms;
    var cursors;
    var coins;
    var score = 0;
    var scoreText;
    var gameOver = false;
    var bombs;

    function create() {
        // Adding the background song
        game.song = this.sound.add('adventure');
        game.song.play();

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'my_sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 32, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x16 in size)
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;  //  This stops it from falling away when you jump on it

        //  Ledges             Width Height
        var ledge;

        ledge = platforms.create(200, 400, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(150, 250, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(0, 350, 'tile');
        ledge.body.immovable = true;

        // The player and its settings
        player = game.add.sprite(game.world.width-50, game.world.height - 150, 'dude');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        //  Finally some coins to collect
        coins = game.add.group();

        //  We will enable physics for any coin that is created in this group
        coins.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a coin inside of the 'coins' group
            var coin = coins.create(i * 70, 0, 'coin');

            //  Let gravity do its thing
            coin.body.gravity.y = 300;

            //  This just gives each coin a slightly random bounce value
            coin.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        //  The score
        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '22px', fill: '#000' });

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();

        // the Bombs
        bombs = this.physics.add.group();
        
    }

    function update() {

        //  Collide the player and the coins with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(coins, platforms);

        //  Checks to see if the player overlaps with any of the coins, if he does call the collectStar function
        game.physics.arcade.overlap(player, coins, collectStar, null, this);

        //  Reset the players velocity (movement)
        if(hitPlatform)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }
        
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            player.body.velocity.y = -350;
        }

    }

    function collectStar (player, coin) {
        
        // Removes the coin from the screen
        coin.kill();

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;

        // Add sound when collected

    }

    function hitBomb (player, bomb)
    {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }

};