import React, { useState } from "react";
import { sendOrderToTelegram } from "./TelegramService";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [showLanding, setShowLanding] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("PIZZAS");
  const TAX_PERCENTAGE = 1;
 const DELIVERY_CHARGE = 10;

  const menu = [
    {
      category: "PIZZAS",
      items: [
        { name: "Onion Pizza", image: "https://images.unsplash.com/photo-1601924575866-1cb4ab1c0f46?auto=format&fit=crop&w=800&q=80", sizes: [{ size: "Small", price: 79 }, { size: "Medium", price: 149 }, { size: "Large", price: 299 }] },
        { name: "Onion & Capsicum Pizza", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80", sizes: [{ size: "Small", price: 79 }, { size: "Medium", price: 149 }, { size: "Large", price: 299 }] },
        { name: "Corn with Cheese Pizza", image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80", sizes: [{ size: "Small", price: 89 }, { size: "Medium", price: 169 }, { size: "Large", price: 299 }] },
        { name: "Margherita Pizza", image: "https://images.unsplash.com/photo-1601924575866-1cb4ab1c0f46?auto=format&fit=crop&w=800&q=80", sizes: [{ size: "Small", price: 99 }, { size: "Medium", price: 179 }, { size: "Large", price: 299 }] }
      ]
    },
    {
      category: "BURGERS",
      items: [
        { name: "Veg Aloo Burger", image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80", price: 59 },
        { name: "Crispy Veg Burger", image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80", price: 79 },
        { name: "Veg Cheese Burger", image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80", price: 89 },
        { name: "Spicy Paneer Burger", image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80", price: 109 }
      ]
    },
    {
      category: "SANDWICHES",
      items: [
        { name: "2 Grill Sandwich Lite", image: "https://images.unsplash.com/photo-1597301829867-cf79f206a6c2?auto=format&fit=crop&w=800&q=80", price: 89 },
        { name: "2 Grill Sandwich", image: "https://images.unsplash.com/photo-1597301829867-cf79f206a6c2?auto=format&fit=crop&w=800&q=80", price: 95 },
        { name: "2 Paneer Sandwich", image: "https://images.unsplash.com/photo-1597301829867-cf79f206a6c2?auto=format&fit=crop&w=800&q=80", price: 99 }
      ]
    },
    {
      category: "WRAPS",
      items: [
        { name: "2 Aloo Wrap", image: "https://images.unsplash.com/photo-1606755962775-6484bcd2c5f7?auto=format&fit=crop&w=800&q=80", price: 99 },
        { name: "Saucy Wrap", image: "https://images.unsplash.com/photo-1606755962775-6484bcd2c5f7?auto=format&fit=crop&w=800&q=80", price: 119 },
        { name: "Paneer Wrap", image: "https://images.unsplash.com/photo-1606755962775-6484bcd2c5f7?auto=format&fit=crop&w=800&q=80", price: 99 }
      ]
    },
    {
      category: "FRIES",
      items: [
        { name: "French Fries", image: "https://images.unsplash.com/photo-1617196034130-d02f2b22f11b?auto=format&fit=crop&w=800&q=80", price: 59 },
        { name: "Piri-piri Fries", image: "https://images.unsplash.com/photo-1617196034130-d02f2b22f11b?auto=format&fit=crop&w=800&q=80", price: 69 },
        { name: "Loaded Fries", image: "https://images.unsplash.com/photo-1617196034130-d02f2b22f11b?auto=format&fit=crop&w=800&q=80", price: 89 }
      ]
    }
  ];

  const addToCart = (item, button) => {
    const newItem = {
      ...item,
      id: Date.now() + Math.random(),
      quantity: 1
    };
    setCart([...cart, newItem]);
    
    button.innerText = "✓ Added";
    button.style.backgroundColor = "#28a745";
    setTimeout(() => {
      button.innerText = "Add to Cart";
      button.style.backgroundColor = "";
    }, 1500);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === itemId ? {...item, quantity: newQuantity} : item
    ));
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = (subtotal * TAX_PERCENTAGE) / 100;
    const total = subtotal + tax + (subtotal > 0 ? DELIVERY_CHARGE : 0);
    return { subtotal, tax, delivery: subtotal > 0 ? DELIVERY_CHARGE : 0, total };
  };

  const placeOrder = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    
    const orderDetails = {
      items: cart,
      total: calculateTotal(),
      timestamp: new Date().toLocaleString(),
      orderId: "ORD" + Date.now()
    };
    
    sendOrderToTelegram(orderDetails);
    alert(`Order placed successfully! Order ID: ${orderDetails.orderId}`);
    setCart([]);
  };

  if (showLanding) {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1>BudgetMein</h1>
        <p>Jahangirpuri's Fastest Food Delivery</p>
        
        <div className="hero-stats">
          <div className="stat-box">
            <span className="stat-number">30 Min</span>
            <span className="stat-label">Delivery</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">4.8★</span>
            <span className="stat-label">Rating</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">Easy</span>
            <span className="stat-label">Payment</span>
          </div>
        </div>

        <button onClick={() => setShowLanding(false)} className="cta-button">
          Order Now →
        </button>
      </div>
    </div>
  );
}

  return (
    <div className="app-container">
      <header>
        <div className="header-content">
          <h1>BudgetMein</h1>
          <p>Fast Food Delivery in Jahangirpuri, Delhi</p>
          <div className="cart-icon" onClick={() => document.querySelector('.cart-section').scrollIntoView({behavior: 'smooth'})}>
            🛒 <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
          </div>
        </div>
      </header>

      <nav className="category-nav">
        {menu.map((category, index) => (
          <button
            key={index}
            className={selectedCategory === category.category ? "active" : ""}
            onClick={() => setSelectedCategory(category.category)}
          >
            {category.category}
          </button>
        ))}
      </nav>

      <section className="menu-section">
        {menu
          .filter(category => category.category === selectedCategory)
          .map((category, catIndex) => (
            <div key={catIndex}>
              <h2>{category.category}</h2>
              <div className="menu-grid">
                {category.items.map((item, index) => (
                  <div key={index} className="menu-card">
                    <div className="menu-image-container">
                      <img src={item.image} alt={item.name} className="menu-image"/>
                      <div className="item-badge">🔥 Popular</div>
                    </div>
                    <div className="menu-card-content">
                      <h3>{item.name}</h3>
                      {item.sizes ? (
                        <select
                          defaultValue={item.sizes[0].size}
                          onChange={(e) => {
                            item.selectedSize = e.target.value;
                            item.selectedPrice = item.sizes.find(s => s.size === e.target.value).price;
                          }}
                          className="size-selector"
                        >
                          {item.sizes.map((size, sIndex) => (
                            <option key={sIndex} value={size.size}>
                              {size.size} - ₹{size.price}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="item-price">₹{item.price}</p>
                      )}
                      <button
                        className="add-cart-btn"
                        onClick={(e) => addToCart({
                          name: item.name + (item.selectedSize ? ` (${item.selectedSize})` : ''),
                          price: item.selectedPrice || item.sizes?.[0]?.price || item.price,
                          image: item.image
                        }, e.currentTarget)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </section>

      <section className="cart-section">
        <div className="cart-container">
          <h2>Your Cart {cart.length > 0 && `(${cart.reduce((total, item) => total + item.quantity, 0)} items)`}</h2>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <small>Add some delicious food from our menu!</small>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image"/>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>₹{item.price} × {item.quantity}</p>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>×</button>
                </div>
              ))}
            </div>
          )}
          
          {cart.length > 0 && (
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{calculateTotal().subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Tax ({TAX_PERCENTAGE}%):</span>
                <span>₹{calculateTotal().tax}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee:</span>
                <span>₹{calculateTotal().delivery}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{calculateTotal().total}</span>
              </div>
              
              <div className="delivery-info">
                <p>🚚 Estimated delivery time: 30-45 minutes</p>
              </div>
              
              <button className="place-order-btn" onClick={placeOrder}>
                Place Order - ₹{calculateTotal().total}
              </button>
            </div>
          )}
        </div>
      </section>

      <footer>
        <p>© 2024 BudgetMein - Fast Food Delivery</p>
        <p>Jahangirpuri, Delhi | Contact: +91 XXXXX XXXXX</p>
      </footer>
    </div>
  );
}