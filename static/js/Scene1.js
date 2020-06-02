class Scene1 extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init(data) {
    this.map = data.map;
    this.coords = mapdata[data.map];
  }

  preload () {
      this.load.image('ocean_road', 'static/images/' + this.map + '.png');
      this.load.image('red_bloon', 'static/images/Red_Bloon1.png');
  }

  create () {
    this.add.image(343, 253, 'ocean_road');
    goal = this.physics.add.sprite(-40, 340, 'ocean_road').setScale(.1);
    bloons = this.physics.add.group();

    this.physics.add.overlap(goal, bloons, this.bloon_end, null, this);
  }

  update () {
      bloons.children.iterate(function (bloon) {
        bloon.move();
      });

      tick++;
      if (tick == 60) {
        tick = 0;
        this.create_bloon();
      }
  }

  create_bloon() {
    var bloon = new Bloon(this, 620, 0);
  }

  bloon_end(goal, bloon) {
    bloon.destroy();
  }
}
