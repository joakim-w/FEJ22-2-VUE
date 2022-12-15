import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, googleProvider } from '../firebase/config'
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {

  onAuthStateChanged(auth, _user => {
    console.log('User state change. Current user is: ', _user)
    user.value = _user
  })

  const user = ref(auth.currentUser)
  const error = ref(null)


  const login = async (email, password) => {
    error.value = null
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      error.value = null
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
      return res

    } catch (error) {
      console.log(err.message)
      error.value = err.message
    }
  }

  return { user, error, signup, logout, login, signInWithGoogle }
})