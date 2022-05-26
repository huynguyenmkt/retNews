import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Header from './components/common/Header'
import Login from './pages/login/Login'
import SignUp from './pages/login/SignUp'
import { ToastContainer } from 'react-toastify'
import Footer from './components/common/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
