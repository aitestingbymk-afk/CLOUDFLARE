// components/Menu/Menu.jsx
import React from 'react';
import './menu.css';

const Menu = ({ addToCart }) => {
  const menuItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      price: 299,
      description: 'Classic cheese pizza with tomato sauce',
      image: '/images/pizza.jpg'
    },
    {
      id: 2,
      name: 'Burger',
      price: 149,
      description: 'Juicy beef burger with veggies',
      image: '/images/burger.jpg'
    },
    {
      id: 3,
      name: 'Pasta',
      price: 199,
      description: 'Creamy Alfredo pasta',
      image: '/images/pasta.jpg'
    },
    {
      id: 4,
      name: 'Salad',
      price: 99,
      description: 'Fresh garden salad',
      image: '/images/salad.jpg'
    }
  ];

  return (
    <div className="menu">
      <h1>Our Menu</h1>
      <div className="menu-grid">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            <div className="item-image">
              {/* Yahan aap actual images add kar sakte hain */}
              <div className="placeholder-image">🍕</div>
            </div>
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="item-price">₹{item.price}</div>
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;