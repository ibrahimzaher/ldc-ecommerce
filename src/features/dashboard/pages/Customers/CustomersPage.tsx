import { useState } from "react";
import { useGetAllCustomers } from "../../hooks/useGetAllCustomers";
import { DataTable } from "../../components/DataTable";
import type { User } from "@/features/auth/types/authResponse";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export const CustomersPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, isError } = useGetAllCustomers({
    pageNumber: page,
    pageSize,
  });
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const customers = data?.data.items || [];
  const totalPages = data?.data.totalPages || 1;
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-800 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Name
          <ArrowUpDown size={12} />
        </button>
      ),
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="max-w-37.5 truncate" title={customer.name}>
            {customer.name}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const customer = row.original;
        return <span title={customer.email}>{customer.email}</span>;
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        const customer = row.original;
        return <span title={customer.phone}>{customer.phone}</span>;
      },
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="max-w-37.5 truncate" title={customer.address}>
            {customer.address}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const customer = row.original;
        const createdAt = new Date(customer.createdOn).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          },
        );
        return <span title={createdAt}>{createdAt}</span>;
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <span
            className={cn("px-2 py-1 rounded-full text-white", {
              "bg-green-500": customer.status === "Active",
              "bg-red-500": customer.status !== "Active",
            })}
          >
            {customer.status === "Active" ? "Active" : "Block"}
          </span>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="flex gap-2">
            <button
              className="text-red-500 hover:underline"
              onClick={() => {
                console.log("Delete customer", customer.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading customers.</div>;
  }
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <DataTable
        columns={columns}
        pageSize={pageSize}
        pageCount={totalPages}
        pageIndex={page - 1}
        onPageChange={handlePageChange}
        data={customers}
      />
    </>
  );
};
