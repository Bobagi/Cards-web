import { card } from './models/card';
import { renderService } from './services/renderService';
import { deckManagerService } from './services/deckManagerService';

export class game {
  private playerHand: card[] = [];
  private botHand: card[] = [];
  private deckService = new deckManagerService();
  private renderService = new renderService();

  constructor() {
    const deck = this.deckService.createDeck();
    const shuffledDeck = this.deckService.shuffleDeck(deck);
    this.dealcards(shuffledDeck);
    this.renderService.renderHands(this.playerHand, this.botHand, (index) => this.playerPlay(index));
  }

  dealcards(deck: card[]) {
    const half = deck.length / 2;
    this.playerHand = deck.slice(0, half);
    this.botHand = deck.slice(half, deck.length);

    console.log(this.playerHand);
    console.log(this.botHand);
  }

  playerPlay(cardIndex: number) {
    const card = this.playerHand.splice(cardIndex, 1)[0];
    this.renderService.updateBoard(card, "Player");
    this.botPlay();
    this.renderService.renderHands(this.playerHand, this.botHand, (index) => this.playerPlay(index));
  }

  botPlay() {
    const card = this.botHand.pop();
    if (card) {
      this.renderService.updateBoard(card, "Bot");
    }
  }
}
