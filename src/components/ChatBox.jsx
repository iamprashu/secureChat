import React from 'react'
import { useContext } from 'react';
import { FaPen } from 'react-icons/fa'
import { UiContext } from '../Contexts/UiContext'

export default function ChatBox() {
  const {mobileMenu} = useContext(UiContext);
  return (
    <div className='bg-gray-800 h-full w-full p-2 text-gray-600'>
     <div className='h-full w-full flex flex-col items-center justify-center gap-5'>
        <div className='text-6xl'>
           <FaPen size={100}/>
        </div>
        <div>
          {mobileMenu ? (<p className='text-3xl'>Select a chat to open messages.</p>
):(          <p className='text-3xl'>Please Click on Message icon ln left bar.</p>
)}
        </div>
     </div>
      
    </div>
  )
}
