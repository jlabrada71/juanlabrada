
class Container  {
    constructor(def) {
        this.def = def;
        this.id = def.id;
        this.capacity = def.capacity;
        this.requiredAge = def.requiredAge;
        this.blocks = [];
    }

    addBlock( block ) {  
        if (this.capacity === this.blocks.length) return;
        this.blocks.push(block);
    }

    removeBlock(block) {
        this.blocks.splice(this.blocks.indexOf(block), 1);
        return block;
    }

    nextTurn() {
        this.blocks.forEach((block) => { block.nextTurn(); } );
    }

    isOverflown() {
        return this.capacity <= this.blocks.length;
    }

    canAccept( block ) {
        console.log( ` blk: ${block.age} >=  cont: ${this.requiredAge} : ${block.age >= this.requiredAge}` )
        return block.age >= this.requiredAge;
    }

    reset() {
        this.blocks = [];
        if(this.id > 0) this.capacity = 0;
    }
};

export default Container;