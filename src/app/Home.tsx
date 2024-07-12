import { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { Product, getProducts, addProduct } from "./page";

export const Home = () => {
  const [products, setProducts] = useState([] as Product[]);
  useEffect(() => {
    const handler = async () => {
      const response: Product[] = await getProducts();
      setProducts(response);
    };
    handler();
  }, []);

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
      <div>
        <ProductForm onSave={addProduct} />
      </div>
      <div>
        <ProductList />
      </div>
    </div>
  );
};
