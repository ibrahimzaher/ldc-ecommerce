import { useState } from "react";
import { useGetAllCustomers } from "../../hooks/useGetAllCustomers";
import { DataTable } from "../../components/DataTable";
import type { User } from "@/features/auth/types/authResponse";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useDeleteCustomer } from "../../hooks/useDeleteCustomer";
import { ConfirmDialog } from "../../components/ConfirmDialog";

export const CustomersPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading } = useGetAllCustomers({
    pageNumber: page,
    pageSize,
  });
  const { mutate: deleteCustomer } = useDeleteCustomer();
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
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
                setSelectedCustomer(customer);
                setOpen(true);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      {isLoading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 text-sm">
          Loading customers...
        </div>
      ) : (
        <DataTable
          columns={columns}
          pageSize={pageSize}
          pageCount={totalPages}
          pageIndex={page - 1}
          onPageChange={handlePageChange}
          data={customers}
        />
      )}
      <ConfirmDialog
        isOpen={open}
        onCancel={() => {
          setOpen(false);
          setSelectedCustomer(null);
        }}
        onConfirm={() => {
          if (selectedCustomer) {
            deleteCustomer(selectedCustomer.id);
            setOpen(false);
          }
        }}
        setIsOpen={setOpen}
        key={"Delete Customer"}
        description="Are you sure you want to delete this customer? This action cannot be undone."
        title="Delete Customer"
      />
    </>
  );
};
