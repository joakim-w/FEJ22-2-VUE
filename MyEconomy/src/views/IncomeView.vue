<template>
  <AddButton @click="addToIncome" />
  <Block class="h-100 text-center">
    <h1>Min inkomster</h1>
    <HealthPartial />

    <p class="h1 mt-5">Total inkomst</p>
    <p class="h1">{{ totalIncome }}</p>

    <div class="mt-5">
      <PostItem v-for="item in incomes" :isIncome="true" :key="item.id" :item="item" />
    </div>
  </Block>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import AddButton from '../components/AddButton.vue';
import Block from '../components/Block.vue'
import HealthPartial from '../components/HealthPartial.vue';
import PostItem from '../components/PostItem.vue';

import { useIncomeStore } from '../stores/incomes';

const incomesStore = useIncomeStore()
const { incomes, totalIncome } = storeToRefs(incomesStore)

const router = useRouter()

const addToIncome = () => {
  router.push({ name: 'addIncome' })
}

</script>

<style scoped>

</style>