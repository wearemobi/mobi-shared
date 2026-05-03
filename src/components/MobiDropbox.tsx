import React, { useState, useCallback } from 'react';

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
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * M.O.B.I.™ Standard Ingestion Vector.
 * A high-performance drag-and-drop file upload component.
 * 
 * @example
 * ```tsx
 * <MobiDropbox 
 *   onUploadSuccess={(files) => console.log(files)} 
 *   acceptedExtensions={['.json', '.csv']} 
 * />
 * ```
 */
export const MobiDropbox: React.FC<MobiDropboxProps> = ({ 
  onUploadSuccess, 
  acceptedExtensions,
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      acceptedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
    );

    if (validFiles.length > 0) {
      onUploadSuccess(validFiles);
    }
  }, [onUploadSuccess, acceptedExtensions]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        w-full max-w-2xl p-12 border-2 border-dashed rounded-3xl transition-all duration-500
        flex flex-col items-center justify-center gap-6 cursor-pointer
        ${isDragging 
          ? 'border-mobi-primary bg-mobi-primary/5 shadow-2xl scale-[1.02]' 
          : 'border-mobi-border bg-mobi-surface/50 hover:bg-mobi-surface hover:border-mobi-text-muted shadow-sm'}
        ${className}
      `}
    >
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
          {isDragging ? 'Suelta para procesar' : 'The Dropbox'}
        </p>
        <p className="text-sm text-mobi-text-muted mt-1 font-medium">
          Drag & drop your {acceptedExtensions.join(' or ')} files here
        </p>
      </div>

      <div className="flex gap-2">
        {acceptedExtensions.map(ext => (
          <span key={ext} className="px-3 py-1 bg-mobi-bg border border-mobi-border rounded-lg text-[10px] font-bold text-mobi-text-muted uppercase tracking-widest">
            {ext.replace('.', '')}
          </span>
        ))}
      </div>
    </div>
  );
};
