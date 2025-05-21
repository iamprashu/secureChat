import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  UiContext  from './Contexts/UiContext.jsx'

createRoot(document.getElementById('root')).render(
    <UiContext>
        <App />
    </UiContext>
    
)
