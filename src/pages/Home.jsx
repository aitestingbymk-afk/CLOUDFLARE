import React from 'react';
import Hero from '../Hero';
import Menu from '../menu/Menu';

const Home = ({ addToCart }) => {
  return (
    <div>
      <Hero />
      <Menu addToCart={addToCart} />
    </div>
  );
};

export default Home;