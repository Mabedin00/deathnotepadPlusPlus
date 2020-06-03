var config = {
    type: Phaser.AUTO,
    width: 882,
    height: 506,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Scene0, Scene1]
    // scene: {
    //     preload: preload,
    //     create: create,
    //     update: update
    // }
};

var tick = 0;
var bloons;
var goal;
var towers;
var dart_placed;
console.log(ocean_road)
var game = new Phaser.Game(config);
