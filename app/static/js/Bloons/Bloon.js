class Bloon extends Phaser.GameObjects.Sprite {

    constructor(bloon_type, progress, path) {
        // bloon will be teleported to correct location by its progress number
        let x = Phaser.Math.Interpolation.Linear(scene.coords.xlist, progress);
        let y = Phaser.Math.Interpolation.Linear(scene.coords.ylist, progress);
        super(scene, x, y, bloon_type);
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        bloons.add(this);
        this.progress = progress;
        this.path = path;
        // if it is a new bloon whose path must be randomly determined
        if (this.path == -1) {
            this.path = Math.floor((Math.random() * scene.coords.num_paths));
        }
        if (this.path == 0) {
            this.xlist = scene.coords.xlist;
            this.ylist = scene.coords.ylist;
        }
        else if (this.path == 1) {
            this.xlist = scene.coords.xlist1;
            this.ylist = scene.coords.ylist1;
        }
        else if (this.path == 2) {
            this.xlist = scene.coords.xlist2;
            this.ylist = scene.coords.ylist2;
        }

        this.increment = 1 / (this.xlist.length - 1)

    }

    move() {
        if (this.progress >= 1) return;

        this.current_node = Math.floor(this.progress / this.increment)

        var distance = Phaser.Math.Distance.Between(this.xlist[this.current_node],
                                                  this.ylist[this.current_node],
                                                  this.xlist[this.current_node+1],
                                                  this.ylist[this.current_node+1]);

        if (this.freeze_frames >= 0) this.freeze_frames--;
        else {
            if (scene.map == 'ocean_road') {
                this.progress += this.speed/distance;
            }
            else if (scene.map == 'floating_island') {
                this.progress += this.speed/(distance * 2);
            }
            else {
                this.progress += this.speed/distance;
            }
        }

        if (scene.coords_type == 'linear') {
            this.x = Phaser.Math.Interpolation.Linear(this.xlist, this.progress);
            this.y = Phaser.Math.Interpolation.Linear(this.ylist, this.progress);
        }
        if (scene.coords_type == 'catmull') {
            this.x = Phaser.Math.Interpolation.CatmullRom(this.xlist, this.progress);
            this.y = Phaser.Math.Interpolation.CatmullRom(this.ylist, this.progress);
        }
    }

    transform() {

    }

    static bloon_end(goal, bloon) {
        scene.lives -= bloon.damage;
        bloon.destroy();
    }
}
