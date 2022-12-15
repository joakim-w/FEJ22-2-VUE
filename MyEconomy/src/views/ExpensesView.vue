<template>
  <Block class="h-100 text-center">
    <h1>Mina utgifter</h1>
    <HealthPartial />

    <p class="h1 mt-5">Totala utgifter</p>
    <p class="h1">{{totalExpenses}}</p>

    <!-- Savings -->

    <div class="mt-2 text-start" v-for="cat in uniqueCategories" :key="cat">
      <p class="text-bold mb-1">{{ cat }}</p>
      <div v-for="item in expenses" :key="item.id">
        <p v-if="item.category === cat">{{item.name}}</p>
      </div>
    </div>
  </Block>
</template>

<script setup>
import Block from '../components/Block.vue';
import HealthPartial from '../components/HealthPartial.vue';
import { useExpensesStore } from '@/stores/expenses'
import { storeToRefs } from 'pinia';

const expensesStore = useExpensesStore()
expensesStore.getExpenses()
const { savings, expenses, uniqueCategories, totalExpenses } = storeToRefs(expensesStore)

</script>

<style scoped>

</style>