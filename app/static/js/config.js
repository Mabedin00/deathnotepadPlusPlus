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
};

var tick = 0;
var bloons;
var goal;
var towers;
var darts;
var scene;
var lives_text;
var money_text;
var level_text;
var game_won = false;

const LAND = 2;

var game = new Phaser.Game(config);
