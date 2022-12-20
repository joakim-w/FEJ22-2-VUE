<template>
  <Teleport to="#menu">
    <Transition name="menu">
      <div class="menu-wrapper" @click.self="$emit('close')" v-if="visible">
        <div class="menu">
          <button @click="logoutUser" class="btn w-100"><i class="fa-solid fa-right-from-bracket"></i> Logga ut</button>
          <RouterLink to="/" @click="$emit('close')" class="btn"><i class="fa-solid fa-house"></i> Startsida</RouterLink>
          <RouterLink to="/income" @click="$emit('close')" class="btn"><i class="fa-solid fa-coins"></i> Inkomster</RouterLink>
          <RouterLink to="/expenses" @click="$emit('close')" class="btn"><i class="fa-solid fa-chart-column"></i> Utgifter</RouterLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

  const emit = defineEmits(['close'])
  defineProps(['visible'])

  const auth = useAuthStore()
  const { error } = storeToRefs(auth)
  const router = useRouter()

  const logoutUser = async () => {
    await auth.logout()
    if(error.value) return

    emit('close')
    router.push({ name: 'login' })
  }
</script>

<style scoped>

  .menu-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background-color: transparent;
  }
  .menu {
    background-color: var(--clr-main-bg);
    width: 50%;
    height: 100vh;
    box-shadow: 4px 0 4px 0 var(--clr-shadow);
  }
  .btn {
    box-shadow: none;
    border-bottom: 1px solid var(--clr-body);
  }

  .menu-enter-active,
  .menu-leave-active {
    transition: all 300ms ease-out;
  }
  .menu-enter-from,
  .menu-leave-to {
    transform: translateX(-100%);
  }
</style>