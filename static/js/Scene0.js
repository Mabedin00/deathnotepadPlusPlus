class Scene0 extends Phaser.Scene {
  constructor() {
    super("selection");
  }

  create () {
    this.add.text(300, 300, 'pick a map (haha we picked for you we only have 1)');
    this.scene.start('game', {map: 'ocean_road'});
  }

}
