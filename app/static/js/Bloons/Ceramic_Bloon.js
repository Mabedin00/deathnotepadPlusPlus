class Ceramic_Bloon extends Bloon {

    constructor(progress, health) {

        super("ceramic_bloon", progress);

        this.speed = .4;
        this.health = 10 + health;
        this.damage = 104;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        new Rainbow_Bloon(this.progress, this.health);
        new Rainbow_Bloon(this.progress-.01, this.health);
        this.destroy();
    }

}
