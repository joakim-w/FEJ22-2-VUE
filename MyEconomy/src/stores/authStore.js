import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, googleProvider, db } from '../firebase/config'
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth'
import { getDocs, addDoc, collection, query, where } from 'firebase/firestore'
import { useIncomeStore } from './incomes'
import { useExpensesStore } from './expenses'

export const useAuthStore = defineStore('auth', () => {

  const incomesStore = useIncomeStore()
  const expensesStore = useExpensesStore()

  onAuthStateChanged(auth, _user => {
    console.log('User state change. Current user is: ', _user)
    user.value = _user
  })

  const user = ref(auth.currentUser)
  const error = ref(null)

  const createSavings = async () => {

    const colRef = collection(db, 'savings')
    const q = query(colRef, where('userId', '==', user.value.uid))

    const querySnapshot = await getDocs(q)
    if(querySnapshot.docs.length) {
      return true
    }
    console.log('no such document')
    await addDoc(collection(db, 'savings'), {name: 'Sparande', amount: 0, userId: user.value.uid})
    return false
  }


  const login = async (email, password) => {
    error.value = null
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      error.value = null
      await createSavings()
      return res
    } catch (err) {
      console.log(err.message)
      error.value = 'Felaktiga inloggningsuppgifter'
    }
  }

  const signup = async (email, password) => {
    error.value = null
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if(!res) {
        throw new Error('Kunde inte skapa en användare')
      }

      error.value = null
      await createSavings()
      return res

    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  const logout = async () => {
    error.value = null

    try {
      await signOut(auth)
      incomesStore.incomes = []
      expensesStore.exp = []
      expensesStore.savings = { name: 'Sparande', amount: 0 }
    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  const signInWithGoogle = async () => {
    error.value = null
    try {
      const res = await signInWithPopup(auth, googleProvider)
      if(!res) {
        throw new Error('Kunde inte färdigställa inloggningen')
      }

      error.value = null
      await createSavings()
      return res

    } catch (error) {
      console.log(err.message)
      error.value = err.message
    }
  }

  return { user, error, signup, logout, login, signInWithGoogle }
})