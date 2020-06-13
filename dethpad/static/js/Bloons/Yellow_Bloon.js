class Yellow_Bloon extends Bloon {

    constructor(progress, health, path, is_camo, is_regen, og_type) {
        if (og_type == undefined) og_type = "yellow_bloon_regen";
        if (is_camo && is_regen) super("yellow_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_camo)        super("yellow_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_regen)       super("yellow_bloon_regen", progress, path, is_camo, is_regen, og_type);
        else                     super("yellow_bloon",progress, path, is_camo, is_regen);

        this.speed = .4;
        this.health = 1 + health;
        this.damage = 4;
        this.value = 1;

        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {
        this.pop_sound();
        new Green_Bloon(this.progress, this.health, this.path, this.is_camo, this.is_regen, this.og_type);
        this.destroy();
    }

    regenerate(){
        new Pink_Bloon(this.progress, 0, this.path, this.is_camo, this.is_regen, this.og_type);
        this.destroy();
    }

}
