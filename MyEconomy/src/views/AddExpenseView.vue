<template>
  <div class="center-view">
    <Block>
      <h1 class="mb-4">Lägg till utgift</h1>
      <form @submit.prevent="handleSubmit">
        <div class="input-group mb-3">
          <label for="name" class="mb-1">Namn på utgiften</label>
          <input type="text" autocomplete="off" id="name" required class="form-control" v-model="formData.name">
        </div>
        <div class="input-group mb-1">
          <div class="d-flex align-center">
            <label for="category" class="mb-1">Kategori</label>
            <InfoButton>
              <p>Det här är vad dina utgifter kommer att sorteras efter.</p>
              <p class="mt-1">Alla dina tidigare kategorier finns att välja i listan nedan. Vill du skapa en ny kategori så trycker du på plus ikonen under.</p>
            </InfoButton>
          </div>
          <select :disabled="newCategory" id="category" class="form-control" v-model="formData.category">
            <option value="" disabled seleted></option>
            <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div class="d-flex justify-between mb-3" @click="newCategory = true">
          <p>lägg till ny kategori</p>
          <i class="fa-solid fa-plus"></i>
        </div>
        <div class="input-group mb-3" v-if="newCategory">
          <label for="newCategory" class="mb-1">Ny Kategori</label>
          <div class="d-flex align-center">
            <input type="text" required id="newCategory" autocomplete="off" class="form-control" v-model="newCategoryValue">
            <i class="fa-solid fa-xmark" v-if="uniqueCategories.length" @click="newCategory = false"></i>
          </div>
        </div>
        <div class="input-group mb-3">
          <label for="amount" class="mb-1">Summa</label>
          <input type="number" autocomplete="off" required id="amount" v-model="formData.amount" class="form-control">
        </div>
        <button class="btn form-btn">Lägg till</button>
      </form>
      <button class="btn form-btn dark-btn mt-2" @click="goBack">Avbryt</button>
    </Block>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Block from '../components/Block.vue';
import InfoButton from '../components/InfoButton.vue';
import { useExpensesStore } from '../stores/expenses'

const expensesStore = useExpensesStore()
const { uniqueCategories } = storeToRefs(expensesStore)

const router = useRouter()

const newCategory = ref(false)
if(!uniqueCategories.value.length) {
  newCategory.value = true
}

const newCategoryValue = ref('')
const formData = ref({
  name: '',
  category: '',
  amount: ''
})

const handleSubmit = async () => {
  if(newCategory.value) {
    formData.value.category = newCategoryValue.value
  }

  await expensesStore.addExpense(formData.value)
  
  router.push({ name: 'expenses' })

}


const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
  .fa-plus {
    font-size: 1.4rem;
  }
  .fa-xmark {
    font-size: 1.7rem;
    color: #cb2d2d;
    cursor: pointer;
    margin-left: 1rem;
  }
</style>