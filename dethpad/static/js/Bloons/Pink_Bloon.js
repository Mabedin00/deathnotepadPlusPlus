class Pink_Bloon extends Bloon {

    constructor(progress, health, path) {
        super("pink_bloon", progress, path);
        this.speed = .6;
        this.health = 2 + health;

        this.damage = 5;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        scene.bloon_pop.play();
        
        new Yellow_Bloon(this.progress, this.health, this.path);
        this.destroy();
    }

}
