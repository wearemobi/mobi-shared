# MobiSectionHeader

M.O.B.I.™ Standard Section Header.
Used to introduce components, hooks, or major sections with a consistent hierarchy (Headline Badge -> Title -> Description).

## Props

- **`headline`** (`ReactNode`, optional): Small badge text/node above the title.
- **`title`** (`ReactNode`, optional): Main heading text/node.
- **`description`** (`ReactNode`, optional): Subtext or description below the title.
- **`variant`** (`'component' | 'hook' | 'neutral'`, optional): Visual variant for the headline badge. Defaults to `neutral`.
- **`className`** (`string`, optional): Additional container classes.
- **`icon`** (`ReactNode`, optional): Leading icon shown next to the title.
- **`actions`** (`ReactNode`, optional): Trailing actions, such as a toolbar or `MobiMoreMenu`.
- **`size`** (`'sm' | 'md' | 'lg'`, optional): Size of the section header. Defaults to `md`.

## Usage

```tsx
import { MobiSectionHeader, MobiMoreMenu, MobiIcon } from '@wearemobi/shared';

function Dashboard() {
  return (
    <MobiSectionHeader 
      headline="Overview"
      title="Fleet Metrics"
      description="Real-time monitoring of all active sectors."
      size="lg"
      icon={<MobiIcon name="monitor" />}
      actions={
        <MobiMoreMenu 
          items={[
            { id: 'refresh', label: 'Refresh Data' },
            { id: 'settings', label: 'Dashboard Settings' }
          ]}
        />
      }
    />
  );
}
```
