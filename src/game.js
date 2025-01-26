/* eslint-disable */
import { io } from "socket.io-client";

class GameClient {
  constructor() {
    // Empty constructor
  }

  connect() {
    const uri = process.env.VUE_APP_SERVER_URI;
    console.log("GameClient -> uri", uri);
    this.socket = io(uri, {
      withCredentials: true,
    });

    this.socket.on("connected", (data) => {
      console.log("connected: ", data.message);
    });

    this.socket.on("update", (data) => {
      try {
        console.log("Game state updated:", data.state);
        this.updateGameState(data.state);
      } catch (error) {
        console.error("Error handling 'update' event:", error);
      }
    });

    this.socket.on("gameOver", (data) => {
      try {
        console.log("gameOver: ", data.message);
        this.handleGameOver(data.message);
      } catch (error) {
        console.error("Error handling 'gameOver' event:", error);
      }
    });
  }

  startTurn() {
    console.log("Sending startTurn to server");
    try {
      this.socket.emit("startTurn");
    } catch (error) {
      console.error("Error emitting 'startTurn' event:", error);
    }
  }

  selectCard(index) {
    console.log(`Sending selectCard with index: ${index}`);
    try {
      this.socket.emit("selectCard", { index });
    } catch (error) {
      console.error("Error emitting 'selectCard' event:", error);
    }
  }

  updateGameState(state) {
    this.playerHand = state.playerHand;
    this.opponentHand = state.opponentHand;
  }

  handleGameOver(message) {
    console.log("Game Over:", message);
  }
}

const gameClient = new GameClient();
export { gameClient };
