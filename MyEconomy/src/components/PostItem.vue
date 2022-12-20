<template>
  <div class="d-flex justify-between align-center mb-1">
    <div class="d-flex justify-between align-center w-50">
      <div class="d-flex">
        <p class="mr-1">{{item.name}}</p>
        <InfoButton v-if="item.name === 'Sparande'">
          <p>Det här inkluderar alla typer av sparande så som pensionssparande, fonder eller sparande på sparkonto</p>
          <p class="mt-1">Detta är även inkluderat i dina utgifter</p>
        </InfoButton>
      </div>
      <div class="d-flex">
        <i v-if="item.name !== 'Sparande'" class="fa-solid fa-pen" @click="showEditItem = true"></i>
        <i v-if="item.name !== 'Sparande'" class="fa-solid fa-trash" @click="showRemoveItem = true"></i>
      </div>
    </div>
    <p>{{ item.amount }}</p>

    <Modal :visible="showEditItem" @close="showEditItem = false">
      <form class="p-2" @submit.prevent="handleSubmit">
        <p class="text-center h3 mb-2">{{ item.name }}</p>
        <div class="input-group mb-2">
          <label for="amount" class="mb-1">Ny Summa</label>
          <input type="number" v-model="newAmount" class="form-control">
        </div>
        <button class="btn form-btn mb-2">Spara</button>
        <button type="button" @click="showEditItem = false" class="btn form-btn">Avbryt</button>
      </form>
    </Modal>
    <Modal :visible="showRemoveItem" @close="showRemoveItem = false">
      <div class="p-2">
        <p class="text-center h3 mb-2">Är du säker på att du vill ta bort {{ item.name }}?</p>
        <button class="btn form-btn mb-2" @click="handleRemove">Ta bort</button>
        <button type="button" @click="showRemoveItem = false" class="btn form-btn">Avbryt</button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import InfoButton from './InfoButton.vue';
import { ref } from 'vue'
import Modal from './Modal.vue';
import { useExpensesStore } from '@/stores/expenses'
import { useIncomeStore } from '../stores/incomes';

const expensesStore = useExpensesStore()
const incomesStore = useIncomeStore()

  const props = defineProps({
    item: {
      type: Object,
      default: null
    },
    isIncome: {
      type: Boolean,
      default: false
    }
  })

  const showEditItem = ref(false)
  const showRemoveItem = ref(false)

  const newAmount = ref('')



  const handleSubmit = async () => {
    if(props.isIncome) {
      // hatera uppdatering av inkomst
      await incomesStore.updateIncome(props.item, newAmount.value)
    } else {
      await expensesStore.updateExpense(props.item, newAmount.value)
    }

    // showEditItem.value = false
  }
  const handleRemove = async () => {
    if(props.isIncome) {
      // hatera borttagning av inkomst
      await incomesStore.removeIncome(props.item.id)
    } else {
      await expensesStore.removeExpense(props.item.id)
    }

    showRemoveItem.value = false
  }


</script>

<style scoped>
  .fa-solid {
    font-size: 1.1rem;
    cursor: pointer;
    margin-left: .7rem;
  }
  .fa-pen {
    color: #41706f;
  }
  .fa-trash {
    color: #673c3c;
  }
</style>