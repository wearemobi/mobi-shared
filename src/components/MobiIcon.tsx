import React from 'react';
import * as LucideIcons from 'lucide-react';

export type MobiIconName = 'user' | 'users' | 'server' | 'box' | 'bot' | 'shield' | 'monitor' | 'zap' | 'info' | 'loader' | 'copy' | 'plus' | 'settings' | 'logout' | 'external' | 'pos' | 'items' | 'customers' | 'app-window' | 'home' | 'building' | 'blocks' | 'grid' | 'globe' | 'activity' | 'refresh';

export interface MobiIconProps extends React.SVGProps<SVGSVGElement> {
  name: MobiIconName | string;
  size?: number | string;
}

export const MobiIcon: React.FC<MobiIconProps> = ({ name, size = 24, className, ...props }) => {
  const iconMap: Record<string, any> = {
    bot: LucideIcons.Bot,
    shield: LucideIcons.Shield,
    monitor: LucideIcons.Monitor,
    zap: LucideIcons.Zap,
    info: LucideIcons.Info,
    loader: LucideIcons.Loader2,
    copy: LucideIcons.Copy,
    plus: LucideIcons.Plus,
    settings: LucideIcons.Settings,
    logout: LucideIcons.LogOut,
    user: LucideIcons.User,
    users: LucideIcons.Users,
    server: LucideIcons.Server,
    box: LucideIcons.Box,
    external: LucideIcons.ExternalLink,
    pos: LucideIcons.Terminal,
    items: LucideIcons.Package,
    customers: LucideIcons.Users,
    'app-window': LucideIcons.AppWindow,
    home: LucideIcons.Home,
    building: LucideIcons.Building,
    blocks: LucideIcons.Blocks,
    grid: LucideIcons.LayoutGrid,
    globe: LucideIcons.Languages,
    activity: LucideIcons.Activity,
    refresh: LucideIcons.RefreshCw
  };
  const Icon = iconMap[name as string] || LucideIcons.HelpCircle;
  return <Icon size={size} className={className} {...(props as any)} />;
};
