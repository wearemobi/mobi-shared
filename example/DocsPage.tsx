import React, { useState } from 'react';
import { 
  MobiLogo, MobiFooter, MobiAlert,
  MobiUserBadge, MobiSentinelMenu,
  MobiButton, 
  MobiCard, 
  MobiInput, MobiTextarea,
  MobiModal, MobiToastProvider, useMobiToast,
  MobiBadge,
  MobiLoader,
  MobiNav, MobiHamburgerMenu, MobiDrawer,
  MobiConfirm,
  MobiTable, MobiTabs,
  MobiTooltip, MobiSkeleton, MobiProgress, MobiPagination, MobiChip,
  MobiCheckbox, MobiDropdown, MobiSwitcher, MobiQuantityControl, MobiDateTime,
  MobiBentoGrid, MobiBentoItem, MobiBentoIndicator, MobiTimeline, MobiCodeBlock, MobiMarkdown, MobiSearchCommand,
  MobiSegmentedControl,
  MobiSectionHeader, MobiMoreMenu,
  MobiEnergyMeter, MobiHero, MobiListView, MobiPlanBadge,
  MobiThemeToggle, MobiThemeProvider
} from '../src';
import { LayoutDashboard, Users, Settings, Shield, AlertTriangle, Activity, Wifi, Database, Server, ChevronRight, FileText } from 'lucide-react';

export const catalog = [
  {
    id: 'Icons',
    name: 'Icons (Lucide React)',
    category: 'foundation',
    description: 'We use lucide-react directly to preserve tree-shaking. Never use generic icon wrappers.',
    code: `import { Shield } from 'lucide-react';\n\n<Shield size={24} className="text-success" />`,
    render: () => (
      <div className="flex flex-wrap gap-8 p-4">
        <div className="flex flex-col items-center gap-2">
          <Settings size={24} className="text-foreground" />
          <span className="text-[10px] font-mono text-muted-foreground">Settings</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Shield size={24} className="text-success" />
          <span className="text-[10px] font-mono text-muted-foreground">Shield</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Users size={24} className="text-info" />
          <span className="text-[10px] font-mono text-muted-foreground">Users</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AlertTriangle size={24} className="text-warning" />
          <span className="text-[10px] font-mono text-muted-foreground">AlertTriangle</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Activity size={24} className="text-error" />
          <span className="text-[10px] font-mono text-muted-foreground">Activity</span>
        </div>
      </div>
    )
  },
  {
    id: 'MobiTable',
    name: 'MobiTable',
    category: 'component',
    description: 'Data display table built on Shadcn primitives.',
    code: `<MobiTable \n  columns={[{ key: 'id', header: 'ID' }, { key: 'name', header: 'Name' }]} \n  data={[{ id: 1, name: 'Alpha' }]} \n/>`,
    render: () => (
      <div className="space-y-4">
        <MobiTable
          columns={[
            { key: 'id', header: 'ID', className: 'w-[100px]' },
            { key: 'name', header: 'Name' },
            { key: 'role', header: 'Role' },
            { key: 'status', header: 'Status', align: 'right', render: (row) => <MobiBadge variant="success" size="sm">{row.status}</MobiBadge> }
          ]}
          data={[
            { id: 'USR-01', name: 'Carlos Quijano', role: 'Architect', status: 'ACTIVE' },
            { id: 'USR-02', name: 'Aiden Pearce', role: 'Operator', status: 'ACTIVE' }
          ]}
        />
        <div className="text-sm font-bold text-muted-foreground">Loading State</div>
        <MobiTable
          columns={[ { key: 'name', header: 'Name' }, { key: 'status', header: 'Status' } ]}
          data={[]}
          loading={true}
        />
        <div className="text-sm font-bold text-muted-foreground">Empty State</div>
        <MobiTable
          columns={[ { key: 'name', header: 'Name' }, { key: 'status', header: 'Status' } ]}
          data={[]}
          emptyMessage="No data to show!"
        />
      </div>
    )
  },

  {
    id: 'MobiEnergyMeter',
    name: 'MobiEnergyMeter',
    category: 'component',
    description: 'Battery-style indicator for resource consumption and power states. Supports sm/md/lg sizes and an interactive click prop.',
    code: `<MobiEnergyMeter value={75} showValue />`,
    render: () => {
      const [energy, setEnergy] = React.useState(65);
      return (
        <div className="space-y-6 p-4">
          <div className="flex flex-wrap items-center gap-8">
            <MobiEnergyMeter value={energy} showValue size="sm" onClick={() => setEnergy(v => Math.max(0, v - 10))} />
            <MobiEnergyMeter value={energy} showValue size="md" onClick={() => setEnergy(v => Math.max(0, v - 10))} />
            <MobiEnergyMeter value={energy} showValue size="lg" onClick={() => setEnergy(v => Math.max(0, v - 10))} />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <MobiEnergyMeter value={5} showValue size="md" />
            <MobiEnergyMeter value={20} showValue size="md" />
            <MobiEnergyMeter value={45} showValue size="md" />
            <MobiEnergyMeter value={78} showValue size="md" />
            <MobiEnergyMeter value={100} showValue size="md" cells={5} />
          </div>
          <p className="text-xs font-mono text-muted-foreground italic">
            Click meters to simulate energy drain. Current: {energy}%
          </p>
        </div>
      );
    }
  },
  {
    id: 'MobiHero',
    name: 'MobiHero',
    category: 'component',
    description: 'High-impact header section for landing pages with logo, title, subtitle, and description slots.',
    code: `<MobiHero\n  logo={<img src="https://wearemobi.com/logo-light.svg" />}\n  title={<>M.O.B.I.™ <span className="text-muted-foreground">Shared</span></>}\n  subtitle="Implementing the Core Blueprint v1.0.0."\n  actions={[{ label: 'Call to Action' }]}\n/>`,
    render: () => (
      <div className="w-full rounded-xl border border-border overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
        <MobiHero
          size="default"
          align="center"
          logo={<img src="https://wearemobi.com/logo-light.svg" alt="M.O.B.I." className="h-20 w-auto" />}
          title={<>M.O.B.I.™ <span className="text-muted-foreground/50 font-extrabold">Shared</span></>}
          subtitle="Implementing the Core Blueprint v1.0.0."
          actions={[
            { label: 'Call to Action', variant: 'solid' },
          ]}
        />
      </div>
    )
  },
  {
    id: 'MobiListView',
    name: 'MobiListView',
    category: 'component',
    description: 'Flexible list with leading/trailing slots. Supports classic, stacked cards, and flat/clean variants.',
    code: `<MobiListView variant="classic" selectedId="F-1" items={[...]} />`,
    render: () => {
      const [variant, setVariant] = React.useState<'classic' | 'stacked' | 'flat'>('classic');
      const [density, setDensity] = React.useState<'compact' | 'default' | 'comfortable'>('default');
      const [selectedId, setSelectedId] = React.useState('F-1');
      const listItems = [
        { id: 'F-1', title: 'Flagship Horizon Alpha', description: 'En-route to sector 9-B. Fuel reserves at 98.4%.', leading: <MobiLogo size={28} />, trailing: <MobiBadge variant="success" size="sm" dot>ACTIVE</MobiBadge> },
        { id: 'F-2', title: 'Battleship Vindicator IV', description: 'Maintenance bay 4-C. Replacing localized graviton relays.', leading: <MobiLogo size={28} />, trailing: <MobiBadge variant="warning" size="sm">DOCKED</MobiBadge> },
        { id: 'F-3', title: 'Recon Interceptor X-9', description: 'Signal lost near outer rim anomaly.', leading: <MobiLogo size={28} />, trailing: <MobiBadge variant="error" size="sm">MIA</MobiBadge>, disabled: true },
        { id: 'F-4', title: 'Secured AI Core Link', description: 'Encrypted communication channel with sentinel grid (Restr...', leading: <MobiLogo size={28} />, trailing: <MobiBadge variant="default" size="sm">RESTRICTED</MobiBadge>, disabled: true },
      ];
      return (
        <div className="w-full max-w-2xl space-y-4">
          <MobiSegmentedControl
            label="Display:"
            value={variant}
            onChange={(v) => setVariant(v as any)}
            options={[
              { value: 'classic', label: 'Classic List' },
              { value: 'stacked', label: 'Stacked Cards' },
              { value: 'flat', label: 'Flat / Clean' }
            ]}
          />
          <MobiSegmentedControl
            label="Density:"
            value={density}
            onChange={(v) => setDensity(v as any)}
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'default', label: 'Default' },
              { value: 'comfortable', label: 'Comfortable' }
            ]}
          />
          <MobiListView
            variant={variant}
            density={density}
            selectedId={selectedId}
            onSelect={setSelectedId}
            items={listItems}
            footer={<>Currently Selected Node: <strong>{selectedId}</strong></>}
          />
        </div>
      );
    }
  },
  {
    id: 'MobiPlanBadge',
    name: 'MobiPlanBadge',
    category: 'component',
    description: 'Color-coded pill badge for subscription tiers.',
    code: `<MobiPlanBadge plan="PRO" />`,
    render: () => (
      <div className="flex flex-wrap items-center gap-3 p-4">
        <MobiPlanBadge plan="FREE" />
        <MobiPlanBadge plan="BASIC" />
        <MobiPlanBadge plan="PRO" />
        <MobiPlanBadge plan="ULTRA" />
        <MobiPlanBadge plan="BUSINESS" />
        <MobiPlanBadge plan="ENTERPRISE" />
        <MobiPlanBadge plan="CUSTOM" />
        <MobiPlanBadge plan="N/A" />
      </div>
    )
  },
  {
    id: 'MobiLoader',
    name: 'MobiLoader',
    category: 'component',
    description: 'Branded loading indicators with spinner, pulse, and bars variants.',
    code: `<MobiLoader variant="spinner" label="Loading..." />`,
    render: () => (
      <div className="flex flex-wrap items-end gap-12 p-4">
        <div className="flex flex-col items-center gap-2">
          <MobiLoader variant="spinner" size="md" label="Spinner" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <MobiLoader variant="pulse" size="md" label="Pulse" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <MobiLoader variant="bars" size="md" label="Bars" />
        </div>
      </div>
    )
  },
  {
    id: 'MobiModal',
    name: 'MobiModal',
    category: 'component',
    description: 'Dialog modal with configurable sizes.',
    code: `<MobiModal open={open} onClose={close} title="Title" size="md" />`,
    render: () => {
      const [open, setOpen] = React.useState(false);
      const [size, setSize] = React.useState<'sm' | 'md' | 'lg' | 'xl'>('md');
      return (
        <div className="flex flex-wrap gap-3 p-4">
          {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <MobiButton key={s} variant="outline" size="sm" onClick={() => { setSize(s); setOpen(true); }}>
              Open {s.toUpperCase()}
            </MobiButton>
          ))}
          <MobiModal
            open={open}
            onClose={() => setOpen(false)}
            title={`Modal — ${size.toUpperCase()}`}
            description="This is a resizable modal dialog."
            size={size}
            footer={
              <div className="flex gap-2">
                <MobiButton variant="ghost" onClick={() => setOpen(false)}>Cancel</MobiButton>
                <MobiButton variant="solid" onClick={() => setOpen(false)}>Confirm</MobiButton>
              </div>
            }
          >
            <p className="text-muted-foreground">Content area for the <strong>{size}</strong> modal variant.</p>
          </MobiModal>
        </div>
      );
    }
  },
  {
    id: 'MobiConfirm',
    name: 'MobiConfirm',
    category: 'component',
    description: 'Streamlined Yes/No confirmation dialog wrapper around MobiModal.',
    code: `<MobiConfirm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={() => {}}
  title="DELETE SOVEREIGN ASSET"
  message="Are you sure you want to permanently delete this asset from the fleet registry? This action is irreversible."
  intent="danger"
/>`,
    render: () => {
      const [isDangerOpen, setIsDangerOpen] = React.useState(false);
      const [isInfoOpen, setIsInfoOpen] = React.useState(false);
      return (
        <div className="p-4 flex items-center justify-start gap-4">
          <MobiButton 
            variant="outline" 
            onClick={() => setIsInfoOpen(true)}
          >
            Trigger Standard Flow
          </MobiButton>
          <MobiButton 
            variant="ghost" 
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setIsDangerOpen(true)}
          >
            Trigger Deletion Flow
          </MobiButton>

          <MobiConfirm
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(false)}
            onConfirm={() => setIsInfoOpen(false)}
            title="CONFIRM DEPLOYMENT"
            message="Are you ready to deploy the latest modules to the orbital station? This will briefly interrupt communications."
            intent="info"
            confirmText="Deploy"
            cancelText="Wait"
          />

          <MobiConfirm
            isOpen={isDangerOpen}
            onClose={() => setIsDangerOpen(false)}
            onConfirm={() => setIsDangerOpen(false)}
            title="DELETE SOVEREIGN ASSET"
            message="Are you sure you want to permanently delete this asset from the fleet registry? This action is irreversible."
            intent="danger"
          />
        </div>
      );
    }
  },
  {
    id: 'MobiSectionHeader',
    name: 'MobiSectionHeader',
    category: 'component',
    description: 'Standardized typography layout for section headings and page headers.',
    code: `<MobiSectionHeader title="Dashboard" description="Overview of your metrics" />`,
    render: () => (
      <div className="space-y-8 p-4">
        <MobiSectionHeader 
          title="Page Header" 
          size="lg"
          description="A large hero-style header for the top of a primary view."
          action={<MobiButton variant="solid">Create Project</MobiButton>}
        />
        <MobiSectionHeader 
          title="Section Header" 
          description="Standard section header for content blocks or forms."
          action={<MobiButton variant="outline" size="sm">Manage</MobiButton>}
          className="mb-2"
        />
        <MobiSectionHeader 
          title="Small Header" 
          size="sm"
          description="Compact header for inner cards or sub-sections."
          className="mb-0"
        />
      </div>
    )
  },
  {
    id: 'MobiTabs',
    name: 'MobiTabs',
    category: 'component',
    description: 'Tabbed content navigation with multiple visual styles.',
    code: `<MobiTabs variant="underline" items={[...]} />`,
    render: () => {
      const tabItems = [
        { id: 'settings', label: 'Settings', icon: <Settings size={14} />, content: <p className="text-sm text-muted-foreground p-4">Settings configuration panel.</p> },
        { id: 'users', label: 'Users', icon: <Users size={14} />, content: <p className="text-sm text-muted-foreground p-4">List of active users in the fleet.</p> },
        { id: 'billing', label: 'Billing', content: <p className="text-sm text-muted-foreground p-4">Billing and subscription details.</p>, disabled: true }
      ];
      return (
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Default (Boxed)</div>
            <MobiTabs items={tabItems} />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Underline</div>
            <MobiTabs variant="underline" items={tabItems} />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Pill</div>
            <MobiTabs variant="pill" items={tabItems} />
          </div>
        </div>
      );
    }
  },
  {
    id: 'MobiTooltip',
    name: 'MobiTooltip',
    category: 'component',
    description: 'Hover tooltips for extra context.',
    code: `<MobiTooltip content="Detailed info"><span>Hover me</span></MobiTooltip>`,
    render: () => (
      <div className="flex gap-4 p-4">
        <MobiTooltip content="Deploy to production">
          <MobiButton variant="solid">Hover Me</MobiButton>
        </MobiTooltip>
      </div>
    )
  },
  {
    id: 'MobiSkeleton',
    name: 'MobiSkeleton',
    category: 'component',
    description: 'Loading placeholders.',
    code: `<MobiSkeleton className="w-[100px] h-[20px] rounded-full" />`,
    render: () => (
      <div className="flex items-center space-x-4 max-w-sm w-full p-4">
        <MobiSkeleton variant="circular" width={48} height={48} />
        <div className="space-y-2 w-full">
          <MobiSkeleton variant="text" className="w-[250px]" />
          <MobiSkeleton variant="text" className="w-[200px]" />
        </div>
      </div>
    )
  },
  {
    id: 'MobiProgress',
    name: 'MobiProgress',
    category: 'component',
    description: 'Data loading progress.',
    code: `<MobiProgress value={65} label="Uploading" showValue />`,
    render: () => (
      <div className="w-full max-w-md p-4 space-y-6">
        <MobiProgress value={33} />
        <MobiProgress value={78} label="System Boot" showValue />
      </div>
    )
  },
  {
    id: 'MobiPagination',
    name: 'MobiPagination',
    category: 'component',
    description: 'Data pagination controls.',
    code: `<MobiPagination currentPage={1} totalPages={10} onPageChange={console.log} />`,
    render: () => (
      <div className="p-4">
        <MobiPagination currentPage={5} totalPages={100} onPageChange={(p) => alert('Go to page ' + p)} />
      </div>
    )
  },
  {
    id: 'MobiChip',
    name: 'MobiChip',
    category: 'component',
    description: 'Interactive tags or pills.',
    code: `<MobiChip label="Frontend" onDelete={() => console.log('Delete')} />`,
    render: () => (
      <div className="flex flex-wrap gap-2 p-4">
        <MobiChip label="React" />
        <MobiChip label="Tailwind" variant="outline" onDelete={() => alert('Delete Tailwind')} />
        <MobiChip label="Success" variant="success" />
        <MobiChip label="Warning" variant="warning" />
        <MobiChip label="Error" variant="error" onDelete={() => alert('Delete')} />
        <MobiChip label="Info" variant="info" />
      </div>
    )
  },
  {
    id: 'MobiCheckbox',
    name: 'MobiCheckbox',
    category: 'component',
    description: 'Unified checkbox, radio, and toggle switch component featuring full accessibility, semantic validation, and description fields.',
    code: `<MobiCheckbox
  variant="toggle"
  label="Autopilot Mode"
  description="Enable automated course corrections."
  checked={enabled}
  onCheckedChange={setEnabled}
/>`,
    render: () => {
      const [node, setNode] = React.useState('alpha');
      
      return (
        <div className="w-full max-w-2xl space-y-8 p-4">
          <MobiCheckbox 
            label="Sync Sector Logs" 
            description="Upload real-time flight data to the command bridge." 
            defaultChecked
          />
          
          <MobiCheckbox 
            variant="toggle"
            label="Proton Shield Matrix" 
            description="Redirect surplus energy to thermal buffers." 
          />
          
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">Active Fleet Node Selection:</h4>
            <div className="space-y-3">
              <MobiCheckbox 
                variant="radio"
                checked={node === 'alpha'}
                onCheckedChange={() => setNode('alpha')}
                label="Fleet Node ALPHA" 
              />
              <MobiCheckbox 
                variant="radio"
                checked={node === 'beta'}
                onCheckedChange={() => setNode('beta')}
                label="Fleet Node BETA" 
              />
              <MobiCheckbox 
                variant="radio"
                checked={node === 'gamma'}
                onCheckedChange={() => setNode('gamma')}
                label="Fleet Node GAMMA" 
              />
            </div>
          </div>
          
          <MobiCheckbox 
            label="Required Validation State" 
            error="You must agree to terms before propulsion ignites." 
          />
        </div>
      );
    }
  },
  {
    id: 'MobiDropdown',
    name: 'MobiDropdown',
    category: 'component',
    description: 'Data selection dropdown.',
    code: `<MobiDropdown options={[{value: '1', label: 'One'}]} label="Select Item" />`,
    render: () => (
      <div className="max-w-xs p-4">
        <MobiDropdown 
          label="Server Region" 
          options={[
            { value: 'us-east', label: 'US East (N. Virginia)' },
            { value: 'eu-west', label: 'EU West (London)' },
            { value: 'ap-south', label: 'AP South (Mumbai)', disabled: true }
          ]} 
        />
      </div>
    )
  },
  {
    id: 'MobiSegmentedControl',
    name: 'MobiSegmentedControl',
    category: 'component',
    description: 'A stylish segmented control for quickly toggling between distinct options or views.',
    code: `<MobiSegmentedControl
  label="VIEW MODE:"
  value={view}
  onChange={setView}
  options={[
    { value: 'grid', label: 'Grid' },
    { value: 'list', label: 'List' }
  ]}
/>`,
    render: () => {
      const [view, setView] = React.useState('grid');
      const [time, setTime] = React.useState('24h');
      
      return (
        <div className="w-full max-w-2xl space-y-4">
          <MobiSegmentedControl
            label="View Mode:"
            value={view}
            onChange={setView}
            options={[
              { value: 'grid', label: 'Grid View' },
              { value: 'list', label: 'List View' },
              { value: 'map', label: 'Map View' }
            ]}
          />
          <MobiSegmentedControl
            label="Timeframe:"
            value={time}
            onChange={setTime}
            options={[
              { value: '1h', label: '1H' },
              { value: '24h', label: '24H' },
              { value: '7d', label: '7D' },
              { value: '30d', label: '30D' }
            ]}
          />
        </div>
      );
    }
  },
  {
    id: 'MobiSwitcher',
    name: 'MobiSwitcher',
    category: 'component',
    description: 'Card-style toggle switch.',
    code: `<MobiSwitcher label="Dark Mode" description="Use dark theme." />`,
    render: () => (
      <div className="max-w-md p-4">
        <MobiSwitcher label="Airplane Mode" description="Disable all network connections." />
      </div>
    )
  },
  {
    id: 'MobiQuantityControl',
    name: 'MobiQuantityControl',
    category: 'component',
    description: 'Numeric input with increment/decrement buttons.',
    code: `<MobiQuantityControl value={5} onChange={console.log} />`,
    render: () => {
      const [val, setVal] = React.useState(1);
      return (
        <div className="p-4">
          <MobiQuantityControl label="Instances" value={val} onChange={setVal} min={1} max={10} />
        </div>
      );
    }
  },
  {
    id: 'MobiDateTime',
    name: 'MobiDateTime',
    category: 'component',
    description: 'Date picker with calendar popover.',
    code: `<MobiDateTime date={new Date()} onDateChange={setDate} />`,
    render: () => {
      const [date, setDate] = React.useState<Date | undefined>(new Date());
      return (
        <div className="max-w-xs p-4">
          <MobiDateTime label="Deployment Date" date={date} onDateChange={setDate} />
        </div>
      );
    }
  },
  {
    id: 'MobiBentoGrid',
    name: 'MobiBentoGrid',
    category: 'component',
    description: 'Premium, multi-dimensional responsive Bento layout grid. Features hover lift interactions and radial glows.',
    code: `<MobiBentoGrid><MobiBentoItem>...</MobiBentoItem></MobiBentoGrid>`,
    render: () => (
      <div className="p-4 sm:p-8 w-full max-w-5xl rounded-3xl">
        <MobiBentoGrid className="grid-cols-1 md:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4 sm:gap-6">
          
          {/* Commander Card */}
          <MobiBentoItem className="md:col-span-2 md:row-span-2 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <MobiBadge variant="info" size="sm" className="rounded-full px-3 py-1 text-[10px]">
                Operational Core
              </MobiBadge>
              <h3 className="text-xl font-bold tracking-tight">Commander</h3>
            </div>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-[280px]">
              Decentralized real-time orchestration engine monitoring network status across all active sectors.
            </p>
            <div className="mt-auto pt-8">
              <div className="w-full h-px bg-border mb-4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground">
                    Sector 4 Node Active
                  </span>
                </div>
                <button className="text-xs font-bold hover:underline">View Logs</button>
              </div>
            </div>
          </MobiBentoItem>

          {/* Haki Balance Card */}
          <MobiBentoItem className="md:col-span-2 md:row-span-1 justify-center">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold tracking-tight">Haki Balance</h3>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black font-mono tracking-tighter">
                  14,250.00 ₡
                </span>
                <div className="p-3 bg-muted text-foreground rounded-xl">
                  <FileText size={24} />
                </div>
              </div>
            </div>
          </MobiBentoItem>

          {/* Active Users Card */}
          <MobiBentoItem className="md:col-span-1 md:row-span-1 justify-center text-center" clickable onClick={() => alert('View Active Users List')}>
            <div className="text-2xl font-bold font-mono tracking-tighter mb-4">
              128 / 500
            </div>
            <div className="w-8 h-px bg-border mx-auto mb-4" />
            <div className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
              Active Users
            </div>
          </MobiBentoItem>

          {/* Response SLA Card */}
          <MobiBentoItem className="md:col-span-1 md:row-span-1 justify-center text-center">
            <div className="text-2xl font-bold font-mono tracking-tighter mb-4 text-emerald-500">
              99.98%
            </div>
            <div className="w-8 h-px bg-border mx-auto mb-4" />
            <div className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
              Response SLA
            </div>
          </MobiBentoItem>

        </MobiBentoGrid>
      </div>
    )
  },
  {
    id: 'MobiBentoIndicator',
    name: 'MobiBentoIndicator',
    category: 'component',
    description: 'A specialized Bento component for dashboard indicators and metrics. Replicates premium metrics cards with values, titles, and icons.',
    code: `<MobiBentoIndicator\n  title="Active Users"\n  value="128 / 500"\n  footer="Response SLA: 99.98%"\n/>`,
    render: () => (
      <div className="p-4 sm:p-8 w-full max-w-5xl rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <MobiBentoIndicator
          title="Haki Balance"
          clickable
          onClick={() => alert('View Ledger')}
          value={<>14,250.00 <span className="font-sans text-xl">₡</span></>}
          icon={<div className="p-2 bg-muted text-foreground rounded-lg"><FileText size={18} /></div>}
        />
        <MobiBentoIndicator
          title="Active Users"
          value={<>128 <span className="text-xl text-muted-foreground">/ 500</span></>}
          footer="Response SLA: 99.98%"
        />
        <MobiBentoIndicator
          title="Response SLA"
          value={<span className="text-emerald-500">99.98%</span>}
          footer="Target: 99.90%"
        />
      </div>
    )
  },
  {
    id: 'MobiTimeline',
    name: 'MobiTimeline',
    category: 'component',
    description: 'Vertical progression steps.',
    code: `<MobiTimeline events={[{ id: '1', title: 'Start' }]} />`,
    render: () => (
      <div className="p-4">
        <MobiTimeline events={[
          { id: '1', title: 'System Boot', date: '10:00 AM', status: 'completed' },
          { id: '2', title: 'Loading Modules', date: '10:05 AM', status: 'active', description: 'Loading core networking components...' },
          { id: '3', title: 'Ready', status: 'default' }
        ]} />
      </div>
    )
  },
  {
    id: 'MobiCodeBlock',
    name: 'MobiCodeBlock',
    category: 'component',
    description: 'Code display with syntax formatting and copy.',
    code: `<MobiCodeBlock code="npm install" language="bash" />`,
    render: () => (
      <div className="p-4 max-w-2xl w-full">
        <MobiCodeBlock code="const mobi = require('@wearemobi/core');\nmobi.init();" language="javascript" />
      </div>
    )
  },
  {
    id: 'MobiMarkdown',
    name: 'MobiMarkdown',
    category: 'component',
    description: 'Render GFM Markdown securely.',
    code: `<MobiMarkdown content="# Hello" />`,
    render: () => (
      <div className="p-4 max-w-2xl w-full border rounded-xl bg-card">
        <MobiMarkdown content={"### Project Delta\n\nThis is a **critical** update.\n- Fixed routing\n- Added metrics\n\n> Note: Please review before deployment."} />
      </div>
    )
  },
  {
    id: 'MobiSearchCommand',
    name: 'MobiSearchCommand',
    category: 'component',
    description: 'Command menu (CMDK) palette.',
    code: `<MobiSearchCommand open={true} groups={[]} />`,
    render: () => {
      const [open, setOpen] = React.useState(false);
      return (
        <div className="p-4 flex flex-col items-center">
          <MobiButton onClick={() => setOpen(true)}>Open Command Palette (⌘K)</MobiButton>
          <MobiSearchCommand
            open={open}
            onOpenChange={setOpen}
            groups={[
              { heading: 'Actions', items: [{ id: '1', label: 'Deploy Project', shortcut: '⌘D' }] }
            ]}
          />
        </div>
      );
    }
  },
  {
    id: 'MobiLogo',
    name: 'MobiLogo',
    category: 'component',
    description: 'Official M.O.B.I.™ brand mark.',
    code: `<MobiLogo size={64} />`,
    render: () => (
      <div className="flex items-center gap-6">
        <MobiLogo size={24} />
        <MobiLogo size={32} />
        <MobiLogo size={48} />
      </div>
    )
  },
  {
    id: 'MobiButton',
    name: 'MobiButton',
    category: 'component',
    description: 'Technical square buttons with multiple variants.',
    code: `<MobiButton variant="solid">Primary</MobiButton>`,
    render: () => (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <MobiButton variant="solid">Solid</MobiButton>
          <MobiButton variant="secondary">Secondary</MobiButton>
          <MobiButton variant="tertiary">Tertiary</MobiButton>
          <MobiButton variant="outline">Outline</MobiButton>
          <MobiButton variant="ghost">Ghost</MobiButton>
          <MobiButton variant="danger">Danger</MobiButton>
          <MobiButton variant="error">Error</MobiButton>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <MobiButton size="sm">Small</MobiButton>
          <MobiButton size="md">Default</MobiButton>
          <MobiButton size="lg">Large</MobiButton>
          <MobiButton size="icon">✨</MobiButton>
        </div>
      </div>
    )
  },
  {
    id: 'MobiCard',
    name: 'MobiCard',
    category: 'component',
    description: 'Premium asset container.',
    code: `<MobiCard title="Operations" variant="tactical">Content</MobiCard>`,
    render: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MobiCard variant="default" title="Default Variant" footer="Simple info">
          <p className="text-sm">Standard card for generic content.</p>
        </MobiCard>
        <MobiCard variant="tactical" title="Tactical Deep Dark" footer="Sovereign Core">
          <p className="text-sm text-slate-300">Deep-dark mode container designed for professional tactical interfaces.</p>
        </MobiCard>
        <MobiCard variant="success">
          <MobiCard.Header><h3 className="font-bold text-success">Success Compound</h3></MobiCard.Header>
          <MobiCard.Content><p className="text-sm">Using compound components.</p></MobiCard.Content>
          <MobiCard.Footer className="text-xs">Footer slot</MobiCard.Footer>
        </MobiCard>
        <MobiCard variant="warning" title="Warning Variant">
          <p className="text-sm">Pay attention to this warning card.</p>
        </MobiCard>
        <MobiCard variant="error" title="Error Variant">
          <p className="text-sm">Critical failure state card.</p>
        </MobiCard>
        <MobiCard variant="info" title="Info Variant">
          <p className="text-sm">Useful highlights and information.</p>
        </MobiCard>
      </div>
    )
  },
  {
    id: 'MobiInput',
    name: 'MobiInput & Textarea',
    category: 'component',
    description: 'Form inputs with clear states.',
    code: `<MobiInput placeholder="Username" />`,
    render: () => (
      <div className="space-y-4 max-w-xs">
        <MobiInput type="text" label="Username" placeholder="Enter username..." />
        <MobiInput type="password" label="Password" placeholder="Enter password..." />
        <MobiInput type="money" label="Amount" placeholder="0.00" currencySymbol="€" currencyCode="EUR" />
        <MobiInput type="number" label="Quantity" placeholder="0" allowNegative />
        <MobiTextarea label="Notes" placeholder="Enter description..." />
      </div>
    )
  },
  {
    id: 'MobiBadge',
    name: 'MobiBadge',
    category: 'component',
    description: 'Status badges.',
    code: `<MobiBadge variant="success">Active</MobiBadge>`,
    render: () => (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <MobiBadge variant="default">Default</MobiBadge>
          <MobiBadge variant="outline">Outline</MobiBadge>
          <MobiBadge variant="success">Success</MobiBadge>
          <MobiBadge variant="warning">Warning</MobiBadge>
          <MobiBadge variant="error">Error</MobiBadge>
          <MobiBadge variant="info">Info</MobiBadge>
        </div>
      </div>
    )
  },
  {
    id: 'MobiAlert',
    name: 'MobiAlert',
    category: 'component',
    description: 'Alerts.',
    code: `<MobiAlert title="Notice" message="Operation completed." type="success" />`,
    render: () => (
      <div className="space-y-3 w-full max-w-md">
        <MobiAlert title="Info" message="This is an informational alert." type="info" />
        <MobiAlert title="Success" message="Operation completed successfully." type="success" />
        <MobiAlert title="Warning" message="Your session is about to expire." type="warning" />
        <MobiAlert title="Error" message="Failed to connect to the server." type="error" />
      </div>
    )
  },
  {
    id: 'MobiUserBadge',
    name: 'MobiUserBadge',
    category: 'component',
    description: 'User identity badge.',
    code: `<MobiUserBadge initials="CQ" plan="PRO" email="dev@mobi.com" />`,
    render: () => (
      <div className="space-y-4 w-full max-w-sm">
        <MobiUserBadge variant="expanded" initials="CQ" name="Carlos Quijano" plan="PRO" email="dev@mobi.com" org="M.O.B.I. HQ" />
        <div className="flex items-center gap-4">
          <MobiUserBadge variant="condensed" initials="CQ" plan="PRO" email="dev@mobi.com" />
          <MobiUserBadge variant="micro" initials="CQ" plan="FREE" email="dev@mobi.com" />
        </div>
      </div>
    )
  },
  {
    id: 'MobiNav',
    name: 'MobiNav (App Shell)',
    category: 'component',
    description: 'Complete application shell with Sidebar and Navbar.',
    code: `<MobiNav items={...} user={...} />`,
    render: () => {
      const [activeId, setActiveId] = React.useState('dash');
      return (
        <div 
          className="w-full relative overflow-hidden rounded-xl border border-border shadow-xl"
          style={{ transform: 'translateZ(0)' }}
        >
          <MobiNav
            className="min-h-[500px] h-[500px] [&_[data-sidebar=sidebar]]:!absolute [&_[data-sidebar=sidebar]]:!h-full"
            activeId={activeId}
            onNavigate={setActiveId}
            user={{ initials: 'CQ', email: 'carlos@mobi.com', plan: 'PRO' }}
            userMenuItems={[{ id: 'logout', label: 'Log out', danger: true }]}
            items={[
              { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard /> },
              { id: 'users', label: 'Users', icon: <Users />, badge: '12' },
              { id: 'settings', label: 'Settings', icon: <Settings /> }
            ]}
          >
            <div className="p-6">
              <h1 className="text-xl font-bold uppercase tracking-tight mb-4">View: {activeId}</h1>
              <p className="text-muted-foreground text-sm">This is the main content area inside the App Shell.</p>
            </div>
          </MobiNav>
        </div>
      );
    }
  },
  {
    id: 'MobiSentinelMenu',
    name: 'MobiSentinelMenu',
    category: 'component',
    description: 'Data-driven user dropdown.',
    code: `<MobiSentinelMenu user={{initials: 'CQ', email: 'dev@mobi.com', plan: 'PRO'}} />`,
    render: () => (
      <MobiSentinelMenu
        user={{ initials: 'CQ', name: 'Carlos Quijano', email: 'carlos@wearemobi.com', plan: 'PRO', org: 'M.O.B.I. HQ' }}
        items={[
          { id: 'profile', label: 'Profile' },
          { id: 'logout', label: 'Logout', danger: true }
        ]}
      />
    )
  },
  {
    id: 'MobiMoreMenu',
    name: 'MobiMoreMenu',
    category: 'component',
    description: 'Icon-triggered dropdown menu for secondary actions.',
    code: `<MobiMoreMenu items={[{ id: '1', label: 'Edit' }]} />`,
    render: () => (
      <div className="flex gap-4 p-4">
        <MobiMoreMenu 
          title="Row Actions"
          items={[
            { id: 'view', label: 'View Details' },
            { id: 'edit', label: 'Edit record' },
            { id: 'delete', label: 'Delete', danger: true }
          ]} 
        />
        <MobiMoreMenu 
          vertical
          items={[
            { id: 'view', label: 'View Details' },
            { id: 'edit', label: 'Edit record' }
          ]} 
        />
      </div>
    )
  },
  {
    id: 'MobiFooter',
    name: 'MobiFooter',
    category: 'component',
    description: 'Standard brand footer for pages and documentation.',
    code: `<MobiFooter />`,
    render: () => (
      <div className="w-full bg-background border border-border rounded-xl overflow-hidden relative">
        <MobiFooter />
      </div>
    )
  },
  {
    id: 'MobiThemeToggle',
    name: 'MobiThemeToggle',
    category: 'component',
    description: 'Light/dark mode toggle. Available in icon (single button) or segmented (Light/System/Dark) variants. Requires MobiThemeProvider.',
    code: `// Wrap your app root:\n<MobiThemeProvider defaultTheme="system">\n  <App />\n</MobiThemeProvider>\n\n// Then use anywhere:\n<MobiThemeToggle />\n<MobiThemeToggle variant="segmented" />`,
    render: () => (
      <MobiThemeProvider>
        <div className="flex flex-col gap-8 p-4">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Icon toggle</span>
            <MobiThemeToggle />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Segmented toggle</span>
            <MobiThemeToggle variant="segmented" />
          </div>
        </div>
      </MobiThemeProvider>
    )
  }
].sort((a, b) => a.name.localeCompare(b.name));

export const DocsPage = ({ activeId }: { activeId: string }) => {
  const item = catalog.find(i => i.id === activeId) || catalog[0];

  return (
    <MobiToastProvider>
      <div className="min-h-screen bg-background text-foreground font-sans">
        <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
          <section id={item.id}>
            <div className="mb-6">
              <h2 className="text-2xl font-black tracking-tight">{item.name}</h2>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
            
            <div className="border border-border rounded-xl p-6 bg-card overflow-x-auto">
              <item.render />
            </div>

            <div className="mt-4 p-4 bg-muted/50 rounded-xl border border-border">
              <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
                {item.code}
              </pre>
            </div>
          </section>
        </main>
        <MobiFooter />
      </div>
    </MobiToastProvider>
  );
};

export default DocsPage;
