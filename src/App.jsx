import './App.css'
import Header from './components/Header'
import Footer from'./components/Footer'
import { Routes, Route } from 'react-router-dom'
import Contacto from './components/Pages/Contacto'
import About from './components/Pages/About'
import Main from './components/Main'
import ProductoDetalle from './components/Pages/ProductoDetalle'
import Admin from './components/Admin'
import Login from './components/Pages/Login'
import RutaProtegida from './components/RutaProtegida'
import { useState } from 'react'
import Carrito from './components/Pages/Carrito'
import RutaProtegidaUsuario from './components/RutaProtegidaUsuario'



function App() {
  
  return (
    <>
    <Header />

    

    <div className='mainContent'>
    <Routes>
      <Route path={'/'} element={<Main/>} />
      <Route path={'/Contacto'} element={<Contacto/>} />
      <Route path={'/About'} element={<About/>} />
      <Route path={'/Admin'} element={<RutaProtegida><Admin/></RutaProtegida>}/>
      <Route path={'/Login'} element={<Login/>} />
      <Route path={'/productos/:id'} element={<ProductoDetalle/>} />
      <Route path='/carrito' element={<RutaProtegidaUsuario><Carrito/></RutaProtegidaUsuario>} />  
    </Routes>
    <Footer />
    </div>    
    </>
  )
}

export default App
