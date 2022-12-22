import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'

// interface Props{
//   movie:Movie

// }
const Herodesign = ({movie,title}:any) => {
  // console.log(movie);
  
	
  let length = 150
  let myString =  movie.overview
  let myTruncatedString = myString.substring(0,length);
  
	
  let smalllength = 50
  let smallmyString =  movie.overview
  let smallmyTruncatedString = smallmyString.substring(0,smalllength);

  const [CurrentMovie, setCurrentMovie] =useRecoilState(movieState)
  const [showModal, setShowModal]=useRecoilState(modalState)




  return (
	<article 
  onClick={() => {
    setCurrentMovie(movie)
    setShowModal(true)
    // console.log("button click");
    
    
  }} 
  className="flex cursor-pointer flex-col border border-slate-400  dark:bg-gray-900 shadow-xl md:mb-9 mb-5">
    
              <img alt="" className="object-top  w-[100%] m-auto md:m-0 md:w-full h-[15rem]  md:h-[21rem] md:object-cover dark:bg-gray-500" src={`https://image.tmdb.org/t/p/w500${
         movie.backdrop_path
 
      }`} />
           
            <div className="flex flex-col flex-1 p-3">
             <p className="text-xs tracking-wider uppercase hover:underline dark:text-violet-400">
             { title}
              </p>   
              <h3 className="flex-1 hidden sm:flex py-2 text-lg font-semibold leading-snug">{myTruncatedString}...</h3>
              <h3 className="flex-1 flex sm:hidden py-2 text-lg font-semibold leading-snug">{smallmyTruncatedString}...</h3>
              <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                <span>Language: { movie.original_language}</span>
                <span> Review: { movie.vote_average}</span>
                {/* <span>{ movie.id}</span> */}
				
              </div>
			 
            </div>
            
          </article>
  )
}

export default Herodesign