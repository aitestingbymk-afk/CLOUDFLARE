// src/components/Checkout/AddressForm.jsx
import React, { useState } from 'react';
import { sendOrderToTelegram } from '../../services/telegramService.js';
import './AddressForm.css';

const AddressForm = ({ user, cart, onOrderSuccess }) => {
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    instructions: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      customerName: address.name,
      phone: address.phone,
      address: `${address.street}, ${address.city}, ${address.state} - ${address.zipCode}`,
      instructions: address.instructions,
      total: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      items: cart,
      timestamp: new Date().toISOString()
    };

    // Telegram notification bhejein
    const telegramSuccess = await sendOrderToTelegram(orderData);
    
    if (telegramSuccess) {
      alert('Order placed successfully! You will receive a confirmation soon.');
    } else {
      alert('Order placed! But could not send notification.');
    }
    
    onOrderSuccess();
  };

  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="address-form">
      <h2>Delivery Address</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={address.name}
          onChange={(e) => setAddress({...address, name: e.target.value})}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={address.phone}
          onChange={(e) => setAddress({...address, phone: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Street Address"
          value={address.street}
          onChange={(e) => setAddress({...address, street: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({...address, city: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={address.state}
          onChange={(e) => setAddress({...address, state: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="ZIP Code"
          value={address.zipCode}
          onChange={(e) => setAddress({...address, zipCode: e.target.value})}
          required
        />
        <textarea
          placeholder="Delivery Instructions (optional)"
          value={address.instructions}
          onChange={(e) => setAddress({...address, instructions: e.target.value})}
          rows="3"
        />
        
        <div className="order-summary">
          <h3>Order Total: ₹{totalAmount}</h3>
        </div>
        
        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
};

export default AddressForm;