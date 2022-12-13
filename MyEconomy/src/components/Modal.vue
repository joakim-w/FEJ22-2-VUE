<template>
  <Teleport to="#modals">
    <div class="modal-bg" v-show="visible">
      <div v-if="visible" class="modal block">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
  defineProps({
    visible: {
      type: Boolean,
      default: true
    }
  })
</script>

<style scoped>
  .modal {
    width: 70%;
    max-width: 500px;
    margin: 3rem auto;
    padding: 0;
  }
</style>