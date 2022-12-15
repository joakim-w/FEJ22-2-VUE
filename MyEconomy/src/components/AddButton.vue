<template>
  <button class="add" @click="$emit('click')">
    <i class="fa-solid fa-plus"></i>
  </button>
</template>

<script setup>
  defineEmits(['click'])
</script>

<style scoped>
  .add {
    position: absolute;
    top: .6rem;
    right: .8rem;
    font-size: 2rem;
    background-color: transparent;
    border: 0;
    outline: none;
    cursor: pointer;
  }
</style>