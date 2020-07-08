import 'phaser';
import TypeWriter from '../config/TypeWriter';
import levelConfig from '../config/levelConfig';

export default class BrifingScene extends Phaser.Scene {
    constructor() {
        super('Brifing');
    }
    init(state) {
        this.state = state;
        this.msg = null;
    }

    create() {
        this.add.sprite(this.game.config.width / 2, this.game.config.height / 2 - 300, "pirate_boss").setOrigin(0.5);
        this.screen = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "screen").setOrigin(0.5);
        console.log(this.screen)
        switch (this.state) {
            case "begin":
                this.msg = levelConfig.levelData[levelConfig.currentLevel].briefing
                break;
            case "success":
                this.msg = levelConfig.levelData[levelConfig.currentLevel].successText
                levelConfig.currentLevel++;
                // this.scene.start("Brifing", 'begin')
                break;
            case "fail":
                this.msg = levelConfig.levelData[levelConfig.currentLevel].failText
                break;
        }

        let gameButton = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2 + 250, 'screen').setInteractive({ cursor: 'pointer' }).setOrigin(0.5).setScale(.3);
        this.gameText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 250, 'Start!', { fontSize: '32px', fill: '#fff', fontWeight: 'bolder', fontFamily: 'space' }).setOrigin(0.5);
        gameButton.on('pointerdown', event => {
            this.scene.start('Game');
        });

        const style = {
            'color': 'white',
            font: '30px space',
            'wordWrap': {
                'width': this.screen.width - 150
            }
        }
        const config = {
            'scene': this,
            'text': this.msg,
            'speed': .5,
            'style': style,
            'x': this.screen.x / 2 + 100,
            'y': this.screen.y / 2 + 200,
            //  'scene': this.scene
        }
        new TypeWriter(config)
    }
}