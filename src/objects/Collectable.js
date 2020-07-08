import 'phaser';

export default class Collectable extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, gameOptions, planet, type) {
        super(scene, x, y, 'asteroid_' + type);
        this.scene = scene;
        this.setPosition(x, y);
        this.scene.add.existing(this);
        let angle = Phaser.Math.Angle.Between(this.x, this.y, planet.x, planet.y);
        this.speed = Phaser.Math.GetSpeed(200, 1);
        this.gameOptions = gameOptions;
        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);
        this.setActive(true);
        this.setVisible(true);
    }


    update(t, dt) {
        this.x += this.dx * (this.speed * dt);
        this.y += this.dy * (this.speed * dt);
        this.angle += 1

    }



}