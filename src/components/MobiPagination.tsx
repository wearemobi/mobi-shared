import React from 'react';

export interface MobiPaginationProps {
  /** Current page (1-indexed). */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called with the new page number when the user navigates. */
  onChange: (page: number) => void;
  /**
   * Number of page buttons to show (centered around current page).
   * @default 5
   */
  siblingCount?: number;
  /**
   * If true, shows "First" and "Last" buttons.
   * @default false
   */
  showEdges?: boolean;
  /** Additional class names for the wrapper. */
  className?: string;
}

/** Generates the page number array including ellipsis markers. */
function buildPageRange(current: number, total: number, siblings: number): (number | '...')[] {
  if (total <= siblings + 4) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);
  const pages: (number | '...')[] = [1];

  if (left > 2) pages.push('...');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('...');
  pages.push(total);

  return pages;
}

/**
 * M.O.B.I.™ Pagination.
 * Smart page range with ellipsis, First/Last shortcuts, and keyboard navigation.
 *
 * @example
 * ```tsx
 * const [page, setPage] = useState(1);
 *
 * <MobiPagination
 *   currentPage={page}
 *   totalPages={24}
 *   onChange={setPage}
 *   showEdges
 * />
 * ```
 */
export const MobiPagination: React.FC<MobiPaginationProps> = ({
  currentPage,
  totalPages,
  onChange,
  siblingCount = 1,
  showEdges = false,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const pages = buildPageRange(currentPage, totalPages, siblingCount);

  const buttonBase =
    'inline-flex items-center justify-center h-8 min-w-[32px] px-2 rounded-lg text-[11px] font-black font-sans uppercase tracking-widest transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-mobi-primary/50';
  const activeClass = 'bg-mobi-primary text-mobi-bg shadow';
  const inactiveClass = 'text-mobi-text-muted hover:text-mobi-text hover:bg-mobi-surface';
  const disabledClass = 'opacity-30 cursor-not-allowed';

  const NavButton: React.FC<{
    onClick: () => void;
    disabled: boolean;
    'aria-label': string;
    children: React.ReactNode;
  }> = ({ onClick, disabled, children, ...rest }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${buttonBase} ${disabled ? disabledClass : inactiveClass}`}
      {...rest}
    >
      {children}
    </button>
  );

  return (
    <nav aria-label="Pagination" className={`flex items-center gap-1 ${className}`}>
      {/* First */}
      {showEdges && (
        <NavButton
          aria-label="First page"
          disabled={currentPage === 1}
          onClick={() => onChange(1)}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </NavButton>
      )}

      {/* Previous */}
      <NavButton
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </NavButton>

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === '...' ? (
          <span
            key={`ellipsis-${i}`}
            className="inline-flex items-center justify-center h-8 px-1 text-[11px] font-black text-mobi-text-muted font-mono"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`${buttonBase} ${page === currentPage ? activeClass : inactiveClass}`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <NavButton
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </NavButton>

      {/* Last */}
      {showEdges && (
        <NavButton
          aria-label="Last page"
          disabled={currentPage === totalPages}
          onClick={() => onChange(totalPages)}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </NavButton>
      )}
    </nav>
  );
};
