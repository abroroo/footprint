// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';



const App = () => (
  <Router>
    <div className='bg-gradient-background min-h-screen  box-border'>
      <div className=''>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
        </Routes>

      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
