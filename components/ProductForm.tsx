"use client";

import { useState, useEffect } from "react";

// Product type
type Product = {
  name: string;
  price: number;
  description: string;
  image?: string;
};

// Form values type
type ProductFormValues = {
  name: string;
  price: string;
  description: string;
  image: string;
};

// Props for the ProductForm component
type ProductFormProps = {
  onSubmit: (product: Product) => void;
  editingProduct: Product | null;
};

// Initial form values for resetting the form
const initialFormValues: ProductFormValues = {
  name: "",
  price: "",
  description: "",
  image: "",
};

// ProductForm component for adding and editing products
export default function ProductForm({ onSubmit, editingProduct }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormValues>({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  // Update form values when editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        price: String(editingProduct.price),
        description: editingProduct.description,
        image: editingProduct.image ?? "",
      });
    } else {
      setForm(initialFormValues);
    }
  }, [editingProduct]);

  // Handle form submission for adding or updating a product
  const handleSubmit = () => {
    if (!form.name || !form.price) {
      alert("Name and price are required");
      return;
    }

    onSubmit({
      name: form.name,
      price: Number(form.price),
      description: form.description,
      image: form.image || undefined,
    });
    setForm(initialFormValues);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6 space-y-3">

      <input
        className="w-full border p-2"
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="w-full border p-2"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <textarea
        className="w-full border p-2"
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        className="w-full border p-2"
        placeholder="Image URL (optional)"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </div>
  );
}