class Tower extends Phaser.GameObjects.Sprite {

    constructor(tower_type, x, y) {

        super(scene, x, y, tower_type);
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        towers.add(this);

        this.placed = false;
        this.being_dragged = false;
        this.setInteractive();
        this.on('pointerdown', this.toggle_drag, this);

    }

    toggle_drag() {
        if (!this.being_dragged && scene.is_dragging) return;
        // ocean_road contains 2d array of valid tiles for placement
        // 0: not valid, 1: valid for ocean, 2: valid for land
        let mouseX = Math.floor(scene.input.activePointer.x);
        let mouseY = Math.floor(scene.input.activePointer.y);
        let tile;
        if (scene.tiles[mouseY] == undefined){
            tile = undefined
        }
        else{
            tile = scene.tiles[mouseY][mouseX];
        }

        // if user attempts to place on an invalid tile, don't do anything
        if (this.being_dragged && tile != this.domain && tile != undefined) {
          return;
        }
        // if user does not have enough money, destroy currently selected monkey
        // and recreate in sidebar
        if (this.being_dragged && (scene.money < this.cost  || tile == undefined)) {
            this.destroy();
            this.create_tower();
            scene.is_dragging = false;
            return;
        }
        if (this.being_dragged) {
            this.place_tower(mouseX, mouseY);
        }
        this.being_dragged = !this.being_dragged
        if (this.being_dragged) {
            scene.is_dragging = true;
        }
    }

    place_tower(x, y) {
        scene.is_dragging = false;
        scene.money -= this.cost;
        this.create_tower();

        let graphics = scene.add.graphics({ fillStyle: { color: 0xffffff , alpha: .2} });
        this.circle = new Phaser.Geom.Circle(x, y, this.range);
        graphics.fillCircleShape(this.circle);

        this.removeInteractive();
        this.placed = true;
    }

    drag() {
        this.x = scene.input.activePointer.x;
        this.y = scene.input.activePointer.y;
    }

    charge_tower() {
        this.charge++;
    }

    fire() {
    }

    return_valid_targets() {
        let valid_targets = []
        // need to redefine circle because this will not be defined inside of iterate
        let circle = this.circle
        bloons.children.iterate(function (bloon) {
            if (Phaser.Geom.Circle.Contains(circle, bloon.x, bloon.y)) {
                valid_targets.push(bloon);
            }
        });
        return valid_targets
    }

    return_best_target() {
        // returns the target that is farthest along the track
        let max = this.targets[0];

        for (let target in this.targets) {
            if (target.progress > max.progress) {
                max = target;
            }
        }
        return max;
    }
}
