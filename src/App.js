// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header/Header';



const App = () => (
  <Router>
    <div className='bg-gradient-background min-h-screen w-screen box-border'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
      </Routes>

    </div>
  </Router>
);

export default App;
