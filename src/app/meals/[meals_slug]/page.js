'use client';

import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

const PLACEHOLDER_DATA = {
  description:
    'A delicious meal, freshly prepared with high-quality ingredients.',
  imageUrl: 'https://placehold.co/400x300/FACC15/FFFFFF?text=Delicious+Meal',
};

function Page() {
  const [mealName, setMealName] = useState('');
  const [mealPrice, setMealPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const price = urlParams.get('price');

    if (name) {
      setMealName(decodeURIComponent(name));
    }
    if (price) {
      setMealPrice(parseFloat(price));
    }
  }, []);

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleOrder = () => {
    if (mealName && mealPrice > 0) {
      alert(
        `Order placed for ${quantity} x ${mealName}! Total: $${(
          quantity * mealPrice
        ).toFixed(2)}`,
      );
    } else {
      alert('Please select a valid meal.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col font-sans">
      <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex items-center justify-center p-6 bg-orange-100">
            <img
              src={PLACEHOLDER_DATA.imageUrl}
              alt={mealName || 'Meal'}
              className="w-full h-auto object-cover rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="lg:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {mealName || 'Meal Not Found'}
            </h1>
            <p className="text-3xl font-bold text-orange-600 mb-6">
              ${mealPrice.toFixed(2)}
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              {PLACEHOLDER_DATA.description}
            </p>

            <div className="flex items-center mb-8">
              <span className="text-gray-800 text-lg font-semibold mr-4">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-3 bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                >
                  <FaMinus />
                </button>
                <span className="px-6 text-xl font-bold text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-3 bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <button
              onClick={handleOrder}
              className="w-full flex items-center justify-center bg-orange-500 text-white font-bold text-xl py-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              <FaShoppingCart className="mr-3" />
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
