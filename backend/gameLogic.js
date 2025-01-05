import { deckManagerService } from "./services/deckManagerService.js";
import { rules } from "./rules.js";

export class Game {
  constructor() {
    this.deckService = new deckManagerService();

    this.playerDeck = this.deckService.createDeck();
    this.playerDeck = this.deckService.shuffleDeck(this.playerDeck);

    this.opponentDeck = this.deckService.createDeck();
    this.opponentDeck = this.deckService.shuffleDeck(this.opponentDeck);

    this.playerHand = [];
    this.opponentHand = [];
  }

  startTurn() {
    if (this.playerDeck.length > 0) {
      this.dealCards(this.playerDeck, this.playerHand, 1);
    } else {
      return this.checkGameOver();
    }

    if (this.opponentDeck.length > 0) {
      this.dealCards(this.opponentDeck, this.opponentHand, 1);
    } else {
      return this.checkGameOver();
    }

    return this.getGameState();
  }

  getGameState() {
    return {
      playerDeck: this.playerDeck,
      opponentDeck: this.opponentDeck,
      playerHand: this.playerHand,
      opponentHand: this.opponentHand,
    };
  }

  checkGameOver() {
    const result = rules.checkGameOver(this.playerDeck, this.opponentDeck);
    if (result) {
      return {
        gameOver: true,
        message: result === "Player" ? "You won!" : "You lost!",
      };
    }
    return { gameOver: false };
  }

  dealCards(deck, hand, numberOfCardsToDraw) {
    hand.splice(0, hand.length, ...deck.splice(0, numberOfCardsToDraw));
  }

  selectCard(cardIndex) {
    this.playerHand.splice(cardIndex, 1);
    return this.getGameState();
  }
}
