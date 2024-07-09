// components/ProductCard.tsx

import Image from "next/image";

interface Product {
  name: string;
  image: string;
  price: string;
}

const ProductCard = ({ product }: { product: Product }) => (
  <div className="border p-4">
    <Image
      src={product.image}
      alt={product.name}
      className="w-full h-32 object-cover"
    />
    <h2 className="text-lg">{product.name}</h2>
    <p className="text-gray-500">${product.price}</p>
  </div>
);

export default ProductCard;
