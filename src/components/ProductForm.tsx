import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // We'll use this for the API endpoint
}

function ProductForm({
  onSubmit,
}: {
  onSubmit: (formData: FormData) => Promise<void>;
}) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md my-4"
    >
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          required
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold text-gray-700">
          Description
        </label>
        <input
          type="text"
          name="description"
          required
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold text-gray-700">
          Price
        </label>
        <input
          type="number"
          name="price"
          step="0.01"
          required
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold text-gray-700">
          Product Image
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;
