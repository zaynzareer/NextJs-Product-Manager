"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";
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
    const deleted = products[index];
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    toast.success(`${deleted.name} deleted successfully!`);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-blue-100 to-indigo-200 p-4 sm:p-6 lg:p-10">
      <Toaster position="top-right" richColors />
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-3xl border border-blue-200/70 bg-white/80 p-6 shadow-xl shadow-blue-200/40 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Inventory Dashboard
              </p>
              <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
                Product Manager
              </h1>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Create and update your product catalog.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <input
            className="w-full rounded-2xl border border-blue-300 bg-white/95 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200 placeholder:text-slate-500"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

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