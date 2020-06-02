function create () {
  this.add.image(343, 253, 'ocean_road');
  goal = this.physics.add.sprite(-40, 340, 'ocean_road').setScale(.1);
  bloons = this.physics.add.group();

  this.physics.add.overlap(goal, bloons, bloon_end, null, this);
}
