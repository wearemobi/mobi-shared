# MobiSidebar

A responsive navigation sidebar that functions as a permanent column on large screens and a floating drawer on mobile and tablet devices.

## Usage

```tsx
import { MobiSidebar, MobiSidebarItem } from '@wearemobi/shared';

const MyLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen">
      <MobiSidebar 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        footer={<div>v1.2.5</div>}
      >
        <MobiSidebarItem active icon={<HomeIcon />}>Dashboard</MobiSidebarItem>
        <MobiSidebarItem icon={<SettingsIcon />}>Settings</MobiSidebarItem>
      </MobiSidebar>
      
      <main className="flex-1">
        <button onClick={() => setIsOpen(true)} className="lg:hidden">Menu</button>
        {/* Content */}
      </main>
    </div>
  );
};
```

## Props

### MobiSidebar

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | `false` | Controls visibility on mobile. |
| `onClose` | `() => void` | **Required** | Callback to close the mobile drawer. |
| `title` | `React.ReactNode` | `<MobiLogo />` | Branding shown at the top. |
| `children` | `React.ReactNode` | **Required** | Navigation items. |
| `footer` | `React.ReactNode` | `undefined` | Optional content at the bottom. |

### MobiSidebarItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `active` | `boolean` | `false` | Highlight state for the current route. |
| `onClick` | `() => void` | `undefined` | Click handler. |
| `icon` | `React.ReactNode` | `undefined` | Icon shown before the label. |
| `children` | `React.ReactNode` | **Required** | The label text. |
