import { useState } from "react";
import { useGetAllOrders } from "../../hooks/useGetAllOrders";
import { DataTable } from "../../components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";
import type { Order } from "@/features/ecommerce/types/orders.types";

export const OrdersDashboardPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError } = useGetAllOrders({
    pageNumber: page,
    pageSize,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const orders = data?.data?.items || [];
  const totalPages = data?.data?.totalPages || 1;

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-800 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order ID
          <ArrowUpDown size={12} />
        </button>
      ),
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="max-w-37.5 truncate" title={order.id}>
            {order.id}
          </div>
        );
      },
    },
    {
      accessorKey: "customerId",
      header: "Customer ID",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="max-w-37.5 truncate" title={order.customerId}>
            {order.customerId}
          </div>
        );
      },
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-800 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Amount
          <ArrowUpDown size={12} />
        </button>
      ),
      cell: ({ row }) => (
        <span className="font-bold text-slate-800">
          ${row.original.totalAmount?.toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "createdOn",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.original.createdOn).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          },
        );
        return <span className="text-slate-500">{date}</span>;
      },
    },
    {
      accessorKey: "orderItems",
      header: "Total Items",
      cell: ({ row }) => {
        const items = row.original.orderItems || [];
        const totalQuantity = items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );

        return (
          <span className="font-medium text-slate-700">
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: () => {
        return (
          <div className="flex justify-center gap-2 text-slate-400">
            <button
              onClick={() => {}}
              className="hover:text-rose-600 p-1 transition-colors cursor-pointer"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 text-sm">
        Loading orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-rose-500 text-sm">
        Error loading orders.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row mb-5 sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Orders Dashboard
        </h1>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        pageCount={totalPages}
        pageIndex={page - 1}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
};
