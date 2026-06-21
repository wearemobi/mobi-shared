import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarProvider,
  SidebarInset,
  SidebarRail,
  cn
} from '@wearemobi/ui';
import { MobiLogo } from './MobiLogo';
import type { MobiSentinelMenuProps } from './MobiSentinelMenu';
import { MobiSentinelMenu } from './MobiSentinelMenu';
import { MobiNavbar } from './MobiNavbar';

/* ─── Nav item contract ─── */
export interface MobiNavGroup {
  /** Optional label displayed above a group of items */
  label?: string;
  items: MobiNavItem[];
}

export interface MobiNavItem {
  id: string;
  label: string;
  /** Icon shown in both expanded and collapsed modes */
  icon: React.ReactNode;
  badge?: React.ReactNode | string | number;
}

/* ─── MobiNav props ─── */
export interface MobiNavProps {
  /** Flat item list OR grouped item list */
  items: MobiNavItem[] | MobiNavGroup[];
  activeId: string;
  onNavigate: (id: string) => void;

  /** Logo/title area override */
  title?: React.ReactNode;

  /** User info shown in the sidebar footer via MobiSentinelMenu */
  user?: MobiSentinelMenuProps['user'];
  userMenuItems?: MobiSentinelMenuProps['items'];

  /** Top bar content rendered inside SidebarInset */
  navbarLeftContent?: React.ReactNode;
  navbarRightContent?: React.ReactNode;
  /** Hide the built-in navbar entirely */
  hideNavbar?: boolean;

  /** Extra footer content below the user badge */
  sidebarFooter?: React.ReactNode;

  /** Content to render at the top of the sidebar content area */
  sidebarContentTop?: React.ReactNode;

  /** Show the sidebar collapse/expand trigger in the navbar */
  showSidebarTrigger?: boolean;

  children?: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

/* ─── Helpers ─── */
function isGrouped(items: MobiNavItem[] | MobiNavGroup[]): items is MobiNavGroup[] {
  return items.length > 0 && 'items' in items[0];
}

function renderBadge(badge: MobiNavItem['badge']) {
  if (!badge) return null;
  if (typeof badge === 'string' || typeof badge === 'number') {
    return <SidebarMenuBadge>{badge}</SidebarMenuBadge>;
  }
  return <span className="ml-auto">{badge}</span>;
}

function NavItems({
  items,
  activeId,
  onNavigate,
  label,
}: {
  items: MobiNavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
  label?: string;
}) {
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              isActive={activeId === item.id}
              onClick={() => onNavigate(item.id)}
              tooltip={item.label}
              className={cn(
                'gap-3 py-5 font-bold tracking-tight transition-all',
                activeId === item.id && 'bg-accent text-accent-foreground'
              )}
            >
              <span className="shrink-0 flex items-center justify-center mr-3">{item.icon}</span>
              <span>{item.label}</span>
              {renderBadge(item.badge)}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

/* ─── MobiNav — App Shell ─── */
export const MobiNav: React.FC<MobiNavProps> = ({
  items,
  activeId,
  onNavigate,
  title,
  user,
  userMenuItems = [],
  navbarLeftContent,
  navbarRightContent,
  hideNavbar = false,
  sidebarFooter,
  sidebarContentTop,
  showSidebarTrigger = true,
  children,
  className,
  defaultOpen = true,
}) => {
  const groups: MobiNavGroup[] = isGrouped(items)
    ? items
    : [{ items: items as MobiNavItem[] }];

  return (
    <SidebarProvider defaultOpen={defaultOpen} className={cn('min-h-screen', className)}>
      {/* ── Sidebar ─────────────────────────────────────── */}
      <Sidebar collapsible="icon">
        {/* Logo */}
        <SidebarHeader className="h-16 border-b flex items-center justify-center px-2">
          {title ? (
            <div className="group-data-[collapsible=icon]:hidden w-full">{title}</div>
          ) : (
            <>
              <div className="group-data-[collapsible=icon]:hidden flex items-center gap-3 w-full px-2">
                <MobiLogo size={28} className="shrink-0" />
                <span className="font-black text-base tracking-tight uppercase leading-none">M.O.B.I.™</span>
              </div>
              <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full">
                <MobiLogo size={24} />
              </div>
            </>
          )}
        </SidebarHeader>

        {/* Nav items */}
        <SidebarContent>
          {sidebarContentTop && (
            <div className="group-data-[collapsible=icon]:hidden">
              {sidebarContentTop}
            </div>
          )}
          {groups.map((group, i) => (
            <NavItems
              key={i}
              items={group.items}
              activeId={activeId}
              onNavigate={onNavigate}
              label={group.label}
            />
          ))}
        </SidebarContent>

        {/* User footer */}
        {(user || sidebarFooter) && (
          <SidebarFooter className="border-t p-2 space-y-2">
            {user && (
              <MobiSentinelMenu
                user={user}
                items={userMenuItems}
                className="w-full"
              />
            )}
            {sidebarFooter && (
              <div className="group-data-[collapsible=icon]:hidden">
                {sidebarFooter}
              </div>
            )}
          </SidebarFooter>
        )}

        {/* Rail for resize handle on desktop */}
        <SidebarRail />
      </Sidebar>

      {/* ── Main Content ─────────────────────────────────── */}
      <SidebarInset className="flex flex-col flex-1 min-w-0 bg-background min-h-0">
        {!hideNavbar && (
          <MobiNavbar
            leftContent={navbarLeftContent}
            rightContent={navbarRightContent}
            showSidebarTrigger={showSidebarTrigger}
          />
        )}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
