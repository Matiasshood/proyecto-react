import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CarritoProvider } from './components/context/CarritoContext.jsx'
import App from './App.jsx'
import { AuthProvider } from './components/context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <CarritoProvider>
    <App />
    </CarritoProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
