import { collection, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { db, auth } from '../firebase/config'


export const useIncomeStore = defineStore('incomes', () => {
  const user = ref(auth.currentUser)

  const incomes = ref([])
  const totalIncome = computed(() => {
    let total = 0
    incomes.value.forEach(item => total += item.amount)
    return total
  })

  const getIncomes = async () => {
    user.value = auth.currentUser

    if(!user) {
      console.log('no user')
      getIncomes()
      return
    }

    incomes.value = []
    const colRef = collection(db, 'incomes')
    const q = query(colRef, where('userId', '==', user.value.uid))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      incomes.value.push({ id: doc.id, ...doc.data() })
    })
  }

  const updateIncome = async (item, _amount) => {
    const incomeRef = doc(db, 'incomes', item.id)
    try {
      await updateDoc(incomeRef, {amount: _amount})
      getIncomes()
    } catch (err) {
      console.log(err)
    }
  }

  const removeIncome = async (id) => {
    await deleteDoc(doc(db, 'incomes', id))
    incomes.value = incomes.value.filter(income => income.id !== id)
  }

  return { incomes, getIncomes, totalIncome, updateIncome, removeIncome }

})