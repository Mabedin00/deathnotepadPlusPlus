class Green_Bloon extends Bloon {

    constructor(progress, health) {

        super("green_bloon", progress);

        this.speed = .3;
        this.health = 1 + health;
        this.damage = 3;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        new Blue_Bloon(this.progress, this.health);
        this.destroy();
    }

}
