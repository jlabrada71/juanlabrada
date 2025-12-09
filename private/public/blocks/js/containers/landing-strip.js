import {Config, t} from '../config.js';

class LandingStrip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, container ) {
        super(scene, x, y, type);
        this.scene = scene;
        this.scene.add.existing(this);

        this.setData("type", type);

        this.blocks = [];

        let config = new Config();
        this.capacity = config.landingStripCapacity;
        this.container = container;
        this.config = new Config();
    }

    static create( scene, x, y, container ) {
        const landingStrip = new LandingStrip(scene, 
                                x, y, 
                                'container', container);
        landingStrip.scaleX = t(0.15);
        landingStrip.scaleY = t(0.7);

        landingStrip.setOrigin(0);
        landingStrip.tint = 0xbbbbbb;
        landingStrip.setInteractive();
        landingStrip.input.dropZone = true;
        return landingStrip;
    }

    computeCoords() {
        const xindex = 0;
        const yindex = this.blocks.length;
        const x = this.x + t(4) + xindex * t(this.config.blockSize);
        const y = this.y + t(4) + yindex * t(this.config.blockSize + 4);
        // alert( JSON.stringify({x, y}));
        return { x, y };
    }

    addBlock( block ) {
        const coords = this.computeCoords();
        block.moveTo( coords );   
        this.blocks.push(block);
    }

    removeBlock(block) {
        this.blocks.splice(this.blocks.indexOf(block), 1);
        return block;
    }

    isMyZone(zone) {
        return this === zone;
    }

    canAccept( blockUi ) {
        if (this.blocks.length >= this.capacity ) return false;
       //  alert( ` age: ${blockUi.block.age} <= ${this.container.getData("id")}`);
        return this.container.canAccept(blockUi);
    }

    findBlock(gameObject) {
        let resultBlock = null;
        this.blocks.forEach((block) => { if(block.isMe(gameObject)) resultBlock = block; } );
        return resultBlock;
    }

    nextTurn() {
        this.blocks.forEach((block) => { this.container.addBlock(block)});
        this.blocks = [];
    }

    reset() {
        this.blocks.forEach((blockUi) => {
            blockUi.reset();
        })
        this.blocks = [];
    }
};

export default LandingStrip;