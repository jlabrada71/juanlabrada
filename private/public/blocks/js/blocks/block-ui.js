import Block from './block.js';
import {t} from '../config.js';

class BlockUI extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, block, id ) {
        super(scene, x, y, type);
        this.id = id;
        this.scene = scene;
        this.scene.add.existing(this);
        this.block = block;
        this.setInteractive();
        this.setScale(t(0.1));
        this.setOrigin(0);
        this.tintFill = true;
        this.tint = 0x0000FF;
        this.selected = false;
        this.on('pointerdown', (pointer) => {
            console.log('id:' + this.id);
            // alert(this.getTint());
            if( this.selected ) {
                this.unSelecting();
            }
            else {
                this.selecting();
            }
        });
        this.on('pointerup', (pointer) => {
            // alert(this.getTint());
            if( ! this.isSelecting ) {
                this.unSelect();
            }
            else {
                this.select();
            }
        });
    }

    setStartCoords() {
        this.startX = this.x;
        this.startY = this.y;
    }

    selecting() {
        this.isSelecting = true;
        this.setScale(t(0.11));
    }

    unSelecting() {
        this.isSelecting = false; 
    }

    select() {
        this.isSelecting = false;
        this.selected = true;
        this.scene.selectBlock(this);
    }

    unSelect() {
        this.selected = false;
        this.setScale(t(0.1));
        this.scene.unSelectBlock(this);
    }

    static create(scene, id) {
        const block = new Block();
        const uiBlock =  new BlockUI( scene, 0, -50 , 'container', block, id);
        scene.input.setDraggable(uiBlock);
        scene.input.dragDistanceThreshold = t(3);
        return uiBlock;
    }

    moveToStart() {
        block.x = block.startX;
        block.y = block.startY;
    }

    moveTo( coords ) {
        this.setPosition(coords.x, coords.y);
    }

    setAge( n ) {
        this.block.setAge( n ); 
    }

    isMe(uiBlock) {
        return this === uiBlock;
    }

    nextTurn() {
        this.block.nextTurn();
        this.setColor(this.block.age);
    }

    setColor(age) {
        const colors = [ 0x0000ff, 0x00ffff, 0x999999,0x0ffff00,0x0ffff00];
        this.tint = colors[age - 1];
    }

    reset() {
        this.block.reset();
        this.tint = 0x0000ff;
        this.setPosition(0, -50);
    }
};

export default BlockUI;