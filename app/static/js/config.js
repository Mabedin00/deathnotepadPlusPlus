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
    scene: [MapSelectionScene, GameScene]
};

var tick = 0;
var bloons;
var goal;
var towers;
var projectiles;
var scene;
var lives_text;
var money_text;
var level_text;
var game_over = false;

var esc;


const PATH = 0;
const WATER = 1;
const LAND = 2;

var game = new Phaser.Game(config);
