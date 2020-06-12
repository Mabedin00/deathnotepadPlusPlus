class Black_Bloon extends Bloon {

    constructor(progress, health, path) {

        super("black_bloon", progress, path);

        this.speed = .3;
        this.health = 2 + health;
        this.damage = 11;
        this.value = 1;
        // this.exlosion_immunity = true;
        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        this.pop_sound();
        new Pink_Bloon(this.progress, this.health, this.path);
        new Pink_Bloon(this.progress+.001, this.health, this.path);
        this.destroy();
    }

}
