"use client";
import React from "react";
import dynamic from "next/dynamic";
import PdfCatalogue from "./PdfCatalogue"; // Assuming you have types defined in a separate file

// Dynamically import PDFViewer with no SSR
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
  }
);

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

interface TemplatePreviewProps {
  template: Template;
  products: Product[];
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  template,
  products,
}) => (
  <PDFViewer style={{ width: "100%", height: "500px" }}>
    <PdfCatalogue template={template} products={products} />
  </PDFViewer>
);

export default TemplatePreview;
