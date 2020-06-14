class Tower extends Phaser.GameObjects.Sprite {
    constructor(tower_type, x, y) {

        super(scene, x, y, tower_type);

        this.setDepth(2);
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        towers.add(this);

        this.path1 = 0;
        this.path2 = 0;
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
        this.path1_bar.visible = true;
        this.path2_bar.visible = true;
        if (this.path1 == 4) {
            this.path1_max.visible = true;
        }
        if (this.path2 == 4) {
            this.path2_max.visible = true;
        }
        if (this.path1 > 2 && this.path2 == 2) {
            this.path2_lock.visible = true;
        }
        if (this.path2 > 2 && this.path1 == 2) {
            this.path1_lock.visible = true;
        }
        this.splashart.visible = true;
    }

    unshow_details(){
        scene.tower_selected = false;
        this.graphics.visible = false;
        this.path1_bar.visible = false;
        this.path2_bar.visible = false;
        this.path1_max.visible = false;
        this.path2_max.visible = false;
        this.path1_lock.visible = false;
        this.path2_lock.visible = false;
        this.splashart.visible = false;
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
        if(this.anim != undefined && this.charge > this.max_charge / 3) {
            this.anim.visible = false;
        }
    }

    fire() {
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

    return_worst_target() {
        // returns the target that is last along the track
        let min = this.targets[0];

        for (let target of this.targets) {
            if (target.progress < min.progress) {
                min = target;
            }
        }
        return min;
    }

    create_upgrades() {
        this.path1_bar = scene.add.graphics({ fillStyle: { color: '0x000000' , alpha: 1} }).setDepth(5);
        this.path1_bar.visible = false;
        this.path2_bar = scene.add.graphics({ fillStyle: { color: '0x000000' , alpha: 1} }).setDepth(5);
        this.path2_bar.visible = false;

        this.bought1 = new Phaser.Geom.Polygon([240, 510, 335, 510, 315, 550, 335, 590, 240, 590]);
        this.bought2 = new Phaser.Geom.Polygon([480, 510, 575, 510, 555, 550, 575, 590, 480, 590]);
        this.path1_bar.fillStyle(0x808080);
        this.path2_bar.fillStyle(0x808080);
        this.path1_bar.fillPoints(this.bought1.points, true);
        this.path2_bar.fillPoints(this.bought2.points, true);

        this.new1 = new Phaser.Geom.Polygon([340, 510, 420, 510, 420, 590, 340, 590, 320, 550]);
        this.new2 = new Phaser.Geom.Polygon([580, 510, 660, 510, 660, 590, 580, 590, 560, 550]);
        this.path1_bar.fillStyle(0x00ff00);
        this.path2_bar.fillStyle(0x00ff00);
        this.path1_bar.fillPoints(this.new1.points, true);
        this.path2_bar.fillPoints(this.new2.points, true);

        this.path1_bar.setInteractive(this.new1, Phaser.Geom.Polygon.Contains);
        this.path1_bar.on('pointerdown', () => {this.buy_path_1(this)});
		this.path1_bar.on('pointerover', () => {this.setTint(this.path1_bar, this.new1, 0x808080)});
		this.path1_bar.on('pointerout', () => {this.clearTint(this.path1_bar, this.new1)});

        this.path2_bar.setInteractive(this.new2, Phaser.Geom.Polygon.Contains);
        this.path2_bar.on('pointerdown', () => {this.buy_path_2(this)});
		this.path2_bar.on('pointerover', () => {this.setTint(this.path2_bar, this.new2, 0x808080)});
		this.path2_bar.on('pointerout', () => {this.clearTint(this.path2_bar, this.new2)});

		this.path1_max = scene.add.text(335, 530, 'MAX', {font: '36px Arial'})
        this.path1_max.visible = false;
		this.path1_max.setDepth(6);
		this.path1_lock = scene.add.text(335, 535, 'Locked', {font: '25px Arial'})
        this.path1_lock.visible = false;
		this.path1_lock.setDepth(6);

		this.path2_max = scene.add.text(575, 530, 'MAX', {font: '36px Arial'})
        this.path2_max.visible = false;
		this.path2_max.setDepth(6);
		this.path2_lock = scene.add.text(575, 535, 'Locked', {font: '25px Arial'})
        this.path2_lock.visible = false;
		this.path2_lock.setDepth(6);

		this.path1_rect1 = new Phaser.Geom.Rectangle(426, 510, 10, 16);
		this.path1_rect2 = new Phaser.Geom.Rectangle(426, 531, 10, 16);
		this.path1_rect3 = new Phaser.Geom.Rectangle(426, 552, 10, 16);
		this.path1_rect4 = new Phaser.Geom.Rectangle(426, 573, 10, 17);
		this.path1_bar.fillStyle(0x808080);
		this.path1_bar.fillRectShape(this.path1_rect1);
		this.path1_bar.fillRectShape(this.path1_rect2);
		this.path1_bar.fillRectShape(this.path1_rect3);
		this.path1_bar.fillRectShape(this.path1_rect4);

		this.path2_rect1 = new Phaser.Geom.Rectangle(666, 510, 10, 16);
		this.path2_rect2 = new Phaser.Geom.Rectangle(666, 531, 10, 16);
		this.path2_rect3 = new Phaser.Geom.Rectangle(666, 552, 10, 16);
		this.path2_rect4 = new Phaser.Geom.Rectangle(666, 573, 10, 17);
		this.path2_bar.fillStyle(0x808080);
		this.path2_bar.fillRectShape(this.path2_rect1);
		this.path2_bar.fillRectShape(this.path2_rect2);
		this.path2_bar.fillRectShape(this.path2_rect3);
		this.path2_bar.fillRectShape(this.path2_rect4);

		this.splashart = scene.add.image(75, 550, this.splash);
		this.splashart.setScale(0.25);
		this.splashart.setDepth(5);
		this.splashart.visible = false;
    }

    buy_path_1(tower) {
        if (++tower.path1 == 3 && tower.path2 == 2) {
            tower.path2_bar.fillStyle(0x808080);
            tower.path2_bar.fillPoints(tower.new2.points, true);
            tower.path2_bar.removeInteractive();
            this.path2_lock.visible = true;
        } else if (tower.path1 == 4) {
            tower.path1_bar.fillStyle(0x808080);
            tower.path1_bar.fillPoints(tower.new1.points, true);
            tower.path1_bar.removeInteractive();
            tower.path1_max.visible = true;
        } else if (tower.path2 > 2 && tower.path1 == 2) {
            tower.path1_bar.fillStyle(0x808080);
            tower.path1_bar.fillPoints(tower.new1.points, true);
            tower.path1_bar.removeInteractive();
            tower.path1_lock.visible = true;
        }
        switch (tower.path1) {
            case 1:
                tower.path1_bar.fillStyle(0x00ff00);
                tower.path1_bar.fillRectShape(tower.path1_rect1);
                break;
            case 2:
                tower.path1_bar.fillStyle(0x00ff00);
                tower.path1_bar.fillRectShape(tower.path1_rect2);
                break;
            case 3:
                tower.path1_bar.fillStyle(0x00ff00);
                tower.path1_bar.fillRectShape(tower.path1_rect3);
                break;
            case 4:
                tower.path1_bar.fillStyle(0x00ff00);
                tower.path1_bar.fillRectShape(tower.path1_rect4);
        }
    }

    buy_path_2(tower){
        if (++tower.path2 == 3 && tower.path1 == 2) {
            tower.path1_bar.fillStyle(0x808080);
            tower.path1_bar.fillPoints(tower.new1.points, true);
            tower.path1_bar.removeInteractive();
            tower.path1_max.visible = true;
        } else if (tower.path2 == 4) {
            tower.path2_bar.fillStyle(0x808080);
            tower.path2_bar.fillPoints(tower.new2.points, true);
            tower.path2_bar.removeInteractive();
            tower.path2_max.visible = true;
        } else if (tower.path1 > 2 && tower.path2 == 2) {
            tower.path2_bar.fillStyle(0x808080);
            tower.path2_bar.fillPoints(tower.new2.points, true);
            tower.path2_bar.removeInteractive();
            tower.path2_lock.visible = true;
        }
        switch (tower.path2) {
            case 1:
                tower.path2_bar.fillStyle(0x00ff00);
                tower.path2_bar.fillRectShape(tower.path2_rect1);
                break;
            case 2:
                tower.path2_bar.fillStyle(0x00ff00);
                tower.path2_bar.fillRectShape(tower.path2_rect2);
                break;
            case 3:
                tower.path2_bar.fillStyle(0x00ff00);
                tower.path2_bar.fillRectShape(tower.path2_rect3);
                break;
            case 4:
                tower.path2_bar.fillStyle(0x00ff00);
                tower.path2_bar.fillRectShape(tower.path2_rect4);
        }
    }

    setTint(graphic, area, tint) {
        graphic.fillStyle(tint, 0.1);
        graphic.fillPoints(area.points, true);
    }

    clearTint(graphic, area) {
        graphic.fillStyle(0x00ff00);
        graphic.fillPoints(area.points, true);
    }

    updateGraphics() {
        this.graphics.destroy();
        this.graphics = scene.add.graphics({ fillStyle: { color: '0xffffff' , alpha: .2} });
        this.circle = new Phaser.Geom.Circle(this.x, this.y, this.range);
        this.graphics.fillCircleShape(this.circle);
    }
}
