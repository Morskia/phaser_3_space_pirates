import 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');

    }

    preload() {
        this.load.image('home_planet', 'assets/graphics/home_planet.png');

        this.load.spritesheet('player', 'assets/graphics/player.png', { frameWidth: 100, frameHeight: 105 });
        this.load.spritesheet('trusters', 'assets/graphics/trusters.png', { frameWidth: 25, frameHeight: 11 });
    }

    create() {
        this.scene.start('Preloader');
    }
}