import LandingStrip from './landing-strip.js';
import {t} from '../config.js';

class ContainerUI extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, id, type, container ) {
        super(scene, x, y, type);
        this.scene = scene;
        this.scene.add.existing(this);

        this.setData("type", type);
        this.setData("id", id);
        this.id = id;
        this.landingStrip = null;

        this.blocks = [];
        this.container = container;
        this.containerText =  scene.add.text(t(x), t(y) + t(135), '', { font: "15px Arial", fill: "#19de65" });
        this.capacityText = scene.add.text(t(x) + t(this.container.capacity * 5), t(y) + t(135), '', { font: "15px Arial", fill: "#19de65" });
        this.updateText();
    }

    isOverflown() {
        if(!this.visible) return false;
        return this.container.isOverflown();
    }

    updateText() {
        this.containerText.text = `Container ${this.id + 1}`;
        this.capacityText.text = `${this.blocks.length}/${this.container.capacity}`;
    }

    updateCapacity() {
        this.scaleX = t(this.container.capacity/20);
        this.capacityText.x = this.x + t(this.container.capacity * 5);
    }

    update() {
        this.updateText();
        this.updateCapacity();
    }

    static create( scene, container ) {
        const containerUi = new ContainerUI(scene, 
                                t(container.def.x), 
                                t(container.def.y), 
                                container.def.id, 
                                'container', container);
        containerUi.setOrigin( 0 );
        containerUi.scaleX = t(container.def.capacity/20);
        containerUi.scaleY = t(0.9);

        containerUi.tintFill = true;

        containerUi.tint = container.def.color;
        containerUi.setInteractive();
        // containerUi.input.dropZone = true;
        if( container.def.id !== 0 ) {
            containerUi.landingStrip = LandingStrip.create(scene, t(container.def.x - 20), t(container.def.y + 15), containerUi);
            containerUi.hide();
        }
            
        return containerUi;
    }

    hide() {
        this.visible = false;
        if(this.landingStrip) {
            this.landingStrip.visible = false;
        }
        this.containerText.visible = false;
        this.capacityText.visible = false;
    }

    show() {
        if(this.container.capacity === 0 ) {
            this.hide();
            return;
        }
        this.visible = true;
        this.update();
        if(this.landingStrip) {
            this.landingStrip.visible = true;
        }
        
        this.containerText.visible = true;
        this.capacityText.visible = true;
    }

    computeCoords( number ) {
        const maxRow = 4;
        const blockSize = t(20);
        const xcount = Math.floor( this.container.capacity / maxRow );
        const xindex = number % xcount;
        const yindex = Math.floor(number / xcount );
        const x = this.x + t(10) + xindex * blockSize;
        const y = this.y + t(10)+ yindex * blockSize;
        return { x, y };
    }

    computeNextCoords() {
        return this.computeCoords(this.container.blocks.length);
    }

    addBlock( blockUi ) {
        // if( ! this.container.canAccept(blockUi.block)) return;
        this.blocks.push(blockUi);
        this.container.addBlock(blockUi.block);
        this.redrawBlocks();
        this.updateText();
    }

    redrawBlocks() {
        let i = 0;
        this.blocks.forEach((block) => { block.moveTo(this.computeCoords(i++)); });
    }

    removeBlock(blockUi) {
        this.container.removeBlock(blockUi.block);
        this.blocks.splice(this.blocks.indexOf(blockUi), 1);
        this.redrawBlocks();
        this.updateText();
        return blockUi;
    }

    nextTurn() {
        if( this.landingStrip !== null ) {
            this.landingStrip.nextTurn();
        }
        this.blocks.forEach((blockUi) => { blockUi.nextTurn(); } );
    }

    isMyZone(zone) {
        if( ! this.landingStrip ) return null;
        return this.landingStrip.isMyZone(zone);
    }

    canAccept( blockUi ) {
        return this.container.canAccept(blockUi.block);
    }

    findBlock(gameObject) {
        let resultBlock = null;
        this.blocks.forEach((block) => { if(block.isMe(gameObject)) resultBlock = block; } );
        return resultBlock;
    }

    reset() {
        this.container.reset();
        this.blocks.forEach((blockUi) => {
            blockUi.reset();
        })
        this.blocks = [];
        if( this.landingStrip ) this.landingStrip.reset();
        this.updateText();
    }
};

export default ContainerUI;