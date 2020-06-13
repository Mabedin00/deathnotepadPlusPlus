class Tower extends Phaser.GameObjects.Sprite {

    constructor(tower_type, x, y) {

        super(scene, x, y, tower_type);

        this.setDepth(2);
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        towers.add(this);

        this.placed = false;
        this.being_dragged = false;
        this.setInteractive();
        this.on('pointerdown', this.toggle_drag, this);
        this.on('pointerover', this.display_info, this);
        this.on('pointerout', this.hide_info, this);
    }

    toggle_drag() {
        // prevents moving towers once its placed and dragging multiple towers
        if (this.placed || (!this.being_dragged && scene.is_dragging) ) return;
        // ocean_road contains 2d array of valid tiles for placement
        // 0: not valid, 1: valid for ocean, 2: valid for land
        let mouseX = Math.floor(scene.input.activePointer.x);
        let mouseY = Math.floor(scene.input.activePointer.y);
        let tile;
        scene.tiles[mouseY] == undefined ? tile = undefined : tile = scene.tiles[mouseY][mouseX]

        // if user attempts to place on an invalid tile, don't do anything
        if (this.being_dragged && tile != this.domain && tile != undefined) {
            return;
        }
        // if user does not have enough money, destroy currently selected monkey
        // and recreate in sidebar
        if (this.being_dragged && (scene.money < this.cost  || tile == undefined)) {
            this.destroy();
            this.graphics.destroy();
            this.create_tower();
            scene.is_dragging = false;
            return;
        }
        if (this.being_dragged) {
            this.place_tower(mouseX, mouseY);
        }
        this.being_dragged = !this.being_dragged
        if (this.being_dragged) {
            this.hide_info();
            this.graphics = scene.add.graphics({ fillStyle: { color: 0xffffff , alpha: .2} });
            this.circle = new Phaser.Geom.Circle(this.x, this.y, this.range);
            this.graphics.fillCircleShape(this.circle);
            scene.is_dragging = true;
        }
    }

    place_tower(x, y) {
        this.create_upgrades();
        this.graphics.visible = false;
        scene.prevent_tower_stacking(x, y, this.width / 2, this.height / 2);
        scene.is_dragging = false;
        scene.money -= this.cost;
        this.create_tower();
        this.hide_info();
        this.on('pointerdown', this.show_details, this);
        this.placed = true;
    }

    display_info() {
        if (this.placed || this.being_dragged) return;
        this.text_box = scene.add.graphics({ fillStyle: { color: 0x000000 , alpha: .7} }).setDepth(5);
		let rectangle = new Phaser.Geom.Rectangle(this.x-30, this.y, 135, 175);
		this.text_box.fillRectShape(rectangle);
        this.display_name_text = scene.add.text(this.x-20, this.y, this.display_name, { font: 'bold 18px Arial', wordWrap: { width: 125 } }).setDepth(5);
        this.price_text = scene.add.text(this.x-20, this.y+50, 'Cost: '+this.cost, { font: 'bold 14px Arial' }).setDepth(5);
        this.range_text = scene.add.text(this.x-20, this.y+70, 'Range: '+this.range, { font: 'bold 14px Arial' }).setDepth(5);
        this.description_text = scene.add.text(this.x-20, this.y+90, this.description, { font: '12px Arial', wordWrap: { width: 125 } }).setDepth(5);
    }

    hide_info() {
        if (this.placed) return;
        this.text_box.destroy();
        this.display_name_text.destroy();
        this.price_text.destroy();
        this.range_text.destroy();
        this.description_text.destroy();
    }

    show_details(){
        if (scene.selected_tower != undefined) scene.selected_tower.unshow_details();
        scene.selected_tower = this;
        scene.tower_selected = true;
        this.graphics.visible = true;
        this.upgrade_bar.visible = true;

    }

    unshow_details(){
        scene.tower_selected = false;
        this.graphics.visible = false;
        this.upgrade_bar.visible = false;
    }

    sell(){
        if (s_key.isDown){
            scene.tower_selected = false;
            scene.money += Math.floor(this.cost / 2);
            return this;
        }
    }

    drag() {
        let mouseX = Math.floor(scene.input.activePointer.x);
        let mouseY = Math.floor(scene.input.activePointer.y);
        let tile;
        scene.tiles[mouseY] == undefined ? tile = undefined : tile = scene.tiles[mouseY][mouseX]

        this.x = mouseX;
        this.y = mouseY;
        this.graphics.destroy();

        let fillcolor;
        fillcolor = tile != this.domain ? '0xff0000':'0xffffff'

        this.graphics = scene.add.graphics({ fillStyle: { color: fillcolor , alpha: .2} });
        this.circle = new Phaser.Geom.Circle(this.x, this.y, this.range);
        this.graphics.fillCircleShape(this.circle);
    }

    charge_tower() {
        this.charge += (1 * scene.fast_forward);
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

        for (let target of this.targets) {
            if (target.progress > max.progress) {
                max = target;
            }
        }
        return max;
    }

    create_upgrades() {
        this.upgrade_bar = scene.add.graphics({ fillStyle: { color: '0x000000' , alpha: .2} }).setDepth(5);
        this.upgrade_bar.visible = false;

        this.bought1 = new Phaser.Geom.Polygon([250, 510, 345, 510, 325, 550, 345, 590, 250, 590]);
        this.bought2 = new Phaser.Geom.Polygon([490, 510, 585, 510, 565, 550, 585, 590, 490, 590]);
        this.upgrade_bar.fillStyle(0xff0000);
        this.upgrade_bar.fillPoints(this.bought1.points, true);
        this.upgrade_bar.fillPoints(this.bought2.points, true);

        this.new1 = new Phaser.Geom.Polygon([350, 510, 430, 510, 430, 590, 350, 590, 330, 550]);
        this.new2 = new Phaser.Geom.Polygon([590, 510, 670, 510, 670, 590, 590, 590, 570, 550]);
        this.upgrade_bar.fillStyle(0x00ff00);
        this.upgrade_bar.fillPoints(this.new1.points, true);
        this.upgrade_bar.fillPoints(this.new2.points, true);
    }
}
