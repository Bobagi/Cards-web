import { io } from "socket.io-client";

class GameClient {
  constructor() {
    const uri = `${process.env.VUE_APP_SERVER_URI}:${process.env.VUE_APP_PORT_SERVER}`;

    console.log("GameClient -> uri", uri);
    this.socket = io(uri, {
      withCredentials: true,
    });

    this.socket.on("connected", (data) => {
      console.log("connected: ", data.message);
    });

    this.socket.on("update", (data) => {
      console.log("Game state updated:", data.state);
      this.updateGameState(data.state);
    });

    this.socket.on("gameOver", (data) => {
      console.log("gameOver: ", data.message);
      this.handleGameOver(data.message);
    });
  }

  startTurn() {
    console.log("Sending startTurn to server");
    this.socket.emit("startTurn");
  }

  selectCard(index) {
    console.log(`Sending selectCard with index: ${index}`);
    this.socket.emit("selectCard", { index });
  }

  updateGameState(state) {
    this.playerHand = state.playerHand;
    this.opponentHand = state.opponentHand;
  }

  handleGameOver(message) {
    console.log("Game Over:", message);
    // Aqui você pode, por exemplo, exibir um modal de fim de jogo.
  }
}

const gameClient = new GameClient();
export { gameClient };
