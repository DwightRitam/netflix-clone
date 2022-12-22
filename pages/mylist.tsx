import Link from 'next/link'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import Header from '../components/Header'
import Herodesign from '../components/Herodesign'
import Modal from '../components/Modal'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import useList from '../hooks/useList'


const mylist = () => {
  const { user, loading } = useAuth()
  const movie = useRecoilValue(movieState)
  const list = useList(user?.uid)

  const modal = useRecoilValue(modalState)
  return (
    <div className="  p-3 herodesbg  space-y-8  ">

      <Header />
      <div className="space-y-2 text-center">
        <h2 className="sm:text-3xl text-4xl font-bold mt-[9rem]">My List </h2>
        <hr className='h-4 w-[90%] m-auto' />
      </div>
      {list.length < 1 && (
        <div >
          <Link href='/'>  <h3 className='m-auto text-xl text-red-400 hover:underline mt-7 text-center font-bold font-sans'>Sorry There is no shows or films in your list</h3></Link>

          <img src="https://media.tenor.com/OYt3g541tDYAAAAi/cute-lovely.gif" className='h-[15rem] m-auto' alt="" />


          <Link href='/'>  <h3 className='m-auto text-3xl hover:underline mt-7 text-center font-bold font-sans'>Continue watching !</h3></Link>


        </div>
      )}

      <div >

        <Row title='My List' movies={list} />
      </div>
      {modal && <Modal />}
    </div>

  )
}

export default mylist
