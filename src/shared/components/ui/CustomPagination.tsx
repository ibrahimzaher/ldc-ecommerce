import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CustomPaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 3;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= maxVisible) {
      pages.push(1, 2, 3, "ellipsis", totalPages - 2, totalPages - 1, totalPages);
    } else if (currentPage > totalPages - maxVisible) {
      pages.push(1, 2, 3, "ellipsis", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis",
        totalPages,
      );
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <Pagination className="mt-10 border-t border-gray-100 pt-5">
      <PaginationContent className="flex w-full items-center justify-between">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </PaginationPrevious>
        </PaginationItem>

        <div className="flex items-center gap-1.5">
          {pages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "ellipsis" ? (
                <PaginationEllipsis className="text-gray-400" />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page as number);
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-[#F0EEED] text-black hover:bg-[#E2E0DF]"
                      : "text-gray-400 hover:bg-gray-50 hover:text-black"
                  }`}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-50"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}