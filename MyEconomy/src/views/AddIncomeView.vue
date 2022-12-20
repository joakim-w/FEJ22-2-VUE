<template>
  <div class="center-view">
    <Block class="text-center">
      <InfoButton>
        <p>Här lägger du till dina inkomster netto (efter skatt)</p>
        <p class="mt-1">Det här kan vara saker som lön, barnbidrag, bostadsbidrag eller andra typer av inkomster</p>
      </InfoButton>
      <h1 class="mb-4">Lägg till inkomst</h1>
      <form @submit.prevent="handleSubmit">
        <div class="input-group mb-3">
          <label for="name" class="mb-1">Namn på inkomsten</label>
          <input type="text" id="name" class="form-control" v-model="formData.name">
        </div>
        <div class="input-group mb-3">
          <label for="amount" class="mb-1">Summa</label>
          <input type="number" id="amount" class="form-control" v-model="formData.amount">
        </div>
        <button class="btn form-btn">Lägg till</button>
      </form>
      <button class="btn form-btn dark-btn mt-2" @click="goBack">Avbryt</button>
    </Block>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Block from '../components/Block.vue'
import InfoButton from '../components/InfoButton.vue';
import { useIncomeStore } from '../stores/incomes';

const router = useRouter()
const incomesStore = useIncomeStore()

const formData = ref({
  name: '',
  amount: ''
})

const handleSubmit = async () => {
  await incomesStore.addIncome(formData.value)

  router.push({ name: 'income' })
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>

</style>