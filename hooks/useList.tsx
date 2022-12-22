import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebaseconfig'
import { Movie } from '../typings'

function useList(email: string | undefined) {
  const [list, setList] = useState<DocumentData[] | Movie[]>([])

  useEffect(() => {
    if (!email) return

    return onSnapshot(
      collection(db, 'users', email, 'saedshows'),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      }
    )
  }, [db,email ])

  return list
}

export default useList