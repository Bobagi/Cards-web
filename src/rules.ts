import { card } from './models/card';

export class rules {
  static compareCards(playerCard: card, botCard: card, attribute: 'strength' | 'magic' | 'fire'): string {
    const playerValue = playerCard[attribute];
    const botValue = botCard[attribute];

    if (playerValue > botValue){
      alert('Player wins');
      return 'Player';
    }
    if (botValue > playerValue){
      alert('Opponent wins');
      return 'Bot';
    }
    return 'Draw';
  }

  static handleRoundOutcome(
    winner: string,
    playerCard: card,
    botCard: card,
    playerDeck: card[],
    botDeck: card[]
  ) {
    if (winner === 'Player') {
      playerDeck.push(botCard!);
    } else if (winner === 'Bot') {
      botDeck.push(playerCard!);
    }
    // Empate: ambas as cartas são descartadas (opcional)
  }

  static checkGameOver(playerDeck: card[], botDeck: card[]): string | null {
    if (playerDeck.length === 0) return 'Bot';
    if (botDeck.length === 0) return 'Player';
    return null;
  }
}
