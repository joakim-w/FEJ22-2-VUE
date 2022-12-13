<template>
  <Teleport to="#modals">
    <Transition name="modal-outer">
      <div class="modal-bg" v-show="visible" @click.self="$emit('close')">

        <Transition name="modal-inner">
          <div v-if="visible" class="modal block">
            <slot />
          </div>
        </Transition>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  defineEmits(['close'])
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
  .modal-outer-enter-active,
  .modal-outer-leave-active {
    transition: opacity 300ms cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }

  .modal-outer-enter-from,
  .modal-outer-leave-to {
    opacity: 0;
  }

  .modal-inner-enter-active {
    transition: all 300ms cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s
  }
  .modal-inner-leave-active {
    transition: all 300ms cubic-bezier(0.52, 0.02, 0.19, 1.02)
  }
  .modal-inner-enter-from {
    opacity: 0;
    scale: 0.8;
  }
  .modal-inner-leave-to {
    scale: 0.8;
  }

</style>