let canvas = document.getElementById("game_canvas");

var config = {
    type: Phaser.AUTO,
    width: 982,
    height: 600,
    canvas: canvas,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [HomeScene, MapSelectionScene, GameScene]
};

var tick = 0;
var bloons;
var goal;
var goal1;
var goal2;
var towers;
var projectiles;
var scene;
var lives_text;
var lives_icon;
var money_text;
var money_icon;
var level_text;
var score_text;

var colliders = []

var win_text;
var win_desc;

var esc;


const PATH = 0;
const WATER = 1;
const LAND = 2;

var game = new Phaser.Game(config);
