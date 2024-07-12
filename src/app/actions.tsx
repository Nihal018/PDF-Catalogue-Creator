"use server";

import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { POST } from "./api/products/route";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // We'll use this for the API endpoint
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const products: Product[] = await response.json();
  // Add imageUrl to each product
  return products.map((product) => ({
    ...product,
    imageUrl: `${API_BASE_URL}/api/products/${product.id}/image`,
  }));
};

export async function addProduct(formData: FormData): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to add product");
  }
  const newProduct: Product = await response.json();
  // Add imageUrl to the new product
  return {
    ...newProduct,
    imageUrl: `${API_BASE_URL}/api/products/${newProduct.id}/image`,
  };
}

export const deleteProduct = async (
  productId: number
): Promise<{ success: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
  return await response.json();
};

export const updateProduct = async (
  id: number,
  product: Omit<Product, "id" | "imageUrl">,
  image?: File
): Promise<Product> => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price.toString());

  if (image) {
    formData.append("image", image);
  }

  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to update product");
  }
  const updatedProduct: Product = await response.json();
  // Add imageUrl to the updated product
  return {
    ...updatedProduct,
    imageUrl: `${API_BASE_URL}/api/products/${updatedProduct.id}/image`,
  };
};
