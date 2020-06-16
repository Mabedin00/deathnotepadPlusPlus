class Dart_Monkey extends Tower {

    constructor() {

        super('dart_monkey', 750, 50);

        this.display_name = 'Dart Monkey';
        this.description = 'Shoot a single dart that pops a single bloon. A good, cheap tower suitable for the early rounds.';
        this.cost = 200;
        this.max_charge = 80;
        this.charge = this.max_charge;
        this.range = 150;
        this.pierce = 1;
        this.next_path1_price = 90;
        this.next_path2_price = 140;
        this.domain = LAND;
        this.splash = 'dart_splash'
        this.dart_type = 'dart'
        this.ability_status = 0; //0 for no ability, 1 for charging, 2 for in use
        this.ability_charge = 0;
        this.ability_max_charge = 8000;
        this.ability_duration = 800;
        this.path1_def_icon = "dm_1_1_icon";
        this.path2_def_icon = "dm_2_1_icon";

    }

    fire() {
        this.targets = this.return_valid_targets();
        // if there are no valid targets, stop fire function
        if (!this.targets.length) return;
        this.target = this.return_best_target();

        if (this.ability_charge >= this.ability_max_charge) {
            this.ability_charge = 0;
            this.ability_status = 2;
            this.setTexture('super_monkey');
            this.max_charge = 3;
            this.pierce = 1;
            this.og_range = this.range;
            this.range = 300;
            this.updateGraphics();
        }
        if (this.ability_duration <= 0) {
            this.ability_duration = 800;
            this.ability_status = 1;
            this.setTexture('dm_2_4');
            this.max_charge = 80;
            this.pierce = 4;
            this.range = this.og_range;
            this.updateGraphics();
        }

        if (this.charge >= this.max_charge) {
            this.charge = 0;
            this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y) + Math.PI / 2;
            if (this.ability_duration == 800) {
                switch (this.path1) {
                    case 4:
                        new Juggernaut(this.x, this.y, this.target, 1000);
                        break;
                    case 3:
                        new SpikeBall(this.x, this.y, this.target, 1000);
                        break;
                    default:
                        new Dart(this.x, this.y, this.target, this.range, this.pierce);
                }
                if (this.path2 >= 3) {
                    let x = this.target.x - this.x;
                    let y = this.target.y - this.y;
                    let split1 = this.rotate(x, y, Math.PI/12);
                    let split2 = this.rotate(x, y, -Math.PI/12);
                    new Dart(this.x, this.y, {x:split1[0], y:split1[1]}, this.range, this.pierce);
                    new Dart(this.x, this.y, {x:split2[0], y:split2[1]}, this.range, this.pierce);
                }
            } else {
                new Super_Dart(this.x, this.y, this.target, this.range);
            }
        }
    }

    create_tower() {
        new Dart_Monkey();
    }

    buy_path_1(tower) {
        let w = this.width;
        let h = this.height;
        let x = this.x;
        let y = this.y;
        if (scene.money >= tower.next_path1_price) {
            super.buy_path_1(tower);
            switch (this.path1) {
                case 1:
                    this.range += 38;
                    this.updateGraphics();
                    if (this.path2 < 2) {
                        this.setTexture('dm_1_1').setScale(.5);
                        this.input.hitArea.setSize(this.width, this.height);
                    }
                    scene.money -= 90;
                    this.next_path1_price = 120;
                    this.path1_price.setText("$" + this.next_path1_price);
                    this.path1_next_icon.destroy();
                    this.path1_last_icon = scene.add.image(280,540, "dm_1_1_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path1_next_icon = scene.add.image(380,540, "dm_1_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);

                    break;
                case 2:
                    this.range += 37;
                    this.updateGraphics();
                    this.camo_detection = true;
                    scene.money -= 120;
                    this.next_path1_price = 500;
                    if (this.path2 < 3) {
                        this.setTexture('dm_1_2');
                        this.input.hitArea.setSize(this.width, this.height);
                        this.path1_price.setText("$" + this.next_path1_price);
                        this.path1_last_icon.destroy();
                        this.path1_last_icon = scene.add.image(280,540, "dm_1_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    } else {
                        this.path1_price.destroy();
                    }
                    this.path1_next_icon.destroy();
                    this.path1_next_icon = scene.add.image(370,550, "dm_1_3_icon").setDepth(5).setDisplaySize(80,80).setAlpha(.7);
                    break;
                case 3:
                    this.range += 25;
                    this.updateGraphics();
                    this.setTexture('dm_1_3');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 500;
                    this.next_path1_price = 1500;
                    this.path1_price.setText("$" + this.next_path1_price);
                    if (this.path2 == 2) {
                        this.path2_price.destroy();
                    }
                    this.path1_last_icon.destroy();
                    this.path1_next_icon.destroy();
                    this.path1_next_icon = scene.add.image(370,550, "dm_1_4_icon").setDepth(5).setDisplaySize(80,80).setAlpha(.7);
                    this.path1_last_icon = scene.add.image(280,550, "dm_1_3_icon").setDepth(5).setDisplaySize(80,80).setAlpha(.7);
                    break;
                case 4:
                    this.range += 100;
                    this.updateGraphics();
                    this.setTexture('dm_1_4');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 1500;
                    this.path1_price.destroy();
                    this.path1_last_icon.destroy();
                    this.path1_last_icon = scene.add.image(280,550, "dm_1_4_icon").setDepth(5).setDisplaySize(80,80).setAlpha(.7);
                    this.path1_next_icon.destroy();
            }
        }
    }

    buy_path_2(tower) {
        if (scene.money >= tower.next_path2_price) {
            super.buy_path_2(tower);
            switch (this.path2) {
                case 1:
                    this.pierce++;
                    if (this.path1 < 2) {
                        this.setTexture('dm_1_1').setScale(0.5);
                        this.input.hitArea.setSize(this.width, this.height);
                    }
                    scene.money -= 140;
                    this.next_path2_price = 170;
                    this.path2_price.setText("$" + this.next_path2_price);
                    this.path2_next_icon.destroy();
                    this.path2_last_icon = scene.add.image(520,540, "dm_2_1_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path2_next_icon = scene.add.image(620,540, "dm_2_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.9);
                    break;
                case 2:
                    this.pierce += 2;
                    scene.money -= 170;
                    this.next_path2_price = 330;
                    if (this.path1 < 3) {
                        this.setTexture('dm_1_2');
                        this.path2_price.setText("$" + this.next_path2_price);
                        this.path2_next_icon.destroy();
                        this.path2_next_icon = scene.add.image(620,540, "dm_2_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.9);
                    } else {
                        this.path2_price.destroy();
                    }
                    this.path2_last_icon.destroy();
                    this.path2_last_icon = scene.add.image(520,540, "dm_2_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 3:
                    this.setTexture('dm_2_3');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 330;
                    this.next_path2_price = 8000;
                    this.path2_price.setText("$" + this.next_path2_price);
                    if (this.path1 == 2) {
                        this.path1_price.destroy();
                    }
                    this.path2_last_icon.destroy();
                    this.path2_last_icon = scene.add.image(520,540, "dm_2_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path2_next_icon.destroy();
                    this.path2_next_icon = scene.add.image(620,540, "dm_2_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.9);
                    break;
                case 4:
                    this.ability_status = 1;
                    this.setTexture('dm_2_4');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 8000;
                    this.path2_price.destroy();
                    this.path2_next_icon.destroy();
                    this.path2_last_icon.destroy();
                    this.path2_last_icon = scene.add.image(520,540, "dm_2_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);


            }
        }
    }
}
