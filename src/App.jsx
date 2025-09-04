import React, { useState } from 'react';
import Header from './components/Checkout/Header'; // Correct path
import Home from './components/pages/Home';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="App">
      <Header cartCount={cart.length} />
      <Home addToCart={addToCart} />
    </div>
  );
}

export default App;