class BalanceUI {
    constructor(scene, balance) {
        this.balance = balance;
        this.balanceText = scene.add.text(32, 200, `Balance: ${this.balance.balance}`, { font: "15px Arial", fill: "#19de65" });
        this.balance.addObserver(this);
    }
    
    onObserved(obj, property, value ) {
        if (property === 'balance') {
            this.balanceText.text = `Balance: ${value}`;
        }
    }

    showBalance() {
        this.balanceText.text = `Balance: ${this.balance.balance}`;
    }
};

export default BalanceUI;