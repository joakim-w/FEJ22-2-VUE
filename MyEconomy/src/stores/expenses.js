import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth, db } from '../firebase/config'
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'

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
    total += savings.value.amount
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

  const getSavings = async () => {
    const colRef = collection(db, 'savings')
    const q = query(colRef, where('userId', '==', user.value.uid))

    const querySnapshot = await getDocs(q)
    if(!querySnapshot.docs.length) {
      console.log('no doc found')
      savings.value.amount = 0
      return
    }

    querySnapshot.forEach(doc => savings.value = {id: doc.id, ...doc.data()})

  }

  const updateSavings = async (_amount) => {
    const savingsRef = doc(db, 'savings', savings.value.id)
    try {
      await updateDoc(savingsRef, {amount: _amount})
      savings.value.amount = _amount
    } catch (err) {
      console.log(err)
    }
  }
  const updateExpense = async (item, _amount) => {
    const expenseRef = doc(db, 'expenses', item.id)
    try {
      await updateDoc(expenseRef, {amount: _amount})
      getExpenses()
    } catch (err) {
      console.log(err)
    }
  }

  const removeExpense = async (id) => {
    await deleteDoc(doc(db, 'expenses', id))
    exp.value = exp.value.filter(e => e.id !== id)
  }

  const getExpenses = async () => {
    user.value = auth.currentUser
    if(!user.value) {
      console.log('no user')
      // getExpenses()
      return
    }
    // getExpenses() // HÄR BÖR DET JU STÅ GET SAVINGS.... Elleeeer??
    getSavings()
    exp.value = []

    const colRef = collection(db, 'expenses')
    const q = query(colRef, where('userId', '==', user.value.uid))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      exp.value.push({id: doc.id, ...doc.data()})
    })
  }

  const addExpense = async (formData) => {
    user.value = auth.currentUser

    const docRef = await addDoc(collection(db, 'expenses'), {...formData, userId: user.value.uid})
    if(docRef.id) {
      exp.value.push({id: docRef.id, ...formData})
    }
  }

  return { savings, expenses, uniqueCategories, getExpenses, totalExpenses, updateSavings, updateExpense, removeExpense, addExpense }
})