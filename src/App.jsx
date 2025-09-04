// App.jsx - COMPLETE UPDATED CODE
import React, { useState } from 'react';
import Header from './components/Checkout/Header';
import Menu from './components/Menu/Menu';
import CartSidebar from './components/Cart/CartSidebar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PhoneLogin from './components/Auth/PhoneLogin';
import AddressForm from './components/Checkout/AddressForm';
import Modal from './components/shared/Modal.jsx';
import "./styles/App.css";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authMethod, setAuthMethod] = useState('email');
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? {...item, quantity: item.quantity + 1} 
          : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? {...item, quantity: newQuantity} 
          : item
      ));
    }
  };

  const handleCheckout = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      setAuthMode('login');
      setAuthMethod('email');
    } else {
      setIsAddressFormOpen(true);
    }
  };

  return (
    <div className="App">
      <Header 
        cartItemsCount={cart.reduce((total, item) => total + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => {
          setIsAuthModalOpen(true);
          setAuthMode('login');
          setAuthMethod('email');
        }}
        user={user}
        setUser={setUser}
      />
      
      <main>
        <Menu addToCart={addToCart} />
      </main>

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateCartItemQuantity}
        onCheckout={handleCheckout}
      />

      {isAuthModalOpen && (
        <Modal onClose={() => setIsAuthModalOpen(false)}>
          {authMethod === 'email' ? (
            authMode === 'login' ? (
              <Login 
                onSwitchToRegister={() => setAuthMode('register')}
                onSwitchToPhone={() => setAuthMethod('phone')}
                onSuccess={(userData) => {
                  setUser(userData);
                  setIsAuthModalOpen(false);
                }}
              />
            ) : (
              <Register 
                onSwitchToLogin={() => setAuthMode('login')}
                onSuccess={(userData) => {
                  setUser(userData);
                  setIsAuthModalOpen(false);
                }}
              />
            )
          ) : (
            <PhoneLogin
              onSwitchToEmail={() => setAuthMethod('email')}
              onSuccess={(userData) => {
                setUser(userData);
                setIsAuthModalOpen(false);
              }}
            />
          )}
        </Modal>
      )}

      {isAddressFormOpen && (
        <Modal onClose={() => setIsAddressFormOpen(false)}>
          <AddressForm 
            user={user}
            cart={cart}
            onOrderSuccess={() => {
              setIsAddressFormOpen(false);
              setCart([]);
              alert('Order placed successfully!');
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;