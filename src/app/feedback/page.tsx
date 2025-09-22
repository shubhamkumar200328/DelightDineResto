'use client';

import React, { useState } from 'react';

const StarIcon = ({
  filled,
  onClick,
}: {
  filled: boolean;
  onClick: () => void;
}) => (
  <svg
    onClick={onClick}
    className={`w-8 h-8 cursor-pointer ${
      filled ? 'text-yellow-400' : 'text-gray-300'
    } transition-colors duration-200`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    orderId: '',
    orderDate: '',
    suggestion: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.orderId || rating === 0) {
      alert('Please fill in the Order ID and provide a rating.');
      return;
    }
    const feedbackData = { ...formData, rating };
    console.log('Feedback Submitted:', feedbackData);
    // Here you would typically send the data to your server
    alert('Thank you for your feedback!');
    setFormData({ orderId: '', orderDate: '', suggestion: '' });
    setRating(0);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Give Feedback & Earn Rewards!
          </h1>
          <p className="text-gray-500 mt-2">
            Provide your honest feedback about your order to earn cashback.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order ID and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="orderId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Food Order ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="orderId"
                name="orderId"
                value={formData.orderId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="e.g., #12345"
                required
              />
            </div>
            <div>
              <label
                htmlFor="orderDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Order
              </label>
              <input
                type="date"
                id="orderDate"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Rating Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div
              className="flex items-center space-x-1"
              onMouseLeave={() => setHoverRating(0)}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} onMouseEnter={() => setHoverRating(star)}>
                  <StarIcon
                    filled={star <= (hoverRating || rating)}
                    onClick={() => setRating(star)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Suggestion Textarea */}
          <div>
            <label
              htmlFor="suggestion"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Suggestions / Comments
            </label>
            <textarea
              id="suggestion"
              name="suggestion"
              rows={4}
              value={formData.suggestion}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Tell us how we can improve..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
            >
              Submit Feedback
            </button>
          </div>
        </form>

        {/* Footer / Instructions */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-600">
          <h3 className="font-semibold text-gray-700 mb-2">
            Cashback Details:
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Submit feedback within 48 hours of your order to be eligible.
            </li>
            <li>Receive a flat ₹5 Cashback or up to 10 Delight Dine Coins.</li>
            <li>Your feedback helps us serve you better. Thank you!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
