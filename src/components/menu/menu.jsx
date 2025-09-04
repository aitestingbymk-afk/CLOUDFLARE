import React from 'react';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

const Menu = ({ addToCart }) => {
  const menuItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      price: 299,
      description: 'Classic cheese pizza with tomato sauce',
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Chicken Burger',
      price: 149,
      description: 'Juicy chicken burger with veggies',
      image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&h=300&fit=crop',
      rating: 4.5
    },
    {
      id: 3,
      name: 'Fresh Pasta',
      price: 199,
      description: 'Creamy Alfredo pasta',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Garden Salad',
      price: 99,
      description: 'Fresh garden salad with dressing',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      rating: 4.3
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-lg font-bold text-orange-600">₹{item.price}</p>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="font-semibold">{item.rating}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(item)}
                    className="bg-orange-500 text-white py-2 px-4 rounded-full flex items-center hover:bg-orange-600 transition duration-300"
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;