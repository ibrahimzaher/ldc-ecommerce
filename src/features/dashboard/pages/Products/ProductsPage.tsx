import placeholderImage from "@/assets/images/placeholder.png";
import { useAppSelector } from "@/core/store/store";
import { useGetProducts } from "@/features/ecommerce/hooks/useProducts";
import type { Product } from "@/features/ecommerce/types/product.types";
import { Button } from "@/shared/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { DataTable } from "../../components/DataTable";

export const ProductsPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading } = useGetProducts(user?.id || "", page, pageSize);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-800 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown size={12} />
        </button>
      ),
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={product.productImages?.[0]?.url || placeholderImage}
              alt={product.name}
              className="w-10 h-10 object-cover rounded-lg bg-slate-100 shrink-0"
            />
            <span className="font-semibold text-slate-800 line-clamp-1">
              {product.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Category",
      cell: ({ row }) => (
        <span className="capitalize text-slate-500 font-medium">
          {row.original.type || "General"}
        </span>
      ),
    },
    {
      accessorKey: "stockQuantity",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-800 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown size={12} />
        </button>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-slate-700">
          {row.original.stockQuantity}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-800 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown size={12} />
        </button>
      ),
      cell: ({ row }) => (
        <span className="font-bold text-slate-800">
          ${row.original.amount?.toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span
            className={`px-2.5 py-1 text-xs  font-semibold truncate rounded-full border ${
              status === "InStock"
                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                : "bg-rose-50 text-rose-500 border-rose-200"
            }`}
          >
            {status === "InStock" ? "In Stock" : "Out of Stock"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex justify-center gap-2 text-slate-400">
            <button
              onClick={() => console.log("Edit product:", product.id)}
              className="hover:text-amber-600 p-1 transition-colors"
              title="Edit"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => console.log("Delete product:", product.id)}
              className="hover:text-rose-600 p-1 transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row mb-5 sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Products
        </h1>

        <Button>
          <Plus size={18} /> Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 text-sm">
          Loading products...
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data?.data?.items || []}
          pageCount={data?.data?.totalPages || 1}
          pageIndex={page - 1}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </>
  );
};
