import React from 'react'

function Chat() {
  return (
    <div className='bg-gray-950/40 p-2 w-full min-h-20 flex items-center  justify-between rounded-2xl text-white gap-2'>
        <div className='flex gap-2 justify-center items-center'>
          <div className='rounded-full'>
              <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" alt="" className='h-19 w-19 rounded-full ' />
          </div>
          <div>Prashant Joshi</div>
        </div>

        <div className='flex min-h-full items-end justify-end'>
          <h2>19:00</h2>
        </div>
    </div>
  )
}

export default Chat