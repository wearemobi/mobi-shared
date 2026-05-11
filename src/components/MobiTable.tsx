import React from 'react';

// ─── Column definition ────────────────────────────────────────────────────────

export interface MobiTableColumn<T = Record<string, unknown>> {
  /** Unique column identifier. */
  key: string;
  /** Header label. */
  title: string;
  /**
   * Custom cell renderer. Receives the full row and its index.
   * If omitted, renders `String(row[key])`.
   */
  render?: (row: T, index: number) => React.ReactNode;
  /** Text alignment. @default 'left' */
  align?: 'left' | 'center' | 'right';
  /** Optional fixed column width (any valid CSS width). */
  width?: string;
  /** Additional class names for the `<td>` cell. */
  className?: string;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface MobiTableProps<T = Record<string, unknown>> {
  /** Column definitions. */
  columns: MobiTableColumn<T>[];
  /** Rows to render. */
  data: T[];
  /**
   * Returns a stable, unique key for each row.
   * Used as the React `key` — must be unique per row.
   */
  keyExtractor: (row: T, index: number) => string;
  /**
   * If true, renders loading skeleton rows.
   * @default false
   */
  loading?: boolean;
  /**
   * Number of skeleton rows to show when `loading` is true.
   * @default 5
   */
  loadingRows?: number;
  /**
   * Message displayed when `data` is empty and `loading` is false.
   * @default 'No data available.'
   */
  emptyMessage?: string;
  /** Optional icon rendered above the empty message. */
  emptyIcon?: React.ReactNode;
  /**
   * If provided, each row becomes clickable and `onRowClick` is called.
   */
  onRowClick?: (row: T, index: number) => void;
  /** Additional class names for the outer wrapper. */
  className?: string;
  /**
   * Alternates row background colors for readability.
   * @default false
   */
  striped?: boolean;
  /**
   * Reduces cell padding for data-dense views.
   * @default false
   */
  compact?: boolean;
  /**
   * Uses monospace font and technical typography for engineering tables.
   * @default false
   */
  technical?: boolean;
}

// ─── Skeleton cell ────────────────────────────────────────────────────────────

const SkeletonCell: React.FC<{ align?: 'left' | 'center' | 'right' }> = ({ align = 'left' }) => (
  <td className={`px-4 py-3 text-${align}`}>
    <div className="h-3 bg-mobi-border/50 rounded animate-pulse" style={{ width: `${40 + Math.random() * 40}%` }} />
  </td>
);

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * M.O.B.I.™ Data Table.
 * Generic, fully typed data table with loading skeletons, empty states,
 * row click handlers, striped rows, and technical mode.
 *
 * @example
 * ```tsx
 * interface Fleet { id: string; name: string; status: string; nodes: number; }
 *
 * <MobiTable<Fleet>
 *   columns={[
 *     { key: 'name', title: 'Fleet Name' },
 *     { key: 'status', title: 'Status', render: (row) => <MobiBadge>{row.status}</MobiBadge> },
 *     { key: 'nodes', title: 'Nodes', align: 'right' },
 *   ]}
 *   data={fleets}
 *   keyExtractor={(row) => row.id}
 *   onRowClick={(row) => navigate(`/fleets/${row.id}`)}
 *   loading={isLoading}
 *   striped
 * />
 * ```
 */
export function MobiTable<T = Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  loading = false,
  loadingRows = 5,
  emptyMessage = 'No data available.',
  emptyIcon,
  onRowClick,
  className = '',
  striped = false,
  compact = false,
  technical = false,
}: MobiTableProps<T>) {
  const cellPadding = compact ? 'px-4 py-2' : 'px-4 py-3.5';
  const fontClass = technical
    ? 'text-[11px] font-bold font-mono tracking-tight'
    : 'text-sm font-medium font-sans';
  const headerFont = technical
    ? 'text-[9px] font-black font-mono uppercase tracking-widest'
    : 'text-[10px] font-black uppercase tracking-widest font-sans';

  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`w-full overflow-hidden rounded-xl border border-mobi-border ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Head */}
          <thead>
            <tr className="border-b border-mobi-border bg-mobi-bg/50">
              {columns.map(col => (
                <th
                  key={col.key}
                  scope="col"
                  style={col.width ? { width: col.width } : undefined}
                  className={`
                    ${cellPadding} ${headerFont} ${alignClass[col.align ?? 'left']}
                    text-mobi-text-muted bg-mobi-bg/30
                  `}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              // Skeleton rows
              Array.from({ length: loadingRows }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="border-b border-mobi-border/50">
                  {columns.map(col => (
                    <SkeletonCell key={col.key} align={col.align} />
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  {emptyIcon && (
                    <div className="flex justify-center mb-4 text-mobi-text-muted/30">
                      {emptyIcon}
                    </div>
                  )}
                  <p className="text-sm font-bold text-mobi-text-muted font-sans">
                    {emptyMessage}
                  </p>
                </td>
              </tr>
            ) : (
              // Data rows
              data.map((row, rowIndex) => (
                <tr
                  key={keyExtractor(row, rowIndex)}
                  onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={onRowClick ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') onRowClick(row, rowIndex);
                  } : undefined}
                  className={`
                    border-b border-mobi-border/40 transition-colors last:border-b-0
                    ${striped && rowIndex % 2 === 1 ? 'bg-mobi-bg/20' : 'bg-transparent'}
                    ${onRowClick
                      ? 'cursor-pointer hover:bg-mobi-surface-hover focus:outline-none focus:bg-mobi-surface-hover'
                      : ''}
                  `}
                >
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className={`
                        ${cellPadding} ${fontClass} ${alignClass[col.align ?? 'left']}
                        text-mobi-text ${col.className ?? ''}
                      `}
                    >
                      {col.render
                        ? col.render(row, rowIndex)
                        : String((row as Record<string, unknown>)[col.key] ?? '—')
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
