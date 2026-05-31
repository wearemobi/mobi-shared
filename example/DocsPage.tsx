import React, { useState } from 'react';
import { 
  MobiLogo, MobiLogoHero, MobiFooter, MobiAlert, MobiPlanBadge, 
  MobiUserBadge, MobiSwitcher, MobiSentinelMenu, MobiNavbar, MobiHero,
  MobiButton, MobiSidebar, MobiSidebarItem, useMobiTheme, useMobiClipboard,
  MobiCard, MobiDropbox, MobiProgress, MobiChatInput, MobiEnergyMeter,
  useMobiChat, useMobiEnergy, MobiChatWidget, MobiMarkdown,
  MobiFormLabel, MobiInput, MobiDropdown, useMobiForm, mobiValidators,
  MobiModal, MobiToastProvider, useMobiToast, MobiCheckbox, MobiTable, MobiTabs,
  MobiBadge, MobiSkeleton, MobiSkeletonGroup, MobiTooltip, MobiPagination,
  MobiAnalytics, useMobiAnalytics,
  MobiLoader, MobiWizard, useMobiWizard, MobiListView,
  MobiChatEdge, useMobiEdge,
  MobiNav, MobiHamburgerMenu, MobiDrawer, MobiIcon, MobiAppLogo,
  MobiSectionHeader, MobiBentoGrid, MobiBentoItem,
  MobiConfirm, MobiQuantityControl, MobiEmojiPicker
} from '../src';
import pkg from '../package.json';


/* ─── Component catalog entries ─── */
interface CatalogEntry {
  id: string;
  name: string;
  category: 'component' | 'hook';
  description: string;
  code: string;
  render: () => React.ReactNode;
}

const catalog: CatalogEntry[] = [
  {
    id: 'MobiLogo',
    name: 'MobiLogo',
    category: 'component',
    description: 'Official M.O.B.I.™ brand mark at configurable size.',
    code: `<MobiLogo size={64} />`,
    render: () => (
      <div className="flex items-center gap-6">
        <MobiLogo size={24} />
        <MobiLogo size={32} />
        <MobiLogo size={48} />
        <MobiLogo size={64} />
      </div>
    )
  },
  {
    id: 'MobiLogoHero',
    name: 'MobiLogoHero',
    category: 'component',
    description: 'Theme-aware hero logo with entrance animation.',
    code: `<MobiLogoHero size={160} />`,
    render: () => (
      <div className="flex flex-col items-center justify-center p-8 bg-mobi-bg rounded-xl border border-mobi-border">
        <MobiLogoHero size={120} />
        <p className="text-[10px] text-mobi-text-muted uppercase tracking-widest mt-4">Theme-aware asset resolution</p>
      </div>
    )
  },
  {
    id: 'MobiAppLogo',
    name: 'MobiAppLogo',
    category: 'component',
    description: 'Dynamic app identity icon with stylized initial on black square.',
    code: `<MobiAppLogo label="MobiVault" size={48} />`,
    render: () => (
      <div className="flex items-center gap-6 p-4 bg-mobi-bg rounded-xl border border-mobi-border">
        <MobiAppLogo label="MobiVault" size={32} />
        <MobiAppLogo label="EdgeReactor" size={48} />
        <MobiAppLogo label="GrandFleet" size={64} />
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-mobi-text">Identity Matrix</span>
          <span className="text-[9px] text-mobi-text-muted">Dynamic Initial Extraction</span>
        </div>
      </div>
    )
  },
  {
    id: 'MobiSectionHeader',
    name: 'MobiSectionHeader',
    category: 'component',
    description: 'Standardized layout for section introductions with headline badges, titles, and descriptions.',
    code: `<MobiSectionHeader \n  headline="Category" \n  title="Section Title" \n  description="Detailed explanation..." \n  variant="component" \n/>`,
    render: () => (
      <div className="space-y-8 p-6 bg-mobi-bg rounded-xl border border-mobi-border">
        <MobiSectionHeader 
          headline="Fleet Component" 
          title="Reactor Core" 
          description="A specialized module for managing atomic energy state and tactical intelligence orchestration." 
          variant="component"
        />
        <div className="pt-4 border-t border-mobi-border/50">
          <MobiSectionHeader 
            title="Simplified Header" 
            description="Only title and description, no headline badge." 
          />
        </div>
      </div>
    )
  },
  {
    id: 'MobiFooter',
    name: 'MobiFooter',
    category: 'component',
    description: 'Zero-config "Powered by M.O.B.I.™" branding footer.',
    code: `<MobiFooter />`,
    render: () => <MobiFooter />
  },
  {
    id: 'MobiNavbar',
    name: 'MobiNavbar',
    category: 'component',
    description: 'Sticky top navigation bar with responsive logo/text and content slots.',
    code: `<MobiNavbar 
  title="My App" 
  onLogoClick={() => {}} 
  rightContent={<div className="text-xs">Right Side</div>} 
/>`,
    render: () => (
      <div className="relative border border-mobi-border rounded-xl overflow-hidden bg-mobi-bg" style={{ height: '120px' }}>
        <MobiNavbar 
          title="M.O.B.I.™ Demo" 
          onLogoClick={() => alert('Logo Clicked!')} 
          rightContent={
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg bg-mobi-primary text-mobi-bg text-[10px] font-bold uppercase tracking-widest">Action</button>
            </div>
          }
        />
        <div className="p-4 text-[10px] text-mobi-text-muted italic">
          * Navbar is sticky and features a glassmorphism effect.
        </div>
      </div>
    )
  },
  {
    id: 'MobiHero',
    name: 'MobiHero',
    category: 'component',
    description: 'High-impact header section for landing pages with title, subtitle, and description slots.',
    code: `<MobiHero 
  title="Hero Title" 
  subtitle="Muted Subtitle"
  description="Main description text goes here."
>
  <button>Action</button>
</MobiHero>`,
    render: () => (
      <div className="border border-mobi-border rounded-xl bg-mobi-bg p-4">
        <MobiHero 
          logo={<MobiLogoHero size={120} />}
          title="M.O.B.I.™" 
          subtitle="Shared" 
          description="Implementing the Core Blueprint v1.0.0."
          className="py-8"
        >
          <MobiButton variant="outline" size="sm">
            Call to Action
          </MobiButton>
        </MobiHero>
      </div>
    )
  },
  {
    id: 'MobiButton',
    name: 'MobiButton',
    category: 'component',
    description: 'Technical square buttons with multiple variants (solid, outline, ghost, danger) and sizes.',
    code: `<MobiButton variant="solid">Primary</MobiButton>
<MobiButton variant="outline">Secondary</MobiButton>
<MobiButton variant="ghost">Cancel</MobiButton>`,
    render: () => (
      <div className="space-y-8">
        <div>
          <p className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em] mb-4">Standard Style (Sans)</p>
          <div className="flex flex-wrap items-center gap-4">
            <MobiButton variant="solid">Solid Action</MobiButton>
            <MobiButton variant="outline">Outline View</MobiButton>
            <MobiButton variant="ghost">Ghost/Cancel</MobiButton>
            <MobiButton variant="danger">Danger</MobiButton>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em] mb-4">Technical Style (Mono)</p>
          <div className="flex flex-wrap items-center gap-4">
            <MobiButton variant="solid" technical>Solid Mono</MobiButton>
            <MobiButton variant="outline" technical>Outline Mono</MobiButton>
            <MobiButton variant="ghost" technical>Ghost Mono</MobiButton>
            <MobiButton variant="danger" technical>Danger Mono</MobiButton>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em] mb-4">Technical Sizes</p>
          <div className="flex flex-wrap items-center gap-4">
            <MobiButton size="sm" variant="outline" technical>Technical SM</MobiButton>
            <MobiButton size="md" variant="outline" technical>Technical MD</MobiButton>
            <MobiButton size="lg" variant="outline" technical>Technical LG</MobiButton>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <MobiButton 
            variant="secondary" 
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            With Icon
          </MobiButton>
        </div>
      </div>
    )
  },
  {
    id: 'MobiAlert',
    name: 'MobiAlert',
    category: 'component',
    description: 'Animated toast with auto-dismiss, icons, and progress bar.',
    code: `<MobiAlert
  title="Notice"
  message="Operation completed."
  type="success"
  duration={0}
/>`,
    render: () => (
      <div className="space-y-3 w-full max-w-md">
        <MobiAlert title="Info" message="This is an informational alert." type="info" duration={0} />
        <MobiAlert title="Success" message="Operation completed successfully." type="success" duration={0} />
        <MobiAlert title="Warning" message="Proceed with caution." type="warning" duration={0} />
        <MobiAlert title="Error" message="Something went wrong." type="error" duration={0} />
      </div>
    )
  },
  {
    id: 'MobiPlanBadge',
    name: 'MobiPlanBadge',
    category: 'component',
    description: 'Color-coded pill badge for subscription tiers.',
    code: `<MobiPlanBadge plan="PRO" />`,
    render: () => (
      <div className="flex flex-wrap items-center gap-3">
        <MobiPlanBadge plan="FREE" />
        <MobiPlanBadge plan="BASIC" />
        <MobiPlanBadge plan="PRO" />
        <MobiPlanBadge plan="ULTRA" />
        <MobiPlanBadge plan="CUSTOM" />
        <MobiPlanBadge plan="NOT_AVAILABLE" />
      </div>
    )
  },
  {
    id: 'MobiUserBadge',
    name: 'MobiUserBadge',
    category: 'component',
    description: 'Theme-aware identity badge with condensed and expanded variants.',
    code: `<MobiUserBadge
  variant="condensed"
  initials="CA"
  plan="ULTRA"
  email="dev@mobi.com"
/>`,
    render: () => (
      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em] mb-2 font-sans">Condensed</p>
          <MobiUserBadge variant="condensed" initials="CA" name="Carlos Quijano" plan="ULTRA" email="dev@mobi.com" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em] mb-2 font-sans">Expanded</p>
          <div className="border border-mobi-border rounded-2xl overflow-hidden max-w-xs">
            <MobiUserBadge variant="expanded" initials="CA" name="Carlos Quijano" plan="ULTRA" email="dev@mobi.com" org="M.O.B.I. HQ" />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'MobiSwitcher',
    name: 'MobiSwitcher',
    category: 'component',
    description: 'Compact segmented selector for configuration toggles.',
    code: `<MobiSwitcher
  options={[
    { id: 'ES', label: 'ES', icon: '🇸🇻' },
    { id: 'EN', label: 'EN', icon: '🇺🇸' }
  ]}
  activeId="ES"
  onChange={setLang}
/>`,
    render: () => {
      const SwitcherDemo = () => {
        const [lang, setLang] = useState('ES');
        const [mode, setMode] = useState('light');
        return (
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em] mb-2 font-sans">With Labels</p>
              <MobiSwitcher
                options={[
                  { id: 'ES', label: 'ES', icon: <span className="text-base leading-none">🇸🇻</span> },
                  { id: 'EN', label: 'EN', icon: <span className="text-base leading-none">🇺🇸</span> }
                ]}
                activeId={lang}
                onChange={setLang}
              />
            </div>
            <div>
              <p className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em] mb-2 font-sans">Icon Only</p>
              <MobiSwitcher
                hideLabel
                options={[
                  { id: 'light', label: 'Light', icon: <span>☀️</span> },
                  { id: 'system', label: 'Auto', icon: <span>💻</span> },
                  { id: 'dark', label: 'Dark', icon: <span>🌙</span> }
                ]}
                activeId={mode}
                onChange={setMode}
              />
            </div>
          </div>
        );
      };
      return <SwitcherDemo />;
    }
  },
  {
    id: 'MobiSidebar',
    name: 'MobiSidebar',
    category: 'component',
    description: 'Responsive navigation drawer with mobile overlay support.',
    code: `<MobiSidebar 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title={<MobiLogo size={28} />}
>
  <MobiSidebarItem active>Home</MobiSidebarItem>
  <MobiSidebarItem>Settings</MobiSidebarItem>
</MobiSidebar>`,
    render: () => {
      const SidebarDemo = () => {
        const [open, setOpen] = useState(false);
        return (
          <div className="space-y-4">
            <MobiButton variant="outline" onClick={() => setOpen(true)} technical>Open Sidebar Preview</MobiButton>
            <div className="text-[10px] text-mobi-text-muted italic">* Sidebar becomes an overlay on mobile and a fixed column on large screens.</div>
            {open && (
              <div className="fixed inset-0 z-[200]">
                <MobiSidebar isOpen={open} onClose={() => setOpen(false)}>
                  <p className="px-3 mb-2 text-[10px] font-bold text-mobi-text-muted uppercase tracking-widest">Demo Menu</p>
                  <MobiSidebarItem active icon={<span>🏠</span>}>Dashboard</MobiSidebarItem>
                  <MobiSidebarItem icon={<span>⚙️</span>}>Settings</MobiSidebarItem>
                  <MobiSidebarItem icon={<span>👤</span>}>Profile</MobiSidebarItem>
                </MobiSidebar>
              </div>
            )}
          </div>
        );
      };
      return <SidebarDemo />;
    }
  },
  {
    id: 'MobiNav',
    name: 'MobiNav',
    category: 'component',
    description: 'Hybrid navigation orchestration with optional collapsible desktop mode, premium glyph registry, and custom action slots.',
    code: `<MobiNav 
  items={[
    { id: 'dash', label: 'Dashboard', icon: <MobiIcon name="pos" /> }
  ]} 
  activeId="dash" 
  collapsible={true}
  footerActions={
    <div className="flex flex-col gap-2 w-full">
      <MobiButton size="sm" variant="solid" className="w-full">Sync POS</MobiButton>
    </div>
  }
  onNavigate={(id) => console.log(id)} 
/>`,
    render: () => {
      const NavDemo = () => {
        const [active, setActive] = useState('dash');
        const [collapsible, setCollapsible] = useState(true);

        return (
          <div className="border border-mobi-border rounded-xl bg-mobi-bg overflow-hidden relative flex flex-col" style={{ height: '380px' }}>
            <div className="p-3 border-b border-mobi-border bg-mobi-surface/50 flex gap-4 items-center justify-between z-20">
              <span className="text-[10px] font-black uppercase tracking-wider text-mobi-text-muted">Desktop Mode Control:</span>
              <MobiButton size="sm" variant="outline" onClick={() => setCollapsible(!collapsible)}>
                {collapsible ? "Lock Permanent Layout" : "Unlock Collapsible Mode"}
              </MobiButton>
            </div>
            <div className="flex-1 relative overflow-hidden">
              <MobiNav 
                activeId={active}
                onNavigate={setActive}
                collapsible={collapsible}
                items={[
                  { id: 'dash', label: 'Retail POS', icon: <MobiIcon name="pos" size={18} /> },
                  { id: 'items', label: 'Items Inventory', icon: <MobiIcon name="items" size={18} /> },
                  { id: 'billing', label: 'Transactions Ledger', icon: <MobiIcon name="billing" size={18} /> },
                  { id: 'customers', label: 'Customers Cardex', icon: <MobiIcon name="customers" size={18} /> },
                  { id: 'ia', label: 'Intelligence Engine', icon: <MobiIcon name="ia" size={18} /> }
                ]}
                title={
                  <span className="font-bold flex items-center gap-2">
                    <MobiIcon name="cart" size={20} className="text-mobi-primary" /> 
                    <span>Retail Unit</span>
                  </span>
                }
                footerActions={
                  <div className="flex flex-col gap-2 w-full">
                    <MobiButton size="sm" variant="solid" className="w-full">Sync Database</MobiButton>
                    <MobiButton size="sm" variant="outline" className="w-full">Settings</MobiButton>
                  </div>
                }
                footer={
                  <div className="text-[9px] text-mobi-text-muted text-center uppercase tracking-widest font-mono">
                    Terminal v1.4.2
                  </div>
                }
              />
              <div className={`p-6 transition-all duration-300 ${collapsible ? "lg:pl-6" : "lg:pl-76"}`}>
                <h4 className="text-xs font-black uppercase tracking-widest text-mobi-text mb-2">Main Panel Viewport</h4>
                <p className="text-[10px] text-mobi-text-muted leading-relaxed max-w-md">
                  Active Panel: <code className="bg-mobi-surface px-1.5 py-0.5 border border-mobi-border rounded">{active.toUpperCase()}</code>.
                  {collapsible && " The sidebar is currently collapsible on desktop! Toggle it using the hamburger menu triggers."}
                  {!collapsible && " The sidebar is currently fixed and locked open on desktop viewports."}
                </p>
              </div>
            </div>
          </div>
        );
      };
      return <NavDemo />;
    }
  },
  {
    id: 'MobiSentinelMenu',
    name: 'MobiSentinelMenu',
    category: 'component',
    description: 'Data-driven user dropdown with identity, actions, and config controls.',
    code: `<MobiSentinelMenu
  user={{
    initials: 'CA',
    name: 'Carlos Quijano',
    email: 'dev@mobi.com',
    plan: 'PRO',
    org: 'Fleet HQ'
  }}
  items={[
    { id: 'profile', label: 'Profile' },
    { id: 'logout', label: 'Logout', danger: true }
  ]}
/>`,
    render: () => (
      <div className="flex justify-start">
        <MobiSentinelMenu
          user={{ initials: 'CA', name: 'Carlos Quijano', email: 'carlos@wearemobi.com', plan: 'ULTRA', org: 'M.O.B.I. HQ' }}
          items={[
            { id: 'profile', label: 'Profile', icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
            { id: 'logout', label: 'Logout', danger: true, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg> }
          ]}
        />
      </div>
    )
  },
  {
    id: 'MobiHamburgerMenu',
    name: 'MobiHamburgerMenu',
    category: 'component',
    description: 'Tactical action dropdown triggered by a hamburger icon. Ideal for contextual actions and modular manifests.',
    code: `<MobiHamburgerMenu 
  items={[
    { id: 'copy', label: 'Copy UUID', icon: <CopyIcon /> },
    { id: 'sync', label: 'Force Sync', icon: <SyncIcon /> },
    { id: 'destruct', label: 'Self Destruct', icon: <TrashIcon />, danger: true }
  ]} 
/>`,
    render: () => (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-mobi-text-muted uppercase tracking-widest">Dropdown Mode (Default)</span>
            <MobiHamburgerMenu 
              title="Module Actions"
              items={[
                { id: 'copy', label: 'Copy UUID', icon: <span className="text-xs">📋</span>, onClick: () => alert('UUID Copied to Buffer') },
                { id: 'sync', label: 'Force Sync', icon: <span className="text-xs">🔄</span> },
                { id: 'destruct', label: 'Self Destruct', icon: <span className="text-xs">💥</span>, danger: true, onClick: () => alert('Protocol Alpha initiated') }
              ]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-mobi-text-muted uppercase tracking-widest">Drawer Mode (Right)</span>
            <MobiHamburgerMenu 
              mode="drawer"
              title="Fleet Manifest"
              variant="primary"
              items={[
                { id: 'scan', label: 'Scan Perimeter', icon: <span className="text-xs">📡</span> },
                { id: 'logs', label: 'Access Logs', icon: <span className="text-xs">📄</span> },
                { id: 'reboot', label: 'Hard Reboot', icon: <span className="text-xs">🔋</span>, danger: true }
              ]}
            />
          </div>
        </div>
    )
  },
  {
    id: 'MobiDrawer',
    name: 'MobiDrawer',
    category: 'component',
    description: 'A versatile sliding panel for navigation, filters, or auxiliary content. Supports multiple positions (left, right, top, bottom).',
    code: `<MobiDrawer 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  position="right"
  title="System Settings"
>
  <p>Drawer Content</p>
</MobiDrawer>`,
    render: () => {
      const DrawerDemo = () => {
        const [open, setOpen] = useState(false);
        const [pos, setPos] = useState<any>('right');
        
        const openDrawer = (p: any) => {
          setPos(p);
          setOpen(true);
        };

        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <MobiButton variant="outline" size="sm" onClick={() => openDrawer('left')} technical>Left</MobiButton>
              <MobiButton variant="outline" size="sm" onClick={() => openDrawer('right')} technical>Right</MobiButton>
              <MobiButton variant="outline" size="sm" onClick={() => openDrawer('top')} technical>Top</MobiButton>
              <MobiButton variant="outline" size="sm" onClick={() => openDrawer('bottom')} technical>Bottom</MobiButton>
            </div>
            
            <MobiDrawer 
              isOpen={open} 
              onClose={() => setOpen(false)} 
              position={pos}
              title={`Sovereign Panel (${pos.toUpperCase()})`}
              footer={
                <div className="flex justify-end">
                  <MobiButton variant="solid" size="sm" onClick={() => setOpen(false)}>Acknowledge</MobiButton>
                </div>
              }
            >
              <div className="space-y-4">
                <p className="text-mobi-text leading-relaxed">
                  The M.O.B.I.™ Drawer provides an overlay context for advanced configuration or navigation manifesting.
                </p>
                <div className="p-4 bg-mobi-bg/50 border border-mobi-border rounded-xl font-mono text-[10px]">
                  ID: FLEET_DRAWER_001<br/>
                  STATUS: OPERATIONAL<br/>
                  POSITION: {pos.toUpperCase()}
                </div>
              </div>
            </MobiDrawer>
          </div>
        );
      };
      return <DrawerDemo />;
    }
  },
  {
    id: 'MobiCard',
    name: 'MobiCard',
    category: 'component',
    description: 'Premium asset container with header, technical footer, and curated theme-aware color variants.',
    code: `<MobiCard title="Tactical Operations" variant="tactical" footer="Core Command">
  <p>Core tactical overview.</p>
</MobiCard>`,
    render: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <MobiCard title="Default Variant" variant="default" footer="Asset Frame">
          <p className="text-sm text-mobi-text leading-relaxed">
            Standard crisp M.O.B.I.™ responsive dashboard component container.
          </p>
        </MobiCard>
        <MobiCard title="Primary Accent" variant="primary" footer="Core Grid">
          <p className="text-sm text-mobi-text leading-relaxed">
            Highlight boundary accentuating the M.O.B.I.™ primary theme color.
          </p>
        </MobiCard>
        <MobiCard title="Success Matrix" variant="success" footer="Operational Status">
          <p className="text-sm text-mobi-text leading-relaxed">
            Curated emerald highlights for active nodes and verified results.
          </p>
        </MobiCard>
        <MobiCard title="Tactical Deep Dark" variant="tactical" footer="Sovereign Core">
          <p className="text-sm text-slate-300 leading-relaxed">
            Deep-dark mode container designed for professional tactical interfaces.
          </p>
        </MobiCard>
      </div>
    )
  },
  {
    id: 'MobiBentoGrid',
    name: 'MobiBentoGrid',
    category: 'component',
    description: 'Premium, multi-dimensional responsive Bento layout grid. Features hover lift interactions and radial glows.',
    code: `<MobiBentoGrid columns={4}>
  <MobiBentoItem colSpan={2} rowSpan={2}>
    <h3>Main Control</h3>
  </MobiBentoItem>
  <MobiBentoItem colSpan={2}>
    <h3>Side Widget</h3>
  </MobiBentoItem>
</MobiBentoGrid>`,
    render: () => (
      <div className="w-full max-w-4xl">
        <MobiBentoGrid columns={4}>
          <MobiBentoItem colSpan={2} rowSpan={2} className="min-h-[220px]">
            <div className="flex flex-col justify-between h-full">
              <div>
                <MobiBadge variant="info" className="mb-2">Operational Core</MobiBadge>
                <h3 className="text-lg font-bold text-mobi-text tracking-tight mb-2">Grand Fleet Commander</h3>
                <p className="text-xs text-mobi-text-muted leading-relaxed">
                  Decentralized real-time orchestration engine monitoring network status across all active sectors.
                </p>
              </div>
              <div className="flex gap-2 items-center mt-4">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-mobi-text-muted uppercase">Sector 4 Node Active</span>
              </div>
            </div>
          </MobiBentoItem>

          <MobiBentoItem colSpan={2} className="min-h-[100px]">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xs font-bold text-mobi-text uppercase tracking-wider mb-1">Haki Balance</h4>
                <div className="text-2xl font-black text-mobi-text font-mono">14,250.00 ₡</div>
              </div>
              <MobiIcon name="billing" size={24} className="text-mobi-primary" />
            </div>
          </MobiBentoItem>

          <MobiBentoItem colSpan={1} className="min-h-[100px]">
            <div className="flex flex-col justify-between h-full">
              <span className="text-[10px] uppercase font-bold text-mobi-text-muted">Active Users</span>
              <div className="text-xl font-bold text-mobi-text font-mono mt-1">128 / 500</div>
            </div>
          </MobiBentoItem>

          <MobiBentoItem colSpan={1} className="min-h-[100px]">
            <div className="flex flex-col justify-between h-full">
              <span className="text-[10px] uppercase font-bold text-mobi-text-muted">Response SLA</span>
              <div className="text-xl font-bold text-emerald-500 font-mono mt-1">99.98%</div>
            </div>
          </MobiBentoItem>
        </MobiBentoGrid>
      </div>
    )
  },
  {
    id: 'MobiDropbox',
    name: 'MobiDropbox',
    category: 'component',
    description: 'High-performance drag-and-drop file ingestion vector with configurable texts and progress tracking.',
    code: `<MobiDropbox 
  title="Subir Facturas"
  description="Solo archivos .xml o .pdf"
  onUploadSuccess={(files) => handleUpload(files)} 
  acceptedExtensions={['.xml', '.pdf']} 
  isUploading={isLoading}
  progress={progress}
/>`,
    render: () => {
      const DropboxDemo = () => {
        const [loading, setLoading] = useState(false);
        const [progress, setProgress] = useState(0);

        const simulateUpload = () => {
          setLoading(true);
          setProgress(0);
          const interval = setInterval(() => {
            setProgress(prev => {
              if (prev >= 100) {
                clearInterval(interval);
                setTimeout(() => setLoading(false), 1000);
                return 100;
              }
              return prev + 5;
            });
          }, 100);
        };

        return (
          <div className="space-y-6">
            <MobiDropbox 
              title="Facturación Ingest"
              description="Arrastra tus documentos tributarios aquí"
              onUploadSuccess={simulateUpload} 
              acceptedExtensions={['.json', '.csv', '.pdf']} 
              isUploading={loading}
              progress={progress}
            />
            {loading && (
              <p className="text-[10px] font-mono text-center text-mobi-text-muted animate-pulse">
                INTERNAL PIPELINE SYNC IN PROGRESS...
              </p>
            )}
          </div>
        );
      };
      return <DropboxDemo />;
    }
  },
  {
    id: 'MobiProgress',
    name: 'MobiProgress',
    category: 'component',
    description: 'High-precision progress indicator for technical workflows.',
    code: `<MobiProgress 
  value={65} 
  label="Processing..." 
  status="650/1000 items" 
/>`,
    render: () => (
      <div className="space-y-8 max-w-md">
        <MobiProgress value={33} label="System Optimization" status="33% optimized" />
        <MobiProgress value={88} label="Data Ingestion" status="Ready for final sync" technical />
      </div>
    )
  },
  {
    id: 'MobiChatInput',
    name: 'MobiChatInput',
    category: 'component',
    description: 'A premium, technical command center for agentic interactions with auto-resize and toolbar integration.',
    code: `<MobiChatInput 
  onSend={(msg) => handleSend(msg)} 
  placeholder="Type a command..."
/>`,
    render: () => {
      const ChatDemo = () => {
        const { 
          messages, 
          isProcessing, 
          activeModelId, 
          energy, 
          sendMessage, 
          setActiveModelId,
          rechargeEnergy 
        } = useMobiChat({ 
          initialEnergy: 85,
          onSendMessage: async (msg) => {
            await new Promise(r => setTimeout(r, 1000));
            return `M.O.B.I.™ received: "${msg}". Command logged in tactical buffer.`;
          }
        });

        return (
          <div className="max-w-2xl mx-auto w-full py-8 space-y-8">
            <MobiChatInput 
              onSend={sendMessage} 
              isProcessing={isProcessing}
              activeModelId={activeModelId}
              onModelChange={setActiveModelId}
              energy={energy}
              onAttachClick={() => alert('Attach clicked')}
            />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-mobi-text">Command History</h4>
                <MobiButton variant="ghost" size="sm" onClick={() => rechargeEnergy(20)}>Recharge +20%</MobiButton>
              </div>
              <div className="space-y-2 max-h-[200px] overflow-y-auto p-4 bg-mobi-bg/30 border border-mobi-border rounded-xl">
                {messages.length === 0 && <p className="text-[10px] font-mono text-mobi-text-muted">No commands in buffer.</p>}
                {messages.map(m => (
                  <div key={m.id} className="flex gap-2 text-[10px] font-mono">
                    <span className={m.role === 'user' ? 'text-mobi-primary' : 'text-emerald-500'}>
                      [{m.role.toUpperCase()}]
                    </span>
                    <span className="text-mobi-text-muted">({m.model}):</span>
                    <span className="text-mobi-text">{m.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      };
      return <ChatDemo />;
    }
  },
  {
    id: 'MobiEnergyMeter',
    name: 'MobiEnergyMeter',
    category: 'component',
    description: 'A technical battery indicator for monitoring resource consumption and power states. Now interactive.',
    code: `<MobiEnergyMeter 
  value={42} 
  size="md" 
  onClick={(v) => recharge(v)} 
/>`,
    render: () => {
      const EnergyDemo = () => {
        const { level, drain, charge } = useMobiEnergy({ initialLevel: 65 });
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-8">
              <MobiEnergyMeter value={level} size="sm" onClick={() => drain(5)} />
              <MobiEnergyMeter value={level} size="md" onClick={() => drain(10)} />
              <MobiEnergyMeter value={level} size="lg" onClick={() => charge(20)} />
            </div>
            <p className="text-[10px] font-mono text-mobi-text-muted italic">
              Click meters to simulate energy drain/charge. Current: {level}%
            </p>
          </div>
        );
      };
      return <EnergyDemo />;
    }
  },
  {
    id: 'useMobiTheme',
    name: 'useMobiTheme',
    category: 'hook',
    description: 'Theme state with localStorage persistence and OS preference detection.',
    code: `const { theme, setTheme } = useMobiTheme();`,
    render: () => {
      const ThemeDemo = () => {
        const { theme, setTheme } = useMobiTheme();
        return (
          <div className="space-y-3">
            <p className="text-sm font-bold font-sans">Current: <code className="font-mono text-mobi-text-muted">{theme}</code></p>
            <div className="flex gap-2">
              {(['light', 'system', 'dark'] as const).map(t => (
                <button key={t} onClick={() => setTheme(t)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest font-sans transition-all ${theme === t ? 'bg-mobi-primary text-mobi-bg' : 'bg-mobi-surface border border-mobi-border text-mobi-text'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        );
      };
      return <ThemeDemo />;
    }
  },
  {
    id: 'useMobiClipboard',
    name: 'useMobiClipboard',
    category: 'hook',
    description: 'Copy-to-clipboard with transient "Copied!" feedback state.',
    code: `const { copy, isCopied } = useMobiClipboard();`,
    render: () => {
      const ClipDemo = () => {
        const { copy, isCopied } = useMobiClipboard();
        return (
          <button onClick={() => copy('Hello from M.O.B.I.™!')}
            className="px-4 py-2 rounded-xl bg-mobi-surface border border-mobi-border text-sm font-bold font-sans transition-all hover:bg-mobi-surface-hover active:scale-95">
            {isCopied ? '✓ Copied!' : 'Copy "Hello from M.O.B.I.™!"'}
          </button>
        );
      };
      return <ClipDemo />;
    }
  },
  {
    id: 'MobiChatWidget',
    name: 'MobiChatWidget',
    category: 'component',
    description: 'A sovereign agentic interface that floats over the UI. Encapsulates history, models, and input.',
    code: `<MobiChatWidget title="Agentic Link" initialEnergy={100} />`,
    render: () => (
      <div className="p-12 border border-dashed border-mobi-border rounded-2xl text-center">
        <p className="text-[10px] font-mono text-mobi-text-muted uppercase">
          Check the bottom-right corner of the screen to interact with the widget.
        </p>
      </div>
    )
  },
  {
    id: 'MobiMarkdown',
    name: 'MobiMarkdown',
    category: 'component',
    description: 'Standardized markdown rendering with GitHub Flavored Markdown support and M.O.B.I.™ styling.',
    code: `<MobiMarkdown>\n  # Title\\n\\nSome **bold** text and \`code\`.\n</MobiMarkdown>`,
    render: () => (
      <div className="max-w-xl">
        <MobiMarkdown>
          {`# Heading 1\n\n## Heading 2\n\nThis is a paragraph with **bold** and *italic* text. \n\n- List item 1\n- List item 2\n\n\`\`\`javascript\nconst a = 1;\nconsole.log(a);\n\`\`\`\n\n> Blockquote example`}
        </MobiMarkdown>
      </div>
    )
  },
  {
    id: 'MobiFormLabel',
    name: 'MobiFormLabel',
    category: 'component',
    description: 'A premium typographic and structure system for form field labels, helper descriptions, and section titles.',
    code: `<MobiFormLabel 
  label="Operator Initials" 
  description="Your registered dual-letter initials" 
  required 
/>

<MobiFormLabel 
  variant="title" 
  label="Primary Database Configuration" 
  description="Manage structural assets for this Fleet node" 
/>

<MobiFormLabel 
  variant="section" 
  label="Access Security Protocols" 
/>`,
    render: () => (
      <div className="space-y-6 max-w-xl">
        <MobiFormLabel 
          variant="title" 
          label="Sovereign Control Node" 
          description="Establish core parameters for your quantum navigation stack." 
        />
        
        <MobiFormLabel 
          variant="section" 
          label="Authentication Suite" 
          description="Provide valid keys to unlock administrative pathways."
        />

        <div className="grid grid-cols-2 gap-4">
          <MobiFormLabel 
            label="Sovereign Identity Code" 
            description="Official pilot ID token assigned by Grand Fleet Command." 
            required 
          />
          <MobiFormLabel 
            label="Auxiliary Comm Channel" 
            description="Optional secondary laser frequency." 
            optional 
          />
        </div>
      </div>
    )
  },
  {
    id: 'MobiInput',
    name: 'MobiInput',
    category: 'component',
    description: 'Unified high-fidelity inputs including standard text, email, revealable passwords, keyboard-filtered numbers, auto-resizing textareas, and money (currency) formats with built-in prefixes and suffixes.',
    code: `<MobiInput 
  type="text" 
  label="Pilot Handle" 
  placeholder="e.g. Maverick" 
/>

<MobiInput 
  type="password" 
  label="Decryption Key" 
  description="Reveals password with interactive eye toggler" 
  required 
/>

<MobiInput 
  type="money" 
  label="Ship Fuel Allowance" 
  placeholder="0.00" 
/>`,
    render: () => {
      const InputDemo = () => {
        const [pw, setPw] = useState('MySecretPassphrase');
        const [money, setMoney] = useState('1500000.00');
        const [notes, setNotes] = useState('Optimal sub-light velocities recorded.');
        
        return (
          <div className="space-y-6 max-w-xl">
            <MobiInput 
              type="text" 
              label="Standard Input" 
              placeholder="Enter standard text..." 
              description="Basic sans-serif typography container."
            />
            
            <MobiInput 
              type="password" 
              label="Secure Password Input" 
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              description="Reveals/conceals contents utilizing a premium inline toggle."
            />

            <MobiInput 
              type="money" 
              label="Financial/Currency Field" 
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              description="Injects a fixed prefix ($) and suffix (USD), locking numerical integrity."
              technical
            />

            <MobiInput 
              type="textarea" 
              label="Multi-line Textarea" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your multi-line flight logs..."
              description="Dynamically resizes as typing extends past boundaries."
            />

            <MobiInput 
              type="text" 
              label="Error State Presentation" 
              error="Validation failure: Cryptographic checksum mismatch on sector 9" 
              defaultValue="CORRUPTED_HEX_7F3"
              technical
            />
          </div>
        );
      };
      return <InputDemo />;
    }
  },
  {
    id: 'MobiDropdown',
    name: 'MobiDropdown',
    category: 'component',
    description: 'A custom styled dropdown component that integrates seamlessly with MOBI theme states, supporting section labels, helper text, and error indicators.',
    code: `<MobiDropdown 
  label="Quantum Reactor Speed" 
  placeholder="Choose velocity state..."
  options={[
    { value: 'low', label: 'Idle / Minimal Power (10%)' },
    { value: 'med', label: 'Cruising Efficiency (50%)' },
    { value: 'high', label: 'Overcharged Peak (100%)', disabled: true }
  ]} 
/>`,
    render: () => {
      const DropdownDemo = () => {
        const [val, setVal] = useState('med');
        
        // Chained Dropdown State
        const [country, setCountry] = useState('');
        const [department, setDepartment] = useState('');
        const [city, setCity] = useState('');

        const countries = [
          { value: 'col', label: 'Colombia 🇨🇴' },
          { value: 'usa', label: 'United States 🇺🇸' }
        ];

        const departments: Record<string, { value: string; label: string }[]> = {
          col: [
            { value: 'antioquia', label: 'Antioquia' },
            { value: 'bogota_dc', label: 'Bogotá D.C.' }
          ],
          usa: [
            { value: 'california', label: 'California' },
            { value: 'new_york', label: 'New York' }
          ]
        };

        const cities: Record<string, { value: string; label: string }[]> = {
          antioquia: [
            { value: 'medellin', label: 'Medellín' },
            { value: 'envigado', label: 'Envigado' },
            { value: 'rionegro', label: 'Rionegro' }
          ],
          bogota_dc: [
            { value: 'bogota_urb', label: 'Bogotá Distrito Capital' }
          ],
          california: [
            { value: 'la', label: 'Los Angeles' },
            { value: 'sf', label: 'San Francisco' },
            { value: 'sd', label: 'San Diego' }
          ],
          new_york: [
            { value: 'nyc', label: 'New York City' },
            { value: 'buffalo', label: 'Buffalo' }
          ]
        };

        const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          setCountry(e.target.value);
          setDepartment('');
          setCity('');
        };

        const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          setDepartment(e.target.value);
          setCity('');
        };

        return (
          <div className="space-y-6 max-w-xl">
            <MobiDropdown 
              label="Propulsion Node Cluster" 
              value={val}
              onChange={(e) => setVal(e.target.value)}
              description="Controls active thruster matrices across the flagship."
              options={[
                { value: 'low', label: 'Sub-Light Core - Minimal Drain' },
                { value: 'med', label: 'Warp Matrix Alpha - Balanced' },
                { value: 'high', label: 'Hyperspace Induction - Overcharge [DISABLED]', disabled: true }
              ]}
            />

            <MobiDropdown 
              label="Damaged System Matrix" 
              error="Operational lock: Subsystem offline due to thermal venting"
              placeholder="Select cooling vector..."
              options={[
                { value: 'liquid_n', label: 'Liquid Nitrogen Purge' },
                { value: 'laser', label: 'Coherent Light Heat Vent' }
              ]}
              technical
            />

            <div className="p-5 border border-mobi-border/60 bg-mobi-surface/30 rounded-2xl space-y-4 animate-in fade-in duration-300">
              <MobiFormLabel 
                variant="section" 
                label="Chained Dropdown Protocol (Dynamic Filtering)" 
                description="Select country, then department, then city to unlock navigation locks."
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MobiDropdown
                  label="1. Country"
                  placeholder="Select country..."
                  value={country}
                  onChange={handleCountryChange}
                  options={countries}
                />

                <MobiDropdown
                  label="2. Department / State"
                  placeholder="Select area..."
                  value={department}
                  onChange={handleDepartmentChange}
                  options={country ? departments[country] || [] : []}
                  disabled={!country}
                />

                <MobiDropdown
                  label="3. City / Starport"
                  placeholder="Select city..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  options={department ? cities[department] || [] : []}
                  disabled={!department}
                />
              </div>

              {city && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-500 text-xs font-semibold flex items-center gap-2">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Navigation Route Locked: {countries.find(c => c.value === country)?.label} &gt; {departments[country]?.find(d => d.value === department)?.label} &gt; {cities[department]?.find(ci => ci.value === city)?.label}</span>
                </div>
              )}
            </div>
          </div>
        );
      };
      return <DropdownDemo />;
    }
  },
  {
    id: 'useMobiForm',
    name: 'useMobiForm & mobiValidators',
    category: 'hook',
    description: 'Comprehensive state machine for forms and validation rules. Orchestrates changes, dirty states, error indicators, and robust form submissions.',
    code: `const { values, errors, handleChange, handleSubmit } = useMobiForm({
  initialValues: { email: '', amount: '' },
  validationRules: {
    email: [mobiValidators.required(), mobiValidators.email()],
    amount: [mobiValidators.required(), mobiValidators.money()]
  },
  onSubmit: (data) => console.log('Validated submission:', data)
});`,
    render: () => {
      const FormDemo = () => {
        const [alertMessage, setAlertMessage] = useState<string | null>(null);
        const [alertType, setAlertType] = useState<'success' | 'error'>('success');

        const {
          values,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm
        } = useMobiForm({
          initialValues: {
            fleetName: '',
            operatorEmail: '',
            securePassphrase: '',
            operatingBudget: '',
            maxCrews: '5',
            reactorNode: ''
          },
          validationRules: {
            fleetName: [
              mobiValidators.required('Fleet Designation Name is required'),
              mobiValidators.minLength(4, 'Fleet name must be at least 4 characters long')
            ],
            operatorEmail: [
              mobiValidators.required('Operator email is required'),
              mobiValidators.email('Please supply a valid corporate email format')
            ],
            securePassphrase: [
              mobiValidators.required('Security decryption passphrase is required'),
              mobiValidators.minLength(6, 'Decryption passphrases must contain at least 6 characters')
            ],
            operatingBudget: [
              mobiValidators.required('Financial operating budget allocation is required'),
              mobiValidators.money('Allocations must be formatted as numeric currency values'),
              mobiValidators.min(5000, 'Minimum flagship initialization budget is $5,000.00')
            ],
            maxCrews: [
              mobiValidators.required('Crew count is required'),
              mobiValidators.number('Crew capacities must be numeric integers'),
              mobiValidators.max(25, 'Flagship compartments support at most 25 crew members')
            ],
            reactorNode: [
              mobiValidators.required('Select a valid reactor node cluster')
            ]
          },
          onSubmit: async (data) => {
            // Simulate API request delay
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setAlertType('success');
            setAlertMessage(`INITIATING ENGINE LAUNCH SEQUENCE: Fleet "${data.fleetName}" successfully registered with budget $${data.operatingBudget} USD on cluster node ${data.reactorNode.toUpperCase()}!`);
          }
        });

        const handleReset = () => {
          resetForm();
          setAlertMessage(null);
        };

        return (
          <div className="w-full max-w-lg mx-auto">
            {alertMessage && (
              <div className="mb-6">
                <MobiAlert 
                  title={alertType === 'success' ? 'Launch Success' : 'Launch Interrupted'} 
                  message={alertMessage} 
                  type={alertType} 
                  duration={0}
                  onClose={() => setAlertMessage(null)} 
                />
              </div>
            )}

            <MobiCard 
              title="Fleet Flagship Registration Portal"
              footer="Authorized access only • M.O.B.I.™ Grand Fleet v1.3.6"
            >
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <MobiFormLabel 
                  variant="section" 
                  label="General Specifications" 
                  description="Establish general identifier nodes for this star cruiser."
                />

                <MobiInput 
                  type="text"
                  label="Fleet Designation Name"
                  placeholder="e.g. Odyssey Fleet VII"
                  id="fleetName"
                  value={values.fleetName}
                  onChange={handleChange('fleetName')}
                  onBlur={handleBlur('fleetName')}
                  error={errors.fleetName}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MobiInput 
                    type="email"
                    label="Commanding Officer Email"
                    placeholder="e.g. admiral@wearemobi.com"
                    id="operatorEmail"
                    value={values.operatorEmail}
                    onChange={handleChange('operatorEmail')}
                    onBlur={handleBlur('operatorEmail')}
                    error={errors.operatorEmail}
                    required
                  />

                  <MobiInput 
                    type="password"
                    label="Nuclear Lock Passphrase"
                    placeholder="Input security lock..."
                    id="securePassphrase"
                    value={values.securePassphrase}
                    onChange={handleChange('securePassphrase')}
                    onBlur={handleBlur('securePassphrase')}
                    error={errors.securePassphrase}
                    required
                  />
                </div>

                <MobiFormLabel 
                  variant="section" 
                  label="Resource Allotments & Core States" 
                  description="Determine fiscal budgets and reactor targets."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MobiInput 
                    type="money"
                    label="Operation Budget Allocation"
                    placeholder="e.g. 5000.00"
                    id="operatingBudget"
                    value={values.operatingBudget}
                    onChange={handleChange('operatingBudget')}
                    onBlur={handleBlur('operatingBudget')}
                    error={errors.operatingBudget}
                    technical
                    required
                  />

                  <MobiInput 
                    type="number"
                    label="Max Crew Capacity"
                    placeholder="e.g. 10"
                    id="maxCrews"
                    value={values.maxCrews}
                    onChange={handleChange('maxCrews')}
                    onBlur={handleBlur('maxCrews')}
                    error={errors.maxCrews}
                    technical
                    required
                  />
                </div>

                <MobiDropdown 
                  label="Quantum Reactor Core Alignment"
                  placeholder="Select core node..."
                  id="reactorNode"
                  value={values.reactorNode}
                  onChange={handleChange('reactorNode')}
                  onBlur={handleBlur('reactorNode')}
                  error={errors.reactorNode}
                  required
                  options={[
                    { value: 'node_alpha', label: 'Reactor Core Alpha - Deuterium Vent' },
                    { value: 'node_beta', label: 'Reactor Core Beta - Plasma Infused' },
                    { value: 'node_gamma', label: 'Reactor Core Gamma - Antimatter Cluster' }
                  ]}
                />

                <div className="flex gap-4 pt-4 border-t border-mobi-border/50">
                  <MobiButton 
                    type="submit" 
                    variant="solid" 
                    className="flex-1 rounded-xl py-3"
                    disabled={isSubmitting}
                    icon={isSubmitting && <div className="h-4.5 w-4.5 border-2 border-mobi-bg/30 border-t-mobi-bg rounded-full animate-spin" />}
                  >
                    {isSubmitting ? 'Validating Reactor...' : 'Launch Flagship Matrix'}
                  </MobiButton>
                  
                  <MobiButton 
                    type="button" 
                    variant="outline" 
                    onClick={handleReset}
                    className="rounded-xl py-3 px-5"
                    disabled={isSubmitting}
                  >
                    Reset
                  </MobiButton>
                </div>
              </form>
            </MobiCard>
          </div>
        );
      };
      return <FormDemo />;
    }
  },
  {
    id: 'MobiModal',
    name: 'MobiModal',
    category: 'component',
    description: 'Accessible modal/dialog with focus trap, body scroll lock, Escape key dismiss, and size presets.',
    code: `const [open, setOpen] = useState(false);

<MobiButton onClick={() => setOpen(true)}>Open Modal</MobiButton>

<MobiModal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Tactical System Access"
  description="Authorized personnel only. Reactor matrix sync pending."
  size="md"
  footer={
    <div className="flex justify-end gap-3">
      <MobiButton variant="ghost" onClick={() => setOpen(false)}>Cancel</MobiButton>
      <MobiButton variant="solid" onClick={() => { alert('Access Granted'); setOpen(false); }}>Authenticate</MobiButton>
    </div>
  }
>
  <p className="text-sm">Please verify the quantum key configuration before continuing.</p>
</MobiModal>`,
    render: () => {
      const ModalDemo = () => {
        const [isOpen, setIsOpen] = useState(false);
        const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
        const triggerOpen = (selectedSize: typeof size) => {
          setSize(selectedSize);
          setIsOpen(true);
        };
        return (
          <div className="space-y-4">
            <p className="text-xs text-mobi-text-muted font-bold uppercase tracking-wider">Select Modal Size Preset:</p>
            <div className="flex flex-wrap gap-2">
              {(['sm', 'md', 'lg', 'xl', 'full'] as const).map(s => (
                <MobiButton key={s} size="sm" variant="outline" technical onClick={() => triggerOpen(s)}>
                  Open {s.toUpperCase()}
                </MobiButton>
              ))}
            </div>

            <MobiModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title={`${size.toUpperCase()} Modal Overlay`}
              description="A premium overlay built with full focus trapping and accessibilities."
              size={size}
              footer={
                <div className="flex justify-end gap-3">
                  <MobiButton variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Close</MobiButton>
                  <MobiButton variant="solid" size="sm" onClick={() => setIsOpen(false)}>Confirm Action</MobiButton>
                </div>
              }
            >
              <div className="space-y-3">
                <p>This is a standard M.O.B.I.™ Modal viewport rendered via React Portal.</p>
                <div className="p-4 rounded-xl border border-mobi-border bg-mobi-bg/50 font-mono text-xs">
                  {`size="${size}"`}<br />
                  aria-modal="true"<br />
                  role="dialog"
                </div>
              </div>
            </MobiModal>
          </div>
        );
      };
      return <ModalDemo />;
    }
  },
  {
    id: 'MobiToast',
    name: 'useMobiToast',
    category: 'hook',
    description: 'High-performance toast notifications with auto-dismiss timers, semantic accents, and progress indicators.',
    code: `const { toast } = useMobiToast();

toast.success('System parameters optimized.', 'Operation Success');
toast.error('Reactor breach detected!', 'Critical Error');`,
    render: () => {
      const ToastDemo = () => {
        const ToastButtons = () => {
          const { toast, clearAll } = useMobiToast();
          return (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <MobiButton variant="solid" className="bg-emerald-600 hover:bg-emerald-700 border-none" size="sm" onClick={() => toast.success('Fleet connection stabilized.', 'Success')}>
                  Success Toast
                </MobiButton>
                <MobiButton variant="solid" className="bg-rose-600 hover:bg-rose-700 border-none" size="sm" onClick={() => toast.error('Shield voltage critical!', 'Danger')}>
                  Error Toast
                </MobiButton>
                <MobiButton variant="solid" className="bg-amber-600 hover:bg-amber-700 border-none" size="sm" onClick={() => toast.warning('Low power in subsector 4.', 'Warning')}>
                  Warning Toast
                </MobiButton>
                <MobiButton variant="solid" className="bg-blue-600 hover:bg-blue-700 border-none" size="sm" onClick={() => toast.info('Syncing planetary matrix...', 'Info')}>
                  Info Toast
                </MobiButton>
                <MobiButton variant="outline" size="sm" onClick={() => toast.custom({ message: 'Persistent communication link opened.', title: 'CUSTOM LINK', duration: 0 })}>
                  Persistent Toast
                </MobiButton>
              </div>
              <div className="flex gap-2">
                <MobiButton variant="ghost" size="sm" className="text-rose-500 hover:bg-rose-500/10" onClick={clearAll}>
                  Clear All Toasts
                </MobiButton>
              </div>
            </div>
          );
        };

        return (
          <MobiToastProvider>
            <ToastButtons />
          </MobiToastProvider>
        );
      };
      return <ToastDemo />;
    }
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
  onChange={(e) => setEnabled(e.target.checked)}
/>`,
    render: () => {
      const CheckboxDemo = () => {
        const [check, setCheck] = useState(true);
        const [toggle, setToggle] = useState(false);
        const [radio, setRadio] = useState('alpha');
        return (
          <div className="space-y-6 max-w-sm">
            <MobiCheckbox
              variant="checkbox"
              label="Sync Sector Logs"
              description="Upload real-time flight data to the command bridge."
              checked={check}
              onChange={(e) => setCheck(e.target.checked)}
            />

            <MobiCheckbox
              variant="toggle"
              label="Proton Shield Matrix"
              description="Redirect surplus energy to thermal buffers."
              checked={toggle}
              onChange={(e) => setToggle(e.target.checked)}
            />

            <div className="space-y-2.5">
              <p className="text-xs font-black uppercase tracking-wider text-mobi-text-muted font-sans">Active Fleet Node Selection:</p>
              <div className="space-y-2">
                {['alpha', 'beta', 'gamma'].map(r => (
                  <MobiCheckbox
                    key={r}
                    variant="radio"
                    name="fleet-node"
                    label={`Fleet Node ${r.toUpperCase()}`}
                    checked={radio === r}
                    onChange={() => setRadio(r)}
                  />
                ))}
              </div>
            </div>

            <MobiCheckbox
              variant="checkbox"
              label="Required Validation State"
              error="You must agree to terms before propulsion ignites."
              checked={false}
              onChange={() => {}}
            />
          </div>
        );
      };
      return <CheckboxDemo />;
    }
  },
  {
    id: 'MobiTable',
    name: 'MobiTable',
    category: 'component',
    description: 'Premium fully-typed data table with skeleton loaders, striped columns, compact layouts, technical modes, and row click callbacks.',
    code: `<MobiTable<Fleet>
  columns={[
    { key: 'id', title: 'Node ID' },
    { key: 'name', title: 'Fleet Unit' },
    { key: 'power', title: 'Power Load', align: 'right' }
  ]}
  data={fleetData}
  keyExtractor={(row) => row.id}
  striped
/>`,
    render: () => {
      const TableDemo = () => {
        const [loading, setLoading] = useState(false);
        const [striped, setStriped] = useState(true);
        const [technical, setTechnical] = useState(true);

        const data = [
          { id: 'FL-902', name: 'Fleet Matrix Alpha', load: '98.4%', status: 'nominal' },
          { id: 'FL-411', name: 'Grand Fleet Horizon', load: '62.1%', status: 'degraded' },
          { id: 'FL-039', name: 'Sub-Sector Vanguard', load: '0.0%', status: 'offline' }
        ];

        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center mb-4">
              <MobiCheckbox variant="toggle" label="Loading State" checked={loading} onChange={(e) => setLoading(e.target.checked)} />
              <MobiCheckbox variant="toggle" label="Striped Rows" checked={striped} onChange={(e) => setStriped(e.target.checked)} />
              <MobiCheckbox variant="toggle" label="Technical Mode" checked={technical} onChange={(e) => setTechnical(e.target.checked)} />
            </div>

            <MobiTable
              columns={[
                { key: 'id', title: 'Registry ID', width: '120px' },
                { key: 'name', title: 'Fleet Division' },
                { key: 'load', title: 'Engine Load', align: 'right', width: '120px' },
                {
                  key: 'status',
                  title: 'Vitals',
                  align: 'center',
                  width: '120px',
                  render: (row: any) => (
                    <MobiBadge
                      variant={row.status === 'nominal' ? 'success' : row.status === 'degraded' ? 'warning' : 'error'}
                      dot
                      size="sm"
                    >
                      {row.status}
                    </MobiBadge>
                  )
                }
              ]}
              data={data}
              keyExtractor={(r: any) => r.id}
              loading={loading}
              striped={striped}
              technical={technical}
              onRowClick={(row: any) => alert(`Selected Fleet Unit: ${row.name}`)}
            />
          </div>
        );
      };
      return <TableDemo />;
    }
  },
  {
    id: 'MobiTabs',
    name: 'MobiTabs',
    category: 'component',
    description: 'Segmented navigation bar with badge counters, disabled states, tab layouts, and keyboard arrow controls.',
    code: `<MobiTabs
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'metrics', label: 'Metrics', badge: 4 },
    { id: 'configs', label: 'Configuration', disabled: true }
  ]}
  activeId={activeTab}
  onChange={setActiveTab}
  variant="underline"
/>`,
    render: () => {
      const TabsDemo = () => {
        const [activeDefault, setActiveDefault] = useState('overview');
        const [activePills, setActivePills] = useState('overview');
        const [activeUnderline, setActiveUnderline] = useState('overview');

        const tabItems = [
          { id: 'overview', label: 'Fleet Overview' },
          { id: 'matrix', label: 'Shield Matrix', badge: '12' },
          { id: 'auth', label: 'Core Security', disabled: true }
        ];

        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-wider text-mobi-text-muted">Segmented Default:</p>
              <MobiTabs tabs={tabItems} activeId={activeDefault} onChange={setActiveDefault} variant="default" />
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-wider text-mobi-text-muted">Pill Buttons:</p>
              <MobiTabs tabs={tabItems} activeId={activePills} onChange={setActivePills} variant="pills" />
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-wider text-mobi-text-muted">Underline Indicator:</p>
              <MobiTabs tabs={tabItems} activeId={activeUnderline} onChange={setActiveUnderline} variant="underline" />
            </div>
          </div>
        );
      };
      return <TabsDemo />;
    }
  },
  {
    id: 'MobiBadge',
    name: 'MobiBadge',
    category: 'component',
    description: 'Compact semantic indicator capsules supporting dot highlights, leading icons, and color presets.',
    code: `<MobiBadge variant="success" dot>Nominal</MobiBadge>`,
    render: () => (
      <div className="flex flex-wrap gap-3">
        <MobiBadge variant="default">v1.3.7 Spec</MobiBadge>
        <MobiBadge variant="success" dot>Stablized</MobiBadge>
        <MobiBadge variant="error" dot>Critical</MobiBadge>
        <MobiBadge variant="warning">Alert Threshold</MobiBadge>
        <MobiBadge variant="info">Sync Pending</MobiBadge>
        <MobiBadge variant="outline">Unlinked</MobiBadge>
      </div>
    )
  },
  {
    id: 'MobiSkeleton',
    name: 'MobiSkeleton',
    category: 'component',
    description: 'Animated pulse placeholders simulating complex layouts during network transactions.',
    code: `<MobiSkeletonGroup avatar title lines={3} />`,
    render: () => (
      <div className="space-y-6 max-w-sm p-4 border border-mobi-border rounded-2xl bg-mobi-surface/50">
        <p className="text-[10px] font-black uppercase tracking-wider text-mobi-text-muted">Composite Group Loader:</p>
        <MobiSkeletonGroup avatar title lines={3} />
        
        <div className="pt-4 border-t border-mobi-border/50 space-y-2">
          <p className="text-[10px] font-black uppercase tracking-wider text-mobi-text-muted">Custom Skeletons:</p>
          <MobiSkeleton variant="rect" height={80} />
        </div>
      </div>
    )
  },
  {
    id: 'MobiTooltip',
    name: 'MobiTooltip',
    category: 'component',
    description: 'Floating contextual help bubbles triggering on hover and keyboard focus with full arrow indicators.',
    code: `<MobiTooltip content="Verifying Proton Buffers" position="top">
  <MobiButton>Hover Me</MobiButton>
</MobiTooltip>`,
    render: () => (
      <div className="flex flex-wrap gap-8 justify-center py-8">
        <MobiTooltip content="Deploy quantum lock" position="top">
          <MobiButton size="sm" variant="outline" technical>Top</MobiButton>
        </MobiTooltip>
        <MobiTooltip content="Decrypt reactor signatures" position="bottom">
          <MobiButton size="sm" variant="outline" technical>Bottom</MobiButton>
        </MobiTooltip>
        <MobiTooltip content="Voltage stabilizer active" position="left">
          <MobiButton size="sm" variant="outline" technical>Left</MobiButton>
        </MobiTooltip>
        <MobiTooltip content="Subsector matrix link active" position="right">
          <MobiButton size="sm" variant="outline" technical>Right</MobiButton>
        </MobiTooltip>
      </div>
    )
  },
  {
    id: 'MobiPagination',
    name: 'MobiPagination',
    category: 'component',
    description: 'Responsive pagination controller with layout ellipsis calculations, direct first/last navigations, and active pages state.',
    code: `<MobiPagination
  currentPage={page}
  totalPages={12}
  onChange={setPage}
  showEdges
/>`,
    render: () => {
      const PaginationDemo = () => {
        const [page, setPage] = useState(4);
        return (
          <div className="space-y-4">
            <MobiPagination currentPage={page} totalPages={12} onChange={setPage} showEdges />
            <p className="text-xs font-mono text-mobi-text-muted pl-1">
              Active Page State: {page} / 12
            </p>
          </div>
        );
      };
      return <PaginationDemo />;
    }
  },
  {
    id: 'MobiAnalytics',
    name: 'MobiAnalytics',
    category: 'component',
    description: 'Google Analytics 4 dynamic injection component with CSP Nonce support and fully-typed tracking hook helper.',
    code: `// Placement at root level
<MobiAnalytics measurementId="G-D4GHWY7TJM" />

// Event trigger anywhere:
const { trackEvent } = useMobiAnalytics({ measurementId: 'G-D4GHWY7TJM' });
trackEvent('click', { event_category: 'CTA' });`,
    render: () => {
      const AnalyticsDemo = () => {
        const { isReady, trackEvent } = useMobiAnalytics({ measurementId: 'G-D4GHWY7TJM', disabled: true });
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase text-mobi-text">GA4 Measurement Status:</span>
              <MobiBadge variant="info" size="sm" dot>SANDBOX MODE (DISABLED)</MobiBadge>
            </div>
            <MobiButton
              variant="outline"
              size="sm"
              onClick={() => {
                trackEvent('click_test', { value: 1 });
                alert('Fired simulated custom GA4 event: click_test');
              }}
            >
              Simulate trackEvent()
            </MobiButton>
          </div>
        );
      };
      return <AnalyticsDemo />;
    }
  },
  {
    id: 'MobiLoader',
    name: 'MobiLoader',
    category: 'component',
    description: 'Highly configurable status loaders featuring the official M.O.B.I.™ brand mark with spinner, pulsing, vertical audio/telemetry bars, and screen overlay variants.',
    code: `<MobiLoader variant="spinner" size="md" label="SYNCHRONIZING SECURE TUNNELS..." />
<MobiLoader variant="pulse" size="lg" />
<MobiLoader variant="bars" label="TUNING ENGINES..." />`,
    render: () => {
      const LoaderDemo = () => {
        const [showScreen, setShowScreen] = useState(false);

        const handleTriggerScreen = () => {
          setShowScreen(true);
          setTimeout(() => {
            setShowScreen(false);
          }, 3000);
        };

        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center p-6 border border-mobi-border bg-mobi-bg/30 rounded-2xl gap-3">
                <span className="text-[10px] font-black uppercase text-mobi-text-muted">Spinner (sm)</span>
                <MobiLoader variant="spinner" size="sm" label="Calibrating..." />
              </div>

              <div className="flex flex-col items-center justify-center p-6 border border-mobi-border bg-mobi-bg/30 rounded-2xl gap-3">
                <span className="text-[10px] font-black uppercase text-mobi-text-muted">Pulse (md)</span>
                <MobiLoader variant="pulse" size="md" label="Synchronizing..." />
              </div>

              <div className="flex flex-col items-center justify-center p-6 border border-mobi-border bg-mobi-bg/30 rounded-2xl gap-3">
                <span className="text-[10px] font-black uppercase text-mobi-text-muted">Telemetry Bars (lg)</span>
                <MobiLoader variant="bars" size="lg" label="Propulsing..." />
              </div>
            </div>

            <div className="pt-4 border-t border-mobi-border/40 text-center">
              <MobiButton variant="outline" size="sm" onClick={handleTriggerScreen}>
                Trigger Screen Overlay Loader (3s)
              </MobiButton>
            </div>

            {showScreen && (
              <MobiLoader variant="screen" label="CALIBRATING WARP MATRIX SIGNATURES..." />
            )}
          </div>
        );
      };
      return <LoaderDemo />;
    }
  },
  {
    id: 'MobiWizard',
    name: 'MobiWizard',
    category: 'component',
    description: 'Guided sequential setup container with progress indicators, built-in validation locks, and smooth step navigation controls.',
    code: `const steps = [
  { id: '1', title: 'Setup Node', content: <Step1 />, isValid: true },
  { id: '2', title: 'Authorize Key', content: <Step2 />, isValid: false }
];

const { activeStep, nextStep, prevStep, isFirstStep, isLastStep } = useMobiWizard({ totalSteps: steps.length });

<MobiWizard
  steps={steps}
  activeStepIndex={activeStep}
  onNext={nextStep}
  onPrev={prevStep}
  isFirstStep={isFirstStep}
  isLastStep={isLastStep}
/>`,
    render: () => {
      const WizardDemo = () => {
        const [reactorName, setReactorName] = useState('');
        const [selectedCore, setSelectedCore] = useState('nuclear');
        const [agreed, setAgreed] = useState(false);

        const steps = [
          {
            id: 'node-naming',
            title: 'Registry Coordinates',
            subtitle: 'Establish target node identifiers.',
            isValid: reactorName.trim().length >= 4,
            content: (
              <div className="space-y-4">
                <p className="text-xs text-mobi-text-muted leading-relaxed">
                  Provide a highly unique administrative handle for this reactor stack. Minimum 4 characters required to pass validation locks.
                </p>
                <MobiInput
                  label="Reactor Administrative ID"
                  placeholder="e.g. OMEGA-IV-MATRIX"
                  value={reactorName}
                  onChange={(e) => setReactorName(e.target.value)}
                  required
                />
              </div>
            )
          },
          {
            id: 'core-selection',
            title: 'Proton Cores Configuration',
            subtitle: 'Select fuel rods chemistry.',
            isValid: true,
            content: (
              <div className="space-y-4">
                <p className="text-xs text-mobi-text-muted leading-relaxed">
                  Select the appropriate fission materials. Heavy isotopes require strict security clearings.
                </p>
                <div className="space-y-2">
                  {[
                    { id: 'nuclear', label: 'Thorium-Fluoride Fission Core (Highly Stable)' },
                    { id: 'proton', label: 'Magneto-Inertial Fusion Cluster (High Load)' },
                    { id: 'quantum', label: 'Zero-Point Singularity Lattice (Experimental)' }
                  ].map(c => (
                    <MobiCheckbox
                      key={c.id}
                      variant="radio"
                      name="wizard-reactor-core"
                      label={c.label}
                      checked={selectedCore === c.id}
                      onChange={() => setSelectedCore(c.id)}
                    />
                  ))}
                </div>
              </div>
            )
          },
          {
            id: 'verification',
            title: 'Operational Ignition',
            subtitle: 'Finalize terms and ignite plasma.',
            isValid: agreed,
            content: (
              <div className="space-y-4">
                <p className="text-xs text-mobi-text-muted leading-relaxed">
                  Confirm all coordinates before firing. Singularities can trigger uncontainable event horizons if miscalibrated.
                </p>
                <div className="p-3.5 border border-mobi-border/40 bg-mobi-bg/35 rounded-xl font-mono text-[11px] space-y-1">
                  <div><span className="text-mobi-text-muted">Target ID:</span> <span className="text-mobi-primary">{reactorName.toUpperCase()}</span></div>
                  <div><span className="text-mobi-text-muted">Isotope Core:</span> <span className="text-mobi-primary">{selectedCore.toUpperCase()}</span></div>
                </div>
                <MobiCheckbox
                  variant="checkbox"
                  label="I authorize reactor ignition sequences."
                  description="Acknowledge accountability for localized spacetime warping."
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
              </div>
            )
          }
        ];

        const { activeStep, nextStep, prevStep, isFirstStep, isLastStep, resetWizard } = useMobiWizard({
          totalSteps: steps.length,
          onComplete: () => {
            alert(`SUCCESS: Node ${reactorName.toUpperCase()} with fuel chemistry ${selectedCore.toUpperCase()} is officially synchronized!`);
            setReactorName('');
            setSelectedCore('nuclear');
            setAgreed(false);
            resetWizard();
          }
        });

        return (
          <div className="max-w-xl mx-auto">
            <MobiWizard
              steps={steps}
              activeStepIndex={activeStep}
              onNext={nextStep}
              onPrev={prevStep}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              onCancel={() => {
                setReactorName('');
                setSelectedCore('nuclear');
                setAgreed(false);
                resetWizard();
                alert('Onboarding sequence canceled.');
              }}
            />
          </div>
        );
      };
      return <WizardDemo />;
    }
  },
  {
    id: 'MobiListView',
    name: 'MobiListView',
    category: 'component',
    description: 'Vertical scrollable listings offering clean headline/leading/trailing slots with selectable border Card modes or classical clean line list layouts.',
    code: `<MobiListView
  items={[
    {
      id: '1',
      headline: 'Alpha Fleet Unit',
      description: 'Sector 4 patrol active.',
      leading: <MobiLogo size={18} />,
      trailing: <MobiBadge variant="success">Nominal</MobiBadge>,
      onClick: () => handleSelect('1')
    }
  ]}
  variant="cards"
/>`,
    render: () => {
      const ListViewDemo = () => {
        const [selectedId, setSelectedId] = useState<string | number>('f-1');
        const [layout, setLayout] = useState<'list' | 'cards'>('list');

        const items = [
          {
            id: 'f-1',
            headline: 'Flagship Horizon Alpha',
            description: 'En-route to sector 9-B. Fuel reserves at 98.4%.',
            leading: <MobiLogo size={20} />,
            trailing: <MobiBadge variant="success" dot size="sm">Active</MobiBadge>,
            onClick: () => setSelectedId('f-1')
          },
          {
            id: 'f-2',
            headline: 'Battleship Vindicator IV',
            description: 'Maintenance bay 4-C. Replacing localized graviton relays.',
            leading: <MobiLogo size={20} className="grayscale opacity-55" />,
            trailing: <MobiBadge variant="warning" size="sm">Docked</MobiBadge>,
            onClick: () => setSelectedId('f-2')
          },
          {
            id: 'f-3',
            headline: 'Subsector Transporter Beta',
            description: 'Offline. Emergency thermal buffers exhausted.',
            leading: <MobiLogo size={20} className="opacity-30" />,
            trailing: <MobiBadge variant="error" size="sm">Offline</MobiBadge>,
            onClick: () => setSelectedId('f-3')
          },
          {
            id: 'f-4',
            headline: 'Secured AI Core Link',
            description: 'Encrypted communication channel with sentinel grid (Restricted).',
            leading: <MobiLogo size={20} />,
            trailing: <MobiBadge variant="outline" size="sm">Restricted</MobiBadge>,
            disabled: true
          }
        ];

        return (
          <div className="space-y-6 max-w-lg mx-auto">
            <div className="flex justify-between items-center bg-mobi-bg/30 border border-mobi-border p-3 rounded-xl">
              <span className="text-xs font-black uppercase text-mobi-text-muted">Display Variant:</span>
              <div className="flex gap-2">
                <MobiButton
                  size="sm"
                  variant={layout === 'list' ? 'solid' : 'outline'}
                  technical
                  onClick={() => setLayout('list')}
                >
                  Classic List
                </MobiButton>
                <MobiButton
                  size="sm"
                  variant={layout === 'cards' ? 'solid' : 'outline'}
                  technical
                  onClick={() => setLayout('cards')}
                >
                  Stacked Cards
                </MobiButton>
              </div>
            </div>

            <MobiListView
              items={items.map(i => ({ ...i, selected: selectedId === i.id }))}
              variant={layout}
              maxHeight={320}
            />

            <p className="text-[10px] text-mobi-text-muted font-mono pl-1">
              Currently Selected Node: <span className="text-mobi-primary">{selectedId.toUpperCase()}</span>
            </p>
          </div>
        );
      };
      return <ListViewDemo />;
    }
  },
  {
    id: 'MobiChatEdge',
    name: 'MobiChatEdge',
    category: 'component',
    description: 'Specialized chat interface for decentralized Edge Sentinel operations with Haki monitoring.',
    code: `<MobiChatEdge \n  token="..." \n  tenantId="MOBI" \n  showEnergyBar={true} \n/>`,
    render: () => (
      <div className="p-12 border border-dashed border-mobi-border rounded-2xl text-center bg-mobi-bg/50">
        <p className="text-[10px] font-mono text-mobi-text-muted uppercase mb-4">
          Check the bottom-right corner for the MobiAI Edge Agent.
        </p>
        <div className="flex justify-center">
          <MobiChatEdge token="DEMO" title="MobiAI Edge Demo" />
        </div>
      </div>
    )
  },
  {
    id: 'useMobiEdge',
    name: 'useMobiEdge',
    category: 'hook',
    description: 'Hook for interacting with the MOBI Edge Reactor API (Radar Schema).',
    code: `const { messages, models, status, sendMessage } = useMobiEdge({\n  token: '...',\n  tenantId: 'MOBI'\n});`,
    render: () => (
      <div className="p-6 bg-mobi-bg border border-mobi-border rounded-xl">
        <p className="text-sm font-mono text-mobi-text-muted leading-relaxed">
          // Hook state orchestration demo<br/>
          const {'{'} status {'}'} = useMobiEdge({'{'} token: '...' {'}'});<br/>
          console.log(status?.haki_limit);
        </p>
      </div>
    )
  },
  {
    id: 'SovereignEmbed',
    name: 'Sovereign Embed (Non-React)',
    category: 'component',
    description: 'Universal integration pattern for legacy websites (WordPress, PHP, Webflow). Allows full Agentic Link deployment via a single script tag without modifying site architecture.',
    code: `<!-- 1. Include the Loader -->
<script src="https://shared.wearemobi.com/mobi-embed.js"></script>

<!-- 2. Initialize the Sentinel -->
<script>
  window.MobiEdge.init({
    token: "YOUR_TACTICAL_TOKEN",
    tenantId: "ACME",
    useMemory: true,
    title: "ACME Assistant"
  });
</script>`,
    render: () => (
      <div className="space-y-6">
        <MobiAlert 
          title="Universal Portability" 
          message="This pattern allows any 'troop' website to be equipped with M.O.B.I.™ Intelligence regardless of their tech stack." 
          type="success" 
          duration={0} 
        />
        <div className="p-6 bg-mobi-surface border border-mobi-border rounded-xl space-y-4">
          <p className="text-sm font-bold">Integration Parameters:</p>
          <ul className="text-xs space-y-2 list-disc pl-4 text-mobi-text-muted font-mono">
            <li><span className="text-mobi-primary">token</span>: Required. Your Reactor Auth Bearer.</li>
            <li><span className="text-mobi-primary">tenantId</span>: Required. The sovereign ID (e.g. 'MOBI', 'ACME').</li>
            <li><span className="text-mobi-primary">useMemory</span>: boolean. Enable/Disable session persistence.</li>
            <li><span className="text-mobi-primary">welcomeTitle</span>: Custom headline for the assistant.</li>
            <li><span className="text-mobi-primary">baseUrl</span>: Optional. Point to specific Reactor nodes.</li>
          </ul>
          <div className="pt-4 border-t border-mobi-border/50">
            <MobiButton 
              variant="outline" 
              size="sm" 
              technical 
              onClick={() => window.open('/embed.html', '_blank')}
            >
              Launch Live Embed Demo ↗
            </MobiButton>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'MobiIcon',
    name: 'MobiIcon',
    category: 'component',
    description: 'The M.O.B.I.™ Tactical Iconography System. A sovereign, high-performance icon registry.',
    code: `<MobiIcon name="bot" size={32} color="var(--mobi-primary)" />
<MobiIcon name="zap" strokeWidth={3} />`,
    render: () => (
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
        {[
          'login', 'logout', 'register', 'alert', 'error', 'success', 'info', 
          'input', 'send', 'back', 'burger', 'close', 'settings', 'user', 'home', 
          'shield', 'copy', 'sync', 'trash', 'external', 'plus', 'minus', 
          'chevron-right', 'chevron-down', 'chevron-left', 'chevrons-right', 'chevrons-left',
          'cpu', 'clip', 'bot', 'history', 'zap', 'check', 'sun', 'moon', 'monitor',
          'upload', 'upload-cloud', 'eye', 'eye-off', 'chat', 'docs', 'search'
        ].map(name => (
          <div key={name} className="flex flex-col items-center gap-3 p-4 bg-mobi-bg/20 border border-mobi-border/30 rounded-xl hover:bg-mobi-surface-hover transition-all group">
            <MobiIcon name={name as any} size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-mono text-mobi-text-muted uppercase tracking-tighter truncate w-full text-center">{name}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'MobiConfirm',
    name: 'MobiConfirm',
    category: 'component',
    description: 'Streamlined Yes/No confirmation dialog wrapper around MobiModal.',
    code: `<MobiConfirm 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
  onConfirm={() => alert('Confirmed')} 
  title="Delete Asset" 
  message="Are you sure you want to proceed? This cannot be undone."
  intent="danger" 
/>`,
    render: () => {
      const ConfirmDemo = () => {
        const [open, setOpen] = useState(false);
        return (
          <div className="space-y-4">
            <MobiButton variant="danger" onClick={() => setOpen(true)}>Trigger Deletion Flow</MobiButton>
            <MobiConfirm
              isOpen={open}
              onClose={() => setOpen(false)}
              onConfirm={() => { alert('Asset deleted'); setOpen(false); }}
              title="Delete Sovereign Asset"
              message="Are you sure you want to permanently delete this asset from the fleet registry? This action is irreversible."
              intent="danger"
            />
          </div>
        );
      };
      return <ConfirmDemo />;
    }
  },
  {
    id: 'MobiQuantityControl',
    name: 'MobiQuantityControl',
    category: 'component',
    description: 'Highly customizable +/- counter for numerical inputs with configurable min, max, and step boundaries.',
    code: `<MobiQuantityControl 
  value={quantity} 
  onChange={setQuantity} 
  min={0} 
  max={100} 
  hideMinusAtMin 
/>`,
    render: () => {
      const QuantityDemo = () => {
        const [val, setVal] = useState(1);
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em] font-sans">Default Size (MD)</span>
              <div className="flex gap-4 items-center">
                <span className="text-sm font-mono font-bold text-mobi-text w-[6ch]">{val} unit{val !== 1 ? 's' : ''}</span>
                <MobiQuantityControl value={val} onChange={setVal} min={0} max={10} hideMinusAtMin />
              </div>
            </div>
          </div>
        );
      };
      return <QuantityDemo />;
    }
  },
  {
    id: 'MobiEmojiPicker',
    name: 'MobiEmojiPicker',
    category: 'component',
    description: 'Centralized wrapper around emoji-mart for standardized emoji selection within the M.O.B.I.™ ecosystem.',
    code: `<MobiEmojiPicker 
  onSelect={(emoji) => setIcon(emoji.native)} 
  theme="dark" 
/>`,
    render: () => {
      const EmojiDemo = () => {
        const [emoji, setEmoji] = useState('🚀');
        return (
          <div className="space-y-4 flex flex-col items-start">
            <div className="text-4xl p-4 bg-mobi-bg border border-mobi-border rounded-xl shadow-sm">{emoji}</div>
            <div className="max-w-[350px] w-full border border-mobi-border rounded-2xl overflow-hidden shadow-2xl">
              <MobiEmojiPicker onSelect={(e) => setEmoji(e.native)} theme="auto" />
            </div>
          </div>
        );
      };
      return <EmojiDemo />;
    }
  }
];

/* ─── Docs Page ─── */
export interface DocsPageProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}


export const DocsPage: React.FC<DocsPageProps> = ({ 
  isSidebarOpen, 
  setIsSidebarOpen 
}) => {
  // Sort catalog alphabetically by name
  const sortedCatalog = [...catalog].sort((a, b) => a.name.localeCompare(b.name));
  
  const [activeId, setActiveId] = useState(sortedCatalog[0].id);
  const active = sortedCatalog.find(c => c.id === activeId) || sortedCatalog[0];

  const components = sortedCatalog.filter(c => c.category === 'component');
  const hooks = sortedCatalog.filter(c => c.category === 'hook');

  const handleNav = (id: string) => {
    setActiveId(id);
    setIsSidebarOpen(false);
  };

  const SidebarContent = (
    <>
      <p className="px-3 mb-3 text-[10px] font-black text-mobi-text-muted uppercase tracking-[0.2em] font-sans">Components</p>
      <div className="space-y-1">
        {components.map(c => (
          <MobiSidebarItem
            key={c.id}
            active={activeId === c.id}
            onClick={() => handleNav(c.id)}
          >
            {c.name}
          </MobiSidebarItem>
        ))}
      </div>

      <p className="px-3 mt-8 mb-3 text-[10px] font-black text-mobi-text-muted uppercase tracking-[0.2em] font-sans">Hooks</p>
      <div className="space-y-1">
        {hooks.map(c => (
          <MobiSidebarItem
            key={c.id}
            active={activeId === c.id}
            onClick={() => handleNav(c.id)}
          >
            {c.name}
          </MobiSidebarItem>
        ))}
      </div>
    </>
  );

  return (
    <div className="flex flex-1 min-h-0 relative">
      {/* Sidebar (Responsive) */}
      <MobiSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        className="lg:static lg:block"
        title={
          <div className="flex items-center gap-3">
            <MobiLogo size={24} />
            <span className="text-xs font-black uppercase tracking-widest text-mobi-text">API Docs</span>
          </div>
        }
        footer={
          <div className="text-[10px] text-mobi-text-muted text-center font-mono opacity-50">
            {pkg.name} v{pkg.version}
          </div>
        }
      >
        {SidebarContent}
      </MobiSidebar>


      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <MobiSectionHeader 
            headline={active.category}
            title={active.name}
            description={active.description}
            variant={active.category as any}
          />

          <div className="grid grid-cols-1 gap-12">
            {/* Live Preview */}
            <section>
              <p className="text-[10px] font-black text-mobi-text-muted uppercase tracking-[0.2em] mb-4 font-sans">Live Preview</p>
              <div className="rounded-2xl border border-mobi-border bg-mobi-surface p-8 shadow-sm">
                {active.render()}
              </div>
            </section>

            {/* Usage & Import */}
            <div className="grid grid-cols-1 gap-8">
              <section>
                <p className="text-[10px] font-black text-mobi-text-muted uppercase tracking-[0.2em] mb-4 font-sans">Usage</p>
                <div className="rounded-2xl border border-mobi-border bg-mobi-bg overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between px-5 py-2.5 border-b border-mobi-border/50 bg-mobi-surface/50">
                    <span className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-widest font-mono">TSX</span>
                  </div>
                  <pre className="p-6 overflow-x-auto">
                    <code className="text-sm font-mono text-mobi-text leading-relaxed whitespace-pre">{active.code}</code>
                  </pre>
                </div>
              </section>

              <section>
                <p className="text-[10px] font-black text-mobi-text-muted uppercase tracking-[0.2em] mb-4 font-sans">Import</p>
                <div className="rounded-2xl border border-mobi-border bg-mobi-bg overflow-hidden shadow-sm">
                  <pre className="p-6 overflow-x-auto">
                    <code className="text-sm font-mono text-mobi-text leading-relaxed">{`import { ${active.name} } from '@wearemobi/shared';`}</code>
                  </pre>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* The Widget Popup Preview */}
      <MobiChatWidget 
        containerClassName="fixed bottom-6 right-44 z-[9999]"
        userInitials="CQ" 
        userPlan="PRO" 
        userEmail="carlos@wearemobi.com"
        userName="Carlos Quijano"
        title="MobiAI Chat"
        initialMessages={[
          { id: '1', role: 'user', content: 'Iniciando enlace táctico con MobiAI.', timestamp: new Date().toISOString() },
          { id: '2', role: 'assistant', content: 'Enlace establecido. El sistema está operando bajo parámetros v1.2.6. Todos los vectores de datos están sincronizados.', model: 'pro', timestamp: new Date().toISOString() }
        ]}
        userMenuItems={[
          { id: 'profile', label: 'Profile', icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
          { id: 'settings', label: 'Tactical Settings', icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
          { id: 'logout', label: 'Logout', danger: true, icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg> }
        ]}
      />
    </div>
  );
};
