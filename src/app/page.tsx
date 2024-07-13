"use client";

import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { getProducts, addProduct } from "./actions";
import { API_BASE_URL } from "../config";
import ProductCatalogueDesigner from "../components/ProductCatalogueDesigner";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // We'll use this for the API endpoint
}

const Home = () => {
  const [products, setProducts] = useState([] as Product[]);
  useEffect(() => {
    const handler = async () => {
      const response: Product[] = await getProducts();
      setProducts(response);
    };
    handler();
  }, []);

  const onSave = async (formData: FormData) => {
    const response = await addProduct(formData);
    setProducts((oldState) => {
      return { ...oldState, response };
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">
        Welcome to PDF Catalogue Creator
      </h2>
      <p className="text-gray-700 mb-8">
        Create and customize your product catalogues with ease.
      </p>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow">
          <h3 className="text-xl font-semibold">Step 1: Add Products</h3>
          <p className="text-gray-600">
            Add your products to the catalogue using the interactive form.
          </p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="text-xl font-semibold">Step 2: Customize Layout</h3>
          <p className="text-gray-600">
            Select a template and customize the layout of your catalogue.
          </p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="text-xl font-semibold">Step 3: Generate PDF</h3>
          <p className="text-gray-600">
            Generate a high-fidelity PDF of your catalogue for printing or
            sharing.
          </p>
        </div>
      </div>

      <div className="bg-blue-500 text-white py-2 px-4 w-44 my-4 flex-1 justify-center align-middle rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        <a href="http://localhost:3000/">Choose Template</a>
      </div>
      <div>
        <ProductForm onSubmit={onSave} />
      </div>
      <div>
        <ProductList products={products} />
      </div>
      <div>
        <ProductCatalogueDesigner />
      </div>
    </div>
  );
};

export default Home;
