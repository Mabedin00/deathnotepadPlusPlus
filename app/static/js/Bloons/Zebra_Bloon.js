class Zebra_Bloon extends Bloon {

    constructor(progress, health) {

        super("zenra_bloon", progress);

        this.speed = .6;
        this.health = 2 + health;
        this.damage = 23;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        new White_Bloon(this.progress, this.health);
        new Black_Bloon(this.progress, this.health);
        this.destroy();
    }

}
