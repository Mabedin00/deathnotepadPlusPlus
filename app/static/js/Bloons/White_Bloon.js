class White_Bloon extends Bloon {

    constructor(progress, health) {

        super("white_bloon", progress);

        this.speed = .3;
        this.health = 2 + health;
        this.damage = 11;
        this.value = 1;
        this.freeze_immunity = true;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        new Pink_Bloon(this.progress, this.health);
        new Pink_Bloon(this.progress-.01, this.health);
        this.destroy();
    }

}
