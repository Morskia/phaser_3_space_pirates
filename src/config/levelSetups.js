import enemyShip from '../objects/Enemies';
import Collectable from '../objects/Collectable';
export default class Levels {
    constructor(ref) {
        this.ref = ref
    }
    level_0() {
        let previousLeftSide = this.ref.leftSide;
        this.ref.leftSide = this.ref.ship.x < this.ref.game.config.width / 2;
        if (previousLeftSide && !this.ref.leftSide) {
            let enemies = this.ref.spaceShips.getFirstDead();

            if (!enemies) {
                let enemy = new enemyShip(this.ref, this.ref.x, this.ref.y, this.ref.lowerCircle, this.ref.spaceBases[0], this.ref.gameOptions, this.ref.spaceShips);
                this.ref.spaceShips.add(enemy);
                enemy.body.isCircle = true
            }
            this.ref.objectsText.setText('Police ships lure: ' + this.ref.spaceShips.getLength());
            if (this.ref.spaceShips.getLength() === 5) {
                this.ref.scene.start("Brifing", 'success')
            }
        }
    }
    level_1() {

        switch (Phaser.Math.Between(1, 2)) {
            case 1:
                this.ref.objectX = Phaser.Math.Between(0, this.ref.cameras.main.width)
                this.ref.objectY = 0;
                break;
            case 2:
                this.ref.objectY = Phaser.Math.Between(0, this.ref.cameras.main.height)
                this.ref.objectX = Phaser.Math.Between(0, 1) * this.ref.cameras.main.width;
                break;
        }
        let previousLeftSide = this.ref.leftSide;
        this.ref.leftSide = this.ref.ship.x < this.ref.game.config.width / 2;
        if (previousLeftSide && !this.ref.leftSide) {
            let enemies = this.ref.spaceShips.getFirstDead();

            if (!enemies && !this.ref.spaceShips.isFull()) {
                let enemy = new enemyShip(this.ref, this.ref.x, this.ref.y, this.ref.lowerCircle, this.ref.spaceBases[0], this.ref.gameOptions, this.ref.spaceShips);
                this.ref.spaceShips.add(enemy);
                enemy.body.isCircle = true
            }
            let collectables = this.ref.collectables.getFirstDead();
            if (!collectables) {
                let collectable = new Collectable(this.ref, this.ref.objectX, this.ref.objectY, this.ref.gameOptions, this.ref.planet, Phaser.Math.Between(0, 3));
                this.ref.collectables.add(collectable);
                collectable.body.isCircle = true
            }
        }
    }
    level_2() {
        switch (Phaser.Math.Between(1, 2)) {
            case 1:
                this.ref.objectX = Phaser.Math.Between(0, this.ref.cameras.main.width)
                this.ref.objectY = 0;
                break;
            case 2:
                this.ref.objectY = Phaser.Math.Between(0, this.ref.cameras.main.height)
                this.ref.objectX = Phaser.Math.Between(0, 1) * this.ref.cameras.main.width;
                break;
        }

        let previousLeftSide = this.ref.leftSide;
        this.ref.leftSide = this.ref.ship.x < this.ref.game.config.width / 2;
        if (previousLeftSide && !this.ref.leftSide) {
            let enemies = this.ref.spaceShips.getFirstDead();
            let randomCircle = Phaser.Math.Between(0, this.ref.enemiesCircles.length - 1);

            if (!enemies) {
                let enemy = new enemyShip(this.ref, this.ref.x, this.ref.y, this.ref.enemiesCircles[randomCircle], this.ref.spaceBases[randomCircle], this.ref.gameOptions, this.ref.spaceShips);
                this.ref.spaceShips.add(enemy);
                enemy.body.isCircle = true
            }
            let collectables = this.ref.collectables.getFirstDead();
            if (!collectables) {
                let collectable = new Collectable(this.ref, this.ref.objectX, this.ref.objectY, this.ref.gameOptions, this.ref.planet, Phaser.Math.Between(0, 3), collectables);
                this.ref.collectables.add(collectable);
                collectable.body.isCircle = true
            }
        }
    }
    level_3() {
        switch (Phaser.Math.Between(1, 2)) {
            case 1:
                this.ref.objectX = Phaser.Math.Between(0, this.ref.cameras.main.width)
                this.ref.objectY = 0;
                break;
            case 2:
                this.ref.objectY = Phaser.Math.Between(0, this.ref.cameras.main.height)
                this.ref.objectX = Phaser.Math.Between(0, 1) * this.ref.cameras.main.width;
                break;
        }

        let previousLeftSide = this.ref.leftSide;
        this.ref.leftSide = this.ref.ship.x < this.ref.game.config.width / 2;
        if (previousLeftSide && !this.ref.leftSide) {
            let enemies = this.ref.spaceShips.getFirstDead();
            let randomCircle = Phaser.Math.Between(0, this.ref.enemiesCircles.length - 1);

            if (!enemies) {
                let enemy = new enemyShip(this.ref, this.ref.x, this.ref.y, this.ref.enemiesCircles[randomCircle], this.ref.spaceBases[randomCircle], this.ref.gameOptions, this.ref.spaceShips);
                this.ref.spaceShips.add(enemy);
                enemy.body.isCircle = true
            }
            let collectables = this.ref.collectables.getFirstDead();
            if (!collectables) {
                let collectable = new Collectable(this.ref, this.ref.objectX, this.ref.objectY, this.ref.gameOptions, this.ref.planet, Phaser.Math.Between(0, 3), collectables);
                this.ref.collectables.add(collectable);
                collectable.body.isCircle = true
            }
        }
    }
}