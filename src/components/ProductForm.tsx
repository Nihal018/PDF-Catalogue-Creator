// components/ProductForm.tsx
import { useState } from "react";

const ProductForm = ({ onSave }) => {
  const [product, setProduct] = useState({ name: "", price: "", image: "" });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSave(product);
    setProduct({ name: "", price: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border">
      <input
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 mb-2 w-full"
      />
      <input
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 mb-2 w-full"
      />
      <input
        name="image"
        value={product.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
