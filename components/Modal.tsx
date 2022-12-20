import React from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { Box } from '@mui/material'
import { XIcon } from '@heroicons/react/solid'

const Modal = () => {
    const [showModal, setShowModal]=useRecoilState(modalState)
    const handleClose=()=>{
setShowModal(false)
    }
    
  return (
    <MuiModal open={showModal} onClose={handleClose}
    className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
    <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={handleClose}
        >
          <XIcon className="h-6 w-6" />
        </button>
       
      </MuiModal>
    
    
      ) 
}

export default Modal
