import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './components/Cart/Cart';
import NotFound from './pages/NotFound';
import './scss/index.scss';
import { useState } from 'react';

function App() {
 const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<Home searchValue={searchValue} setSearchValue={setSearchValue} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
