class Black_Bloon extends Bloon {

    constructor(progress, health, path, is_camo, is_regen, og_type) {
        if (og_type == undefined) og_type = "black_bloon_regen";
        if (is_camo && is_regen) super("black_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_camo)        super("black_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_regen)       super("black_bloon_regen", progress, path, is_camo, is_regen, og_type);
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
        new Pink_Bloon(this.progress, this.health, this.path, this.is_camo, this.is_regen, this.og_type);
        new Pink_Bloon(this.progress+.001, this.health, this.path, this.is_camo, this.is_regen, this.og_type);
        this.destroy();
    }

    regenerate(){
        new Zebra_Bloon(this.progress, 0, this.path, this.is_camo, this.is_regen, this.og_type);
        this.destroy();
    }

}
