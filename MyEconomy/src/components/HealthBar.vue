<template>
  <div class="health-bar">
    <div class="bar red"></div>
    <div class="bar yellow"></div>
    <div class="bar green"></div>
    <div class="marker" :style="{ left: health + '%' }" ></div>
  </div>
</template>

<script setup>
  defineProps({
    health: {
      type: Number,
      default: 0
    }
  })
</script>

<style scoped>
  .health-bar {
    display: flex;
    position: relative;
    gap: 3px;
  }
  .bar {
    background-color: #cccccc;
    height: 30px;
    width: 100%;
  }
  .red {
    flex: 1;
    background-color: var(--clr-red);
  }
  .yellow {
    flex: 1;
    background-color: var(--clr-yellow);
  }
  .green {
    flex: 3;
    background-color: var(--clr-green);
  }
  .marker {
    position: absolute;
    height: 40px;
    width: 3px;
    background-color: #000;
    top: -5px;
  }
</style>