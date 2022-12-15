import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth, db } from '../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const useExpensesStore = defineStore('expenses', () => {

  const savings = ref({ name: 'Sparande', amount: 0 })

  // hämtade expenses direkt från databasen
  const user = ref(auth.currentUser)
  const exp = ref([])

  const expenses = computed(() => {
    return exp.value.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  })

  const totalExpenses = computed(() => {
    let total = 0
    exp.value.forEach(item => total += item.amount)
    return total
  })

  const uniqueCategories = computed(() => {
    const arrayOfCategories = exp.value.map(item => (item.category))
    const setOfCategories = new Set()
    arrayOfCategories.forEach(cat => {
      setOfCategories.add(cat)
    })

    return Array.from(setOfCategories).sort()
  })

  const getExpenses = async () => {
    user.value = auth.currentUser
    if(!user.value) {
      console.log('no user')
      // getExpenses()
      return
    }

    exp.value = []

    const colRef = collection(db, 'expenses')
    const q = query(colRef, where('userId', '==', user.value.uid))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      exp.value.push({id: doc.id, ...doc.data()})
    })
  }

  return { savings, expenses, uniqueCategories, getExpenses, totalExpenses }
})