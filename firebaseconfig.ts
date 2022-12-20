import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBjN0EafczhUmbxSgxIlyS5Akz88126TJU",
  authDomain: "netflix-cadf1.firebaseapp.com",
  projectId: "netflix-cadf1",
  storageBucket: "netflix-cadf1.appspot.com",
  messagingSenderId: "633931537435",
  appId: "1:633931537435:web:66e1d79bdd789a374e6cbe"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }