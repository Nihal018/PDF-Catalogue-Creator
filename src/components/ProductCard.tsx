import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // We'll use this for the API endpoint
}

const ProductCard = ({ product }: { product: Product }) => (
  <div className="border p-4 rounded-lg shadow-md">
    <div className="relative w-full h-48 mb-4">
      <Image
        src={product.imageUrl}
        alt={product.name}
        layout="fill"
        objectFit="cover"
        className="rounded-t-lg"
      />
    </div>
    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
    <p className="text-gray-600 mb-2">{product.description}</p>
    <p className="text-lg font-bold text-green-600">
      ${product.price.toFixed(2)}
    </p>
  </div>
);

export default ProductCard;
