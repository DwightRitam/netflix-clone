import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../../atoms/modalAtom'
import Header from '../../components/Header'

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



    // console.log(showname);
  }, [showname])
// console.log(movie);

  
  

  const modal=useRecoilValue(modalState)

  return (

    <div className="  p-3 herodesbg  space-y-8  ">

      <Header />
      <div className="space-y-2 text-center">
        <h2 className="sm:text-3xl text-2xl font-bold mt-[9rem]">Search results for {showname} </h2>
      </div>
   
      <div className="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-2 lg:grid-cols-4"
       >

        {movie.map((element) => {
          return <Herodesign movie={element} key={element.id} />
        })}
      </div>
      {modal && <Modal genre="tv"/>}
    </div>


  )
}

export default showname
