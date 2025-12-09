class Balance {
    constructor() {
        this.balance = 0;
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    reset() {
        this.balance = 0;
        this.updateObservers();
    }

    add(amount) {
        this.balance += amount;
        this.updateObservers();
    }
    updateObservers() {
        let self = this;
        this.observers.forEach( observer => observer.onObserved(self, 'balance', self.balance));
    }
};

export default Balance;