import { card } from './models/card';
import { renderService } from './services/renderService';
import { deckManagerService } from './services/deckManagerService';

export class game {
  private playerHand: card[] = [];
  private opponentHand: card[] = [];
  private deckService = new deckManagerService();
  private renderService = new renderService();

  constructor() {
    let playerDeck: card[] = this.deckService.createDeck();
    playerDeck = this.deckService.shuffleDeck(playerDeck);

    let opponentDeck: card[] = this.deckService.createDeck();
    opponentDeck = this.deckService.shuffleDeck(opponentDeck);

    this.dealcards(playerDeck, this.playerHand, 1);
    this.dealcards(opponentDeck, this.opponentHand, 1);

    this.renderService.renderHands(this.playerHand, this.opponentHand, (index) => this.playerPlay(index));
  }

  dealcards(deck: card[], hand: card[], numberOfCardsToDraw: number) {
    hand.splice(0, hand.length, ...deck.slice(0, numberOfCardsToDraw));
  }

  playerPlay(cardIndex: number) {
    const card = this.playerHand.splice(cardIndex, 1)[0];
    this.renderService.updateBoard(card, "Player");
    this.botPlay();
    this.renderService.renderHands(this.playerHand, this.opponentHand, (index) => this.playerPlay(index));
  }

  botPlay() {
    const card = this.opponentHand.pop();
    if (card) {
      this.renderService.updateBoard(card, "Bot");
    }
  }
}
