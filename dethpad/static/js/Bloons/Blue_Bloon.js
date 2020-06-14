class Blue_Bloon extends Bloon {

    constructor(progress, health, path) {

        super("blue_bloon", progress, path);

        this.speed = .2;
        this.health = 1 + health;
        this.damage = 2;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        this.pop_sound();
        this.destroy();
        let child = new Red_Bloon(this.progress, this.health, this.path);
        if (this.deep_freeze) child.freeze_frames = this.freeze_frames;
        return [child];
    }

}
