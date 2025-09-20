'use client';
import { useState } from 'react';

export default function AddFood() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch('/api/foods', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setLoading(false);
    alert(data.message || 'Error');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="subtitle"
        placeholder="Subtitle"
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="discount"
        placeholder="Discount %"
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        required
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        className="border p-2 w-full"
      />
      <input type="file" name="image" accept="image/*" required />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Uploading...' : 'Add Food'}
      </button>
    </form>
  );
}
