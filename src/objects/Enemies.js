import 'phaser';

export default class enemyShip extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, lowerCircle, base, gameOptions, group) {
        super(scene, x, y, 'enemy1');
        this.scene = scene;
        this.scene.add.existing(this);
        this.lowerCircle = lowerCircle;
        this.flyAroundBase = base;
        this.gameOptions = gameOptions;
        this.spaceShips = group
        this.radians = Phaser.Math.FloatBetween(0, Math.PI * 2);
        this.speed = Phaser.Math.FloatBetween(0.5, 1);

    }


    update(t, dt) {

        this.radians += this.speed * dt / 1000;
        this.x = this.lowerCircle.x + this.gameOptions.circleRadius * Math.cos(this.radians);
        this.y = this.lowerCircle.y + this.gameOptions.circleRadius * Math.sin(this.radians);
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.flyAroundBase.x, this.flyAroundBase.y)

    }



}