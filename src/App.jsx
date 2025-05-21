
import './App.css'
import LeftPanel from './components/LeftPanel'
import OuterPanel from './components/OuterPanel'
import AppHeader from './components/AppHeader'
import ChatBox from './components/ChatBox'
import MobileMenu from './components/MobileMenu'
import { useContext, useState } from 'react'
import { UiContext } from './Contexts/UiContext'

function App() {
  const {mobileMenu,setMobileMenu} = useContext(UiContext);

  return (
    <div className='bg-gray-800 h-screen flex flex-col overflow-hidden'>
      <AppHeader/>
      <div className='flex h-screen'>
          <OuterPanel/>
          {mobileMenu && <LeftPanel/>}

        <ChatBox/>
      </div>
    </div>
  )
}

export default App
