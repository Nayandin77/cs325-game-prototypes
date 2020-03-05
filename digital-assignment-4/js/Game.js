var gameOptions = {

    // width of the path, in pixels
    pathWidth: 300,

    // height of the path, in pixels
    pathHeight: 500,

    // radius of path curves, in pixels
    curveRadius: 50,

    // amount of targets in game
    targets: 5,

    // min and max milliseconds needed by the targets
    // to run all the way around the path
    targetSpeed: {
        min: 6000,
        max: 10000
    },

    // min and max target size, in pixels
    targetSize: {
        min: 100,
        max: 200
    },

    // milliseconds needed by the farmer to rotate by 360 degrees
    gunSpeed: 5000,

    // multiplier to be applied to farmer rotation speed each time
    // the farmer fires
    gunThrust: 2,

    // maximum farmer speed multiplier.
    // If gunSpeed is 5000 and maxGunSpeedMultiplier is 15,
    // maximum farmer rotation will allow to rotate by 360 degrees
    // in 5000/15 seconds
    maxGunSpeedMultiplier: 15,

    // gunFriction will reduce farmer rotating speed each time the farmer
    // completes a 360 degrees rotation
    gunFriction: 0.9
}

var config = {
    type: Phaser.AUTO,
    backgroundColor: 0x008000,
    pixelArt: true,
    parent: "game",
    width: 450,
    height: 600,
    scene: [mainMenu, instructionsGame, playGame, endGame]
}

var game = new Phaser.Game(config);

