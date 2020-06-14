class Banana extends Projectile {

    constructor(x, y, value) {

        let newx = Phaser.Math.Between(x - 25, x + 25);
        let newy = Phaser.Math.Between(y - 25, y + 25);
        super(newx, newy, "banana");
        this.value = value;
        this.setDepth(3);
        this.setInteractive();
        this.on('pointerdown', function() {scene.money += this.value; this.destroy()}, this);

        // this.setScale(.5);
    }
}
