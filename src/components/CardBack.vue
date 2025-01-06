<template>
  <div class="card">
    <div
      class="card-content"
      :style="{ backgroundImage: `url('../assets/images/card_back.png')` }"
    >
      <div class="card-header">
        <span class="card-number">{{ count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  width: 100px;
  height: 140px;
  border: 1px solid black;
  cursor: pointer;
}
.card-content {
  width: 100%;
  height: 100%;
  background-size: cover;
  position: relative;
}
</style>