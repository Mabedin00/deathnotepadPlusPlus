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
                if (Phaser.Geom.Circle.Contains(circle, bloon.x, bloon.y)) {
                    if (this.path1 >= 2) {
                        for (let child of bloon.transform()) {
                            child.freeze_frames = this.path1 >= 1? 28:20;
                            if (this.path2 >= 1) child.speed *= 0.5;
                        }
                    } else {
                        bloon.freeze_frames = this.path1 >= 1? 28:20;
                        if (this.path2 >= 1) bloon.speed *= 0.5;
                    }
                }
            });
        }
    }

    create_tower() {
        new Ice_Monkey();
    }

    buy_path_1(tower) {
        super.buy_path_1(tower);
        if (this.path1 == 1) {
            this.range += 11;
            this.updateGraphics();
            scene.money -= 190;
        }
        if (this.path1 == 2) {
            scene.money -= 400;
        }
        if (this.path1 == 3) {
            this.range += 644;
            this.updateGraphics();
            //slow normal bloons (non MOAB) by 33% while in radius including camo
            scene.money -= 6500;
        }
        if (this.path1 == 4) {
            //viral frost: bloons that touch frozen bloons are frozen, affects white and zebra
            scene.money -= 6000;
        }
    }

    buy_path_2(tower) {
        super.buy_path_2(tower);
        if (this.path2 == 1) {
            scene.money -= 100;
        }
        if (this.path2 == 2) {
            //freeze two layers of bloons
            scene.money -= 350;
        }
        if (this.path2 == 3) {
            //ice shards
            scene.money -= 2000;
        }
        if (this.path2 == 4) {
            //absolute zero ability
            scene.money -= 2000;
        }
    }
}
