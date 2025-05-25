import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  UiContext  from './Contexts/UiContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <UiContext>
            <App />
        </UiContext>
    </BrowserRouter>
  
    
)
