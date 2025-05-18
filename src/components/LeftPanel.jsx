import React from 'react'
import LeftPanelHeader from './LeftPanelHeader'
import ChatList from './ChatList'

function LeftPanel() {
  return (
    <div className='bg-gray-800 h-screen/15  border-r-1 rounded-tl-xl'>
        <LeftPanelHeader/>
        <ChatList/>
        
    </div>
  )
}

export default LeftPanel