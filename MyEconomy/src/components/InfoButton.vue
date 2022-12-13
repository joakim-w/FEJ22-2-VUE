<template>
  <div class="info-btn">
    <i class="fa-solid fa-circle-info" @click="modalOpen = true"></i>
    <Modal :visible="modalOpen" @close="modalOpen = !modalOpen">
      <div class="p-1">
        <slot />
        <button class="btn form-btn mt-2" @click="modalOpen = false">ok</button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue';

const modalOpen = ref(true)

</script>

<style scoped>

</style>