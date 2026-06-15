import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@wearemobi/ui';

export interface MobiPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export const MobiPagination: React.FC<MobiPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  const renderPages = () => {
    const pages = [];
    const maxVisiblePages = siblingCount * 2 + 1;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      const start = Math.max(2, currentPage - siblingCount);
      const end = Math.min(totalPages - 1, currentPage + siblingCount);

      if (start > 2) {
        pages.push('ellipsis-start');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('ellipsis-end');
      }

      pages.push(totalPages);
    }

    return pages.map((page, idx) => {
      if (page === 'ellipsis-start' || page === 'ellipsis-end') {
        return (
          <PaginationItem key={`${page}-${idx}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      return (
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            role="button"
            isActive={currentPage === page}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(page as number);
            }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {renderPages()}
        <PaginationItem>
          <PaginationNext
            href="#"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
