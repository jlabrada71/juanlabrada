class Block {
    constructor() {
        this.age = 0;
    }

    nextTurn() {
        if(this.age < 4) {
            this.age++;
        }
    }

    setAge( n ) {
        this.age = n;
    }

    reset() {
        this.age = 0;
    }
};

export default Block;