import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
  
  import { useRouter } from 'next/router'
  import {  createContext, useContext, useEffect, useMemo, useState } from 'react'
  import { auth, db } from '../firebaseconfig'

  interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean,
  }

  const AuthContext=createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
    
  })

  interface AuthProviderProps{
    children: React.ReactNode
  }


export const AuthProvider = ({children}:AuthProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState(null)
    const router=useRouter()
    const [initialLoading, setInitialLoading] = useState(true)


  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
          setLoading(false)
        } else {
          // Not logged in...
          setUser(null)
          setLoading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )
 
  

    const signUp= async(email:string,password:string)=>{
        setLoading(true)
        await createUserWithEmailAndPassword(auth,email,password).then(usercredential =>{
            setUser(usercredential.user)
            // setDoc(doc(db , 'users',user?.uid),{
            //   saedshows:[]
            // })
            router.push('/')
            setLoading(false)
        }).catch((error)=>alert("User with same credentials already logged in,Sign In")).finally(()=>setLoading(false))


    }
    const signIn= async(email:string,password:string)=>{
        setLoading(true)
        await signInWithEmailAndPassword(auth,email,password).then(usercredential =>{
            setUser(usercredential.user)
            router.push('/')
            setLoading(false)
        }).catch((error)=>alert("User not found,pls sign up now")).finally(()=>setLoading(false))


    }
    const logout=async () => {

        setLoading(true)
        signOut(auth).then(()=>{
            setUser(null)
        })
        .catch((error)=>alert(error.message)).finally(()=>setLoading(false))
    }

    const memoedValue = useMemo(
        () => ({ user, signUp, signIn,  loading, logout,error }),
        [user, loading]
      )

  return <AuthContext.Provider value={memoedValue}>
   {!initialLoading && children}
  </AuthContext.Provider>
}


// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
    return useContext(AuthContext)
  }