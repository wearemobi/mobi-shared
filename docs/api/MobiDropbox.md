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
| `className` | `string` | `""` | Additional CSS classes. |

## Features

- **Visual Feedback**: Dynamic scaling and color shifting when files are dragged over the target area.
- **File Filtering**: Automatic validation against the `acceptedExtensions` list.
- **Technical UI**: Uses monospaced typography for extension tags and a technical icon set.

## Aesthetic

Designed to be the "Mouth" of the MOBI ingestion pipeline:
- **Geometry**: Large `rounded-3xl` container for a distinct interactive zone.
- **Interactions**: Smooth 500ms transitions for drag states.
- **Metadata**: Clear extension badges at the bottom to inform the user of supported formats.
