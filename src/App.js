import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Adminscreen from './screens/Adminscreen';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Landingscreen from './screens/Landingscreen';
import Managerscreen from './screens/Managerscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Homescreen />} />
          <Route path='/book/:restaurantid' element={<Bookingscreen />} />
          <Route path='/admin' element={<Adminscreen />} />
          <Route path='/register' element={<Registerscreen />} />
          <Route path='/login' element={<Loginscreen />} />
          <Route path='/profile' element={<Profilescreen />} />
          <Route path='/' element={<Landingscreen />} />
          <Route path='/manager' element={<Managerscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
