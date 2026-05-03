# MobiDropbox

M.O.B.I.™ Standard Ingestion Vector. A high-performance drag-and-drop component for secure file processing.

## Usage

```tsx
import { MobiDropbox } from '@wearemobi/shared';

const MyComponent = () => {
  const handleUpload = (files: File[]) => {
    console.log('Processing files:', files);
  };

  return (
    <MobiDropbox 
      onUploadSuccess={handleUpload} 
      acceptedExtensions={['.json', '.csv', '.xml']} 
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `onUploadSuccess` | `(files: File[]) => void` | `undefined` | Callback triggered on successful drop/selection. |
| `acceptedExtensions` | `string[]` | `undefined` | List of allowed extensions (e.g., `['.json']`). |
| `title` | `string` | `'The Dropbox'` | Primary title shown in the drop zone. |
| `description` | `string` | `...` | Subtitle shown below the title. |
| `draggingTitle` | `string` | `'Suelta para procesar'` | Title shown during drag hover. |
| `isUploading` | `boolean` | `false` | If true, shows progress bar and disables zone. |
| `progress` | `number` | `0` | Current progress percentage (0-100). |
| `className` | `string` | `""` | Additional CSS classes. |
| `multiple` | `boolean` | `false` | Whether to allow selecting multiple files. |

## Features

- **Multi-Vector Ingestion**: Supports both drag-and-drop and manual file selection (click-to-trigger).
- **Batch Processing**: Enable `multiple` mode to process several assets in a single pipeline cycle.
- **Progress Integration**: Automatically renders a `MobiProgress` bar when `isUploading` is active.

## Aesthetic

Designed to be the "Mouth" of the MOBI ingestion pipeline:
- **Geometry**: Large `rounded-3xl` container for a distinct interactive zone.
- **Interactions**: Smooth 500ms transitions for drag states.
- **Metadata**: Clear extension badges at the bottom to inform the user of supported formats.
