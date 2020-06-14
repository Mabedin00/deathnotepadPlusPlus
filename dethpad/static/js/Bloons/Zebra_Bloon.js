class Zebra_Bloon extends Bloon {

    constructor(progress, health, path) {

        super("zebra_bloon", progress, path);

        this.speed = .3;
        this.health = 2 + health;
        this.damage = 23;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        this.pop_sound();
        this.destroy();
        let child1 = new White_Bloon(this.progress, this.health, this.path);
        let child2 = new Black_Bloon(this.progress+.001, this.health, this.path);
        return [child1, child2];
    }

}
