import React from 'react'

function FriendSearchPanel() {
  return (
     <div className='h-full w-150 border-b-1 p-2 flex flex-col justify-center items-center'>
         <div>
           <p className='text-2xl'>Search a Friend.</p>
         </div>
          <div className='h-full w-full flex justify-center'>
            <form action="" className='w-full' >
              <div className='grid grid-flow-col justify-evenly w-full'>
                <label htmlFor="">Enter Username:</label>
                <input type="text" className='bg-gray-700 h-7 rounded-xl text-white focus:outline-0' name="username" />
                <button className='bg-gray-900 px-3 py-1 rounded-xl'>Search</button>
              </div>
            </form>
          </div>
    </div>
  )
}

export default FriendSearchPanel