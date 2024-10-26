import { card } from './models/card';

export class rules {
  static compareCards(playerCard: card, opponentCard: card, attribute: 'strength' | 'magic' | 'fire'): string {
    const playerValue = playerCard[attribute];
    const opponentValue = opponentCard[attribute];

    if (playerValue > opponentValue){
      alert('Player wins');
      return 'Player';
    }
    if (opponentValue > playerValue){
      alert('Opponent wins');
      return 'Opponent';
    }
    return 'Draw';
  }

  static handleRoundOutcome(
    winner: string,
    playerCard: card,
    opponentCard: card,
    playerDeck: card[],
    opponentDeck: card[]
  ) {
    if (winner === 'Player') {
      playerDeck.push(opponentCard!);
    } else if (winner === 'Opponent') {
      opponentDeck.push(playerCard!);
    }
    // Empate: ambas as cartas são descartadas (opcional)
  }

  static checkGameOver(playerDeck: card[], opponentDeck: card[]): string | null {
    if (playerDeck.length === 0) return 'Opponent';
    if (opponentDeck.length === 0) return 'Player';
    return null;
  }
}
