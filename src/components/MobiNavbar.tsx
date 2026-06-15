import React from 'react';
import {
  SidebarTrigger,
  Separator,
  cn
} from '@wearemobi/ui';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@wearemobi/ui';

export interface MobiNavbarBreadcrumb {
  label: string;
  href?: string;
}

export interface MobiNavbarProps {
  /** Breadcrumb items — last one is the current page */
  breadcrumbs?: MobiNavbarBreadcrumb[];
  /** Custom left slot (replaces breadcrumbs if provided) */
  leftContent?: React.ReactNode;
  /** Right-side actions: user menu, search, notifications, etc. */
  rightContent?: React.ReactNode;
  className?: string;
}

export const MobiNavbar: React.FC<MobiNavbarProps> = ({
  breadcrumbs,
  leftContent,
  rightContent,
  className,
}) => {
  return (
    <header
      className={cn(
        'flex h-16 shrink-0 items-center justify-between border-b bg-background px-6',
        className
      )}
    >
      <div className="flex items-center gap-4 h-full">
        <SidebarTrigger className="-ml-2 h-8 w-8 shrink-0" />
        <Separator orientation="vertical" className="h-6 shrink-0" />
        <div className="flex items-center text-sm font-medium truncate">
          {leftContent ? (
            leftContent
          ) : breadcrumbs && breadcrumbs.length > 0 ? (
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, idx) => {
                  const isLast = idx === breadcrumbs.length - 1;
                  return (
                    <React.Fragment key={crumb.label}>
                      <BreadcrumbItem>
                        {isLast || !crumb.href ? (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        ) : (
                          <a href={crumb.href} className="transition-colors hover:text-foreground text-muted-foreground">{crumb.label}</a>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          ) : null}
        </div>
      </div>

      {/* Right: actions slot */}
      {rightContent && (
        <div className="flex items-center gap-2 shrink-0">
          {rightContent}
        </div>
      )}
    </header>
  );
};
