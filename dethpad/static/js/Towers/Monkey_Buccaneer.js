class Monkey_Buccaneer extends Tower {

    constructor() {

        super('monkey_buccaneer', 750, 175);

        this.display_name = 'Monkey Buccaneer';
        this.description = 'Monkey Buccaneer fires powerful bombs with AOE damage. However, they can only be placed on water.';
        this.cost = 400;
        this.max_charge = 100;
        this.charge = this.max_charge;
        this.range = 250;
        this.domain = WATER;
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

            new Bomb(this.x, this.y, this.target, this.range);
        }
    }

    create_tower() {
        new Monkey_Buccaneer();
    }

    /*buy_path_1(tower) {
        super.buy_path_1(tower);
        switch (this.path1) {
            case 1:
                scene.money -= ;
                break;
            case 2:
                scene.money -= ;
                break;
            case 3:
                scene.money -= ;
                break;
            case 4:
                scene.money -= ;
        }
    }

    buy_path_2(tower) {
        super.buy_path_2(tower);
        switch (this.path2) {
            case 1:
                scene.money -= ;
                break;
            case 2:
                scene.money -= ;
                break;
            case 3:
                scene.money -= ;
                break;
            case 4:
                scene.money -= ;
        }
    }*/
}
