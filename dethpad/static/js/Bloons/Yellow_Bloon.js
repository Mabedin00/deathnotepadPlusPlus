class Yellow_Bloon extends Bloon {

    constructor(progress, health, path) {

        super("yellow_bloon", progress, path);

        this.speed = .4;
        this.health = 1 + health;
        this.damage = 4;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        this.pop_sound();
        this.destroy();
        let child = new Green_Bloon(this.progress, this.health, this.path);
        if (this.deep_freeze) child.freeze_frames = this.freeze_frames;
        return [child];
    }

}
