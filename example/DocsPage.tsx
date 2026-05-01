import React, { useState } from 'react';
import { 
  MobiLogo, MobiLogoHero, MobiFooter, MobiAlert, MobiPlanBadge, 
  MobiUserBadge, MobiSwitcher, MobiSentinelMenu, MobiNavbar, MobiHero,
  MobiButton, useMobiTheme, useMobiClipboard
} from '../src';

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
export const DocsPage: React.FC = () => {
  const [activeId, setActiveId] = useState(catalog[0].id);
  const active = catalog.find(c => c.id === activeId) || catalog[0];

  const components = catalog.filter(c => c.category === 'component');
  const hooks = catalog.filter(c => c.category === 'hook');

  return (
    <div className="flex flex-1 min-h-0">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-mobi-border bg-mobi-bg/50 overflow-y-auto">
        <div className="p-4">
          <p className="text-[10px] font-black text-mobi-text-muted uppercase tracking-[0.2em] mb-3 font-sans">Components</p>
          <nav className="space-y-0.5">
            {components.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-bold font-sans tracking-tight transition-all ${
                  activeId === c.id 
                    ? 'bg-mobi-surface text-mobi-text shadow-sm' 
                    : 'text-mobi-text-muted hover:text-mobi-text hover:bg-mobi-surface/50'
                }`}
              >
                {c.name}
              </button>
            ))}
          </nav>

          <p className="text-[10px] font-black text-mobi-text-muted uppercase tracking-[0.2em] mt-6 mb-3 font-sans">Hooks</p>
          <nav className="space-y-0.5">
            {hooks.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-bold font-sans tracking-tight transition-all ${
                  activeId === c.id 
                    ? 'bg-mobi-surface text-mobi-text shadow-sm' 
                    : 'text-mobi-text-muted hover:text-mobi-text hover:bg-mobi-surface/50'
                }`}
              >
                {c.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-md font-sans ${
                active.category === 'component' 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : 'bg-blue-500/10 text-blue-500'
              }`}>
                {active.category}
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight font-sans">{active.name}</h2>
            <p className="text-sm text-mobi-text-muted font-sans mt-1">{active.description}</p>
          </div>

          {/* Live Preview */}
          <div className="mb-8">
            <p className="text-[10px] font-black text-mobi-text-muted uppercase tracking-[0.2em] mb-3 font-sans">Live Preview</p>
            <div className="rounded-2xl border border-mobi-border bg-mobi-surface p-6">
              {active.render()}
            </div>
          </div>

          {/* Code */}
          <div>
            <p className="text-[10px] font-black text-mobi-text-muted uppercase tracking-[0.2em] mb-3 font-sans">Usage</p>
            <div className="rounded-2xl border border-mobi-border bg-mobi-bg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-mobi-border/50">
                <span className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-widest font-sans">TSX</span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-mobi-text leading-relaxed whitespace-pre">{active.code}</code>
              </pre>
            </div>
          </div>

          {/* Import */}
          <div className="mt-6">
            <p className="text-[10px] font-black text-mobi-text-muted uppercase tracking-[0.2em] mb-3 font-sans">Import</p>
            <div className="rounded-2xl border border-mobi-border bg-mobi-bg overflow-hidden">
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-mobi-text leading-relaxed">{`import { ${active.name} } from '@wearemobi/shared';`}</code>
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
