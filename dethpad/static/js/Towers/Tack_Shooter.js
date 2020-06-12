class Tack_Shooter extends Tower {

    constructor() {

        super('tack_shooter', 875, 50);

        this.display_name = 'Tack Shooter';
        this.description = 'Shoots a short range volley of sharp tacks in 8 directions.';
        this.cost = 550;
        this.max_charge = 85;
        this.charge = this.max_charge;
        this.range = 75;
        this.domain = LAND;
        this.dart_type = 'dart'
    }

    fire() {
        this.targets = this.return_valid_targets();
        // if there are no valid targets, stop fire function
        if (!this.targets.length) return;

        if (this.charge >= this.max_charge) {
            this.charge = 0;
            for (let angle = 0; angle < 2*Math.PI; angle += Math.PI/4) {
                new Tack(this.x, this.y, angle, this.range);
            }
        }
    }

    create_tower() {
        new Tack_Shooter();
    }
}
