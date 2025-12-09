
class TurnUI {
    constructor(scene, x, y, maxTurns ) {
        this.maxTurns = maxTurns;
        this.turn = 0;
        this.turnText = scene.add.text(x, y, '', { font: "15px Arial", fill: "#19de65" });
        this.showText();
    }

    showText() {
        this.turnText.text = `Total Turns ${this.turn}/${this.maxTurns}`;
    }

    nextTurn() {
        this.turn++;
        this.showText();
    }

    reset() {
        this.turn = 0;
        this.showText();
    }

    isLastTurn() {
        return this.turn == this.maxTurns;
    }
};

export default TurnUI;