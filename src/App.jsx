import React, { useState } from 'react';
import { sendOrderToTelegram } from './TelegramService';

export default function App() {
  const [cart, setCart] = useState([]);

  const menu = [
    { name: 'Onion Pizza (Small)', price: 79 },
    { name: 'Veg Aloo Burger', price: 59 },
    { name: 'French Fries', price: 59 }
    // Baaki items bhi add kar sakte ho
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    sendOrderToTelegram(cart);
    alert('Order placed successfully! You will receive confirmation on Telegram.');
    setCart([]); // clear cart after order
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>BudgetMein</h1>
      <p>Fast Food Delivery in Jahangirpuri, Delhi</p>

      <h2>Menu</h2>
      {menu.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <span>{item.name} – ₹{item.price}</span>
          <button style={{ marginLeft: '10px' }} onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      ))}

      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart.</p> : (
        <ul>
          {cart.map((item, index) => <li key={index}>{item.name} – ₹{item.price}</li>)}
        </ul>
      )}

      <button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={placeOrder}
      >
        Place Order
      </button>
    </div>
  );
}
