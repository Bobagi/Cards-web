export class rules {
  static compareCards(playerCard, opponentCard, attribute) {
    const playerValue = playerCard[attribute.type];
    const opponentValue = opponentCard[attribute.type];

    if (playerValue > opponentValue) {
      console.log("Player wins");
      return "Player";
    }
    if (opponentValue > playerValue) {
      console.log("Opponent wins");
      return "Opponent";
    }
    return "Draw";
  }

  static handleRoundOutcome(
    winner,
    playerCard,
    opponentCard,
    playerDeck,
    opponentDeck
  ) {
    if (winner === "Player") {
      playerDeck.push(opponentCard);
    } else if (winner === "Opponent") {
      opponentDeck.push(playerCard);
    }
    // Empate: ambas as cartas são descartadas (opcional)
  }

  static checkGameOver(playerDeck, opponentDeck) {
    if (playerDeck.length === 0) return "Opponent";
    if (opponentDeck.length === 0) return "Player";
    return null;
  }
}
