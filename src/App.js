import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Header from './components/common/Header'
import Login from './pages/login/Login'
import SignUp from './pages/login/SignUp'
import { ToastContainer } from 'react-toastify'
import Footer from './components/common/Footer'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './PrivateRoute'
import { getAuthorFavorite } from './services/authorService'
import { useSelector } from 'react-redux'
import Profile from './pages/user/Profile'
function App() {
  const user = useSelector(state => state.user)
  getAuthorFavorite(user.dataToken)
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/profile' element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
