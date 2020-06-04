class Bloon extends Phaser.GameObjects.Sprite {

    constructor(bloon_type, x = scene.coords.xlist[0], y = scene.coords.ylist[0] ) {

        super(scene, x, y, bloon_type);
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        bloons.add(this);
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
            bloon.transform();
            // let destroy_animation = this.physics.add.sprite(bloon.x, bloon.y, 'pop').setScale(.25);
            // destroy_animation.anims.play('bloon_pop');
            // destroy_animation.once('animationcomplete', () => {
            //     destroy_animation.destroy();
            // })
        }
        dart.destroy()
    }



    transform(){

    }



    static bloon_end(goal, bloon) {
        scene.lives -= bloon.health;
        bloon.destroy();
    }
}
