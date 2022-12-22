import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Box } from '@mui/material'
import { CheckIcon, PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/solid'
import { Element, Genre, Movie } from '../typings'
import ReactPlayer from 'react-player/lazy'
import { FaPlay } from 'react-icons/fa'
import useAuth from '../hooks/useAuth'
import { collection, deleteDoc, DocumentData, getDoc, onSnapshot, query, setDoc } from "firebase/firestore";

import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';

import { arrayUnion, doc, updateDoc } from 'firebase/firestore'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebaseconfig'

const Modal = ({ genre }: any) => {
  const { user } = useAuth()
  
  const movieID = doc(db, 'users', `${user?.email}`);
  const [like, setLike] = useState(false);

  const [saved, setSaved] = useState(false)
  const [movie, setMovie] = useRecoilState(movieState)

  const [trailer, setTrailer] = useState("")
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState(false)
  const [addedToList, setAddedToList] = useState(false)
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([])


  const [showModal, setShowModal] = useRecoilState(modalState)
  const handleClose = () => {
    setShowModal(false)
  }

  
  

  useEffect(() => {

    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(`https://api.themoviedb.org/3/${
        movie?.media_type || genre == undefined ? 'movie' : 'tv'
      }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }


    }

    fetchMovie()

  }, [movie])

  // console.log(trailer);
  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'users', user!.uid, 'saedshows'),
        (snapshot) => setMovies(snapshot.docs)
      )
    }
  }, [db, movie?.id])



  // Check if the movie is already in the user's list
  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [movies]
  )

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, 'users', user!.uid, 'saedshows', movie?.id.toString()!)
      )
      toast(`${movie?.title || movie?.name} has been deleted from my list`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      await setDoc(
        doc(db, 'users', user!.uid, 'saedshows', movie?.id.toString()!),
        {
          ...movie,
        }
      )

      toast(`${movie?.title || movie?.name} has been added to my list`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }


  return (
    <MuiModal open={showModal} onClose={handleClose}
      className="fixed !top-12 left-0 right-0 z-50 mx-auto w-[95%] m-auto sm:max-w-2xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
      <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
        <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={handleClose}
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-4 sm:bottom-10 flex w-full items-center justify-between px-10">
            <div className='flex space-x-2'>
              <button className="modalButton" onClick={handleList}>
                {addedToList ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}
              </button>
              <button className='modalButton'>
                <ThumbUpIcon className='h-7 w-7' />

              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>


        <div className="flex space-x-16 rounded-b-md bg-[#181818] sm:px-10 sm:py-8 px-2 py-4">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>

            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="sm:w-5/6 w-full sm:text-[17px] text-[15px]">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{' '}
                  {genres.map((genre) => genre.name).join(', ')}
                </div>
                <div>
                  <span className="text-[gray]">Original language:</span>{' '}
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total votes:</span>{' '}
                  {movie?.vote_count}
                </div>
              </div>

            </div>

          </div>

        </div>

      </>
    </MuiModal>


  )
}

export default Modal
