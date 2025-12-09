class Config {
    constructor() {
        this.blockSize = 20;
        this.turns = 20;
        this.blocksPerTurn = 2;
        let blue = 0x4dc5dd;
        let darkBlue = 0x529aca;
        let grey = 0xc7c7c7;
        let brown = 0xd3c2a4;
        this.containers = [
            { id: 0, capacity: 20, capacityIncrease: 10, cost: 0,   requiredAge: 0, color: blue,     x: 600, y: 100 },
            { id: 1, capacity: 0,  capacityIncrease: 10, cost: 200, requiredAge: 2, color: darkBlue, x: 100, y: 260 },
            { id: 2, capacity: 0,  capacityIncrease: 10, cost: 300, requiredAge: 3, color: grey,     x: 450, y: 260 },
            { id: 3, capacity: 0,  capacityIncrease: 40, cost: 400, requiredAge: 4, color: brown,    x: 300, y: 420 }
        ]

        this.landingStripCapacity = 4;
        // this.server = 'http://localhost:8080/blocks';
        this.server = 'https://www.juanlabrada.com/blocks';
    }
};

function t( c ) {
    let unit = 1;
    return c * unit;
}

export {Config, t};
