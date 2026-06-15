import re

path = 'example/DocsPage.tsx'
with open(path, 'r') as f:
    content = f.read()

# Instead of parsing TS, let's just create a completely clean DocsPage.tsx
clean_content = """import React, { useState } from 'react';
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
  MobiConfirm
} from '../src';

const catalog = [
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
      <div className="flex flex-wrap items-center gap-4">
        <MobiButton variant="solid">Solid Action</MobiButton>
        <MobiButton variant="outline">Outline View</MobiButton>
        <MobiButton variant="ghost">Ghost/Cancel</MobiButton>
        <MobiButton variant="danger">Danger</MobiButton>
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
      <MobiCard title="Tactical Deep Dark" variant="tactical" footer="Sovereign Core">
        <p className="text-sm text-slate-300 leading-relaxed">
          Deep-dark mode container designed for professional tactical interfaces.
        </p>
      </MobiCard>
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
        <MobiInput placeholder="Enter username..." />
        <MobiTextarea placeholder="Enter description..." />
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
      <div className="flex gap-2">
        <MobiBadge variant="default">Default</MobiBadge>
        <MobiBadge variant="success">Success</MobiBadge>
        <MobiBadge variant="warning">Warning</MobiBadge>
        <MobiBadge variant="error">Error</MobiBadge>
        <MobiBadge variant="info">Info</MobiBadge>
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
      <MobiUserBadge variant="expanded" initials="CQ" name="Carlos Quijano" plan="PRO" email="dev@mobi.com" org="M.O.B.I. HQ" />
    )
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
    id: 'MobiNav',
    name: 'MobiNav',
    category: 'component',
    description: 'App Layout Shell',
    code: `<MobiNav items={...} activeId="dash" onNavigate={...} />`,
    render: () => {
      const Demo = () => {
        const [active, setActive] = useState('dash');
        return (
          <div className="border border-border rounded-xl bg-background overflow-hidden relative flex flex-col" style={{ height: '380px' }}>
             <MobiNav 
                activeId={active}
                onNavigate={setActive}
                items={[
                  { id: 'dash', label: 'Retail POS' },
                  { id: 'items', label: 'Items Inventory', badge: 124 },
                  { id: 'kitchen', label: 'Cocina', badge: <MobiBadge variant="error" size="sm">2 En Cocina</MobiBadge> }
                ]}
              >
                <div className="p-6">Main Content for {active}</div>
              </MobiNav>
          </div>
        );
      }
      return <Demo />;
    }
  },
  {
    id: 'MobiFooter',
    name: 'MobiFooter',
    category: 'component',
    description: 'Standard footer.',
    code: `<MobiFooter />`,
    render: () => <MobiFooter />
  },
];

export const DocsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <MobiToastProvider>
      <div className="min-h-screen bg-background text-foreground font-sans">
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MobiLogo size={32} />
            <h1 className="text-xl font-black uppercase tracking-widest">M.O.B.I.™ Shared v2</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
          {catalog.map(item => (
            <section key={item.id} id={item.id} className="scroll-mt-24">
              <div className="mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight">{item.name}</h2>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              
              <div className="border border-border rounded-xl p-6 bg-card overflow-x-auto">
                {item.render()}
              </div>

              <div className="mt-4 p-4 bg-muted/50 rounded-xl border border-border">
                <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
                  {item.code}
                </pre>
              </div>
            </section>
          ))}
        </main>
      </div>
    </MobiToastProvider>
  );
};

export default DocsPage;
"""

with open(path, 'w') as f:
    f.write(clean_content)

print("Rewrote DocsPage.tsx successfully.")
