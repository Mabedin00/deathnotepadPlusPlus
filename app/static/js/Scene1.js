class Scene1 extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init(data) {
    // sets the correct map
    this.map = data.map;
    // adds path for bloons to follow based on the map
    this.coords = mapdata[data.map];
  }

  preload () {
      this.load.image('ocean_road', 'static/images/' + this.map + '.png');
      this.load.image('red_bloon', 'static/images/Red_Bloon1.png');
      this.load.image('dart_monkey', 'static/images/dart_monkey.png');

  }

  create () {
    scene = this;
    // background image
    this.add.image(343, 253, 'ocean_road');
    goal = this.physics.add.sprite(-40, 340, 'ocean_road').setScale(.1);
    bloons = this.physics.add.group();
    this.physics.add.overlap(goal, bloons, this.bloon_end, null, this);

    towers = this.physics.add.group();

    scene.create_tower();

  }

  update () {
      bloons.children.iterate(function (bloon) {
        bloon.move();
      });
      towers.children.iterate(function (tower) {
        if (tower.being_dragged) tower.drag();
      });

      // create new bloons
      tick++;
      if (tick == 60) {
        tick = 0;
        this.create_bloon();
      }
  }

  create_bloon() {
      var bloon = new Bloon(this, 620, 0);
  }

  create_tower() {
      var tower = new Tower(this, 712, 50)
  }


  bloon_end(goal, bloon) {
    bloon.destroy();
  }
}
