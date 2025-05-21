import React, { useContext } from 'react'
import { LuMessageSquareMore } from 'react-icons/lu'
import { FaUserFriends } from 'react-icons/fa'
import { IoSettingsOutline } from 'react-icons/io5'
import { UiContext } from '../Contexts/UiContext'

function OuterPanel() {
  const {setMobileMenu} = useContext(UiContext);
  return (
    <div className='bg-gray-900 min-w-15 flex flex-col items-center pt-5 gap-5'>
      <LuMessageSquareMore className='text-white text-2xl ' onClick={()=>{setMobileMenu((old)=>{return !old})}}/>
      <FaUserFriends  className='text-white text-2xl '/>
      <IoSettingsOutline   className='text-white text-2xl '/>
    </div>
  )
}

export default OuterPanel