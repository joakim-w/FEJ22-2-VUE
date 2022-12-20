<template>
  <HamburgerBar v-if="showMenu" @open="visible = !visible" />
  <NavMenu v-if="showMenu" :visible="visible" @close="visible = !visible" />
  <RouterView />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
  import HamburgerBar from './components/HamburgerBar.vue'
  import NavMenu from './components/NavMenu.vue';

  import { useIncomeStore } from './stores/incomes';
  import { useExpensesStore } from './stores/expenses';

  const incomesStore = useIncomeStore()
  const expensesStore = useExpensesStore()

  incomesStore.getIncomes()
  expensesStore.getExpenses()

  const route = useRoute()
  const visible = ref(false)

  const showMenu = computed(() => {
    if(route.path === '/login' || route.path === '/register') {
      return false
    }
    return true
  })

</script>

<style scoped>

</style>