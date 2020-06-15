class Rocket extends Projectile {

    constructor(x, y, target_x, target_y, speed) {
        super(x, y,"rocket", 999);

        this.damage = 50;
        this.speed = speed;
        this.explosion_radius = 100;
        this.rotation = Math.PI/2+Phaser.Math.Angle.Between(this.x, this.y, target_x, target_y);
        scene.physics.moveTo(this, target_x, target_y, this.speed)

        this.setScale(.4);
    }

    inflict_damage(bomb, bloon) {
        scene.explosion.play();
        bloon.is_the_target = true;
        let circle = new Phaser.Geom.Circle(bomb.x, bomb.y, this.explosion_radius);
        let collateral_damage = [];
        // we need to gather list of bloons targeted, and then deal damage to them
        bloons.children.iterate(function (bloon) {
            if (Phaser.Geom.Circle.Contains(circle, bloon.x, bloon.y) && !bloon.is_the_target) {
                collateral_damage.push(bloon);
            }
        });
        for (let collateral_bloon of collateral_damage) {
            this.take_life(collateral_bloon, this.damage / 2);
        }
        bloon.is_the_target = false;
        this.take_life(bloon, this.damage);
        this.destroy();
    }

    take_life(bloon, damage) {
        bloon.health -= Math.floor(damage);
        if (bloon.health <= 0) {
            scene.money += bloon.value;
            scene.score += bloon.value;
            bloon.transform();
        }
    }
}
