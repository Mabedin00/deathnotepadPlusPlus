class Pink_Bloon extends Bloon {

    constructor(progress, health) {

        super("pink_bloon", progress);

        this.speed = .6;
        this.health = 2 + health;
        this.damage = 5;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        new Yellow_Bloon(this.progress, this.health);
        this.destroy();
    }

}
