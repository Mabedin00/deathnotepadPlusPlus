class Bloon extends Phaser.GameObjects.Sprite {

    constructor(bloon_type, progress, path, is_camo, is_regen, og_type) {
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
        this.is_camo = is_camo;
        this.is_regen = is_regen;
        this.bt = bloon_type;
        this.og_type = og_type;
        scene.physics.world.enableBody(this, 0);
        bloons.add(this);
        this.charge = 0;
        this.progress = progress;
        this.path = path;
        this.xlist = xlist;
        this.ylist = ylist;
        this.setScale(.9)

        this.increment = 1 / (this.xlist.length - 1)

        this.permafrost = false;
        this.deep_freeze = false;
        this.arctic_wind = false;
        this.viral_frost = false;
        this.ice_shards = false;
        this.isMOAB = false;
    }

    move() {
        if (this.progress >= 1) return;

        this.current_node = Math.floor(this.progress / this.increment)

        var distance = Phaser.Math.Distance.Between(this.xlist[this.current_node],
                                                  this.ylist[this.current_node],
                                                  this.xlist[this.current_node+1],
                                                  this.ylist[this.current_node+1]);


        if (this.arctic_wind){
            let in_range = false;
            let bloon = this;
            towers.children.iterate((tower) => {
                if (tower instanceof Ice_Monkey && tower.path1 >= 3 && tower.targets_ignore_camo().includes(bloon)){
                    in_range = true;
                }
            });
            if (!in_range) {
                this.arctic_wind = false;
                this.speed *= 3;
            }
        }
        if (this.freeze_frames >= 0) {
            this.freeze_frames -= scene.fast_forward;
        }
        else {
            this.viral_frost = false;
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
        if (this.ice_shards) {
            new Ice(this.x, this.y, Math.random()*Math.PI*2, 100);
            new Ice(this.x, this.y, Math.random()*Math.PI*2, 100);
            new Ice(this.x, this.y, Math.random()*Math.PI*2, 100);
            new Ice(this.x, this.y, Math.random()*Math.PI*2, 100);
            new Ice(this.x, this.y, Math.random()*Math.PI*2, 100);
        }
    }

    regenerate(){

    }

    regen() {
        if (this.charge >= 180){
            this.charge = 0;
            // console.log(this.bt, this.og_type);
            if (this.bt == this.og_type) return;

            if (this.bt != this.og_type) {
                this.regenerate();
            }
        }


    }
    regen_charge() {
        this.charge += (1 * scene.fast_forward);
    }


    static bloon_end(goal, bloon) {
        scene.lives -= bloon.damage;
        bloon.destroy();
    }

    pop_sound() {
        scene.bloon_pop.volume = sfx;
        scene.bloon_pop.play();

    }

    spread_frost(bloon1, bloon2) {
        if (bloon1.viral_frost) {
            bloon2.viral_frost = true;
            bloon2.freeze_frames = bloon1.freeze_frames;
        }
    }
}
