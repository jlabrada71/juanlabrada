import Balance from './balance/balance.js';
import Container from './containers/container.js';
import {Config} from './config.js';

class State {
    constructor() {
        this.balance = new Balance();
        const config = new Config();
        this.containers = [];
        config.containers.forEach((def) => {
            this.containers.push(new Container(def));
        })
    }
};

export default State;
