import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn
} from '@wearemobi/ui';
import { MobiSkeleton } from './MobiSkeleton';

export interface MobiTableColumn<T = any> {
  key: string;
  header: React.ReactNode;
  render?: (row: T) => React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export interface MobiTableProps<T = any> {
  data: T[];
  columns: MobiTableColumn<T>[];
  className?: string;
  onRowClick?: (row: T) => void;
  emptyMessage?: React.ReactNode;
  rowKey?: keyof T | ((row: T) => string | number);
  loading?: boolean;
}

export function MobiTable<T = any>({
  data,
  columns,
  className,
  onRowClick,
  emptyMessage = "No data available.",
  rowKey,
  loading = false
}: MobiTableProps<T>) {
  return (
    <div className={cn("rounded-md border bg-card", className)}>
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            {columns.map((col) => (
              <TableHead 
                key={col.key} 
                className={cn(
                  col.align === 'right' && 'text-right',
                  col.align === 'center' && 'text-center',
                  col.className
                )}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    <MobiSkeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground font-medium">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => {
              const key = rowKey 
                ? (typeof rowKey === 'function' ? rowKey(row) : String(row[rowKey as keyof T])) 
                : rowIndex;
              
              return (
                <TableRow 
                  key={key}
                  onClick={() => onRowClick?.(row)}
                  className={cn(onRowClick && "cursor-pointer hover:bg-muted/50 transition-colors")}
                >
                  {columns.map((col) => (
                    <TableCell 
                      key={col.key}
                      className={cn(
                        col.align === 'right' && 'text-right',
                        col.align === 'center' && 'text-center',
                        col.className
                      )}
                    >
                      {col.render ? col.render(row) : (row[col.key as keyof T] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
