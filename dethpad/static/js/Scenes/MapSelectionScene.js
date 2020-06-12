class MapSelectionScene extends Phaser.Scene {
    constructor() {
        super("selection");
    }

    create () {
        this.add.image(500, 253, 'background');
        this.add.text(320, 20, 'Select a Map!', { font: '60px Arial'});
        this.back = this.add.image(930, 550, 'back').setScale(.7).setTint(0xb5651d);
        this.back.setInteractive();
		this.back.on('pointerdown', this.return_to_menu, this);
        this.back.on('pointerover', function() {this.setTint(0xbecafe)})
		this.back.on('pointerout', function() {this.setTint(0xb5651d)})

        this.place_map("ocean_road", "Ocean Road", 150, 180);
        this.place_map("cubism", "Cubism", 450, 180);
        this.place_map("floating_island", "Floating Island", 750, 180);
        this.place_map("lightning_scar", "Lightning Scar", 150, 420);
        this.place_map("castlemania", "Castlemania", 450, 420);
        this.place_map("scorched_earth", "Scorched Earth", 750, 420);
    }

    place_map(map_name, display_name, x, y) {
        let graphics = this.add.graphics({ fillStyle: { color: 0xffffff , alpha: .9} });
        let rectangle = new Phaser.Geom.Rectangle(x - 137.2/2 - 5, y - 101.4/2 - 5, 137.2 + 10, 101.4 + 10);
        graphics.fillRectShape(rectangle);
        let map = this.add.image(x, y, map_name).setScale(.2);
        map.graphics = graphics;
        this.add.text(x - 75, y + 75, display_name, { font: '24px Arial' });

        map.setInteractive();
        map.on('pointerdown', this.select_map, {scene: this, map: map_name});
        map.on('pointerover', function() {this.setTint(0xbecafe);});
		map.on('pointerout', function() {this.clearTint();});
    }

    return_to_menu() {
        this.scene.start('home');
    }

    select_map() {
        this.scene.scene.start('game', {map: this.map});
    }
}
