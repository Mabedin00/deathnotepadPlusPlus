class Red_Bloon extends Bloon {

    constructor(progress, health, path, is_camo, is_regen) {

        if (is_camo && is_regen) super("red_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_camo)        super("red_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_regen)       super("red_bloon_regen", progress, path, is_camo, is_regen);
        else                     super("red_bloon",progress, path, is_camo, is_regen);
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
    }

}
