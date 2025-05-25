import React, { useContext } from 'react'
import { UiContext } from '../Contexts/UiContext'
import ChatList from "../components/ChatList"
import FriendSearchPanel from './FriendSearchPanel';

function FriendPanel() {
    const{setFriendPanel} = useContext(UiContext);

  return (
    <div className='bg-white/0 absolute backdrop-blur-[5px] h-screen w-full flex flex-row'>
      <div className='h-full flex flex-col border-r-1 shadow-2xl'>
        
       <FriendSearchPanel/>
        <div className='h-[50%]  w-150 border-t-1 p-2 flex justify-around flex-col'>
          <div>
            <p className='text-2xl'>Friend List</p>
          </div>
          <div className='h-full'>
            <ChatList/>
          </div>
        </div>

      </div>

      <div className='w-full h-full bg-red' onClick={()=>{setFriendPanel(old => {!old})}}>

      </div>
        
    </div>
  )
}

export default FriendPanel
