import React from 'react'
import { LuMessageSquareMore } from 'react-icons/lu'
import { FaUserFriends } from 'react-icons/fa'
import { IoSettingsOutline } from 'react-icons/io5'

function OuterPanel() {
  return (
    <div className='bg-gray-900 w-15 flex flex-col items-center pt-5 gap-5'>
      <LuMessageSquareMore className='text-white text-2xl '/>
      <FaUserFriends  className='text-white text-2xl '/>
      <IoSettingsOutline   className='text-white text-2xl '/>
    </div>
  )
}

export default OuterPanel