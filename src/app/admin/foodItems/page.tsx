'use client';
import React, {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  useRef,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';

// --- SVG Icons ---
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);
const BinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// --- Type Definitions ---
interface FoodItem {
  _id: string;
  title: string;
  subtitle: string;
  discount: number;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface AddFoodFormData {
  title: string;
  subtitle: string;
  discount: string;
  price: string;
  quantity: string;
}

// --- Add Food Form Component ---
const AddFoodForm = ({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AddFoodFormData>({
    title: '',
    subtitle: '',
    discount: '',
    price: '',
    quantity: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error('Please select an image file.');
      return;
    }
    setLoading(true);

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });
    submissionData.append('image', imageFile);

    try {
      const res = await fetch('/api/admin/foods', {
        method: 'POST',
        body: submissionData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add item.');

      toast.success('Food item added successfully!');
      onSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'An error occurred.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Add New Food Item
          </h2>
          <button type="button" onClick={onCancel} className="p-1">
            <CloseIcon />
          </button>
        </div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          value={formData.subtitle}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount %"
            value={formData.discount}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          onChange={handleFileChange}
          ref={fileInputRef}
          className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Adding...' : 'Add Food Item'}
        </button>
      </form>
    </div>
  );
};

// --- Main Page Component ---
export default function FoodItemsPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchFoodItems = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/foods', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch food items.');
      const data = await res.json();
      setFoodItems(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'An unknown error occurred.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const openEditModal = (foodItem: FoodItem) => {
    setEditingFood(foodItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingFood(null);
    setImageFile(null);
    setIsModalOpen(false);
  };

  const handleModalInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editingFood) return;
    const { name, value } = e.target;
    const numValue = ['price', 'discount', 'quantity'].includes(name)
      ? value === ''
        ? ''
        : Number(value)
      : value;
    setEditingFood({ ...editingFood, [name]: numValue });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImageFile(e.target.files[0]);
  };

  const handleUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingFood) return;

    const formData = new FormData();
    formData.append('title', editingFood.title);
    formData.append('subtitle', editingFood.subtitle);
    formData.append('discount', String(editingFood.discount));
    formData.append('price', String(editingFood.price));
    formData.append('quantity', String(editingFood.quantity));
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await fetch(`/api/admin/foods?id=${editingFood._id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to update item.');

      toast.success('Food item updated successfully!');
      fetchFoodItems();
      closeModal();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Update failed.');
    }
  };

  const performDelete = async (id: string) => {
    toast.dismiss();
    try {
      const res = await fetch(`/api/admin/foods?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete item.');
      }
      toast.success('Food item deleted successfully!');
      setFoodItems((items) => items.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Deletion failed.');
    }
  };

  const handleDelete = (id: string) => {
    const CustomConfirm = ({
      onConfirm,
      onCancel,
    }: {
      onConfirm: () => void;
      onCancel: () => void;
    }) => (
      <div className="text-center">
        <p className="mb-4">Are you sure? This is irreversible.</p>
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white px-4 py-2 rounded mr-2 hover:bg-red-700"
        >
          Yes, Delete
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    );
    toast(
      <CustomConfirm
        onConfirm={() => performDelete(id)}
        onCancel={() => toast.dismiss()}
      />,
      { autoClose: false, closeOnClick: false, closeButton: false },
    );
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        {showAddForm ? (
          <AddFoodForm
            onSuccess={() => {
              setShowAddForm(false);
              fetchFoodItems();
            }}
            onCancel={() => setShowAddForm(false)}
          />
        ) : (
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Food Items
            </h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              <PlusIcon /> Add New
            </button>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {foodItems.length > 0 ? (
              foodItems.map((item) => (
                <li
                  key={item._id}
                  className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-semibold text-lg">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.subtitle}</p>
                      <p className="text-sm text-gray-700">
                        Price: ${Number(item.price).toFixed(2)} | Qty:{' '}
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 self-end md:self-auto">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 text-blue-600 hover:text-blue-800"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <BinIcon />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center p-8 text-gray-500">
                No food items found. Add one to get started!
              </p>
            )}
          </ul>
        </div>

        {isModalOpen && editingFood && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <CloseIcon />
              </button>
              <h2 className="text-2xl font-bold mb-6">Edit Food Item</h2>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={editingFood.title}
                  onChange={handleModalInputChange}
                  placeholder="Title"
                  required
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="text"
                  name="subtitle"
                  value={editingFood.subtitle}
                  onChange={handleModalInputChange}
                  placeholder="Subtitle"
                  className="w-full p-3 border rounded-lg"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="number"
                    name="price"
                    value={editingFood.price}
                    onChange={handleModalInputChange}
                    placeholder="Price"
                    required
                    step="0.01"
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="number"
                    name="discount"
                    value={editingFood.discount}
                    onChange={handleModalInputChange}
                    placeholder="Discount %"
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="number"
                    name="quantity"
                    value={editingFood.quantity}
                    onChange={handleModalInputChange}
                    placeholder="Quantity"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Change Image (Optional)
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full text-sm mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer key="food-item-toast" />
    </>
  );
}
