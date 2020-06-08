class White_Bloon extends Bloon {

    constructor(progress, health, path) {

        super("white_bloon", progress, path);

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
        new Pink_Bloon(this.progress, this.health, this.path);
        new Pink_Bloon(this.progress-.01, this.health, this.path);
        this.destroy();
    }

}
