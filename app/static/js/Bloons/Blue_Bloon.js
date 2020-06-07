class Blue_Bloon extends Bloon {

    constructor(progress, health) {

        super("blue_bloon", progress);

        this.speed = .2;
        this.health = 1 + health;
        this.damage = 2;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        new Red_Bloon(this.progress, this.health);
        this.destroy();
    }

}
