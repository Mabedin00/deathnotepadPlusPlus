class Dartling_Gun extends Tower {

    constructor() {

        super('dartling_gun', 950, 60);

        this.display_name = 'Dartling Gun';
        this.description = 'Shoots darts like a machine gun, super fast but not very accurate. The Dartling Gun will shoot towards wherever your mouse is, so you control how effective it is!';
        this.cost = 850;
        this.max_charge = 10;
        this.charge = this.max_charge;
        this.range = 999;
        this.domain = LAND;
        this.dart_type = 'dart'
        dartlings.add(this);
    }

    fire() {
        if (this.charge >= this.max_charge) {
            this.charge = 0;
            let variance = Phaser.Math.Distance.Between(this.x, this.y, scene.input.activePointer.x, scene.input.activePointer.y);
            let variance_2 = variance * (Math.random() - .5) / 3

            new Gatling_Dart(this.x, this.y, scene.input.activePointer.x + variance_2, scene.input.activePointer.y + variance_2);
        }
    }

    target() {
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, scene.input.activePointer.x, scene.input.activePointer.y) + Math.PI / 2;
    }

    create_tower() {
        new Dartling_Gun();
    }
}
