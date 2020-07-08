import 'phaser';
import levelConfig from '../config/levelConfig';
import Levels from '../config/levelSetups';
import PlayerStats from '../config/playerConfig';
import enemyShip from '../objects/Enemies';
import Collectable from '../objects/Collectable';
import { Cameras } from 'phaser';


export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    init() {
        this.enemiesCircles = [];
        this.spaceBases = [];
        this.gameOptions = {
                circleRadius: 300,
                circleStrokeWidth: 3,
                circleDistance: 400,
                ballRadius: 50,
                ballSpeed: [0.5, 2],
                enemySpeedRange: [0.5, 1]
            }
            //  this.Player = new PlayerStats()
    }
    createCircle(number, cordinates) {
        let i = 0
        while (i < number) {

            this.assetsGraphics.lineStyle(this.gameOptions.circleStrokeWidth, 0xB71F2F);
            this.assetsGraphics.strokeCircle(this.actualSize, this.actualSize, this.gameOptions.circleRadius);
            this.assetsGraphics.generateTexture("enemyCircle", 2 * this.actualSize, 2 * this.actualSize);
            this.assetsGraphics.clear();

            this.lowerCircle = this.add.sprite(cordinates[i].x, cordinates[i].y, "enemyCircle")
                //  .setScrollFactor(0);;
            this.mainBase = this.add.image(this.lowerCircle.x, this.lowerCircle.y, 'base_station_' + Phaser.Math.Between(1, 4))
                //add reference for each existing circle on map
            this.enemiesCircles.push(this.lowerCircle)
                //add reference for each existing base on map
            this.spaceBases.push(this.mainBase)
            i++;
        }

    }
    create() {
        // this.cameras.main.setBounds(-1000, -1000, 1024 * 3, 1024 * 3);
        // this.physics.world.setBounds(-1000, -1000, 1024 * 3, 1024 * 3);

        this.actualSize = this.gameOptions.circleStrokeWidth + this.gameOptions.circleRadius;
        // this.physics.world.bounds.width = this.game.config.width;
        // this.physics.world.bounds.height = this.game.config.height;
        this.objectsText = this.add.text(20, 20, "Mission objectives:", { fontSize: '32px', fill: '#fff', fontWeight: 'bolder', fontFamily: 'space' }).setOrigin(0);

        // this.objectsText = this.add.text(20, 80, levelConfig.levelData[levelConfig.currentLevel].missionText, { fontSize: '32px', fill: '#fff', fontWeight: 'bolder', fontFamily: 'space' }).setOrigin(0);
        this.planet = this.add.image(this.game.config.width / 2, this.game.config.height / 3, ('planet' + Phaser.Math.Between(1, 4)));

        this.leftSide = false;
        this.assetsGraphics = this.make.graphics();
        this.assetsGraphics.lineStyle(this.gameOptions.circleStrokeWidth, 0x2CAF1E);
        this.assetsGraphics.strokeCircle(this.actualSize, this.actualSize, this.gameOptions.circleRadius);
        this.assetsGraphics.generateTexture("playerCircle", 2 * this.actualSize, 2 * this.actualSize);
        this.assetsGraphics.clear();
        this.startingPlayerCircle = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2 - this.gameOptions.circleDistance / 2, "playerCircle");
        this.player = this.physics.add.sprite(0, 0, "player");
        this.engine = this.add.sprite(0, 40, "trusters").setAngle('-90');
        this.ship = this.add.container(0, 0, [this.player, this.engine]).setAngle('97').setSize(125, 105)
            // this.physics.world.setBounds(0, 0, this.game.config.width * 2, this.game.config.height * 2);
            // this.physics.world.setBounds(0, 0, this.game.config.width * 3, this.game.config.height * 3);
            // this.physics.world.y = this.game.config.height + 400;
            //this.cameras.main.setBounds(0, 0, this.game.config.width, this.game.config.height);
        this.cameras.main.startFollow(this.ship, false)

        this.ship.radians = -Math.PI / 2;
        this.ship.speed = 2;
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });
        this.anims.create({
            key: 'engine',
            frames: this.anims.generateFrameNumbers('trusters', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });


        //    this.player = this.physics.add.sprite(0, 0, "player");
        //   this.engine = this.add.sprite(0, 40, "trusters").setAngle('-90');
        //     this.ship = this.add.container(0, 0, [this.player, this.engine]).setAngle('97').setSize(125, 105)

        this.ship.radians = -Math.PI / 2;
        this.ship.speed = 2;
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });
        this.anims.create({
            key: 'engine',
            frames: this.anims.generateFrameNumbers('trusters', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });
        this.player.play('fly', true)
        this.engine.play('engine', true)
        this.cursors = this.input.keyboard.createCursorKeys();

        switch (levelConfig.currentLevel) {
            case 0:
                this.createCircle(1, [{ x: this.game.config.width / 2, y: this.game.config.height / 2 + this.gameOptions.circleDistance / 2 }])
                this.spaceShips = this.physics.add.group({ classType: enemyShip, runChildUpdate: true });
                this.physics.world.enable(this.spaceShips);
                this.physics.add.overlap(this.player, this.spaceShips, this.dead, null, this);
                break;
            case 1:

                this.createCircle(1, [{ x: this.game.config.width / 2, y: this.game.config.height / 2 + this.gameOptions.circleDistance / 2 }])
                this.player.cargo = [];
                let graphics = this.add.graphics();
                graphics.lineStyle(2, 0xffff00, 1);
                //  32px radius on the corners
                graphics.strokeRoundedRect(190, 85, 220, 50, 32);
                this.add.text(20, 95, "Cargo:", { fontSize: '32px', fill: '#fff', fontWeight: 'bolder', fontFamily: 'space' })
                this.spaceShips = this.physics.add.group({ classType: enemyShip, runChildUpdate: true, maxSize: 5 });
                this.physics.world.enable(this.spaceShips);

                this.physics.add.overlap(this.player, this.spaceShips, this.dead, null, this);
                this.collectables = this.physics.add.group({
                    classType: Collectable,
                    runChildUpdate: true,
                    // collideWorldBounds: true,
                    // checkWorldBounds: true,
                    // outOfBoundsKill: true
                });
                this.physics.world.enable(this.collectables);
                this.physics.add.overlap(this.player, this.collectables, this.collect, null, this);
                this.physics.add.overlap(this.player, this.spaceShips, this.dead, null, this);
                this.physics.add.overlap(this.spaceShips, this.collectables, this.shipVsCommet, null, this);
                break;
            case 2:
                {
                    let cordinates = [
                        { x: this.game.config.width / 2, y: this.game.config.height / 2 + this.gameOptions.circleDistance / 2 },
                        { x: this.game.config.width / 2, y: this.game.config.height / 2 - this.gameOptions.circleDistance / 2 - this.actualSize },
                    ]
                    this.createCircle(2, cordinates)
                    this.player.cargo = [];
                    let graphics = this.add.graphics();
                    graphics.lineStyle(2, 0xffff00, 1);
                    //  32px radius on the corners
                    graphics.strokeRoundedRect(290, 85, 220, 50, 32);
                    this.add.text(120, 95, "Cargo:", { fontSize: '32px', fill: '#fff', fontWeight: 'bolder', fontFamily: 'space' })
                    this.spaceShips = this.physics.add.group({ classType: enemyShip, runChildUpdate: true });
                    this.physics.world.enable(this.spaceShips);
                    this.physics.add.overlap(this.player, this.spaceShips, this.dead, null, this);
                    this.collectables = this.physics.add.group({
                        classType: Collectable,
                        runChildUpdate: true,
                        //  collideWorldBounds: true
                        // checkWorldBounds: true,
                        // outOfBoundsKill: true
                    });
                    this.physics.world.enable(this.collectables);
                    this.physics.add.overlap(this.player, this.collectables, this.collect, null, this);
                    this.physics.add.overlap(this.spaceShips, this.collectables, this.shipVsCommet, null, this);

                    //  this.cameras.main.setBounds(0, 0, this.game.config.width, this.game.config.height);


                }
            case 3:
                {
                    let cordinates = [
                        { x: this.game.config.width / 2, y: this.game.config.height / 2 + this.gameOptions.circleDistance / 2 },
                        { x: this.game.config.width / 2, y: this.game.config.height / 2 - this.gameOptions.circleDistance / 2 - this.actualSize },
                        { x: this.game.config.width / 2 - this.actualSize, y: this.game.config.height / 2 },
                        { x: this.game.config.width / 2 + this.actualSize, y: this.game.config.height / 2 },
                    ]
                    this.createCircle(4, cordinates)
                    this.player.cargo = [];
                    let graphics = this.add.graphics();
                    graphics.lineStyle(2, 0xffff00, 1);
                    //  32px radius on the corners
                    graphics.strokeRoundedRect(190, 85, 220, 50, 32);
                    this.add.text(20, 95, "Cargo:", { fontSize: '32px', fill: '#fff', fontWeight: 'bolder', fontFamily: 'space' })
                    this.spaceShips = this.physics.add.group({ classType: enemyShip, runChildUpdate: true });
                    this.physics.world.enable(this.spaceShips);
                    this.physics.add.overlap(this.player, this.spaceShips, this.dead, null, this);
                    this.collectables = this.physics.add.group({
                        classType: Collectable,
                        runChildUpdate: true,
                        //  collideWorldBounds: true
                        // checkWorldBounds: true,
                        // outOfBoundsKill: true
                    });
                    this.physics.world.enable(this.collectables);
                    this.physics.add.overlap(this.player, this.collectables, this.collect, null, this);
                    this.physics.add.overlap(this.spaceShips, this.collectables, this.shipVsCommet, null, this);
                }
        }
    }
    shipVsCommet(a, b) {
        if (b.texture.key === 'asteroid_3') {
            this.spaceShips.remove(a, true, true)
            this.collectables.remove(b, true, true)
        }
    }
    collect(a, b) {
        console.log(1)
        switch (b.texture.key) {
            case 'asteroid_3':
                this.collectables.remove(b, true, true)
                this.dead()
                break;
            default:
                this.collectables.remove(b, true, true)
                this.add.sprite(220 + (this.player.cargo.length * 40), 110, b.texture.key).setScale(.5)
                this.player.cargo.push(b.texture.key)
                if (this.player.cargo.length === 5) {
                    this.scene.start("Brifing", 'success')
                }
                break

        }
    }

    dead() {
        //  this.scene.start("Brifing", 'fail')
    }
    update(t, dt) {
        // if (this.ship.y >= this.game.config.height / 2) {
        //     this.cameras.main.y = this.ship.y
        // } else {
        //     this.cameras.main.y = this.ship.y
        // }

        this.input.keyboard.on('keydown-A', e => {
            this.ship.speed = 4;
        });
        this.input.keyboard.on('keydown-D', e => {
            this.ship.speed = .5;
        });

        this.input.keyboard.on('keyup-A', e => {
            this.ship.speed = 2;
        });
        this.input.keyboard.on('keyup-D', e => {
            this.ship.speed = 2;
        });
        this.input.keyboard.on('keyup-S', e => {
            //    if (a == 1) {}
            this.ship.speed = 0;
            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    this.ship.speed = 2;
                }
            });
        });
        this.input.keyboard.on('keyup-R', e => {
            //    if (a == 1) {}
            this.ship.speed = 0;
            this.time.addEvent({

                callback: () => {
                    this.Player.stats.reverse === 1 ? -1 : 1;

                }
            });
        });
        this.planet.angle += 0.2
        this.ship.radians += this.ship.speed * dt / 1000;
        this.ship.x = (this.game.config.width / 2 + this.gameOptions.circleRadius * Math.cos(this.ship.radians * 1));
        this.ship.y = (this.game.config.height / 3 - this.gameOptions.circleDistance / 2 + this.gameOptions.circleRadius * Math.sin(this.ship.radians * 1) + 210);
        this.ship.rotation = Phaser.Math.Angle.Between(this.ship.x, this.ship.y, this.game.config.width / 2, this.game.config.height / 3)
        let initLevel = new Levels(this);
        initLevel['level_' + levelConfig.currentLevel](t)


    }
}