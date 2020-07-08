export default class Player extends Phaser.GameObjects.Container {

    constructor(scene, x, y, gameOptions) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.gameOptions = gameOptions;
        this.create();
    }
    create() {
        this.player = this.scene.add.sprite(0, 0, "player");
        this.engine = this.scene.add.sprite(0, 40, "trusters").setAngle('-90');
        this.ship = this.scene.add.container(0, 0, [this.player, this.engine]).setAngle('97').setSize(125, 105)
        this.ship.radians = -Math.PI / 2;
        this.ship.speed = 2;
        this.scene.anims.create({
            key: 'fly',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });
        this.scene.anims.create({
            key: 'engine',
            frames: this.scene.anims.generateFrameNumbers('trusters', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });



        this.player.play('fly', true)
        this.engine.play('engine', true)
        this.scene.input.on("pointerdown", _ => {

            this.ship.speed = this.gameOptions.ballSpeed[0];
        }, this);
        this.scene.input.on("pointerup", _ => {
            this.ship.speed = this.gameOptions.ballSpeed[1];
        }, this);

    }
}