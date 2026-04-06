"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Product type
type Product = {
  name: string;
  price: number;
  description: string;
  image?: string;
};

// Props for the ProductList component
type ProductListProps = {
  products: Product[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

// ProductList component for displaying the list of products with edit and delete options
export default function ProductList({
  products,
  onEdit,
  onDelete,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <Card className="rounded-3xl border-dashed border-blue-300 bg-white/80 p-8 text-center shadow-sm">
        <p className="text-lg font-medium text-slate-700">No products found</p>
        <p className="mt-1 text-sm text-slate-500">Add your first item to get started.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {products.map((p, index) => (
        <Card
          key={index}
          className="flex h-full justify-between gap-4 rounded-2xl border-blue-200 bg-white/90 p-5 shadow-md shadow-blue-200/30 transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="min-w-0 flex-1">
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                className="mb-3 h-24 w-full rounded-xl border border-blue-100 object-cover"
              />
            )}
            <h2 className="truncate text-lg font-bold text-slate-900">{p.name}</h2>
            <p className="mt-1 text-base font-semibold text-blue-700">${p.price.toFixed(2)}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-2">
            <Button
              onClick={() => onEdit(index)}
              className="rounded-lg border border-blue-200 bg-blue-50 px-3 text-blue-800 hover:bg-blue-100"
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(index)}
              className="rounded-lg bg-blue-600 px-3 text-white hover:bg-blue-700"
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}