// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';



const App = () => (



  < Router >

    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  </Router >

);

export default App;
