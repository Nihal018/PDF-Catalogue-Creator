import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // We'll use this for the API endpoint
}

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
