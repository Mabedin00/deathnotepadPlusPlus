class Rainbow_Bloon extends Bloon {

    constructor(progress, health, path) {

        super("rainbow_bloon", progress, path);

        this.speed = .35;
        this.health = 2 + health;
        this.damage = 47;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        this.pop_sound();
        this.destroy();
        let child1 = new Zebra_Bloon(this.progress, this.health, this.path);
        let child2 = new Zebra_Bloon(this.progress+.001, this.health, this.path);
        return [child1, child2];
    }

}
