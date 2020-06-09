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
        new Green_Bloon(this.progress, this.health, this.path);
        this.destroy();
    }

}
