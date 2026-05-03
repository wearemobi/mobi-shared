import React, { useState } from 'react';
import { 
  MobiLogo, MobiLogoHero, MobiFooter, MobiAlert, MobiPlanBadge, 
  MobiUserBadge, MobiSwitcher, MobiSentinelMenu, MobiNavbar, MobiHero,
  MobiButton, MobiSidebar, MobiSidebarItem, useMobiTheme, useMobiClipboard,
  MobiCard, MobiDropbox, MobiProgress, MobiChatInput
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
    id: 'MobiCard',
    name: 'MobiCard',
    category: 'component',
    description: 'Premium asset container with header and technical footer.',
    code: `<MobiCard title="Data Analytics">
  <p>Content goes here.</p>
</MobiCard>`,
    render: () => (
      <div className="max-w-md">
        <MobiCard title="System Node v1.2.6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-mobi-text-muted">Status</span>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Active</span>
            </div>
            <div className="h-2 bg-mobi-bg rounded-full overflow-hidden">
              <div className="h-full bg-mobi-primary w-[65%]" />
            </div>
            <p className="text-sm text-mobi-text leading-relaxed">
              Real-time synchronization with the Command Bridge is active.
            </p>
          </div>
        </MobiCard>
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
        const [isProcessing, setIsProcessing] = useState(false);
        const [activeModel, setActiveModel] = useState('fast');
        const [energy, setEnergy] = useState(85);

        const handleSend = (msg: string) => {
          setIsProcessing(true);
          setTimeout(() => {
            alert(`[${activeModel}] Command Received: ${msg}`);
            setIsProcessing(false);
            setEnergy(prev => Math.max(0, prev - 10));
          }, 2000);
        };

        return (
          <div className="max-w-2xl mx-auto w-full py-8 space-y-8">
            <MobiChatInput 
              onSend={handleSend} 
              isProcessing={isProcessing}
              activeModelId={activeModel}
              onModelChange={setActiveModel}
              energy={energy}
              onAttachClick={() => alert('Attach clicked')}
            />
            
            <div className="p-4 bg-mobi-bg/50 border border-mobi-border rounded-xl">
              <label className="text-[10px] font-black uppercase tracking-widest text-mobi-text-muted mb-4 block">
                Simulate Energy Drain
              </label>
              <input 
                type="range" 
                min="0" max="100" 
                value={energy} 
                onChange={(e) => setEnergy(parseInt(e.target.value))}
                className="w-full h-1 bg-mobi-border rounded-lg appearance-none cursor-pointer accent-mobi-primary"
              />
              <div className="flex justify-between mt-2 text-[10px] font-mono text-mobi-text-muted">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        );
      };
      return <ChatDemo />;
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
  const [activeId, setActiveId] = useState(catalog[0].id);
  const active = catalog.find(c => c.id === activeId) || catalog[0];

  const components = catalog.filter(c => c.category === 'component');
  const hooks = catalog.filter(c => c.category === 'hook');

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
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-md font-mono ${
                active.category === 'component' 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : 'bg-blue-500/10 text-blue-500'
              }`}>
                {active.category}
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight font-sans text-mobi-text">{active.name}</h2>
            <p className="text-base text-mobi-text-muted font-sans mt-2 max-w-2xl leading-relaxed">{active.description}</p>
          </div>

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
    </div>
  );
};
