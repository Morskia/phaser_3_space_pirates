import 'phaser';
import config from './config/config';
import levelConfig from './config/levelConfig';
import GameScene from './scenes/GameScene';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import BrifingScene from './scenes/BrifingScene';


class Game extends Phaser.Game {
    constructor() {
        super(config);

        this.scene.add('Boot', BootScene);
        this.scene.add('Preloader', PreloaderScene);
        this.scene.add('Briefing', BrifingScene);
        this.scene.add('Game', GameScene);
        this.scene.start('Boot');
    }
}

window.onload = function() {

    document.fonts.load('1rem "pirate"').then(_ => {
        new Game();
        resize();
        window.addEventListener('resize', resize, false);
    })

    window.onfocus = _ => {
        this.focused = true;
    };
    window.onblur = _ => {
        this.focused = false;
    };
}

const resize = () => {
    const canvas = document.querySelector('canvas');
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = config.width / config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + 'px';
        canvas.style.height = (windowWidth / gameRatio) + 'px';
    } else {
        canvas.style.width = (windowHeight * gameRatio) + 'px';
        canvas.style.height = windowHeight + 'px';
    }
}