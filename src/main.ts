interface Card {
  suit: string;  // "hearts", "diamonds", "clubs", "spades"
  value: string; // "A", "2", "3", ..., "K"
}

class Game {
  private playerHand: Card[] = [];
  private deck: Card[] = [];

  constructor() {
    this.createDeck();
    this.shuffleDeck();
    this.dealCards(5);
    this.renderHand();
  }

  createDeck() {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    this.deck = [];

    for (let suit of suits) {
      for (let value of values) {
        this.deck.push({ suit, value });
      }
    }
  }

  shuffleDeck() {
    this.deck = this.deck.sort(() => Math.random() - 0.5);
  }

  dealCards(num: number) {
    this.playerHand = this.deck.slice(0, num);
  }

  renderHand() {
    const handContainer = document.getElementById("player-hand")!;
    handContainer.innerHTML = "";

    this.playerHand.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.textContent = `${card.value} of ${card.suit}`;
      handContainer.appendChild(cardDiv);
    });
  }
}

const game = new Game();
