interface Card {
  number: number;    // Número da carta
  strength: number;  // Força
  magic: number;     // Magia
  fire: number;      // Fogo
  art: string;       // Caminho da arte (imagem)
  name: string;      // Nome ou título da carta
}

class Game {
  private playerHand: Card[] = [];
  private botHand: Card[] = [];
  private deck: Card[] = [];

  constructor() {
    this.createDeck();
    this.shuffleDeck();
    this.dealCards(2);
    this.renderHands();
  }

  createDeck() {
    this.deck = [
      { number: 1, strength: 10, magic: 5, fire: 3, art: 'images/1.png', name: 'Dragão Mestre' },
      { number: 2, strength: 6, magic: 8, fire: 2, art: 'images/2.png', name: 'Dragão Dourado' },
      { number: 3, strength: 10, magic: 5, fire: 3, art: 'images/3.png', name: 'Dragão Prateado' },
      { number: 4, strength: 6, magic: 8, fire: 2, art: 'images/4.png', name: 'Dragão Cobre' },
      // Continue criando mais cartas
    ];
  }

  shuffleDeck() {
    this.deck = this.deck.sort(() => Math.random() - 0.5);
  }

  dealCards(num: number) {
    this.playerHand = this.deck.slice(0, num);
    this.botHand = this.deck.slice(num, num * 2);
  }

  renderHands() {
    const playerHandContainer = document.getElementById("player-hand")!;
    const botHandContainer = document.getElementById("bot-hand")!;
    playerHandContainer.innerHTML = "<p></p>";
    botHandContainer.innerHTML = "<p></p>";

    // Render player hand with customized cards
    this.playerHand.forEach((card, index) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card js-tilt";

      cardDiv.innerHTML = `
        <div class="card-content" style="background-image: url('${card.art}')">
          <div class="card-header">
            <span class="card-number">#${card.number}</span>
          </div>
          <div class="card-stats">
            <p>Força: ${card.strength}</p>
            <p>Magia: ${card.magic}</p>
            <p>Fogo: ${card.fire}</p>
          </div>
        </div>
      `;

      cardDiv.onclick = () => this.playerPlay(index);
      playerHandContainer.appendChild(cardDiv);
    });

    // Render bot hand (cards face down with back art)
    this.botHand.forEach(() => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.innerHTML = `<img src="images/card-back.png" alt="Card Back" class="card-art">`;
      botHandContainer.appendChild(cardDiv);
    });

    $('.js-tilt').tilt({
      scale: 1.2,     
      maxTilt: 15,      
      speed: 800,       
      glare: false,    
      "max-glare": 0.5
    });
  }

  playerPlay(cardIndex: number) {
    const card = this.playerHand.splice(cardIndex, 1)[0];
    this.updateBoard(card, "Player");
    this.botPlay(); // Depois da jogada do jogador, o bot joga
    this.renderHands();
  }

  botPlay() {
    const card = this.botHand.pop();
    if (card) {
      this.updateBoard(card, "Bot");
    }
  }

  updateBoard(card: Card, player: string) {
    const boardContainer = document.getElementById("game-board")!;
    const cardDiv = document.createElement("div");
    cardDiv.className = "card js-tilt";

    cardDiv.innerHTML = `
      <div class="card-content" style="background-image: url('${card.art}')">
        <div class="card-header">
          <span class="card-number">(${player}) #${card.number}</span>
        </div>
        <div class="card-stats">
          <p>Força: ${card.strength}</p>
          <p>Magia: ${card.magic}</p>
          <p>Fogo: ${card.fire}</p>
        </div>
      </div>
    `;

    boardContainer.appendChild(cardDiv);
  }

}

const game = new Game();
