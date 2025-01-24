<template>
  <div id="game-container">
    <div class="leftTableSide">
      <div style="align-content: center">
        <button
          id="buttonHistory"
          @click="closeHistory"
        >Fechar</button>
      </div>
      <fieldset
        id="history-fieldset"
        class="fieldset-game-board"
      >
        <div
          id="history-board"
          class="game-board"
        ></div>
      </fieldset>
    </div>

    <div class="rightTableSide">
      <div class="hand">
        <div>
          <p>Opponent's hand</p>
        </div>
        <div id="opponent-hand">
          <transition-group
            name="card-animation"
            tag="div"
          >
            <div
              v-for="(card, index) in opponentHand"
              :key="index"
              class="card opponent-card"
            >
              <img
                src="images/card_back.png"
                alt="CardContent Back"
                class="card-art"
              />
            </div>
          </transition-group>
        </div>
        <div id="opponentDeckDiv">
          <CardBack
            v-if="opponentDeck.length > 0"
            :count="opponentDeck.length"
          />
        </div>
      </div>

      <div
        id="middle-section"
        style="display: flex"
      >
        <div>
          <fieldset class="fieldset-game-board">
            <div
              id="card-board"
              class="game-board"
            >
              <div
                id="Player-card-board"
                class="card-board"
              >
                <transition-group
                  name="card-animation"
                  tag="div"
                >
                  <CardContent
                    v-for="card in playerBoard"
                    :key="card.id"
                    :card="card"
                    @select-ability="onSelectAbility"
                  />
                </transition-group>
              </div>
              <div
                id="Opponent-card-board"
                class="card-board"
              >
                <transition-group
                  name="card-animation"
                  tag="div"
                >
                  <CardContent
                    v-for="card in opponentBoard"
                    :key="card.id"
                    :card="card"
                    :is-opponent="true"
                  />
                </transition-group>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="hand">
        <div>
          <p>Player's hand</p>
        </div>
        <div id="player-hand">
          <transition-group
            name="card-animation"
            tag="div"
          >
            <CardContent
              v-for="(card, index) in playerHand"
              :key="card.id"
              :card="card"
              @click="selectCard(index)"
            />
          </transition-group>
        </div>
        <div id="playerDeckDiv">
          <CardBack
            v-if="playerDeck.length > 0"
            :count="playerDeck.length"
          />
        </div>
      </div>
    </div>

    <div
      id="modalMessage"
      class="modal"
      v-if="modalVisible"
    >
      <div class="modal-content">
        <span
          class="close-button"
          @click="closeModal"
        >&times;</span>
        <h2>Dracomania</h2>
        <p>Iniciar jogo</p>
        <button
          id="btnStart"
          @click="startGame"
        >Jogar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { gameClient } from "../game.js";
import CardContent from "./CardContent.vue";
import CardBack from "./CardBack.vue";

export default {
  name: "GameScreen",
  components: {
    CardContent,
    CardBack,
  },
  data() {
    return {
      modalVisible: true,
      playerHand: [],
      opponentHand: [],
      playerDeck: [],
      opponentDeck: [],
      playerBoard: [],
      opponentBoard: [],
    };
  },
  mounted() {
    // O modal é exibido por padrão quando o componente é montado
    gameClient.socket.on("update", (data) => {
      console.log("Game state updated:", data.state);
      this.updateGameState(data.state);
    });
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
    closeHistory() {
      // Implemente a lógica para fechar o histórico aqui
      console.log("Fechando o histórico...");
    },
    updateGameState(state) {
      this.playerHand = state.playerHand;
      this.opponentHand = state.opponentHand;
      this.playerDeck = state.playerDeck;
      this.opponentDeck = state.opponentDeck;
      this.playerBoard = state.playerBoard;
      this.opponentBoard = state.opponentBoard;
    },
    selectCard(index) {
      if (gameClient) {
        gameClient.selectCard(index);
      }
    },
    onSelectAbility(ability) {
      console.log("Selected ability:", ability);
    },
  },
};
</script>

<style scoped>
@import "../css/board.css";

.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  margin: auto;
  padding: 20px;
  background-color: white;
  width: 300px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.card-animation-enter-active,
.card-animation-leave-active {
  transition: all 0.5s ease;
}
.card-animation-enter-from,
.card-animation-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>