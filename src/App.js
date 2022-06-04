import React from 'react'
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/home/Home'
import Header from './components/common/Header'
import Login from './pages/login/Login'
import SignUp from './pages/login/SignUp'
import { ToastContainer } from 'react-toastify'
import Footer from './components/common/Footer'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './PrivateRoute'
import Profile from './pages/user/Profile'
import ManagerHome from './pages/manager/ManagerHome'
function App() {
  // const user = useSelector(state => state.user)
  // getAuthorFavorite(user.dataToken)
  let location = useLocation()
  return (
    <div className="App">
      {location.pathname !== '/manager' && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/profile' element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/manager" element={<ManagerHome />} />
      </Routes>
      {location.pathname !== '/manager' && <Footer />}

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
