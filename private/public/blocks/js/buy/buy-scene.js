import {Config, t} from '../config.js';
import BalanceUI from '../balance/balance-ui.js';

class BuyScene extends Phaser.Scene {
    constructor(state) {
        super({ key: 'BuyScene' });
        this.config = new Config();
        this.server = this.config.server;     
        this.balance = state.balance;
        this.containers = state.containers;
        this.containersText = [{},{},{},{}];
    }

    preload() {
        this.load.spritesheet('genericButton', `${this.server}/assets/back.png`, { frameWidth: 120, frameHeight: 70 });
        this.load.spritesheet('buyButton', `${this.server}/assets/buy.png`, { frameWidth: 120, frameHeight: 70 });
        this.load.svg('container', `${this.server}/assets/svg/square.svg`);
        this.load.image('background', `${this.server}/assets/blockmap.png`)
    }

    create() {
        this.graphics = this.add.graphics();
        let background = this.add.image(0, 0, 'background');
        background.setScale(2);
        this.title = this.add.text(t(32), t(220), 'Buy Containers', { font: "15px Arial", fill: "#19de65" });
        this.balanceUi = new BalanceUI( this, this.balance );
        
        this.returnButton = this.defineReturnButton();

        this.buy2Button = this.defineBuy2Button();
        this.buy3Button = this.defineBuy3Button();
        this.buy4Button = this.defineBuy4Button();
    }

    defineReturnButton() {
        let button = this.defineButton( 'genericButton', t(150), t(100), this.processReturnClick);
        let buttonText = this.add.text(t(100), t(70), 'Back', { font: "45px Arial Bold", fill: "#ffffff" });
        return button;
    }

    drawText(containerId, x) {
        let cont = this.containers[containerId];

        this.containersText[containerId].sprite = this.add.sprite(t(x) - t(20), t(220), 'container' );
        this.containersText[containerId].sprite.setOrigin( 0 );
        this.containersText[containerId].sprite.scaleX = t(0.9);
        this.containersText[containerId].sprite.scaleY = t(0.9);
        this.containersText[containerId].sprite.tintFill = true;
        this.containersText[containerId].sprite.tint = cont.def.color;

        this.containersText[containerId].title = this.add.text(t(x), t(250), 'Container: ' + Number(containerId + 1), { font: "15px Arial", fill: "#000000" });
        this.containersText[containerId].capacity = this.add.text(t(x), t(275), 'Capacity: ' + cont.capacity, { font: "15px Arial", fill: "#000000" });
        this.containersText[containerId].increase = this.add.text(t(x), t(300), 'Add: ' + cont.def.capacityIncrease, { font: "15px Arial", fill: "#000000" });
        this.containersText[containerId].cost = this.add.text(t(x), t(325), 'Cost: ' + cont.def.cost, { font: "15px Arial", fill: "#000000" });
    }

    updateText(containerId) {
        let cont = this.containers[containerId];
        this.containersText[containerId].title.text = 'Container: ' + Number(containerId + 1);
        this.containersText[containerId].capacity.text = 'Capacity: ' + cont.capacity;
        this.containersText[containerId].increase.text = 'Add: ' + cont.def.capacityIncrease;
        this.containersText[containerId].cost.text = 'Cost: ' + cont.def.cost;
    }

    defineBuy2Button() {
        this.drawText(1, 200);
        return this.defineButton( 'buyButton', t(250), t(400), this.processBuy2Click);
    }

    defineBuy3Button() {
        this.drawText(2, 350);
        return this.defineButton( 'buyButton', t(400), t(400), this.processBuy3Click);
    }

    defineBuy4Button() {
        this.drawText(3, 500);
        return this.defineButton( 'buyButton', t(550), t(400), this.processBuy4Click);
    }

    defineButton(label, x, y, action) {
        let butt = this.add.sprite(x, y, label).setInteractive();
        butt.setScale(t(1));
        butt.on('pointerover', function (event) {  });
        butt.on('pointerout', function (event) { });
        butt.on('pointerdown', action); 
    }

    processReturn() {
        this.scene.switch('MainScene');
    }

    processReturnClick () {
        // this function should be refactor out in to a button class, along with button creation.
        this.scene.processReturn();
    }

    processBuy2() {
        this.buyCapacity(1);
    }

    buyCapacity(containerId) {
        if(this.balance.balance < this.containers[containerId].def.cost) {
            alert('No enough balance');
            return;
        }
        this.containers[containerId].capacity += this.containers[containerId].def.capacityIncrease;
        this.balance.add( -this.containers[containerId].def.cost );
        this.updateText(containerId);
    }

    processBuy2Click () {
        this.scene.processBuy2();
    }

    processBuy3() {
        this.buyCapacity(2);
    }

    processBuy3Click () {
        this.scene.processBuy3();
    }

    processBuy4() {
        if(this.containers[3].capacity > 0 ) {
            alert('Container 4 can only be bought once.');
            return;
        }
        this.buyCapacity(3);
    }

    processBuy4Click () {
        this.scene.processBuy4();
    }
};

export default BuyScene;