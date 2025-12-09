import MainScene from './main/main-scene.js';
import BuyScene from './buy/buy-scene.js';
import State from './state.js';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 577,
    backgroundColor: '#000000',
    parent: 'Blocks game',
};

const game = new Phaser.Game(config);

const state = new State();
const mainScene = new MainScene(state);
const buyScene = new BuyScene(state);

game.scene.add('MainScene', mainScene);
game.scene.add('BuyScene', buyScene);

game.scene.start('MainScene');