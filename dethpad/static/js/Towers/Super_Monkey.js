class Super_Monkey extends Tower {

    constructor() {

        super('super_monkey', 875, 325);

        this.display_name = 'Super Monkey';
        this.description = '	Super Monkeys shoots a continuous stream of darts, and can mow down even the fastest and most stubborn bloons.';
        this.cost = 3500;
        this.max_charge = 3;
        this.charge = this.max_charge;
        this.range = 300;
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
        }
    }

    create_tower() {
        new Super_Monkey();
    }
}
