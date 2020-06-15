class Tack_Shooter extends Tower {

    constructor() {

        super('tack_shooter', 875, 50);

        this.display_name = 'Tack Shooter';
        this.description = 'Shoots a short range volley of sharp tacks in 8 directions.';
        this.cost = 550;
        this.max_charge = 85;
        this.charge = this.max_charge;
        this.range = 75;
        this.next_path1_price = 210;
        this.next_path2_price = 100;
        this.domain = LAND;
        this.splash = 'tack_splash'
        this.dart_type = 'dart'

        this.ability_status = 0; //0 for no ability, 1 for charging, 2 for in use
        this.ability_charge = 0;
        this.ability_max_charge = 4000;
        this.ability_duration = 400;
        this.angle_step = Math.PI/4;
        this.angle_increment = 0;
    }

    fire() {
        if (this.ability_duration == 400) {
            this.targets = this.return_valid_targets();
            // if there are no valid targets, stop fire function
            if (!this.targets.length) return;
        }

        if (this.ability_charge >= this.ability_max_charge) {
            this.ability_charge = 0;
            this.ability_status = 2;
            this.og_charge = this.max_charge;
            this.max_charge = 3;
            this.angle_step = Math.PI;
        }
        if (this.ability_duration <= 0) {
            this.ability_duration = 400;
            this.ability_status = 1;
            this.max_charge = this.og_charge;
            this.angle_step = Math.PI/4;
            this.angle_increment = 0;
        }
        if (this.charge >= this.max_charge) {
            this.charge = 0;
            for (let angle = this.angle_increment; angle < 2*Math.PI+this.angle_increment; angle += this.angle_step) {
                if (this.path1 == 4) {
                    new Fire(this.x, this.y, angle, this.range);
                } else if (this.path2 >= 3) {
                    if (this.ability_status == 2) {
                        new Blade(this.x, this.y, angle, 1000, Infinity);
                    } else {
                        new Blade(this.x, this.y, angle, this.range, 2);
                    }
                } else {
                    new Tack(this.x, this.y, angle, this.range);
                }
            }
            if (this.ability_status == 2) {
                this.angle_increment += Math.PI/32;
            }
        }
    }

    create_tower() {
        new Tack_Shooter();
    }

    buy_path_1(tower) {
        if (scene.money >= tower.next_path1_price) {
            super.buy_path_1(tower);
            switch (this.path1) {
                case 1:
                    this.max_charge -= 15;
                    if (this.path2 < 2) {
                        this.setTexture('ts_1_1').setScale(0.5);
                        this.input.hitArea.setSize(this.width, this.height);
                    }
                    scene.money -= 210;
                    this.next_path1_price = 300;
                    this.path1_price.setText("$" + this.next_path1_price);
                    break;
                case 2:
                    this.max_charge -= 20;
                    if (this.path2 < 3) {
                        this.setTexture('ts_1_2');
                        this.input.hitArea.setSize(this.width, this.height);
                    }
                    scene.money -= 300;
                    this.next_path1_price = 500;
                    this.path1_price.setText("$" + this.next_path1_price);
                    break;
                case 3:
                    this.angle_step /= 2;
                    this.setTexture('ts_1_3');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 500;
                    this.next_path1_price = 2500;
                    this.path1_price.setText("$" + this.next_path1_price);
                    break;
                case 4:
                    this.max_charge -= 25;
                    this.range += 50;
                    this.updateGraphics();
                    this.setTexture('ts_1_4');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 2500;
            }
        }
    }

    buy_path_2(tower) {
        if (scene.money >= tower.next_path2_price) {
            super.buy_path_2(tower);
            switch (this.path2) {
                case 1:
                    this.range += 12;
                    this.updateGraphics();
                    if (this.path1 < 2) {
                        this.setTexture('ts_1_1').setScale(0.5);
                        this.input.hitArea.setSize(this.width, this.height);
                    }
                    scene.money -= 100;
                    this.next_path2_price = 225;
                    this.path2_price.setText("$" + this.next_path2_price);
                    break;
                case 2:
                    this.range += 13;
                    this.updateGraphics();
                    if (this.path1 < 3) {
                        this.setTexture('ts_1_2');
                        this.input.hitArea.setSize(this.width, this.height);
                    }
                    scene.money -= 225;
                    this.next_path2_price = 680;
                    this.path2_price.setText("$" + this.next_path2_price);
                    break;
                case 3:
                    this.setTexture('ts_2_3');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 680;
                    this.next_path2_price = 2700;
                    this.path2_price.setText("$" + this.next_path2_price);
                    break;
                case 4:
                    this.ability_status = 1;
                    this.setTexture('ts_2_4');
                    this.input.hitArea.setSize(this.width, this.height);
                    this.path1_price.setText("$" + this.next_path1_price);
                    scene.money -= 2700;
            }
        }
    }
}
