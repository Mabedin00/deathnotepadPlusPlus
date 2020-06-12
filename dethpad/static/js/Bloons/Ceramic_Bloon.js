class Ceramic_Bloon extends Bloon {

    constructor(progress, health, path) {

        super("ceramic_bloon", progress, path);

        this.speed = .4;
        this.health = 10 + health;
        this.damage = 104;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        this.pop_sound();
        new Rainbow_Bloon(this.progress, this.health, this.path);
        new Rainbow_Bloon(this.progress+.001, this.health, this.path);
        this.destroy();
    }

}
