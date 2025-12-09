var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#010101',
    parent: 'phaser-example',
};

var game = new Phaser.Game(config);

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }


    preload ()
    {
        this.load.image('buttonBG', 'assets/back.png');
    }

    create ()
    {
        this.multipleSelection = this.add.container(0, 0, []);
        // debe ser llamado antes
        this.multipleSelection.setSize(10,10);
        this.multipleSelection.setInteractive();
        this.input.setDraggable(this.multipleSelection);
    }
}

const mainScene = new MainScene();

game.scene.add('MainScene', mainScene);
game.scene.start('MainScene');
