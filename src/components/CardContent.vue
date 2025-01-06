<template>
  <div
    class="card"
    :class="{ 'opponent-card': isOpponent }"
  >
    <div
      class="card-content"
      :style="{ backgroundImage: `url('${card.art}')`, position: 'relative' }"
    >
      <div
        class="card-overlay"
        :style="{ backgroundImage: `url('images/card_template.png')` }"
      ></div>
      <div class="card-header">
        <span class="card-number">{{ card.name }} #{{ card.number }}</span>
      </div>
      <div class="card-stats">
        <div
          v-for="(value, stat) in cardStats"
          :key="stat"
          class="stat-icon"
          :data-stat="stat"
          :data-stat-value="value"
          @click="onStatClick(stat)"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
    isOpponent: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardStats() {
      const { magic, strength, fire } = this.card;
      return { magic, strength, fire };
    },
  },
  methods: {
    onStatClick(stat) {
      this.$emit("select-ability", stat);
    },
  },
};
</script>

<style scoped>
.card {
  width: 100px; /* Ajuste conforme necessário */
  height: 140px; /* Ajuste conforme necessário */
  border: 1px solid black;
  cursor: pointer;
  user-select: none;
}

.card-content {
  width: 100%;
  height: 100%;
  background-size: cover;
  position: relative;
}

.card-overlay {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
}

.card-header {
  padding: 5px;
  text-align: center;
}

.card-stats {
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
}

.stat-icon {
  width: 20px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
}

.opponent-card .card-content {
  background-image: url("../assets/images/card_back.png");
}
</style>