"use client";

import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

// Product type
type Product = {
  name: string;
  price: number;
  description: string;
  image?: string;
};

// Main component
export default function Home() {
  // State definitons
  const [products, setProducts] = useState<Product[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  // Load from localStorage
  useEffect(() => {
    const data = localStorage.getItem("products");
    if (data) setProducts(JSON.parse(data));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Add or update product
  const addOrUpdateProduct = (product: Product) => {
    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = product;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      setProducts([...products, product]);
    }
  };

  // Edit product
  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  // Delete product
  const handleDelete = (index: number) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Product Manager
        </h1>

        {/* Search */}
        <input
          className="w-full p-2 border mb-4"
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <ProductForm
          onSubmit={addOrUpdateProduct}
          editingProduct={editingIndex !== null ? products[editingIndex] : null}
        />

        <ProductList
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>
    </div>
  );
}