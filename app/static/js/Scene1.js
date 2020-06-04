class Scene1 extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init(data) {
    // sets the correct map
    this.map = data.map;
    // adds path for bloons to follow based on the map
    this.coords = map_data[data.map];
  }

  preload () {
      this.load.image('ocean_road', 'static/images/' + this.map + '.png');
      this.load.image('red_bloon', 'static/images/red_bloon.png');
      this.load.image('dart_monkey', 'static/images/dart_monkey.png');
      this.load.image('dart', 'static/images/dart.png');
      this.load.image('circle', 'static/images/circle.png');
      // this.load.spritesheet('pop', 'static/images/red_bloon_pop.png', {frameWidth: 64, frameHeight: 116});

  }

  create () {
    scene = this;
    this.level = 1;
    this.lives = 5;
    this.money = 500;
    this.bloons_deployed = [0]

    this.add.image(343, 253, 'ocean_road');
    level_text = this.add.text(700, 350, 'Level: ' + this.level, { font: '24px Arial' });
    lives_text = this.add.text(700, 400, 'Lives: ' + this.lives, { font: '24px Arial' });
    money_text = this.add.text(700, 450, 'Money: ' + this.money, { font: '24px Arial' });

    // background image
    let goal_x = this.coords.xlist[this.coords.xlist.length - 1];
    let goal_y = this.coords.ylist[this.coords.ylist.length - 1];

    goal = this.physics.add.sprite(goal_x, goal_y, 'ocean_road').setScale(.1);

    bloons = this.physics.add.group();
    towers = this.physics.add.group();
    darts = this.physics.add.group();

    this.physics.add.overlap(darts, bloons, Bloon.take_damage, null, this);
    this.physics.add.overlap(goal, bloons, Bloon.bloon_end, null, this);

    // this.anims.create({
    //     key: 'bloon_pop',
    //     frames: this.anims.generateFrameNumbers('pop', {start: 0, end: 4}),
    //     frameRate: 10,
    // })

    scene.create_tower();
  }

  update () {
      level_text.setText('Level: ' + scene.level);
      lives_text.setText('Lives: ' + scene.lives);
      money_text.setText('Money: ' + scene.money);

      if (game_won) {
          return;
      }
      if (scene.lives <= 0) {
          this.end_game();
          return;
      }
      // TODO: allow user to start next level on their terms
      if (this.bloons_deployed[0] == level_data[this.level].bloons[0]) {

          this.money += (100 + this.level*2);
          this.level++;
          this.bloons_deployed = [0]
          // if user has reached last level
          if (level_data[this.level] == undefined) {
              this.add.text(143, 253, 'You Win!', { font: '64px Arial' });
              game_won = true;
              return;
          }
      }
      console.log(this.level)

      bloons.children.iterate(function (bloon) {
        bloon.move();
      });
      towers.children.iterate(function (tower) {
        if (tower.being_dragged) {
            tower.drag();
        }
        if (tower.placed) {
            tower.charge_tower();
            tower.fire();
        }
      });

      // create new bloons

      tick += level_data[this.level].tick;
      if (tick >= 100) {
        tick = 0;
        this.bloons_deployed[0] += 1;
        this.create_bloon();
      }
  }

  create_bloon() {
      new Bloon();
  }

  create_tower() {
      new Tower(712, 50);
  }

  end_game() {
      // TODO: add giant cows
      this.add.text(143, 253, 'You Lose!', { font: '64px Arial' });
  }
}
