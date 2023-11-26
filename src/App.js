import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
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
    </div>
  </Router>
);

export default App;
