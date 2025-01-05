// @ts-nocheck
import { io } from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

class GameClient {
  constructor() {
    const uri =
      `${process.env.SERVER_URI}:${process.env.PORT_SERVER}` ||
      "http://localhost:3050";

    console.log('GameClient -> uri', uri);
    this.socket = io(uri);

    this.socket.on("connected", (data) => {
      console.log(data.message);
    });

    this.socket.on("update", (data) => {
      console.log("Game state updated:", data.state);
      this.updateGameState(data.state);
    });

    this.socket.on("gameOver", (data) => {
      console.log(data.message);
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
  }
}

export default GameClient;
