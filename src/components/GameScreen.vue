<template>
  <div id="game-container">
    <div class="leftTableSide">
      <div style="align-content: center">
        <button id="buttonHistory">Fechar</button>
      </div>
      <fieldset id="history-fieldset" class="fieldset-game-board">
        <div id="history-board" class="game-board"></div>
      </fieldset>
    </div>
    <div class="rightTableSide">
      <div class="hand">
        <div>
          <p>Opponent's hand</p>
        </div>
        <div id="opponent-hand"></div>
        <div id="opponentDeckDiv"></div>
      </div>
      <div id="middle-section" style="display: flex">
        <div>
          <fieldset class="fieldset-game-board">
            <div id="card-board" class="game-board">
              <div id="Player-card-board" class="card-board"></div>
              <div id="Opponent-card-board" class="card-board"></div>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="hand">
        <div>
          <p>Player's hand</p>
        </div>
        <div id="player-hand"></div>
        <div id="playerDeckDiv"></div>
      </div>
    </div>

    <div id="modalMessage" class="modal">
      <div class="modal-content">
        <span class="close-button" id="closeModal" @click="closeModal">&times;</span>
        <h2>Dracomania</h2>
        <p>Iniciar jogo</p>
        <button id="btnStart" @click="startGame">Jogar</button>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import { gameClient } from "./game.js";

export default {
  name: 'GameScreen',
  data() {
    return {
      modalVisible: true,
    };
  },
  mounted() {
    this.modalVisible = true;
  },
  methods: {
    closeModal() {
      this.modalVisible = false;
    },
    startGame() {
      this.modalVisible = false;
      if (gameClient) {
        gameClient.startTurn();
      } else {
        console.error("gameClient não está definido.");
      }
    },
  }
};
</script> -->

<style scoped>
/* Estilos específicos do componente (scoped) */
#game-container {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.leftTableSide, .rightTableSide {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.hand {
  text-align: center;
}

.game-board {
  width: 400px;
  height: 300px;
  border: 1px solid black;
}

.card-board{
  display: flex;
  flex-direction: column;
  gap: 100px;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  margin: auto;
  padding: 20px;
  background-color: white;
  width: 300px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}
</style>