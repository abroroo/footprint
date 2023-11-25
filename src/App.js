// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import Test from './pages/Test';
import PageNotFound from './pages/PageNotFound';



const App = () => (
  <Router>
    <div className='bg-gradient-background box-border'>
      <div className=''>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
