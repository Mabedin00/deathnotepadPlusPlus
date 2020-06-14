class MOAB extends Bloon {

    constructor(progress, health, path) {

        super("MOAB", progress, path);

        this.speed = .1;
        this.health = 140 + health;
        this.damage = 616;
        this.value = 1;
        this.setScale(.7);

        this.current_node = Math.floor(this.progress / this.increment)
        this.rotation = Phaser.Math.Angle.Between(this.xlist[this.current_node],
                                                    this.ylist[this.current_node],
                                                    this.xlist[this.current_node+1],
                                                    this.ylist[this.current_node+1]);

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        this.pop_sound();

        this.destroy();
        let child1 = new Ceramic_Bloon(this.progress, this.health, this.path);
        let child2 = new Ceramic_Bloon(this.progress+.001, this.health, this.path);
        let child3 = new Ceramic_Bloon(this.progress+.002, this.health, this.path);
        let child4 = new Ceramic_Bloon(this.progress+.003, this.health, this.path);
        return [child1, child2, child3, child4];
    }
    move() {
        if (this.progress >= 1) return;

        this.current_node = Math.floor(this.progress / this.increment)
        var distance = Phaser.Math.Distance.Between(this.xlist[this.current_node],
                                                  this.ylist[this.current_node],
                                                  this.xlist[this.current_node+1],
                                                  this.ylist[this.current_node+1]);
        this.rotation = Phaser.Math.Angle.Between(this.xlist[this.current_node],
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
                this.progress += this.speed/(distance*10);
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

}
