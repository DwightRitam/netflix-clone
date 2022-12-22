import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../../atoms/modalAtom'
import Header from '../../components/Header'
import Row from '../../components/Row' 
import { useRouter } from 'next/router'
import Herodesign from '../../components/Herodesign'
import Modal from '../../components/Modal'
const showname = () => {
  const router = useRouter()
  const { showname } = router.query

  const [movie, setMovie] = useState([])
  



  useEffect(() => {



    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY
      }&language=en-US&query=${showname}&page=1&include_adult=false`)
      .then(response => response.json())
      .then(response => setMovie(response.results))
      .catch(err => console.error(err));



    }, [showname])

  
  

  const modal=useRecoilValue(modalState)

  return (

    <div className="  p-3 herodesbg  space-y-8  ">

      <Header />
      <div className="space-y-2 text-center">
        <h2 className="sm:text-3xl text-2xl font-bold mt-[9rem]">Search results for {showname} </h2>
      </div>
      {movie.length < 1 && (
					<div >
						<Link href='/'>  <h3 className='m-auto text-xl text-red-400 hover:underline mt-7 text-center font-bold font-sans'>No such Shows have been found</h3></Link>

						<img src="https://media.tenor.com/OYt3g541tDYAAAAi/cute-lovely.gif" className='h-[15rem] m-auto' alt="" />


						<Link href='/'>  <h3 className='m-auto text-3xl hover:underline mt-7 text-center font-bold font-sans'>Continue watching !</h3></Link>

					
					</div>
				)}
   
      <div >

      <Row title='Tv Shows' movies={movie}/>
      </div>
      {modal && <Modal genre="tv"/>}
    </div>


  )
}

export default showname
