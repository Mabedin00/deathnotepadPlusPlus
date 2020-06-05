class Scene0 extends Phaser.Scene {
  constructor() {
    super("selection");
  }

  preload() {
    this.load.image('ocean_road', 'static/images/maps/ocean_road.png');
  }
  create () {
    this.add.text(200, 20, 'Select a Map!', { font: '60px Arial' });


    let ocean_road = this.add.image(150, 150, 'ocean_road').setScale(.2);
    this.add.text(82, 225, 'Ocean Road', { font: '24px Arial' });

    ocean_road.setInteractive();
    ocean_road.on('pointerdown', this.select_map, {scene: this, map: 'ocean_road'});
  }

  select_map() {
    this.scene.scene.start('game', {map: this.map});
  }
}
