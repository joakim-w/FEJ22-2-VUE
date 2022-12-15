<template>
  <div class="center-view">
    <Block class="text-center">
      <h1>Registrera nytt konto</h1>
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
        <div class="input-group mb-3">
          <label for="repeatPassword">Repetera Lösenord: </label>
          <input type="password" class="form-control" id="repeatPassword" v-model="userCredentials.repeatPassword">
        </div>
        <p class="h3 mb-3">Redan medlem? <RouterLink to="/login">Logga in</RouterLink> istället</p>
        <button class="btn form-btn mb-2">Registrera</button>
        <button type="button" class="btn form-btn google-btn">
          <div class="img-container"><img :src="googleImg" alt="google icon"></div>
          <p>Registrera med google</p>
        </button>
      </form>

    </Block>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import googleImg from '../assets/img/google.png'
  import Block from '../components/Block.vue'

  const userCredentials = ref({
    email: '',
    password: '',
    repeatPassword: ''
  })

  const handleSubmit = () => {}

</script>

<style scoped>

</style>