import { useState, useEffect } from 'react';
import productApi from './api/productApi';
import './App.css';
import Button from '@mui/material/Button';
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import Header from './components/common/Header';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
