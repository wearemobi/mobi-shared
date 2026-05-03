import React, { useState, useCallback } from 'react';

import { MobiProgress } from './MobiProgress';

export interface MobiDropboxProps {
  /**
   * Callback triggered when files are successfully dropped or selected.
   */
  onUploadSuccess: (files: File[]) => void;
  /**
   * List of allowed file extensions (e.g., ['.json', '.pdf']).
   */
  acceptedExtensions: string[];
  /**
   * Primary title shown in the drop zone.
   * @default 'The Dropbox'
   */
  title?: string;
  /**
   * Subtitle or description shown below the title.
   * @default 'Drag & drop your files here'
   */
  description?: string;
  /**
   * Title shown when a file is being dragged over the zone.
   * @default 'Suelta para procesar'
   */
  draggingTitle?: string;
  /**
   * Current upload progress (0-100).
   */
  progress?: number;
  /**
   * If true, shows the progress bar and disables interactions.
   * @default false
   */
  isUploading?: boolean;
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * M.O.B.I.™ Standard Ingestion Vector.
 * A high-performance drag-and-drop file upload component with progress tracking.
 * 
 * @example
 * ```tsx
 * <MobiDropbox 
 *   onUploadSuccess={(files) => console.log(files)} 
 *   acceptedExtensions={['.json']} 
 *   isUploading={true}
 *   progress={45}
 * />
 * ```
 */
export const MobiDropbox: React.FC<MobiDropboxProps> = ({ 
  onUploadSuccess, 
  acceptedExtensions,
  title = 'The Dropbox',
  description = `Drag & drop your ${acceptedExtensions.join(' or ')} files here`,
  draggingTitle = 'Suelta para procesar',
  progress = 0,
  isUploading = false,
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (isUploading) return;
    e.preventDefault();
    setIsDragging(true);
  }, [isUploading]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (isUploading) return;
    e.preventDefault();
    setIsDragging(false);
  }, [isUploading]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    if (isUploading) return;
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      acceptedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
    );

    if (validFiles.length > 0) {
      onUploadSuccess(validFiles);
    }
  }, [onUploadSuccess, acceptedExtensions, isUploading]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        w-full max-w-2xl p-12 border-2 border-dashed rounded-3xl transition-all duration-500
        flex flex-col items-center justify-center gap-6
        ${isUploading ? 'cursor-wait opacity-80' : 'cursor-pointer'}
        ${isDragging && !isUploading
          ? 'border-mobi-primary bg-mobi-primary/5 shadow-2xl scale-[1.02]' 
          : 'border-mobi-border bg-mobi-surface/50 hover:bg-mobi-surface hover:border-mobi-text-muted shadow-sm'}
        ${className}
      `}
    >
      {!isUploading ? (
        <>
          <div className={`
            p-6 rounded-2xl border transition-colors duration-300
            ${isDragging ? 'bg-mobi-primary border-mobi-primary' : 'bg-mobi-bg border-mobi-border'}
          `}>
            <svg 
              className={`h-10 w-10 ${isDragging ? 'text-mobi-bg' : 'text-mobi-text-muted'}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          <div className="text-center font-sans">
            <p className="text-lg font-bold tracking-tight text-mobi-text">
              {isDragging ? draggingTitle : title}
            </p>
            <p className="text-sm text-mobi-text-muted mt-1 font-medium">
              {description}
            </p>
          </div>

          <div className="flex gap-2">
            {acceptedExtensions.map(ext => (
              <span key={ext} className="px-3 py-1 bg-mobi-bg border border-mobi-border rounded-lg text-[10px] font-bold text-mobi-text-muted uppercase tracking-widest">
                {ext.replace('.', '')}
              </span>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full max-w-sm space-y-6">
          <div className="flex flex-col items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-mobi-primary/10 flex items-center justify-center animate-pulse">
              <svg className="h-6 w-6 text-mobi-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <p className="text-sm font-black uppercase tracking-widest text-mobi-text">Ingesting Assets</p>
          </div>
          
          <MobiProgress 
            value={progress} 
            label="Vector Pipeline" 
            status={`${progress}% complete`} 
          />
        </div>
      )}
    </div>
  );
};
