class Zebra_Bloon extends Bloon {

    constructor(progress, health, path, is_camo, is_regen, og_type) {
        if (og_type == undefined) og_type = "zebra_bloon_regen";
        if (is_camo && is_regen) super("zebra_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_camo)        super("zebra_bloon_camo", progress, path, is_camo, is_regen);
        else if (is_regen)       super("zebra_bloon_regen", progress, path, is_camo, is_regen, og_type);
        else                     super("zebra_bloon",progress, path, is_camo, is_regen);

        this.speed = .3;
        this.health = 2 + health;
        this.damage = 23;
        this.value = 1;
        this.freeze_immunity = true;
        this.explosion_immunity = true;


        if (this.health <= 0) {
            this.transform();
        }
    }

    transform() {

        new White_Bloon(this.progress, this.health, this.path, this.is_camo, this.is_regen, this.og_type);
        new Black_Bloon(this.progress+.001, this.health, this.path, this.is_camo, this.is_regen, this.og_type);
        this.destroy();
    }

    regenerate(){
        new Rainbow_Bloon(this.progress, 0, this.path, this.is_camo, this.is_regen, this.og_type);
        this.destroy();console.log("d");
    }

}
