<template>
  <HamburgerBar @open="visible = !visible" />
  <NavMenu :visible="visible" @close="visible = !visible" />
  <RouterView />
</template>

<script setup>
import { ref } from 'vue'
  import HamburgerBar from './components/HamburgerBar.vue'
  import NavMenu from './components/NavMenu.vue';

  const visible = ref(false)
</script>

<style scoped>

</style>