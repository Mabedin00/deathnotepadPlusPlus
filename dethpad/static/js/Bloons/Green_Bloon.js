class Green_Bloon extends Bloon {

    constructor(progress, health, path, is_camo, is_regen) {

        if (is_camo && is_regen) super("green_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_camo)        super("green_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_regen)       super("green_bloon_regen", progress, path, is_camo, is_regen);
        else                     super("green_bloon",progress, path, is_camo, is_regen);

        this.speed = .3;
        this.health = 1 + health;
        this.damage = 3;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        this.pop_sound();
        new Blue_Bloon(this.progress, this.health, this.path);
        this.destroy();
    }

}
