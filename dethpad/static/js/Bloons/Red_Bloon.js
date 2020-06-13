class Red_Bloon extends Bloon {

    constructor(progress, health, path) {
        super("red_bloon",progress, path);
        this.speed = .1;
        this.health = 1 + health;
        this.damage = 1;
        this.value = 1;
        // if it has inherited enough damage where it has 0 hp, call transform()
        if (this.health <= 0) {
            this.transform();
        }
    }


    transform(){
        this.pop_sound();
        this.destroy();
        return [];
    }

}
