import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { VscSearch } from 'react-icons/vsc'

function LeftPanelHeader() {
  return (
    <div className='bg-gray-800 text-white w-full  p-2 grid grid-flow-row justify-center  rounded-tl-xl'>
        <div className='flex justify-between items-center'>
            <h1 className='text-2xl'>Chats</h1>
            <AiOutlineEdit size={20}/>
        </div>

        <div className='w-full flex '>
          <div className='h-10 w-[15%] bg-gray-900  rounded-bl-sm border-b-2 border-red-600  flex items-center justify-center'>
            <VscSearch fontWeight={100}></VscSearch>
          </div>
            <input type="text" className='bg-gray-900 w-[85%] text-xl p-1 rounded-br-sm border-b-2 border-red-600 outline-0 text-white' />
        </div>
    </div>
  )
}

export default LeftPanelHeader