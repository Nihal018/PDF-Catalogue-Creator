import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfCatalogue from "./PdfCatalogue"; // Import the PDF template component
import { getProducts } from "../app/actions";
import dynamic from "next/dynamic";
// Sample data
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // Changed from imageUrl to match PdfCatalogue prop
}

interface Template {
  id: string;
  name: string;
  layout: {
    type: string;
    position: string;
    fields: string[];
  }[];
}

const templates: Template[] = [
  {
    id: "template1",
    name: "Minimalist Two Product",
    layout: [
      {
        type: "product",
        position: "left",
        fields: ["imageUrl", "name", "description", "price"],
      },
      {
        type: "product",
        position: "right",
        fields: ["imageUrl", "name", "description", "price"],
      },
    ],
  },
  {
    id: "template2",
    name: "Minimalist Three Product",
    layout: [
      {
        type: "product",
        position: "top-left",
        fields: ["imageUrl", "name", "description", "price"],
      },
      {
        type: "product",
        position: "top-right",
        fields: ["imageUrl", "name", "description", "price"],
      },
      {
        type: "product",
        position: "bottom",
        fields: ["imageUrl", "name", "description", "price"],
      },
    ],
  },
  // Add more templates as needed
];

// Dynamically import TemplatePreview with no SSR
const TemplatePreview = dynamic(() => import("./TemplatePreview"), {
  ssr: false,
});

const ProductCatalogueDesigner: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    templates[0]
  );
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const handler = async () => {
      const response: Product[] = await getProducts();
      setProducts(response);
    };
    handler();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Catalogue Designer</h1>
      <select
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        onChange={(e) => {
          const template = templates.find((t) => t.id === e.target.value);
          setSelectedTemplate(template || templates[0]);
        }}
      >
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
      {selectedTemplate && (
        <div className="mt-4">
          <TemplatePreview template={selectedTemplate} products={products} />
          <div className="mt-4">
            <PDFDownloadLink
              document={
                <PdfCatalogue template={selectedTemplate} products={products} />
              }
              fileName="catalogue.pdf"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download PDF"
              }
            </PDFDownloadLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalogueDesigner;
