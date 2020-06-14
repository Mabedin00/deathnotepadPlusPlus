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
        this.domain = WATER;
        this.toggle = false;
        this.dart_type = 'bomb'
    }

    fire() {
        this.targets = this.return_valid_targets();
        // if there are no valid targets, stop fire function
        if (!this.targets.length) return;
        this.target = this.return_best_target();

        if (this.charge >= this.max_charge) {
            this.charge = 0;
            this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
            new Dart(this.x, this.y, this.target, this.range, this.pierce);
            if (this.path2 >= 3) {
                this.toggle = !this.toggle;
                if (this.toggle) {
                    this.charge = 0;
                    new Bomb(this.x, this.y, this.target, this.range);
                }
            }
        }

    }

    create_tower() {
        new Monkey_Buccaneer();
    }

    buy_path_1(tower) {
        super.buy_path_1(tower);
        switch (this.path1) {
            case 1:
                this.max_charge -= 34;
                scene.money -= 400;
                break;
            case 2:
                this.range += 100;
                this.updateGraphics();
                scene.money -= 180;
                break;
            case 3:
                this.max_charge -= 33;
                scene.money -= 2200;
                break;
            case 4:
                //aircraft carrier
                scene.money -= 15000;
        }
    }

    buy_path_2(tower) {
        super.buy_path_2(tower);
        switch (this.path2) {
            case 1:
                //grape shot
                scene.money -= 500;
                break;
            case 2:
                //detect camo
                scene.money -= 250;
                break;
            case 3:
                scene.money -= 1200;
                break;
            case 4:
                //monkey pirates
                scene.money -= 4500;
        }
    }
}
