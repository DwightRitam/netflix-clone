import { DocumentData } from 'firebase/firestore'
import React from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'
interface Props{
    movie:Movie | DocumentData


}

const Thumbnail = ({movie}: Props) => {
  const [CurrentMovie, setCurrentMovie] =useRecoilState(movieState)
  const [showModal, setShowModal]=useRecoilState(modalState)
  return (
    <div
    className={` h-[8rem] min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-48 md:min-w-[260px] md:hover:scale-105`}
    onClick={() => {
      setCurrentMovie(movie)
      setShowModal(true)
    }}
  >
    <img
      src={`https://image.tmdb.org/t/p/w500${
        movie.backdrop_path || movie.poster_path
      }`}
      className="rounded-sm object-cover md:rounded h-[80%] "
      
    />
 <h2 className='pr-1 sm:text-[15px] text-[10px]'>{movie.title||movie.name}</h2>

  </div>
  )
}

export default Thumbnail