class Monkey_Ace extends Phaser.Physics.Arcade.Sprite {

    constructor(x, y, dad) {

        super(scene, x, y, 'monkey_ace');
        scene.add.existing(this);
        monkey_aces.add(this)

        this.max_tack_charge = 80;
        this.tack_charge = 0;

        this.max_strafe_charge = 30;
        this.strafe_charge = this.max_strafe_charge;

        this.dad = dad;
        this.range = 150;
        this.speed = 50;
        this.pierce = 1;
        this.placed = true;
        this.dart_type = 'dart'
        this.graphics = scene.add.graphics({ fillStyle: { color: 0xffffff , alpha: 0} });
        this.circle = new Phaser.Geom.Circle(this.x, this.y, this.range);
        // this.setVelocity(-50, -50);

    }

    fire() {
        if (this.target == undefined || Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 10) {
            this.targets = this.return_valid_targets();
            this.target = this.return_best_target();
        }

        if (this.target != undefined) {
            this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y) + Math.PI/2;
            scene.physics.moveTo(this, this.target.x, this.target.y, this.speed * scene.fast_forward)
        }

        if (this.tack_charge >= this.max_tack_charge && this.target != undefined) {
            this.tack_charge = 0;
            for (let angle = 0; angle < 2*Math.PI; angle += Math.PI/8) {
                new Tack(this.x, this.y, angle, 1000);
            }
        }

        if (this.strafe_charge >= this.max_strafe_charge && this.target != undefined) {
            this.strafe_charge = 0;
            new Dart(this.x, this.y, this.target, 300, this.pierce);
            new Dart(this.x, this.y, this.target, 300, this.pierce);
        }
    }

    return_to_base() {
        this.target = this.dad;
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y) + Math.PI/2;
        scene.physics.moveTo(this, this.target.x, this.target.y, this.speed * scene.fast_forward)
        if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 10) {
            this.destroy();
            this.dad.monkeys_deployed--;
        }
    }

    return_valid_targets() {
        let valid_targets = [];
        bloons.children.iterate((bloon) => {
            if (Phaser.Geom.Circle.Contains(this.circle, bloon.x, bloon.y)) {
                valid_targets.push(bloon);
            }
        });
        return valid_targets
    }

    return_best_target() {
        // returns the target that is farthest along the track
        let max = this.targets[0];

        for (let target of this.targets) {
            if (target.progress > max.progress) {
                max = target;
            }
        }
        return max;
    }

    charge() {
        this.tack_charge   += (scene.fast_forward);
        this.strafe_charge += (scene.fast_forward);
    }
}
