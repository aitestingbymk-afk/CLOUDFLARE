import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Header = ({ cartCount }) => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">BudgetMein Delivery</h1>
        <div className="flex items-center">
          <FaShoppingCart className="text-2xl text-orange-600" />
          <span className="ml-1 bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
            {cartCount}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;