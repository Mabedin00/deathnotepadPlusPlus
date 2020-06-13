class Rainbow_Bloon extends Bloon {

    constructor(progress, health, path, is_camo, is_regen) {

        if (is_camo && is_regen) super("rainbow_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_camo)        super("rainbow_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_regen)       super("rainbow_bloon_regen", progress, path, is_camo, is_regen);
        else                     super("rainbow_bloon",progress, path, is_camo, is_regen);

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
        new Zebra_Bloon(this.progress, this.health, this.path, this.is_camo, this.is_regen);
        new Zebra_Bloon(this.progress+.001, this.health, this.path, this.is_camo, this.is_regen);
        this.destroy();
    }

}
