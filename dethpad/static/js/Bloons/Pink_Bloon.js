class Pink_Bloon extends Bloon {

    constructor(progress, health, path, is_camo, is_regen, og_type) {
        if (og_type == undefined) og_type = "pink_bloon_regen";
        if (is_camo && is_regen) super("pink_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_camo)        super("pink_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_regen)       super("pink_bloon_regen", progress, path, is_camo, is_regen, og_type);
        else                     super("pink_bloon",progress, path, is_camo, is_regen);
        this.speed = .6;
        this.health = 2 + health;

        this.damage = 5;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        this.pop_sound();
        new Yellow_Bloon(this.progress, this.health, this.path, this.is_camo, this.is_regen, this.og_type);
        this.destroy();
    }

    regenerate(){
        new White_Bloon(this.progress, 0, this.path, this.is_camo, this.is_regen, this.og_type);
        this.destroy();
    }

}
