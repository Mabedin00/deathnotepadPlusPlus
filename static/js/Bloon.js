class Bloon extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y, "red_bloon");
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        bloons.add(this);

        this.setScale(.02);

        this.progress = 0;
        this.xlist = scene.coords.xlist;
        this.ylist = scene.coords.ylist;

        this.increment = 1 / (this.xlist.length - 1)

    }

    move() {
      if (this.progress >= 1) return;

      this.current_node = Math.floor(this.progress / this.increment)

      var distance = Phaser.Math.Distance.Between(this.xlist[this.current_node],
                                                  this.ylist[this.current_node],
                                                  this.xlist[this.current_node+1],
                                                  this.ylist[this.current_node+1]);

      this.progress += 1/distance;

      this.x = Phaser.Math.Interpolation.Linear(this.xlist, this.progress);
      this.y = Phaser.Math.Interpolation.Linear(this.ylist, this.progress);

    }
}
