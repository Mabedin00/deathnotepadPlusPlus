class Rainbow_Bloon extends Bloon {

    constructor(progress, health, path) {

        super("rainbow_bloon", progress, path);

        this.speed = .35;
        this.health = 2 + health;
        this.damage = 47;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        new Zebra_Bloon(this.progress, this.health, this.path);
        new Zebra_Bloon(this.progress-.01, this.health, this.path);
        this.destroy();
    }

}
