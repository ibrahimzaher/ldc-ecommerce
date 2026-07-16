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

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 3;
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= maxVisible) {
        pages.push(
          1,
          2,
          3,
          "ellipsis",
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else if (currentPage > totalPages - maxVisible) {
        pages.push(
          1,
          2,
          3,
          "ellipsis",
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
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
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <Pagination className="border-t border-gray-100 pt-5 mt-10">
      <PaginationContent className="w-full flex justify-between items-center">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className="border border-gray-200 rounded-xl px-4 py-2 hover:bg-gray-50 text-black font-medium text-sm transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
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
                  className={`w-9 h-9 flex items-center justify-center font-medium text-sm transition rounded-lg ${
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
            className="border border-gray-200 rounded-xl px-4 py-2 hover:bg-gray-50 text-black font-medium text-sm transition"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
