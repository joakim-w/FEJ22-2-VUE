<template>
  <AddButton @click="showModal = !showModal" />
  <Modal :visible="showModal" @close="showModal = false">
    <button class="btn w-100">Ändra Sparande</button>
    <RouterLink class="btn" to="/add-expense">Lägg till utgift</RouterLink>
  </Modal>
  <Block class="h-100 text-center">
    <h1>Mina utgifter</h1>
    <HealthPartial />

    <p class="h1 mt-5">Totala utgifter</p>
    <p class="h1">{{totalExpenses}}</p>

    <!-- Savings -->
    <PostItem class="text-bold mt-5 mb-5" :item="savings" />

    <div class="mt-2 text-start" v-for="cat in uniqueCategories" :key="cat">
      <p class="text-bold mb-1">{{ cat }}</p>
      <div v-for="item in expenses" :key="item.id">
        <PostItem v-if="item.category === cat" :item="item" />
      </div>
    </div>
  </Block>
</template>

<script setup>
import Block from '../components/Block.vue';
import HealthPartial from '../components/HealthPartial.vue';
import { useExpensesStore } from '@/stores/expenses'
import { storeToRefs } from 'pinia';
import PostItem from '../components/PostItem.vue';
import AddButton from '../components/AddButton.vue';
import { ref } from 'vue'
import Modal from '../components/Modal.vue';

const expensesStore = useExpensesStore()
expensesStore.getExpenses()
const { savings, expenses, uniqueCategories, totalExpenses } = storeToRefs(expensesStore)

const showModal = ref(false)

</script>

<style scoped>

</style>