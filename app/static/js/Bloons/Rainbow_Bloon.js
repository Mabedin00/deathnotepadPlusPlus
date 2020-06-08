class Rainbow_Bloon extends Bloon {

    constructor(progress, health) {

        super("rainbow_bloon", progress);

        this.speed = .35;
        this.health = 2 + health;
        this.damage = 47;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        new Zebra_Bloon(this.progress, this.health);
        new Zebra_Bloon(this.progress-.01, this.health);
        this.destroy();
    }

}
