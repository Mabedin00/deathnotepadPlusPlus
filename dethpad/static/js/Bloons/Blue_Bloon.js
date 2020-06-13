class Blue_Bloon extends Bloon {

    constructor(progress, health, path, is_camo, is_regen) {

        if (is_camo && is_regen) super("blue_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_camo)        super("blue_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_regen)       super("blue_bloon_regen", progress, path, is_camo, is_regen);
        else                     super("blue_bloon",progress, path, is_camo, is_regen);


        this.speed = .2;
        this.health = 1 + health;
        this.damage = 2;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        this.pop_sound();
        new Red_Bloon(this.progress, this.health, this.path);
        this.destroy();
    }

}
