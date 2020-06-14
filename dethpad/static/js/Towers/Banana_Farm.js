class Banana_Farm extends Tower {

    constructor() {

        super('banana_farm', 750, 325);

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
    }

    fire() {
        if (this.charge >= this.max_charge && this.path2 < 3) {
            this.charge = 0;
            //change to boxes later
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
            new Banana(this.x, this.y, value);
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
                        this.next_path1_price = 1400;
                    } else {
                        this.income += 40;
                    }
                    break;
                case 2:
                    if (this.path2 < 3) {
                        this.max_charge -= 50;
                        scene.money -= 1400;
                        this.next_path1_price = 3200;
                    } else {
                        this.income += 160;
                    }
                    break;
                case 3:
                    this.max_charge -= 50;
                    scene.money -= 3200;
                    this.next_path1_price = 14000;
                    break;
                case 4:
                    //boxes of bananas
                    this.max_charge += 100;
                    scene.money -= 14000;
            }
        }
    }

    buy_path_2(tower) {
        if (scene.money >= tower.next_path1_price) {
            super.buy_path_2(tower);
            switch (this.path2) {
                case 1:
                    scene.money -= 500;
                    this.next_path2_price = 4000;
                    break;
                case 2:
                    scene.money -= 4000;
                    this.next_path2_price = 4200;
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
                    scene.money -= 4200;
                    this.next_path2_price = 5500;
                    break;
                case 4:
                    this.bank_maximum = 20000;
                    this.interest = 1.2;
                    this.income = 1000;
                    scene.money -= 5500;
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
