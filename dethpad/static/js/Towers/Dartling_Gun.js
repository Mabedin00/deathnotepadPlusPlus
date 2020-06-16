class Dartling_Gun extends Tower {

    constructor() {

        super('dartling_gun', 815, 400);

        this.rotation = Math.PI/2;
        this.display_name = 'Dartling Gun';
        this.description = 'Shoots darts like a machine gun, super fast but not very accurate. The Dartling Gun will shoot towards wherever your mouse is, so you control how effective it is!';
        this.cost = 850;
        this.max_charge = 10;
        this.charge = this.max_charge;
        this.range = 999;
        this.pierce = 1;
        this.next_path1_price = 250;
        this.next_path2_price = 600;
        this.proj_speed = 600;
        this.domain = LAND;
        this.dart_type = 'dart'
        dartlings.add(this);
        this.setScale(0.5);
        this.splash = 'dartling_splash'

        this.ability_status = 0; //0 for no ability, 1 for charging, 2 for in use
        this.ability_charge = 0;
        this.ability_max_charge = 4000;
        this.ability_duration = 40;

        this.path1_def_icon = "dg_1_1_icon";
        this.path2_def_icon = "dg_2_1_icon";
    }

    fire() {
        if (this.ability_charge >= this.ability_max_charge) {
            this.ability_charge = 0;
            this.ability_status = 2;
            this.og_charge = this.max_charge;
            this.max_charge = 1;
        }
        if (this.ability_duration <= 0) {
            this.ability_duration = 40;
            this.ability_status = 1;
            this.max_charge = this.og_charge;
        }
        if (this.charge >= this.max_charge) {
            this.charge = 0;
            let mouseX = scene.input.activePointer.x;
            let mouseY = scene.input.activePointer.y;
            let variance = Phaser.Math.Distance.Between(this.x, this.y, mouseX, mouseY);
            let variance_2 = variance * (Math.random() - .5) / (this.path1 >= 1 ? 10 : 3)
            if (this.path1 == 3) {
                new DGLaser(this.x, this.y, mouseX + variance_2, mouseY + variance_2, this.pierce, this.proj_speed);
            } else if (this.path1 == 4) {
                if (this.rod != undefined) this.rod.destroy();
                this.rod = new RayOfDoom(this.x - 400 * Math.cos(this.rotation + Math.PI/2),
                    this.y - 400 * Math.sin(this.rotation + Math.PI/2), mouseX, mouseY, this.rotation);
            } else if (this.path2 == 3 || this.ability_status == 2) {
                new Rocket(this.x, this.y, mouseX + variance_2, mouseY + variance_2, this.proj_speed)
            } else if (this.path2 == 4) {
                let x = mouseX - this.x;
                let y = mouseY - this.y;
                let split1 = this.rotate(x, y, Math.PI / 18);
                let split2 = this.rotate(x, y, -Math.PI / 18);
                new Rocket(this.x, this.y, mouseX, mouseY, this.proj_speed);
                new Rocket(this.x, this.y, split1[0], split1[1], this.proj_speed);
                new Rocket(this.x, this.y, split2[0], split2[1], this.proj_speed);
            } else {
                new Gatling_Dart(this.x, this.y, mouseX + variance_2, mouseY + variance_2, this.pierce, this.proj_speed);
            }
        }
    }

    target() {
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, scene.input.activePointer.x, scene.input.activePointer.y) + Math.PI / 2;
    }

    create_tower() {
        new Dartling_Gun();
    }

    buy_path_1(tower) {
        if (scene.money >= tower.next_path1_price) {
            super.buy_path_1(tower);
            switch (this.path1) {
                case 1:
                    if (this.path2 < 2) {
                        this.setTexture('dg_1_1').setScale(0.5);
                    }
                    scene.money -= 250;
                    this.next_path1_price = 1200;
                    this.path1_price.setText("$" + this.next_path1_price);
                    this.path1_next_icon.destroy();
                    this.path1_last_icon = scene.add.image(280,550, "dg_1_1_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path1_next_icon = scene.add.image(380,550, "dg_1_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 2:
                    this.max_charge -= 3;
                    scene.money -= 1200;
                    this.next_path1_price = 6000;
                    if (this.path2 < 3) {
                        this.setTexture('dg_1_2');
                        this.path1_price.setText("$" + this.next_path1_price);
                        this.path1_last_icon.destroy();
                        this.path1_last_icon = scene.add.image(280,550, "dg_1_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    } else {
                        this.path1_price.destroy();
                    }
                    this.path1_next_icon.destroy();
                    this.path1_next_icon = scene.add.image(380,550, "dg_1_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 3:
                    this.pierce += 12;
                    this.max_charge -= 4;
                    this.setTexture('dg_1_3');
                    scene.money -= 6000;
                    this.next_path1_price = 55000;
                    this.path1_price.setText("$" + this.next_path1_price);
                    if (this.path2 == 2) {
                        this.path2_price.destroy();
                    }
                    this.path1_last_icon.destroy();
                    this.path1_next_icon.destroy();
                    this.path1_next_icon = scene.add.image(380,550, "dg_1_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path1_last_icon = scene.add.image(280,550, "dg_1_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 4:
                    this.setTexture('dg_1_4');
                    scene.money -= 55000;
                    this.path1_price.destroy();
                    this.path1_last_icon.destroy();
                    this.path1_last_icon = scene.add.image(280,550, "dg_1_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path1_next_icon.destroy();
            }
        }
    }

    buy_path_2(tower) {
        if (scene.money >= tower.next_path2_price) {
            super.buy_path_2(tower);
            switch (this.path2) {
                case 1:
                    this.pierce += 2;
                    if (this.path1 < 2) {
                        this.setTexture('dg_1_1').setScale(0.5);
                    }
                    scene.money -= 600;
                    this.next_path2_price = 1000;
                    this.path2_price.setText("$" + this.next_path2_price);
                    this.path2_next_icon.destroy();
                    this.path2_last_icon = scene.add.image(520,550, "dg_2_1_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path2_next_icon = scene.add.image(620,550, "dg_2_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 2:
                    this.pierce += 2;
                    this.proj_speed += 200;
                    scene.money -= 1000;
                    this.next_path2_price = 7000;
                    if (this.path1 < 3) {
                        this.setTexture('dg_2_2');
                        this.path2_price.setText("$" + this.next_path2_price);
                        this.path2_last_icon.destroy();
                        this.path2_last_icon = scene.add.image(520,550, "dg_2_2_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    } else {
                        this.path2_price.destroy();
                    }
                    this.path2_next_icon.destroy();
                    this.path2_next_icon = scene.add.image(620,550, "dg_2_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 3:
                    this.setTexture('dg_2_3');
                    scene.money -= 7000;
                    this.next_path2_price = 20000;
                    this.path2_price.setText("$" + this.next_path2_price);
                    if (this.path1 == 2) {
                        this.path1_price.destroy();
                    }
                    this.path2_last_icon.destroy();
                    this.path2_next_icon.destroy();
                    this.path2_next_icon = scene.add.image(620,550, "dg_2_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path2_last_icon = scene.add.image(520,550, "dg_2_3_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    break;
                case 4:
                    this.ability_status = 1;
                    this.setTexture('dg_2_4');
                    scene.money -= 20000;
                    this.path2_price.destroy();
                    this.path2_last_icon.destroy();
                    this.path2_last_icon = scene.add.image(520,550, "dg_2_4_icon").setDepth(5).setDisplaySize(80,60).setAlpha(.7);
                    this.path2_next_icon.destroy();
            }
        }
    }
}
