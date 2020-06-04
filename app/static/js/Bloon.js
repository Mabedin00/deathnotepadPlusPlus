class Bloon extends Phaser.GameObjects.Sprite {

    constructor() {

        let start_x = scene.coords.xlist[0];
        let start_y = scene.coords.ylist[0];

        super(scene, start_x, start_y, "red_bloon");
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        bloons.add(this);

        this.setScale(.02);

        this.speed = 1;
        this.health = 1;
        this.value = 1;

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

      this.progress += this.speed/distance;

      this.x = Phaser.Math.Interpolation.Linear(this.xlist, this.progress);
      this.y = Phaser.Math.Interpolation.Linear(this.ylist, this.progress);

    }

    static take_damage(dart, bloon) {
        bloon.health -= dart.damage;
        if (bloon.health <= 0) {
            scene.money += bloon.value;
            bloon.destroy();
            // let destroy_animation = this.physics.add.sprite(bloon.x, bloon.y, 'pop').setScale(.25);
            // destroy_animation.anims.play('bloon_pop');
            // destroy_animation.once('animationcomplete', () => {
            //     destroy_animation.destroy();
            // })
        }
        dart.destroy()
    }

    static bloon_end(goal, bloon) {
        scene.lives -= bloon.health;
        bloon.destroy();
    }
}
