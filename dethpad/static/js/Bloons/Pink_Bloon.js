class Pink_Bloon extends Bloon {

    constructor(progress, health, path) {
        super("pink_bloon", progress, path);
        this.speed = .6;
        this.health = 2 + health;

        this.damage = 5;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        super.transform();
        this.pop_sound();
        this.destroy();
        let child = new Yellow_Bloon(this.progress, this.health, this.path);
        if (this.deep_freeze) child.freeze_frames = this.freeze_frames;
        return [child];
    }

}
