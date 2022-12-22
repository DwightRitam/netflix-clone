import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../../atoms/modalAtom'
import Header from '../../components/Header'

import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router'
import Herodesign from '../../components/Herodesign'
import Modal from '../../components/Modal'
const searchitem = () => {
  const router = useRouter()
  const { searchitem } = router.query

  const [movie, setMovie] = useState([])
 



  useEffect(() => {



    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY
      }&language=en-US&query=${searchitem}&page=1&include_adult=false`)
      .then(response => response.json())
      .then(response => setMovie(response.results))
      .catch(err => console.error(err));



    // console.log(searchitem);
  }, [searchitem])


  
  

  const modal=useRecoilValue(modalState)

  return (

    <div className="  p-3 herodesbg  space-y-8  ">

      <Header />
      <div className="space-y-2 text-center">
        <h2 className="sm:text-3xl text-2xl font-bold mt-[9rem]">Search results for {searchitem} </h2>
      </div>
      {movie.length < 1 && (
					<div >
						<Link href='/'>  <h3 className='m-auto text-xl text-red-400 hover:underline mt-7 text-center font-bold font-sans'>No such Films have been found</h3></Link>

						<img src="https://media.tenor.com/OYt3g541tDYAAAAi/cute-lovely.gif" className='h-[15rem] m-auto' alt="" />


						<Link href='/'>  <h3 className='m-auto text-3xl hover:underline mt-7 text-center font-bold font-sans'>Continue watching !</h3></Link>

					
					</div>
				)}
   
      <div className="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-2 lg:grid-cols-4"
       >

        {movie.map((element) => {
          return <Herodesign movie={element} title={element.title} key={element.id} />
        })}
      </div>
      {modal && <Modal/>}
    </div>


  )
}

export default searchitem
