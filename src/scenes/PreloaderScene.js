import 'phaser';
//import Player

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        this.readyCount = 0;
        this.gameOptions = {
            circleRadius: 300,
            circleStrokeWidth: 1,
            circleDistance: 400,
            ballRadius: 50,
        }
        this.focused = true;
        this.homePlanetStoped = false

    }

    preload() {
        // IF Logo must be displayed
        // this.timedEvent = this.time.delayedCall(2000, this.ready, [], this);
        this.createPreloader();
        this.loadAssets();
    }

    create() {
        this.gameButton = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2 + 350, 'screen').setInteractive({ cursor: 'pointer' }).setOrigin(0.5).setScale(.3).setVisible(false);
        this.gameButton.on('pointerdown', event => {
            this.scene.start('Brifing', 'begin');
        });
        this.player = this.add.sprite(0, 0, "player");
        this.engine = this.add.sprite(0, 40, "trusters").setAngle('-90');
        this.ship = this.add.container(0, 0, [this.player, this.engine]).setAngle('97').setVisible(false).setSize(125, 105)

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

    }
    createPreloader() {
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        this.preloadPlanet = this.textures.get('home_planet');
        this.homePlanet = this.add.image(width / 2, height, 'home_planet').setScale(.9);
        //add game title
        let gameTitle = this.make.text({
            x: width / 2,
            y: height / 4 - 50,
            text: 'Pirate life',
            style: {
                font: '80px pirate',
                fill: '#ffffff'
            }
        }).setOrigin(0.5);
        // display progress bar
        let progressBar = this.add.graphics();
        let progresBox = this.add.graphics();
        progresBox.fillStyle(0x222222, 0.8);
        progresBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

        // loading text
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '40px space',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        // percent text
        let percenText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percenText.setOrigin(0.5, 0.5);

        // loading assets text
        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        // update progress bar
        this.load.on('progress', value => {
            percenText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xFDD049, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
        });

        // update file progress text
        this.load.on('fileprogress', function(file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        // remove progress bar when complete
        this.load.on('complete', _ => {
            //NOTE: set time out is used because loading is to fast
            setTimeout(_ => {
                progresBox.destroy();
                progressBar.destroy();
                assetText.destroy();
                loadingText.destroy();
                percenText.destroy();
                // plane.destroy();
                //gameTitle.destroy();
                this.ready();
            }, 1000)
        });
    }

    loadAssets() {
        // load assets needed in our game
        // this.load.spritesheet('tank', 'assets/graphics/tank.png', { frameWidth: 258, frameHeight: 177 });
        ['planet1', 'planet2', 'planet3', 'planet4', 'base_station_1', 'base_station_2', 'base_station_3', 'base_station_4', 'enemy1', 'screen',
            'pirate_boss', 'asteroid_0', 'asteroid_1', 'asteroid_2', 'asteroid_3'
        ].forEach(image => this.load.image(image, 'assets/graphics/' + image + '.png'))
    }

    ready() {
        this.readyCount++;
    }

    update(t, dt) {
        if (this.homePlanetStoped) {
            this.gameButton.setVisible(true)
            this.gameText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 350, 'Start!', { fontSize: '32px', fill: '#fff', fontWeight: 'bolder', fontFamily: 'space' }).setOrigin(0.5);
            this.ship.radians += this.ship.speed * dt / 1000;
            this.ship.x = this.game.config.width / 2 + this.gameOptions.circleRadius * Math.cos(this.ship.radians);
            this.ship.y = this.game.config.height / 2 - this.gameOptions.circleDistance / 2 + this.gameOptions.circleRadius * Math.sin(this.ship.radians) + 210;
            this.ship.angle += 1.9
        }
        if (this.homePlanet.y >= this.cameras.main.height / 2) {
            this.homePlanet.y -= 8
        } else {
            this.homePlanetStoped = true
            this.ship.setVisible(true)
            this.player.play('fly', true)
            this.engine.play('engine', true)
        }
        if (this.focused) {
            this.scene.resume();
        } else {
            this.scene.pause();
        }
    }
}