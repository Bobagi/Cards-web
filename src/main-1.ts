// interface Card {
//   suit: string;  // "hearts", "diamonds", "clubs", "spades"
//   value: string; // "A", "2", "3", ..., "K"
// }

// class GameFrenchDeck {
//   private playerHand: Card[] = [];
//   private opponentHand: Card[] = [];
//   private deck: Card[] = [];

//   constructor() {
//     this.createDeck();
//     this.shuffleDeck();
//     this.dealCards(5);
//     this.renderHands();
//   }

//   createDeck() {
//     const suits = ["hearts", "diamonds", "clubs", "spades"];
//     const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
//     this.deck = [];

//     for (let suit of suits) {
//       for (let value of values) {
//         this.deck.push({ suit, value });
//       }
//     }
//   }

//   shuffleDeck() {
//     this.deck = this.deck.sort(() => Math.random() - 0.5);
//   }

//   dealCards(num: number) {
//     this.playerHand = this.deck.slice(0, num);
//     this.opponentHand = this.deck.slice(num, num * 2);
//   }

//     renderHands() {
//         const playerHandContainer = document.getElementById("player-hand")!;
//         const opponentHandContainer = document.getElementById("opponent-hand")!;
//         playerHandContainer.innerHTML = "<h2>Player's Hand</h2>";
//         opponentHandContainer.innerHTML = "<h2>Opponent's Hand</h2>";

//         // Render player hand with clickable cards
//         this.playerHand.forEach((card, index) => {
//             const cardDiv = document.createElement("div");
//             cardDiv.className = "card js-tilt"; // Add the 'js-tilt' class
//             cardDiv.setAttribute("data-tilt", ""); // Add the 'data-tilt' attribute
//             cardDiv.textContent = `${card.value} of ${card.suit}`;
//             cardDiv.onclick = () => this.playerPlay(index); // Click event to play card
//             playerHandContainer.appendChild(cardDiv);
//         });

//         // Render opponent hand (cards face down)
//         this.opponentHand.forEach(() => {
//             const cardDiv = document.createElement("div");
//             cardDiv.className = "card"; // No tilt for opponent cards
//             cardDiv.textContent = "???"; // Cards face down
//             opponentHandContainer.appendChild(cardDiv);
//         });

//         $('.js-tilt').tilt({
//             scale: 1.2,
//             maxTilt: 15,
//             speed: 400,
//             glare: false,
//             "max-glare": 0.5
//         });
//     }

//   playerPlay(cardIndex: number) {
//     const card = this.playerHand.splice(cardIndex, 1)[0];
//     if (card) {
//       console.log(`Player played: ${card.value} of ${card.suit}`);
//       this.updateBoard(card, "Player");
//       this.opponentPlay(); // After the player plays, opponent plays automatically
//     }
//     this.renderHands(); // Re-render the player's hand after playing a card
//   }

//   opponentPlay() {
//     const card = this.opponentHand.pop(); // Opponent plays the last card in its hand
//     if (card) {
//       console.log(`Opponent played: ${card.value} of ${card.suit}`);
//       this.updateBoard(card, "Opponent");
//     } else {
//       console.log("Opponent has no cards left!");
//     }
//   }

//   updateBoard(card: Card, player: string) {
//     const boardContainer = document.getElementById("game-board")!;
//     const cardDiv = document.createElement("div");
//     cardDiv.className = "card";
//     cardDiv.textContent = `${card.value} of ${card.suit} (${player})`;
//     boardContainer.appendChild(cardDiv);
//   }

//   tiltCard(event: MouseEvent, cardDiv: HTMLElement) {
//     const rect = cardDiv.getBoundingClientRect();
//     const x = event.clientX - rect.left; // Mouse X position relative to the card
//     const y = event.clientY - rect.top;  // Mouse Y position relative to the card
//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;

//     const rotateX = (y - centerY) / 10; // Rotation around X axis (up/down tilt)
//     const rotateY = (centerX - x) / 10; // Rotation around Y axis (left/right tilt)

//     cardDiv.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
//   }

//   resetTilt(cardDiv: HTMLElement) {
//     cardDiv.style.transform = `rotateX(0deg) rotateY(0deg)`; // Reset the tilt
//   }
// }

// const gameFrenchDeck = new GameFrenchDeck();
