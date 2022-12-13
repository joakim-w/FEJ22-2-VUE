<template>
  <button class="burger" @click="$emit('open')">
    <i class="fa-solid fa-bars"></i>
  </button>
</template>

<script setup>

</script>

<style scoped>
  .burger {
    position: absolute;
    top: .6rem;
    left: .6rem;
    font-size: 2rem;
    background-color: transparent;
    border: 0;
    outline: none;
  }
</style>