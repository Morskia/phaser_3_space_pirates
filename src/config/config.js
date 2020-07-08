export default {
    type: Phaser.AUTO,
    // backgroundColor: 0x222222,
    // mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'airplane',
    width: 1366,
    height: 1334,
    transparent: true,
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    }
};