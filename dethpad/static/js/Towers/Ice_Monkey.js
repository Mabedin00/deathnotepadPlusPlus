class Ice_Monkey extends Tower {

    constructor() {

        super('ice_monkey', 875, 175);

        this.display_name = 'Ice Monkey';
        this.description = 'Freezes nearby bloons with every pulse. Frozen bloons are immune to anything sharp.';
        this.cost = 400;
        this.max_charge = 60;
        this.charge = this.max_charge;
        this.range = 75;
        this.domain = LAND;
        this.anim = scene.add.image(this.x, this.y, 'blizzard').setScale(.125);
        this.anim.visible = false
    }

    fire() {
        this.targets = this.return_valid_targets();
        // if there are no valid targets, stop fire function
        if (!this.targets.length) return;
        this.target = this.return_best_target();

        if (this.charge > this.max_charge / 3) {
            this.anim.visible = false;
        }
        if (this.charge >= this.max_charge) {
            this.charge = 0;
            this.anim.x = this.x;
            this.anim.y = this.y;
            this.anim.visible = true
            let circle = new Phaser.Geom.Circle(this.x, this.y, this.range);
            bloons.children.iterate(function (bloon) {
                if (Phaser.Geom.Circle.Contains(circle, bloon.x, bloon.y) && bloon.freeze_immunity != true) {
                    bloon.freeze_frames = 20;
                }
            });
        }
    }

    create_tower() {
        new Ice_Monkey();
    }
}
