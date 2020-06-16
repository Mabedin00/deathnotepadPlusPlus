class Monkey_Buccaneer extends Tower {

    constructor() {

        super('monkey_buccaneer', 750, 175);

        this.display_name = 'Monkey Buccaneer';
        this.description = 'Monkey Buccaneer fires powerful bombs with AOE damage. However, they can only be placed on water.';
        this.cost = 400;
        this.max_charge = 100;
        this.charge = this.max_charge;
        this.range = 250;
        this.pierce = 3;
        this.next_path1_price = 400;
        this.next_path2_price = 500;
        this.domain = WATER;
        this.toggle = false;
        this.aircraft_carrier = false;
        this.max_monkeys_deployed = 3;
        this.splash = 'buccaneer_splash'
        this.dart_type = 'bomb'

        this.ability_status = 0; //0 for no ability, 1 for charging
        this.ability_charge = 0;
        this.ability_max_charge = 2000;

        this.path1_def_icon = "b_1_1_icon";
        this.path2_def_icon = "b_2_1_icon";
    }

    fire() {
        this.targets = this.return_valid_targets();
        // if there are no valid targets, stop fire function
        if (!this.targets.length) return;
        if (this.aircraft_carrier) {
            console.log(this.charge)
            if (this.charge >= this.max_charge * 10 && this.monkeys_deployed < this.max_monkeys_deployed) {
                this.charge = 0
                this.monkeys_deployed++;
                new Monkey_Ace(this.x, this.y, this);
            }
        }
        else {
            this.target = this.return_best_target();

            if (this.ability_charge >= this.ability_max_charge) {
                this.ability_charge = 0;
                new Hook(this.x, this.y, this.return_strongest_target(), 1000);
            }
            if (this.charge >= this.max_charge) {
                this.charge = 0;
                this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
                new Dart(this.x, this.y, this.target, this.range, this.pierce);
                if (this.path2 >= 1) {
                    let x = this.target.x - this.x;
                    let y = this.target.y - this.y;
                    let grape1 = this.rotate(x, y, Math.PI/6);
                    let grape2 = this.rotate(x, y, Math.PI/18);
                    let grape3 = this.rotate(x, y, -Math.PI/18);
                    let grape4 = this.rotate(x, y, -Math.PI/6);
                    new Grape(this.x, this.y, {x:grape1[0], y:grape1[1]}, this.range);
                    new Grape(this.x, this.y, {x:grape2[0], y:grape2[1]}, this.range);
                    new Grape(this.x, this.y, {x:grape3[0], y:grape3[1]}, this.range);
                    new Grape(this.x, this.y, {x:grape4[0], y:grape4[1]}, this.range);
                }
                if (this.path2 >= 3) {
                    this.toggle = !this.toggle;
                    if (this.toggle) {
                        this.charge = 0;
                        new Bomb(this.x, this.y, this.target, this.range);
                    }
                }
            }
        }

    }

    create_tower() {
        new Monkey_Buccaneer();
    }

    buy_path_1(tower) {
        if (scene.money >= tower.next_path1_price) {
            super.buy_path_1(tower);
            switch (this.path1) {
                case 1:
                    this.max_charge -= 34;
                    if (this.path2 < 2) {
                        this.setTexture('b_1_1').setScale(0.5);
                        this.input.hitArea.setSize(this.width, this.height);
                    }
                    scene.money -= 400;
                    this.next_path1_price = 180;
                    this.path1_price.setText("$" + this.next_path1_price);
                    this.path1_next_icon.destroy();
                    this.path1_last_icon = scene.add.image(280,550, "b_1_1_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path1_next_icon = scene.add.image(380,550, "b_1_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 2:
                    this.range += 100;
                    this.updateGraphics();
                    scene.money -= 180;
                    this.next_path1_price = 2200;
                    if (this.path2 < 3) {
                        this.setTexture('b_1_2');
                        this.input.hitArea.setSize(this.width, this.height);
                        this.path1_price.setText("$" + this.next_path1_price);
                        this.path1_last_icon.destroy();
                        this.path1_last_icon = scene.add.image(280,550, "b_1_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    } else {
                        this.path1_price.destroy();
                    }
                    this.path1_next_icon.destroy();
                    this.path1_next_icon = scene.add.image(380,550, "b_1_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 3:
                    this.max_charge -= 33;
                    this.setTexture('b_1_3');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 2200;
                    this.next_path1_price = 15000;
                    this.path1_price.setText("$" + this.next_path1_price);
                    if (this.path2 == 2) {
                        this.path2_price.destroy();
                    }
                    this.path1_last_icon.destroy();
                    this.path1_next_icon.destroy();
                    this.path1_next_icon = scene.add.image(380,550, "b_1_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path1_last_icon = scene.add.image(280,550, "b_1_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 4:
                    this.aircraft_carrier = true;
                    this.monkeys_deployed = 0;
                    this.setTexture('b_1_4');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 15000;
                    this.path1_price.destroy();
                    this.path1_last_icon.destroy();
                    this.path1_last_icon = scene.add.image(280,550, "b_1_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path1_next_icon.destroy();
            }
        }
    }

    buy_path_2(tower) {
        if (scene.money >= tower.next_path2_price) {
            super.buy_path_2(tower);
            switch (this.path2) {
                case 1:
                    if (this.path1 < 2) {
                        this.setTexture('b_2_1').setScale(0.5);
                        this.input.hitArea.setSize(this.width, this.height);
                    }
                    scene.money -= 500;
                    this.next_path2_price = 250;
                    this.path2_price.setText("$" + this.next_path2_price);
                    this.path2_next_icon.destroy();
                    this.path2_last_icon = scene.add.image(520,550, "b_2_1_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path2_next_icon = scene.add.image(620,550, "b_2_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 2:
                    this.camo_detection = true;
                    scene.money -= 250;
                    this.next_path2_price = 1200;
                    if (this.path1 < 3) {
                        this.setTexture('b_1_2');
                        this.input.hitArea.setSize(this.width, this.height);
                        this.path2_price.setText("$" + this.next_path2_price);
                        this.path2_last_icon.destroy();
                        this.path2_last_icon = scene.add.image(520,550, "b_2_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    } else {
                        this.path2_price.destroy();
                    }
                    this.path2_next_icon.destroy();
                    this.path2_next_icon = scene.add.image(620,550, "b_2_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 3:
                    this.setTexture('b_2_3');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 1200;
                    this.next_path2_price = 4500;
                    this.path2_price.setText("$" + this.next_path2_price);
                    if (this.path1 == 2) {
                        this.path1_price.destroy();
                    }
                    this.path2_last_icon.destroy();
                    this.path2_next_icon.destroy();
                    this.path2_next_icon = scene.add.image(620,550, "b_2_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path2_last_icon = scene.add.image(520,550, "b_2_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 4:
                    this.ability_status = 1;
                    this.setTexture('b_2_4');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 4500;
                    this.path2_price.destroy();
                    this.path2_price.destroy();
                    this.path2_last_icon.destroy();
                    this.path2_last_icon = scene.add.image(520,550, "b_2_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path2_next_icon.destroy();
            }
        }
    }
}
