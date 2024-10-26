import { card } from '../models/card';

export class renderService {
  renderHands(playerHand: card[], botHand: card[], playerPlayCallback: (index: number) => void) {
    const playerHandContainer = document.getElementById("player-hand")!;
    const botHandContainer = document.getElementById("bot-hand")!;
    playerHandContainer.innerHTML = "";
    botHandContainer.innerHTML = "";

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
      playerHandContainer.appendChild(cardDiv);
    });

    botHand.forEach(() => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.innerHTML = `<img src="images/card-back.png" alt="card Back" class="card-art">`;
      botHandContainer.appendChild(cardDiv);
    });

    $('.js-tilt').tilt({ scale: 1.2, maxTilt: 15, speed: 800, glare: true, maxGlare: 0.3 });
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
  }

  showEndGameScreen(message: String){
    alert(message);
  }
}
