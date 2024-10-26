import { card } from './models/card';
import { renderService } from './services/renderService';
import { deckManagerService } from './services/deckManagerService';
import { rules } from './rules';

export class game {
  private playerDeck: card[] = [];
  private opponentDeck: card[] = [];
  private playerHand: card[] = [];
  private opponentHand: card[] = [];
  private deckService = new deckManagerService();
  private renderService = new renderService();

  constructor() {
    this.playerDeck = this.deckService.createDeck();
    this.playerDeck = this.deckService.shuffleDeck(this.playerDeck);

    this.opponentDeck = this.deckService.createDeck();
    this.opponentDeck = this.deckService.shuffleDeck(this.opponentDeck);

    this.startTurn();
  }

  startTurn() {
    // Pega a primeira carta de cada baralho como a "mão" do jogador e oponente
    if(this.playerDeck.length > 0){
      this.dealcards(this.playerDeck, this.playerHand, 1);
    }else{
      this.checkGameOver();
    }

    if(this.opponentDeck.length > 0){
      this.dealcards(this.opponentDeck, this.opponentHand, 1);
    }else{
      this.checkGameOver();
    }

    this.renderService.renderHands(this.playerHand, this.opponentHand, (index) => this.playerPlay(index));
  }

  checkGameOver(): boolean {
    // Verifica se um dos jogadores ficou sem cartas e exibe a tela de fim de jogo
    const result = rules.checkGameOver(this.playerDeck, this.opponentDeck);
    if (result) {
      this.renderService.showEndGameScreen(result === 'Player' ? 'Você venceu!' : 'Você perdeu!');
      return true;
    }
    return false;
  }

  dealcards(deck: card[], hand: card[], numberOfCardsToDraw: number) {
    hand.splice(0, hand.length, ...deck.splice(0, numberOfCardsToDraw));
  }

  playerPlay(cardIndex: number) {
    console.log("Hand Before");
    this.playerHand.forEach((item) => {
      console.log(item);
    });

    const playerCard = this.playerHand.splice(cardIndex, 1)[0];

    console.log("Hand After");
    this.playerHand.forEach((item) => {
      console.log(item);
    });

    this.renderService.updateBoard(playerCard, "Player");
    const opponentCard = this.botPlay();

    if(!playerCard || !opponentCard){
      alert("FATAL ERROR!");
      return;
    }else{
      const result = rules.compareCards(playerCard, opponentCard, 'strength');
      rules.handleRoundOutcome(result, playerCard, opponentCard, this.playerDeck, this.opponentDeck);
      this.checkGameOver();
      this.startTurn();
    }
  }

  botPlay(): card | null {
    const card = this.opponentHand.pop();
    if (card) {
      this.renderService.updateBoard(card, "Bot");
      return card;
    }
    this.checkGameOver();
    return null;
  }
}
