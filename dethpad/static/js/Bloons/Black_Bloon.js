class Black_Bloon extends Bloon {

    constructor(progress, health, path, is_camo, is_regen) {

        if (is_camo && is_regen) super("black_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_camo)        super("black_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_regen)       super("black_bloon_regen", progress, path, is_camo, is_regen);
        else                     super("black_bloon",progress, path, is_camo, is_regen);

        this.speed = .3;
        this.health = 2 + health;
        this.damage = 11;
        this.value = 1;
        this.explosion_immunity = true;
        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        this.pop_sound();
        new Pink_Bloon(this.progress, this.health, this.path, this.is_camo, this.is_regen);
        new Pink_Bloon(this.progress+.001, this.health, this.path, this.is_camo, this.is_regen);
        this.destroy();
    }

}
