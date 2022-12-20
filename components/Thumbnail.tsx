import React from 'react'
import { Movie } from '../typings'
interface Props{
    movie:Movie

}

const Thumbnail = ({movie}: Props) => {
  return (
    <div
    className={` h-[8rem] min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-48 md:min-w-[260px] md:hover:scale-105`}
    onClick={() => {
    //   setCurrentMovie(movie)
    //   setShowModal(true)
    }}
  >
    <img
      src={`https://image.tmdb.org/t/p/w500${
        movie.backdrop_path || movie.poster_path
      }`}
      className="rounded-sm object-cover md:rounded"
      
    />
 <h2 className='pr-1 sm:text-[15px] text-[10px]'>{movie.title}</h2>

  </div>
  )
}

export default Thumbnail