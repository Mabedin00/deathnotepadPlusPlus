class Scene0 extends Phaser.Scene {
  constructor() {
    super("selection");
  }

  preload() {
    this.load.image('ocean_road', 'static/images/maps/ocean_road.png');
    this.load.image('floating_island', 'static/images/maps/floating_island.png');

  }
  create () {
    this.add.text(200, 20, 'Select a Map!', { font: '60px Arial' });


    this.place_map("ocean_road", "Ocean Road", 150, 150);
    this.place_map("floating_island", "Floating Island", 450, 150);



  }

  place_map(map_name, display_name, x, y){
      let map = this.add.image(x, y, map_name).setScale(.2);
      this.add.text(x - 75, y + 75, display_name, { font: '24px Arial' });

      map.setInteractive();
      map.on('pointerdown', this.select_map, {scene: this, map: map_name});
  }

  select_map() {
    this.scene.scene.start('game', {map: this.map});
  }
}
