class MOAB extends Bloon {

    constructor(progress, health) {

        super("MOAB", progress);

        this.speed = .1;
        this.health = 140 + health;
        this.damage = 616;
        this.value = 1;
        this.setScale(.7);

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        new Ceramic_Bloon(this.progress, this.health);
        new Ceramic_Bloon(this.progress-.01, this.health);
        new Ceramic_Bloon(this.progress-.02, this.health);
        new Ceramic_Bloon(this.progress-.03, this.health);

        this.destroy();
    }

}
