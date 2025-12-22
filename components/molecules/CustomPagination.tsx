import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface CustomPaginationProps {
  handlePageChange: (currentPage: number) => void;
  currentPage: number;
  totalPages: number;
}

const CustomPagination = ({
  handlePageChange,
  currentPage,
  totalPages,
}: CustomPaginationProps) => {
  return (
    <Pagination className="m-0 justify-start">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className="hover:bg-white hover:text-green-600"
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={currentPage === page}
              onClick={() => handlePageChange(page)}
              className={cn(
                "h-9 w-9 rounded-lg transition-all",
                currentPage === page
                  ? "bg-primary-green text-white hover:bg-green-600"
                  : "hover:bg-green-100 hover:text-green-600"
              )}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            className="hover:bg-white hover:text-green-600"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
