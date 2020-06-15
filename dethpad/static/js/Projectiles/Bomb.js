class Bomb extends Projectile {

    constructor(x, y, target, range) {
        super(x, y,"bomb",range);

        this.damage = 2;
        this.speed = 200;
        this.target = target;
        this.explosion_radius = 150;
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        scene.physics.moveTo(this, this.target.x, this.target.y, this.speed)

        this.setScale(.5);
    }

    // deals full damage to the direct hit and half damage to immediate surroundings
    inflict_damage(bomb, bloon) {
        scene.explosion.play();
        bloon.is_the_target = true;
        let circle = new Phaser.Geom.Circle(bomb.x, bomb.y, this.explosion_radius);
        let collateral_damage = [];
        // we need to gather list of bloons targeted, and then deal damage to them
        bloons.children.iterate(function (bloon) {
            if (Phaser.Geom.Circle.Contains(circle, bloon.x, bloon.y) && !bloon.is_the_target && bloon.explosion_immunity != true ) {
                collateral_damage.push(bloon);
            }
        });
        for (let collateral_bloon of collateral_damage) {
            console.log(collateral_damage);
            this.take_life(collateral_bloon, this.damage / 2);
        }
        bloon.is_the_target = false;
        this.take_life(bloon, this.damage);
    }

    take_life(bloon, damage) {
        bloon.health -= Math.floor(damage);
        if (bloon.health <= 0) {
            scene.money += bloon.value;
            scene.score += bloon.value;
            bloon.transform();
        }
        this.destroy();
    }
}
