'use client';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">Oops! Page not found.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
      >
        Go back to Home
      </Link>
    </div>
  );
}
