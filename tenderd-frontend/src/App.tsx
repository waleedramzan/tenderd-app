import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { Home } from './pages/Home';
import { Vehicle } from './pages/Vehicle';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/vehicle' element={<Vehicle/>} />
      </Routes>
    </Router>
  );
}

export default App;
