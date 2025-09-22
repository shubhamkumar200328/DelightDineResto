'use client';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const notify = () => toast('Your table Reserved successfully!');

function ReservationPage({ params = {} }) {
  const unwrappedParams = React.use(params);

  const reservationType = unwrappedParams.reservationform || 'Standard';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    requests: '',
  });

  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!formData.date) newErrors.date = 'Reservation date is required.';
    if (!formData.time) newErrors.time = 'Reservation time is required.';
    if (!formData.guests) {
      newErrors.guests = 'Number of guests is required.';
    } else if (+formData.guests < 1 || +formData.guests > 20) {
      newErrors.guests = 'Guests must be between 1 and 20.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      console.log('Reservation Submitted:', formData);
      toast.success('Your table has been reserved successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        requests: '',
      });
      setErrors({});
    } else {
      toast.error('Please fix the errors before submitting.');
    }
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Table Reservation
            </h1>
            <p className="text-gray-500 mt-2">
              Book a table for our{' '}
              <span className="font-semibold text-blue-600">
                {reservationType}
              </span>{' '}
              dining experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="9876543210"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  min={today}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="guests"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Guests
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  min="1"
                  max="20"
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2"
                />
                {errors.guests && (
                  <p className="text-red-500 text-xs mt-1">{errors.guests}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="requests"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Special Requests (Optional)
              </label>
              <textarea
                id="requests"
                name="requests"
                value={formData.requests}
                rows={4}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., window seat, high chair"
              />
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
              >
                Book Table
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ReservationPage;
