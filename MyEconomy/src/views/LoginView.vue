<template>
  <div class="center-view">
    <Block class="text-center">
      <h1>Logga in</h1>
      <p class="error mt-1">{{ error }}</p>

      <form @submit.prevent="handleSubmit">
        <div class="input-group mb-3">
          <label for="email">Email: </label>
          <input type="text" class="form-control" id="email" v-model="userCredentials.email">
        </div>
        <div class="input-group mb-3">
          <label for="password">Lösenord: </label>
          <input type="password" class="form-control" id="password" v-model="userCredentials.password">
        </div>

        <p class="h3 mb-3">Inte medlem? <RouterLink to="/register">Registrera</RouterLink> dig istället</p>

        <button class="btn form-btn mb-2">Logga in</button>
        <button @click="handleGoogleSignIn" type="button" class="btn form-btn google-btn">
          <div class="img-container"><img :src="googleImg" alt="google icon"></div>
          <p>Logga in med google</p>
        </button>
      </form>

    </Block>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
  import googleImg from '../assets/img/google.png'
  import Block from '../components/Block.vue'
import { useAuthStore } from '../stores/authStore';

  const auth = useAuthStore()
  const { error } = storeToRefs(auth)
  const router = useRouter()

  const userCredentials = ref({
    email: '',
    password: ''
  })

  const handleSubmit = async () => {
    await auth.login(userCredentials.value.email, userCredentials.value.password)
    if(error.value) return

    router.push({ name: 'home' })
  }

  const handleGoogleSignIn = async () => {
    await auth.signInWithGoogle()
    if(error.value) return
    router.push({ name: 'home' })
  }

</script>

<style scoped>

</style>