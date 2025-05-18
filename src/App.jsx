
import './App.css'
import LeftPanel from './components/LeftPanel'
import OuterPanel from './components/OuterPanel'
import AppHeader from './components/AppHeader'
import ChatBox from './components/ChatBox'

function App() {

  return (
    <div className='bg-gray-800 h-screen flex flex-col overflow-hidden'>
      <AppHeader/>
      <div className='flex h-screen'>
          <OuterPanel/>
        <LeftPanel/>
        <ChatBox/>
      </div>
    </div>
  )
}

export default App
