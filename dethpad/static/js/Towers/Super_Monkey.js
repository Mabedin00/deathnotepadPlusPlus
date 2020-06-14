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
        this.domain = LAND;
        this.dart_type = 'dart'
    }

    fire() {
        this.targets = this.return_valid_targets();
        // if there are no valid targets, stop fire function
        if (!this.targets.length) return;
        this.target = this.return_best_target();

        if (this.charge >= this.max_charge) {
            this.charge = 0;
            this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y) + Math.PI / 2;
            new Super_Dart(this.x, this.y, this.target, this.range);
            if (this.path2 >= 3) {
                new Super_Dart(this.x, this.y, this.return_worst_target(), this.range);
            }
        }
    }

    create_tower() {
        new Super_Monkey();
    }

    buy_path_1(tower) {
        super.buy_path_1(tower);
        switch (this.path1) {
            case 1:
                //lasers can pop frozen, double damage to MOABs
                this.pierce++;
                scene.money -= 3500;
                break;
            case 2:
                //plasma can pop lead
                this.pierce += 2;
                this.max_charge--;
                scene.money -= 5000;
                break;
            case 3:
                //sun god
                scene.money -= 16500;
                break;
            case 4:
                //temple
                scene.money -= 100000;
        }
    }

    buy_path_2(tower) {
        super.buy_path_2(tower);
        switch (this.path2) {
            case 1:
                scene.money -= 1000;
                break;
            case 2:
                scene.money -= 1500;
                break;
            case 3:
                //robo monkey can pop frozen and lead
                scene.money -= 9000;
                break;
            case 4:
                //tech terror ability: destroys all bloons in short radius, does 1000 damage to MOABS, hits camo
                this.max_charge--;
                scene.money -= 25000;
        }
    }
}
