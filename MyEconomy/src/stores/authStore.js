import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {

  onAuthStateChanged(auth, _user => {
    console.log('User state change. Current user is: ', _user)
    user.value = _user
  })

  const user = ref(auth.currentUser)
  const error = ref(null)


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


  return { user, error, signup, logout }
})