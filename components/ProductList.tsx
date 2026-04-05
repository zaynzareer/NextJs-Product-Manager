"use client";

type Product = {
  name: string;
  price: number;
  description: string;
  image?: string;
};

type ProductListProps = {
  products: Product[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export default function ProductList({
  products,
  onEdit,
  onDelete,
}: ProductListProps) {
  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products found</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {products.map((p, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded shadow flex justify-between"
        >
          <div>
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                className="w-20 h-20 object-cover mb-2"
              />
            )}
            <h2 className="font-bold text-lg">{p.name}</h2>
            <p className="text-green-600">${p.price}</p>
            <p className="text-sm text-gray-600">{p.description}</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => onEdit(index)}
              className="bg-yellow-400 px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}