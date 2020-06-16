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
var goal;
var goal1;
var goal2;

var towers;
var bloons;
var projectiles;
var dartlings;
var monkey_aces

var scene;
var lives_text;
var lives_icon;
var money_text;
var money_icon;
var level_text;
var score_text;

var bgm = 1;
var sfx = 1;
var bgm_x_coor = 620
var sfx_x_coor = 620

var useful_tips = ['You die when your health reaches 0',
                   'If you are having trouble, try getting better at the game',
                   'Remember, licking doorknobs is illegal on other planets',
                   'I got stuck with loading tips duty, since the PM can\'t code',
                   'Short of money? Pop some Bloons',
                   'Turn your volume to MAX for complete immersion'
                  ];
var colliders = [];

var win_text;
var win_desc;


var esc_key;
var s_key;
var x_key;


const PATH = 0;
const WATER = 1;
const LAND = 2;

var game = new Phaser.Game(config);
