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

        this.ability_status = 0; //0 for no ability, 1 for charging
        this.ability_charge = 0;
        this.ability_max_charge = 4000;
    }

    fire() {
        if (this.ability_charge >= this.ability_max_charge) {
            this.ability_charge = 0;
            console.log('yes');
            bloons.children.iterate((bloon) => {
                if (!bloon.isMOAB) bloon.freeze_frames = 320;
            });
        }

        this.targets = this.targets_ignore_camo();
        // if there are no valid targets, stop fire function
        if (!this.targets.length) return;
        else if (this.path1 >= 3) {
            for (let bloon of this.targets) {
                if (bloon instanceof Red_Bloon) {
                    console.log(bloon.speed);
                }
                if (bloon instanceof Bloon && !bloon.arctic_wind && !bloon.isMOAB) {
                    bloon.arctic_wind = true;
                    bloon.speed *= 0.33;
                }
            }
        }
        this.targets = this.return_valid_targets();
        if (!this.targets.length) return;
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
                if (bloon != undefined &&
                    Phaser.Geom.Circle.Contains(circle, bloon.x, bloon.y) &&
                    !bloon.freeze_immunity && !bloon.is_camo) {
                    if (p2 >= 3) {
                        bloon.ice_shards = true;
                    }
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
                            if (p1 == 4) {
                                child.viral_frost = true;
                                colliders.push(scene.physics.add.overlap(child, bloons, child.spread_frost));
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
                    if (this.path2 < 2) {
                        this.setTexture('im_1_1').setScale(0.5);
                    }
                    scene.money -= 190;
                    this.next_path1_price = 400;
                    break;
                case 2:
                    if (this.path2 < 3) {
                        this.setTexture('im_1_2');
                    }
                    scene.money -= 400;
                    this.next_path1_price = 6500;
                    break;
                case 3:
                    this.range += 64;
                    this.updateGraphics();
                    this.setTexture('im_1_3');
                    scene.money -= 6500;
                    this.next_path1_price = 6000;
                    break;
                case 4:
                    this.setTexture('im_1_4');
                    scene.money -= 6000;
            }
        }
    }

    buy_path_2(tower) {
        if (scene.money >= tower.next_path2_price) {
            super.buy_path_2(tower);
            switch (this.path2) {
                case 1:
                    if (this.path1 < 2) {
                        this.setTexture('im_1_1').setScale(0.5);
                    }
                    scene.money -= 100;
                    this.next_path2_price = 350;
                    break;
                case 2:
                    if (this.path1 < 3) {
                        this.setTexture('im_1_2');
                    }
                    scene.money -= 350;
                    this.next_path2_price = 2000;
                    break;
                case 3:
                    this.setTexture('im_2_3');
                    scene.money -= 2000;
                    this.next_path2_price = 2000;
                    break;
                case 4:
                    this.ability_status = 1;
                    this.setTexture('im_2_4');
                    scene.money -= 2000;
            }
        }
    }
}
