class Banana_Farm extends Tower {

    constructor() {

        super('banana_farm', 750, 315);

        this.display_name = 'Banana Farm';
        this.description = 'Banana Farms grow bananas that you can collect for cash by clicking on them';
        this.cost = 800;
        this.max_charge = 300;
        this.charge = this.max_charge;
        this.range = 50;
        this.next_path1_price = 300;
        this.next_path2_price = 500;
        this.domain = LAND;
        this.splash = 'banana_splash'
        this.setScale(.8);

        this.path1_def_icon = "bf_1_1_icon";
        this.path2_def_icon = "bf_2_1_icon";
    }

    fire() {
        if (this.charge >= this.max_charge && this.path2 < 3) {
            this.charge = 0;
            let value;
            if (this.path1 == 4) {
                value = 200;
                if (this.path2 >= 1) value *= 1.25;
                if (this.path2 == 2) value *= 1.2;
            } else {
                value = 25;
                if (this.path2 >= 1) value += 7;
                if (this.path2 == 2) value += 6;
            }
            if (this.path1 == 4) {
                new Box(this.x, this.y, value);
            } else {
                new Banana(this.x, this.y, value);
            }
        }
    }

    create_tower() {
        new Banana_Farm();
    }

    buy_path_1(tower) {
        if (scene.money >= tower.next_path1_price) {
            super.buy_path_1(tower);
            switch (this.path1) {
                case 1:
                    if (this.path2 < 3) {
                        this.max_charge -= 100;
                        scene.money -= 300;
                    } else {
                        this.income += 40;
                    }
                    this.next_path1_price = 1400;
                    this.path1_price.setText("$" + this.next_path1_price);
                    if (this.path2 < 2) {
                        this.setTexture('bf_1_1').setScale(0.5);
                        this.input.hitArea.setSize(this.width, this.height);
                    }
                    this.path1_next_icon.destroy();
                    this.path1_last_icon = scene.add.image(280,550, "bf_1_1_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path1_next_icon = scene.add.image(380,550, "bf_1_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 2:
                    if (this.path2 < 3) {
                        this.max_charge -= 50;
                        scene.money -= 1400;
                    } else {
                        this.income += 160;
                    }
                    this.next_path1_price = 3200;
                    if (this.path2 < 3) {
                        this.setTexture('bf_1_2');
                        this.input.hitArea.setSize(this.width, this.height);
                        this.path1_price.setText("$" + this.next_path1_price);
                        this.path1_last_icon.destroy();
                        this.path1_last_icon = scene.add.image(280,550, "bf_1_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    } else {
                        this.path1_price.destroy();
                    }
                    this.path1_next_icon.destroy();
                    this.path1_next_icon = scene.add.image(380,550, "bf_1_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 3:
                    this.max_charge -= 50;
                    this.setTexture('bf_1_3');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 3200;
                    this.next_path1_price = 14000;
                    this.path1_price.setText("$" + this.next_path1_price);
                    if (this.path2 == 2) {
                        this.path2_price.destroy();
                    }
                    this.path1_last_icon.destroy();
                    this.path1_next_icon.destroy();
                    this.path1_next_icon = scene.add.image(380,550, "bf_1_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path1_last_icon = scene.add.image(280,550, "bf_1_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 4:
                    this.max_charge += 100;
                    this.setTexture('bf_1_4');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 14000;
                    this.path1_price.destroy();
                    this.path1_last_icon.destroy();
                    this.path1_last_icon = scene.add.image(280,550, "bf_1_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path1_next_icon.destroy();
            }
        }
    }

    buy_path_2(tower) {
        if (scene.money >= tower.next_path1_price) {
            super.buy_path_2(tower);
            switch (this.path2) {
                case 1:
                    if (this.path1 < 2) {
                        this.setTexture('bf_1_1').setScale(0.5);
                        this.input.hitArea.setSize(this.width, this.height);
                    }
                    scene.money -= 500;
                    this.next_path2_price = 4000;
                    this.path2_price.setText("$" + this.next_path2_price);
                    this.path2_next_icon.destroy();
                    this.path2_last_icon = scene.add.image(520,550, "bf_2_1_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path2_next_icon = scene.add.image(620,550, "bf_2_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 2:
                    scene.money -= 4000;
                    this.next_path2_price = 4200;
                    if (this.path1 < 3) {
                        this.setTexture('bf_1_2');
                        this.input.hitArea.setSize(this.width, this.height);
                        this.path2_price.setText("$" + this.next_path2_price);
                        this.path2_last_icon.destroy();
                        this.path2_last_icon = scene.add.image(520,550, "bf_2_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    } else {
                        this.path2_price.destroy();
                    }
                    this.path2_next_icon.destroy();
                    this.path2_next_icon = scene.add.image(620,550, "bf_2_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 3:
                    this.bank_maximum = 5000;
                    this.account = 0;
                    this.interest = 1.1;
                    this.income = 450;
                    this.atm = scene.add.text(130, 510, 'Balance: 0', {font: '14px Arial'}).setDepth(5);
                    this.btn_text = scene.add.text(140, 535, 'Withdraw', {font: '12px Arial', color: '#000'}).setDepth(6);
                    this.withdraw_btn = scene.add.graphics().setDepth(5);
                    this.rect = new Phaser.Geom.Rectangle(130, 530, 70, 25);
                    this.withdraw_btn.fillStyle(0x808080);
                    this.withdraw_btn.fillRectShape(this.rect);
                    this.setTexture('bf_2_3');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 4200;
                    this.next_path2_price = 5500;
                    this.path2_price.setText("$" + this.next_path2_price);
                    if (this.path1 == 2) {
                        this.path1_price.destroy();
                    }
                    this.path2_last_icon.destroy();
                    this.path2_next_icon.destroy();
                    this.path2_next_icon = scene.add.image(620,550, "bf_2_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path2_last_icon = scene.add.image(520,550, "bf_2_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 4:
                    this.bank_maximum = 20000;
                    this.interest = 1.2;
                    this.income = 1000;
                    this.setTexture('bf_2_4');
                    this.input.hitArea.setSize(this.width, this.height);
                    scene.money -= 5500;
                    this.path2_price.destroy();
                    this.path2_last_icon.destroy();
                    this.path2_last_icon = scene.add.image(520,550, "bf_2_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path2_next_icon.destroy();
            }
        }
    }

    add_income() {
        this.account = Math.min(this.bank_maximum, Math.round(this.account * this.interest + this.income));
        this.atm.destroy();
        this.atm = scene.add.text(130, 510, `Balance: ${this.account}`, {font: '14px Arial'}).setDepth(5);
    }

    withdraw(tower) {
        scene.money += tower.account;
        tower.account = 0;
        tower.atm.destroy();
        tower.atm = scene.add.text(130, 510, 'Balance: 0', {font: '14px Arial'}).setDepth(5);
        tower.withdraw_btn.fillStyle(0x808080);
        tower.withdraw_btn.fillRectShape(tower.rect);
        tower.withdraw_btn.removeInteractive();
    }

    show_details() {
        super.show_details();
        if (this.path2 > 2) {
            this.atm.visible = true;
            this.withdraw_btn.visible = true;
            this.btn_text.visible = true;
        }
    }

    unshow_details() {
        super.unshow_details();
        if (this.path2 > 2) {
            this.atm.visible = false;
            this.withdraw_btn.visible = false;
            this.btn_text.visible = false;
        }
    }
}
