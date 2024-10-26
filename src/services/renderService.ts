import { card } from '../models/card';

export class renderService {
renderPlayerHand(playerHand: card[], playerDeck: card[], playerPlayCallback: (index: number) => void) {
  const playerHandContainer = document.getElementById("player-hand")!;
  const playerDeckContainer = document.getElementById("playerDeckDiv")!;
  
  playerHandContainer.innerHTML = "";

  playerHand.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card js-tilt";
    cardDiv.innerHTML = `
      <div class="card-content" style="background-image: url('${card.art}')">
        <div class="card-header"><span class="card-number">${card.name} #${card.number}</span></div>
        <div class="card-stats">
          <p>Força: ${card.strength}</p>
          <p>Magia: ${card.magic}</p>
          <p>Fogo: ${card.fire}</p>
        </div>
      </div>`;
    cardDiv.onclick = () => playerPlayCallback(index);

    this.animateCardFromDeckToHand(cardDiv, playerDeckContainer, playerHandContainer);
  });

  $('.js-tilt').tilt({ scale: 1.2, maxTilt: 15, speed: 800, glare: true, maxGlare: 0.3 });
  this.renderDeck(playerDeck, "playerDeckDiv");
}

renderOpponentHand(opponentHand: card[], opponentDeck: card[]) {
  const opponentHandContainer = document.getElementById("opponent-hand")!;
  const opponentDeckContainer = document.getElementById("opponentDeckDiv")!;

  opponentHandContainer.innerHTML = "";

  opponentHand.forEach(() => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.innerHTML = `<img src="images/card-back.png" alt="Card Back" class="card-art">`;

    this.animateCardFromDeckToHand(cardDiv, opponentDeckContainer, opponentHandContainer);
  });

  this.renderDeck(opponentDeck, "opponentDeckDiv");
}

animateCardFromDeckToHand(cardElement: HTMLElement, deckContainer: HTMLElement, handContainer: HTMLElement) {
  const deckRect = deckContainer.getBoundingClientRect();
  cardElement.style.position = 'absolute';
  cardElement.style.left = `${deckRect.left}px`;
  cardElement.style.top = `${deckRect.top}px`;
  cardElement.style.opacity = '0';

  document.body.appendChild(cardElement);

  const handRect = handContainer.getBoundingClientRect();
  setTimeout(() => {
    cardElement.style.transition = 'all 0.5s ease'; 
    cardElement.style.left = `${handRect.left + handContainer.childElementCount * 120}px`;
    cardElement.style.top = `${handRect.top}px`;
    cardElement.style.opacity = '1';

    setTimeout(() => {
      cardElement.style.position = '';
      cardElement.style.left = '';
      cardElement.style.top = '';
      cardElement.style.transition = '';
      handContainer.appendChild(cardElement);
    }, 500);
  }, 10);
}

  renderDeck(deck: card[], deckDivName: string) { 
    const deckContainer = document.getElementById(deckDivName)!;
    deckContainer.innerHTML = "";

    const deckDiv = document.createElement("div");
    deckDiv.className = "card";
    deckDiv.innerHTML = `
      <div class="card-content" style="background-image: url('images/card-back.png')">
        <div class="card-header"><span class="card-number">${deck.length}</span></div>
      </div>`;

    deckContainer.appendChild(deckDiv);
  }

  updateBoard(card: card, player: string) {
    const boardContainer = document.getElementById("game-board")!;
    const cardDiv = document.createElement("div");
    cardDiv.className = "card js-tilt";
    cardDiv.innerHTML = `
      <div class="card-content" style="background-image: url('${card.art}')">
        <div class="card-header"><span class="card-number">(${player}) #${card.number}</span></div>
        <div class="card-stats">
          <p>Força: ${card.strength}</p>
          <p>Magia: ${card.magic}</p>
          <p>Fogo: ${card.fire}</p>
        </div>
      </div>`;
    boardContainer.appendChild(cardDiv);

    if(player != "Player"){
      const boardDivisor = document.createElement("div");
      boardDivisor.className = "divider";
      boardDivisor.innerHTML = "";
      boardContainer.appendChild(boardDivisor);
    }
  }

  showEndGameScreen(message: String){
    alert(message);
  }
}
