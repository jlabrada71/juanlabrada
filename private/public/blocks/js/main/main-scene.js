import BlockUI from '../blocks/block-ui.js';
import ContainerUI from '../containers/container-ui.js';
import BalanceUI from '../balance/balance-ui.js';
import TurnUI from './turn-ui.js';
import {Config, t} from '../config.js';

class MainScene extends Phaser.Scene {
    constructor(state) {
        super({ key: 'MainScene' });
        this.state = state; 
        this.config = new Config();
        this.server = this.config.server;
        this.color = 0;
        this.containersUi = [];
        this.balance = state.balance;
    }

    preload() {
        this.load.spritesheet('nextButton', `${this.server}/assets/next.png`, { frameWidth: 120, frameHeight: 70 });
        this.load.spritesheet('buyButton', `${this.server}/assets/buy.png`, { frameWidth: 120, frameHeight: 70 });
        this.load.svg('container', `${this.server}/assets/svg/square.svg`);
        this.load.image('background', `${this.server}/assets/blockmap.png`)
    }

    create() {
        this.graphics = this.add.graphics();
        let background = this.add.image(0, 0, 'background');
        background.setScale(2);
        this.gameText = this.add.text(t(32), t(220), 'Click [Next] button to start', { font: "15px Arial", fill: "#19de65" });
        this.balanceUi = new BalanceUI( this, this.balance );
        this.turnUi = new TurnUI( this, t(32), t(180), this.config.turns);
        this.createContainers();
        this.createBlocks();
        this.nextTurnButton = this.defineNextTurnButton();
        this.buyButton = this.defineBuyButton();
        this.defineDraggingBehaviour();  
        this.events.on('wake', () => {
            this.resume();
        });
        
        this.multipleSelection = [];
    }

    resume() {
        this.containersUi.forEach((containerUi) => containerUi.show());
        this.balanceUi.showBalance();
    }

    selectBlock(block) {
        if(this.multipleSelection.indexOf(block) >= 0 ) return;
        this.multipleSelection.push(block);
        console.log(this.multipleSelection.length);
    }

    unSelectBlock(block) {
        this.multipleSelection = this.multipleSelection.filter((item) => { 
            return item != block; 
        });
        console.log(this.multipleSelection.length);
    }

    moveSelected(dx, dy) {
        this.multipleSelection.forEach((block) => { 
            block.moveTo({ x: block.startX + dx, y: block.startY + dy });
        })
    }

    returnAll() {
        this.moveAllBackToStart();
        this.clearSelected();
    }

    clearSelected() {
        this.multipleSelection.forEach((block) => { 
            block.unSelect();
        })
        this.multipleSelection = [];
    }

    createContainers() {
        this.state.containers.forEach(( container ) => {
            this.containersUi.push(ContainerUI.create(this, container));
        })
    }

    createBlocks() {
        this.blockList = [];
        for( let i = 0; i < this.config.turns * this.config.blocksPerTurn; i++) {
            this.blockList.push(BlockUI.create(this, i));
        }
    }

    defineNextTurnButton() {
        return this.defineButton( 'nextButton', t(290), t(100), this.processNextTurnClick);
    }

    defineBuyButton() {
        return this.defineButton( 'buyButton', t(150), t(100), this.processBuyClick);
    }

    defineButton(label, x, y, action) {
        let butt = this.add.sprite(x, y, label).setInteractive();
        butt.setScale(t(1));
        butt.on('pointerover', function (event) {  });
        butt.on('pointerout', function (event) { });
        butt.on('pointerdown', action); 
    }

    setAllSelectedBlockStart() {
        
        this.multipleSelection.forEach((block) => { 
            block.setStartCoords();
        })
    }

    defineDraggingBehaviour() {
        this.input.on('dragstart', function (pointer, gameObject) {
            this.children.bringToTop(gameObject);
            if(gameObject.isSelecting) {
                gameObject.select();
            }
            this.setAllSelectedBlockStart();
        }, this);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            let dx = dragX - gameObject.startX;
            let dy = dragY - gameObject.startY;

            console.log(`dragging: ${dx} ${dy}`);
            this.moveSelected(dx, dy);
        });
    
        this.input.on('drop', (pointer, gameObject, dropZone) => {
            const self = gameObject.scene;
            const targetLandingStrip = self.findZoneContainer(dropZone);
            if( targetLandingStrip === null ) return;
            const sourceContainer = self.findBlockContainer(gameObject);
            const blockUi = self.findBlock(gameObject);
            if( blockUi === null || blockUi.block.age === 0) {
                let dx = gameObject.input.dragStartX - gameObject.x;
                let dy = gameObject.input.dragStartY - gameObject.y;
                this.moveSelected(dx, dy);
                return;
            }

            let targetId = targetLandingStrip.container.id;

            console.log(`src: ${sourceContainer.id + 1}  tgt: ${targetId + 1}`);

            if((sourceContainer.id === 3) || (targetId === 0) ) {
                console.log('cannot move from 4 or to 1' )
                this.returnAll();
                return;  // Container 4 - blocks cannot be moved from here
            }

            if((sourceContainer.id === 0) && ( targetId === 3) ) {
                console.log('cannot move from 1 to 4' )
                this.returnAll();
                return;  // Container 1 TO container 2 or 3
            }

            if((sourceContainer.id === 2) && ( targetId === 1) ) {
                console.log('cannot move from 3 to 2' )
                this.returnAll();
                return;  // Container 3 to Container 4
            }
            
            this.multipleSelection.forEach((blockUi1) => { 
                blockUi1.unSelect();
                if( ! targetLandingStrip.canAccept( blockUi1 ) ) {
                    console.log('cannot accept');
                    blockUi1.moveToStart();
                    return;
                }
                console.log('adding to landing strip');
                sourceContainer.removeBlock(blockUi1);
                targetLandingStrip.addBlock(blockUi1);
            })
            this.multipleSelection = [];
        });
    
        this.input.on('dragend', (pointer, gameObject, dropped) => {
            if (dropped) return;
            this.returnAll();
            console.log('Dragend called');
        });
    }

    moveAllBackToStart() {
        this.multipleSelection.forEach((blockUi) => { 
            blockUi.moveToStart();
        })
    }

    findZoneContainer(zone) {
        let containersUi = this.containersUi.filter(container => container.isMyZone(zone) );
        if( containersUi.length !== 1) return null;
        return containersUi[0].landingStrip;
    }

    findBlockContainer(block) {
        let resultContainerUi;
        this.containersUi.forEach((containerUi) => { 
            let returnedBlock = containerUi.findBlock(block);
            if( returnedBlock !== null )  {
                resultContainerUi = containerUi;
            }
         } );
         return resultContainerUi;
    }

    findBlock(gameObject) {
        let block = null;
        this.containersUi.forEach((containerUi) => { 
            let returnedBlock = containerUi.findBlock(gameObject);
            if( returnedBlock !== null )  {
                block = returnedBlock;
            }
         } );

         return block;
    }

    resetGame() {
      this.balance.reset();
      this.turnUi.reset();
      this.gameText.text = 'Click [Next] to Start Over';
      
      this.containersUi.forEach((containerUi) => { containerUi.reset(); })
      this.createBlocks();
      this.resume();
    }

    isGameOver() {
       return this.turnUi.isLastTurn();
    }

    processNextTurn() {
        this.gameText.text = '';
        
        if( this.isGameOver() ) {
            alert('Game Over. Press [Next] to start over');
            this.resetGame();
            return;
        }

        this.turnUi.nextTurn();
        this.balance.add(100);

        let overflow = false;
        this.containersUi.forEach( (containerUi) => { containerUi.nextTurn(); } );
        this.containersUi.forEach( (containerUi) => { if(containerUi.isOverflown()) overflow = true; } );

        if(overflow) {
            alert('Container reached capacity. Game Over. Press [Next] to start over');
            this.resetGame();
            return;
        }

        for(let i = 0; (i < this.config.blocksPerTurn ) && (this.blockList.length > 0) ; i++) {
            let block = this.blockList.pop();
            block.setAge(1);
            this.containersUi[0].addBlock(block);
        }
    }

    processNextTurnClick () {
        // this function should be refactor out in to a button class, along with button creation.
        this.scene.processNextTurn();
    }

    changeColor(game) {
        game.color += 20;
        game.color = game.color % 0xffffff;
        game.containersUi[0].tint = game.color;
    }

    processBuy() {
        this.scene.switch('BuyScene');
    }

    processBuyClick () {
        // this function should be refactor out in to a button class, along with button creation.
        this.scene.processBuy();
    }
};

export default MainScene;