"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"

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
      toast.error("Name and price are required");
      return;
    }

    const isUpdate = editingProduct !== null;
    onSubmit({
      name: form.name,
      price: Number(form.price),
      description: form.description,
      image: form.image || undefined,
    });
    setForm(initialFormValues);
    
    if (isUpdate) {
      toast.success("Product updated successfully!");
    } else {
      toast.success("Product added successfully!");
    }
  };

  // Handle image file upload and store as a string value
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setForm((prevForm) => ({ ...prevForm, image: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-6 rounded-3xl border border-blue-200/70 bg-white/90 p-5 shadow-lg shadow-blue-200/40 backdrop-blur sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Fill in the details below
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-900">Product Name</label>
          <Input
            className="border-blue-200 bg-white text-slate-900 placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-blue-300"
            placeholder="Enter product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-900">Price</label>
          <Input
            className="border-blue-200 bg-white text-slate-900 placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-blue-300"
            placeholder="Enter price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-900">Description</label>
          <Textarea
            className="min-h-24 border-blue-200 bg-white text-slate-900 placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-blue-300"
            placeholder="Enter product description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-900">Image URL</label>
          <Input
            className="border-blue-200 bg-white text-slate-900 placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-blue-300"
            placeholder="Enter image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-900">Upload Image</label>
          <Input
            className="cursor-pointer border-blue-200 bg-white text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-blue-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-200"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="h-11 w-full rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-300 transition hover:from-blue-700 hover:to-cyan-600"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </div>
  );
}