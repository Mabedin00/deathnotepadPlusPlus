class Bloon extends Phaser.GameObjects.Sprite {

    constructor(bloon_type, progress, path) {
        // bloon will be teleported to correct location by its progress number
        let xlist, ylist;
        // if it is a new bloon whose path must be randomly determined
        if (path == -1) {
            path = Math.floor((Math.random() * scene.coords.num_paths));
        }
        if (path == 0) {
            xlist = scene.coords.xlist;
            ylist = scene.coords.ylist;
        }
        else if (path == 1) {
            xlist = scene.coords.xlist1;
            ylist = scene.coords.ylist1;
        }
        else if (path == 2) {
            xlist = scene.coords.xlist2;
            ylist = scene.coords.ylist2;
        }
        let x = Phaser.Math.Interpolation.Linear(xlist, progress);
        let y = Phaser.Math.Interpolation.Linear(ylist, progress);
        super(scene, x, y, bloon_type);
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        bloons.add(this);
        this.progress = progress;
        this.path = path;
        this.xlist = xlist;
        this.ylist = ylist;
        this.setScale(.9)

        this.increment = 1 / (this.xlist.length - 1)

        this.permafrost = false;
        this.deep_freeze = false;
    }

    move() {
        if (this.progress >= 1) return;

        this.current_node = Math.floor(this.progress / this.increment)

        var distance = Phaser.Math.Distance.Between(this.xlist[this.current_node],
                                                  this.ylist[this.current_node],
                                                  this.xlist[this.current_node+1],
                                                  this.ylist[this.current_node+1]);


        if (this.freeze_frames >= 0) {
            this.freeze_frames -= scene.fast_forward;
        }
        else {
            this.progress += this.speed * map_data[scene.map].speed_multiplier * scene.fast_forward/ distance;
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

    pop_sound() {
        scene.bloon_pop.volume = sfx;
        scene.bloon_pop.play();

    }
}
