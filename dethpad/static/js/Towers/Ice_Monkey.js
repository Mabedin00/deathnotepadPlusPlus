class Ice_Monkey extends Tower {
    constructor() {

        super('ice_monkey', 875, 175);

        this.display_name = 'Ice Monkey';
        this.description = 'Freezes nearby bloons with every pulse. Frozen bloons are immune to anything sharp.';
        this.cost = 400;
        this.max_charge = 60;
        this.charge = this.max_charge;
        this.range = 75;
        this.next_path1_price = 190;
        this.next_path2_price = 100;
        this.domain = LAND;
        this.splash = 'ice_splash'
        this.anim = scene.add.image(this.x, this.y, 'blizzard').setScale(.125);
        this.anim.visible = false
    }

    fire() {
        this.targets = this.return_valid_targets();
        // if there are no valid targets, stop fire function
        if (!this.targets.length) return;
        else if (this.path1 >= 3) {
            for (let bloon of this.targets) {
                if (bloon instanceof Bloon && !bloon.arctic_wind && !bloon.isMOAB) {
                    bloon.arctic_wind = true;
                    bloon.speed *= 0.33;
                }
            }
        }
        this.target = this.return_best_target();

        if (this.charge >= this.max_charge) {
            this.charge = 0;
            this.anim.x = this.x;
            this.anim.y = this.y;
            this.anim.visible = true;
            let circle = new Phaser.Geom.Circle(this.x, this.y, this.range);
            let p1 = this.path1;
            let p2 = this.path2;
            bloons.children.iterate((bloon) => {
                if (bloon != undefined && Phaser.Geom.Circle.Contains(circle, bloon.x, bloon.y)) {
                    if (p1 >= 2) {
                        for (let child of bloon.transform()) {
                            child.freeze_frames = 28;
                            if (p2 >= 1 && !child.permafrost) {
                                child.permafrost = true;
                                child.speed *= 0.5;
                            }
                            if (p2 >= 2) {
                                child.deep_freeze = true;
                            }
                        }
                    } else {
                        bloon.freeze_frames = p1 >= 1? 28:20;
                        if (p2 >= 1 && !bloon.permafrost) {
                            bloon.permafrost = true;
                            bloon.speed *= 0.5;
                        }
                        if (p2 >= 2) {
                            bloon.deep_freeze = true;
                        }
                    }
                }
            });
        }
    }

    create_tower() {
        new Ice_Monkey();
    }

    buy_path_1(tower) {
        if (scene.money >= tower.next_path1_price) {
            super.buy_path_1(tower);
            switch (this.path1) {
                case 1:
                    this.range += 11;
                    this.updateGraphics();
                    scene.money -= 190;
                    this.next_path1_price = 400;
                    break;
                case 2:
                    scene.money -= 400;
                    this.next_path1_price = 6500;
                    break;
                case 3:
                    this.range += 64;
                    this.updateGraphics();
                    scene.money -= 6500;
                    this.next_path1_price = 6000;
                    break;
                case 4:
                    //viral frost: bloons that touch frozen bloons are frozen, affects white and zebra
                    scene.money -= 6000;
            }
        }
    }

    buy_path_2(tower) {
        if (scene.money >= tower.next_path2_price) {
            super.buy_path_2(tower);
            switch (this.path2) {
                case 1:
                    scene.money -= 100;
                    this.next_path2_price = 350;
                    break;
                case 2:
                    scene.money -= 350;
                    this.next_path2_price = 2000;
                    break;
                case 3:
                    //ice shards
                    scene.money -= 2000;
                    this.next_path2_price = 2000;
                    break;
                case 4:
                    //absolute zero ability
                    scene.money -= 2000;
            }
        }
    }
}
