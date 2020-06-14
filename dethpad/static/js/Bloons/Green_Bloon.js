class Green_Bloon extends Bloon {

    constructor(progress, health, path) {

        super("green_bloon", progress, path);

        this.speed = .3;
        this.health = 1 + health;
        this.damage = 3;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        this.pop_sound();
        this.destroy();
        let child = new Blue_Bloon(this.progress, this.health, this.path);
        if (this.deep_freeze) child.freeze_frames = this.freeze_frames;
        return [child];
    }

}
