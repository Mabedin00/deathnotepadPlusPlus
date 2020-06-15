class Super_Monkey extends Tower {

    constructor() {

        super('super_monkey', 875, 325);

        this.display_name = 'Super Monkey';
        this.description = '	Super Monkeys shoots a continuous stream of darts, and can mow down even the fastest and most stubborn bloons.';
        this.cost = 3500;
        this.max_charge = 3;
        this.charge = this.max_charge;
        this.range = 300;
        this.pierce = 1;
        this.next_path1_price = 3500;
        this.next_path2_price = 1000;
        this.domain = LAND;
        this.splash = 'super_splash'
        this.dart_type = 'dart'

        this.ability_status = 0; //0 for no ability, 1 for charging
        this.ability_charge = 0;
        this.ability_max_charge = 8000;
    }

    fire() {
        this.targets = this.return_valid_targets();
        // if there are no valid targets, stop fire function
        if (!this.targets.length) return;
        this.target = this.return_best_target();

        if (this.ability_charge >= this.ability_max_charge) {
            this.ability_charge = 0;
            let circle = new Phaser.Geom.Circle(this.x, this.y, 200);
            bloons.children.iterate((bloon) => {
                if (bloon != undefined && Phaser.Geom.Circle.Contains(circle, bloon.x, bloon.y)) {
                    if (bloon.isMOAB) {
                        bloon.health -= 1000;
                    } else {
                        bloon.destroy();
                    }
                }
            });
        }
        if (this.charge >= this.max_charge) {
            this.charge = 0;
            this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y) + Math.PI / 2;
            switch (this.path2) {
                case 4:
                    new TechBlast(this.x, this.y, this.target, 1000, this.pierce);
                    new TechBlast(this.x, this.y, this.return_worst_target(), 1000, this.pierce);
                    break;
                case 3:
                    switch (this.path1) {
                        case 0:
                            new Super_Dart(this.x, this.y, this.return_worst_target(), 1000, this.pierce);
                            break;
                        case 1:
                            new SMLaser(this.x, this.y, this.return_worst_target(), 1000);
                            break;
                        case 2:
                            new Plasma(this.x, this.y, this.return_worst_target(), 1000);
                    }
                default:
                    switch (this.path1) {
                        case 0:
                            new Super_Dart(this.x, this.y, this.target, 1000, this.pierce);
                            break;
                        case 1:
                            new SMLaser(this.x, this.y, this.target, 1000);
                            break;
                        case 2:
                            new Plasma(this.x, this.y, this.target, 1000);
                            break;
                        case 3:
                            let x = this.target.x - this.x;
                            let y = this.target.y - this.y;
                            let split1 = this.rotate(x, y, Math.PI / 12);
                            let split2 = this.rotate(x, y, -Math.PI / 12);
                            new SGBlast(this.x, this.y, this.target, 1000);
                            new SGBlast(this.x, this.y, {x: split1[0], y: split1[1]}, this.range);
                            new SGBlast(this.x, this.y, {x: split2[0], y: split2[1]}, this.range);
                            break;
                        case 4:
                            new TempleBlast(this.x, this.y, this.target, 1000);
                    }
            }
        }
    }

    create_tower() {
        new Super_Monkey();
    }

    buy_path_1(tower) {
        if (scene.money >= tower.next_path1_price) {
            super.buy_path_1(tower);
            switch (this.path1) {
                case 1:
                    //lasers can pop frozen, double damage to MOABs
                    this.pierce++;
                    if (this.path2 < 3) {
                        this.setTexture('sm_1_1');
                    }
                    scene.money -= 3500;
                    this.next_path1_price = 5000;
                    break;
                case 2:
                    //plasma can pop lead
                    this.max_charge--;
                    this.pierce += 2;
                    this.max_charge--;
                    if (this.path2 < 3) {
                        this.setTexture('sm_1_2');
                    }
                    scene.money -= 5000;
                    this.next_path1_price = 16500;
                    break;
                case 3:
                    this.max_charge++;
                    this.setTexture('sm_1_3').setScale(0.5);
                    scene.money -= 16500;
                    this.next_path1_price = 100000;
                    break;
                case 4:
                    this.max_charge--;
                    this.setTexture('sm_1_4');
                    scene.money -= 100000;
            }
        }
    }

    buy_path_2(tower) {
        if (scene.money >= tower.next_path2_price) {
            super.buy_path_2(tower);
            switch (this.path2) {
                case 1:
                    this.range += 100;
                    this.updateGraphics();
                    scene.money -= 1000;
                    this.next_path2_price = 1500;
                    break;
                case 2:
                    this.pierce++;
                    this.range += 100;
                    this.updateGraphics();
                    if (this.path1 < 2) {
                        this.setTexture('sm_2_2');
                    }
                    scene.money -= 1500;
                    this.next_path2_price = 9000;
                    break;
                case 3:
                    //robo monkey can pop frozen and lead
                    this.setTexture('sm_2_3').setScale(0.5);
                    scene.money -= 9000;
                    this.next_path2_price = 25000;
                    break;
                case 4:
                    switch (this.path1) {
                        case 0:
                            this.pierce = 5;
                            break;
                        case 1:
                            this.pierce = 6;
                            break;
                        case 2:
                            this.pierce = 8;
                    }
                    this.max_charge--;
                    this.ability_status = 1;
                    this.setTexture('sm_2_4');
                    scene.money -= 25000;
            }
        }
    }
}
