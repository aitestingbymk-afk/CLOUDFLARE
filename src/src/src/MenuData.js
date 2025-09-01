import React, { useState } from 'react';
import menu from './MenuData';

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (itemName, price) => {
    setCart([...cart, { name: itemName, price }]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>BudgetMein</h1>
      <h3>Fast Food Delivery in Jahangirpuri, Delhi</h3>

      <h2>Menu</h2>
      {Object.keys(menu).map((category) => (
        <div key={category} style={{ marginBottom: '20px' }}>
          <h3 style={{ textTransform: 'capitalize' }}>{category}</h3>
          {menu[category].map((item, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <strong>{item.name}</strong>
              {item.sizes ? (
                <div>
                  {Object.entries(item.sizes).map(([size, price]) => (
                    <button
                      key={size}
                      style={{ margin: '5px', padding: '5px 10px', cursor: 'pointer' }}
                      onClick={() => addToCart(`${item.name} (${size})`, price)}
                    >
                      {size} – ₹{price}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  style={{ margin: '5px', padding: '5px 10px', cursor: 'pointer' }}
                  onClick={() => addToCart(item.name, item.price)}
                >
                  Add – ₹{item.price}
                </button>
              )}
            </div>
          ))}
        </div>
      ))}

      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>No items added yet.</p> : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} – ₹{item.price}</li>
          ))}
        </ul>
      )}
      <h3>Total: ₹{total}</h3>
    </div>
  );
}
