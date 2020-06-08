class Zebra_Bloon extends Bloon {

    constructor(progress, health) {

        super("zebra_bloon", progress);

        this.speed = .3;
        this.health = 2 + health;
        this.damage = 23;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        new White_Bloon(this.progress, this.health);
        // to make sure they're not stacked
        new Black_Bloon(this.progress - .01, this.health);
        this.destroy();
    }

}
