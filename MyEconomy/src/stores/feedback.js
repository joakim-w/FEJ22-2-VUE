import { defineStore, storeToRefs } from "pinia";
import { computed } from "vue";
import { useExpensesStore } from "./expenses";
import { useIncomeStore } from "./incomes";



export const useFeedbackStore = defineStore('feedback', () => {

  const expesesStore = useExpensesStore()
  const incomesStore = useIncomeStore()

  const { totalIncome } = storeToRefs(incomesStore)
  const { totalExpenses } = storeToRefs(expesesStore)

  const overUnder = computed(() => {
    return totalIncome.value - totalExpenses.value
  })

  const health = computed(() => {
    // -4k till 0 - health = 0-20
    // 0 till 4k - health = 20-40
    // 4k till 16k  - health = 40-100

    // allt under -4k är 0
    // allt över 14k är 100

    let healthValue = overUnder.value / 200 + 20

    if(healthValue > 100) healthValue = 100
    if(healthValue < 0) healthValue = 0

    return healthValue
  })

  const feedback = computed(() => {
    if(health.value < 20) return 'Ajdå, inte bra!'
    if(health.value >= 20 && health.value < 40) return 'Det skulle kunna vara bättre'
    if(health.value >= 40) return 'BRA!'
  })


  const recommendedSavings = computed(() => {
    return totalIncome.value * 0.10
  })

  return { overUnder, health, feedback, recommendedSavings }
})