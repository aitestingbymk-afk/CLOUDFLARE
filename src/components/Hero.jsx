import React from 'react';
import { FaBiking } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Delicious Food Delivered To Your Door</h1>
          <p className="text-xl mb-6">Fast delivery of your favorite meals. Order now and get 20% off your first order!</p>
          <button className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 flex items-center">
            Order Now <FaBiking className="ml-2" />
          </button>
        </div>
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop" 
            alt="Delicious food" 
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;