import React, { useState } from 'react';
import { MobiNav, MobiSentinelMenu, MobiLogo, MobiBadge, MobiInput, MobiButton, MobiThemeToggle } from '../src';
import { Package, Settings, Box, Layout, ArrowRight } from 'lucide-react';
import { DocsPage, catalog } from './DocsPage';
import '../src/styles.css';

import { LandingPage } from './LandingPage';
import { Book } from 'lucide-react';
import { Route, Switch, useLocation, useRoute } from 'wouter';

const DocsLayout: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute('/docs/:id');
  const activeId = (match && params?.id) ? params.id : catalog[0].id;
  const [search, setSearch] = useState('');

  const filteredCatalog = catalog.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const navItems = [
    {
      label: 'Components',
      items: filteredCatalog.map(item => ({
        id: item.id,
        label: item.name,
        icon: <Box size={16} strokeWidth={2} />,
      }))
    }
  ];

  return (
    <MobiNav
      activeId={activeId}
      onNavigate={(id) => setLocation(`/docs/${id}`)}
      navbarLeftContent={
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setLocation('/')}>
          <div className="bg-foreground rounded flex items-center justify-center p-1 hover:opacity-80 transition-opacity" style={{ width: 24, height: 24 }}>
            <MobiLogo size={20} />
          </div>
          <span className="text-sm font-bold tracking-tight text-foreground hidden sm:block hover:text-muted-foreground transition-colors">
            Component Catalog
          </span>
        </div>
      }
      navbarRightContent={
        <div className="flex items-center gap-3">
          <MobiThemeToggle />
          <a href="https://github.com/wearemobi" target="_blank" rel="noreferrer" className="text-xs font-medium text-muted-foreground hover:text-foreground">Support</a>
        </div>
      }
      user={{
        initials: 'CQ',
        name: 'Carlos Quijano',
        email: 'carlos@wearemobi.com',
        plan: 'ULTRA',
        org: 'M.O.B.I. HQ'
      }}
      userMenuItems={[
        { id: 'profile', label: 'Profile' },
        { id: 'logout', label: 'Logout', danger: true }
      ]}
      sidebarFooter={
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Version</span>
          <span className="text-xs font-mono">v2.0.0</span>
        </div>
      }
      sidebarContentTop={
        <div className="px-4 py-3">
          <MobiInput 
            placeholder="Search components..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      }
      items={navItems}
    >
      <div className="flex-1 w-full relative">
        <DocsPage activeId={activeId} />
      </div>
    </MobiNav>
  );
};

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/docs" component={DocsLayout} />
      <Route path="/docs/:id" component={DocsLayout} />
      <Route>
        <LandingPage />
      </Route>
    </Switch>
  );
}

export default App;
