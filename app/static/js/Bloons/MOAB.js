class MOAB extends Bloon {

    constructor(progress, health) {

        super("MOAB", progress);

        this.speed = .1;
        this.health = 140 + health;
        this.damage = 616;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        new Ceramic_Bloon(this.progress, this.health);
        new Ceramic_Bloon(this.progress, this.health);
        new Ceramic_Bloon(this.progress, this.health);
        new Ceramic_Bloon(this.progress, this.health);

        this.destroy();
    }

}
