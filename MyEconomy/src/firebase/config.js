import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf1qg72PU7z1i7bVnAWsJ3HkMvE8fW-pA",
  authDomain: "myconomy-a1a49.firebaseapp.com",
  projectId: "myconomy-a1a49",
  storageBucket: "myconomy-a1a49.appspot.com",
  messagingSenderId: "556993412785",
  appId: "1:556993412785:web:5df4bb306c63f0080bac90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth()
const googleProvider = new GoogleAuthProvider()

export { db, auth, googleProvider }