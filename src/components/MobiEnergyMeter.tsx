import React from 'react';
import { cn } from '@wearemobi/ui';

export type MobiEnergyLevel = 'critical' | 'low' | 'medium' | 'high' | 'full';

export interface MobiEnergyMeterProps {
  /** 0–100 value */
  value: number;
  /** Optional label */
  label?: string;
  /** Show numeric percentage */
  showValue?: boolean;
  /** Visual size */
  size?: 'sm' | 'md' | 'lg';
  /** Override automatic level detection */
  level?: MobiEnergyLevel;
  /** Number of cells in the battery. Defaults to 4 */
  cells?: number;
  /** Make meter interactive (click to simulate drain/charge) */
  onClick?: () => void;
  className?: string;
}

function resolveLevel(value: number): MobiEnergyLevel {
  if (value <= 10) return 'critical';
  if (value <= 25) return 'low';
  if (value <= 50) return 'medium';
  if (value <= 75) return 'high';
  return 'full';
}

const LEVEL_COLORS: Record<MobiEnergyLevel, { cell: string; glow: string; text: string }> = {
  critical: {
    cell: 'bg-red-500',
    glow: 'shadow-[0_0_8px_rgba(239,68,68,0.6)]',
    text: 'text-red-500',
  },
  low: {
    cell: 'bg-orange-400',
    glow: 'shadow-[0_0_8px_rgba(251,146,60,0.5)]',
    text: 'text-orange-400',
  },
  medium: {
    cell: 'bg-amber-400',
    glow: 'shadow-[0_0_8px_rgba(251,191,36,0.4)]',
    text: 'text-amber-400',
  },
  high: {
    cell: 'bg-emerald-400',
    glow: 'shadow-[0_0_8px_rgba(52,211,153,0.4)]',
    text: 'text-emerald-400',
  },
  full: {
    cell: 'bg-emerald-500',
    glow: 'shadow-[0_0_10px_rgba(16,185,129,0.5)]',
    text: 'text-emerald-500',
  },
};

const SIZE_CONFIG = {
  sm: {
    batteryW: 24,
    batteryH: 10,
    nubW: 2,
    nubH: 4,
    padding: 1.5,
    gap: 0.75,
    fontSize: 'text-[9px]',
    valueSize: 'text-[9px]',
    radius: 'rounded-sm',
  },
  md: {
    batteryW: 36,
    batteryH: 14,
    nubW: 3,
    nubH: 6,
    padding: 2,
    gap: 1,
    fontSize: 'text-[10px]',
    valueSize: 'text-[10px]',
    radius: 'rounded',
  },
  lg: {
    batteryW: 52,
    batteryH: 20,
    nubW: 4,
    nubH: 8,
    padding: 3,
    gap: 1.5,
    fontSize: 'text-xs',
    valueSize: 'text-xs',
    radius: 'rounded-md',
  },
};

export const MobiEnergyMeter: React.FC<MobiEnergyMeterProps> = ({
  value,
  label,
  showValue = false,
  size = 'md',
  level: levelOverride,
  cells = 4,
  onClick,
  className,
}) => {
  const clamped = Math.max(0, Math.min(100, value));
  const level = levelOverride ?? resolveLevel(clamped);
  const colors = LEVEL_COLORS[level];
  const cfg = SIZE_CONFIG[size];

  // How many cells to fill
  const filledCells = Math.round((clamped / 100) * cells);

  // Cell dimensions: fill the battery interior minus padding and gaps
  const totalGapWidth = (cells - 1) * cfg.gap;
  const interiorW = cfg.batteryW - cfg.padding * 2 - totalGapWidth;
  const cellW = interiorW / cells;
  const cellH = cfg.batteryH - cfg.padding * 2;

  const isCritical = level === 'critical';

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `Energy: ${clamped}%`}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Value / label left side */}
      {(showValue || label) && (
        <div className={cn('flex items-center gap-1', cfg.fontSize)}>
          {showValue && (
            <span className={cn('font-black font-mono tabular-nums', colors.text)}>
              {clamped}%
            </span>
          )}
          {label && (
            <span className="font-medium text-muted-foreground">{label}</span>
          )}
        </div>
      )}

      {/* Battery icon */}
      <div className="flex items-center">
        {/* Battery body */}
        <div
          className={cn(
            'relative border-2 border-current flex items-center overflow-hidden',
            cfg.radius,
            isCritical ? 'text-red-500' : 'text-border'
          )}
          style={{ width: cfg.batteryW, height: cfg.batteryH }}
        >
          {/* Cells */}
          <div
            className="absolute inset-0 flex items-center"
            style={{ padding: cfg.padding, gap: cfg.gap }}
          >
            {Array.from({ length: cells }).map((_, i) => {
              const filled = i < filledCells;
              return (
                <div
                  key={i}
                  className={cn(
                    'rounded-sm transition-all duration-500',
                    filled ? cn(colors.cell, filledCells === cells ? colors.glow : '') : 'bg-border/30'
                  )}
                  style={{ width: cellW, height: cellH, flexShrink: 0 }}
                />
              );
            })}
          </div>
          {/* Critical flash overlay */}
          {isCritical && (
            <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
          )}
        </div>
        {/* Battery nub (terminal) */}
        <div
          className={cn(
            'rounded-r-sm',
            isCritical ? 'bg-red-500/60' : 'bg-border'
          )}
          style={{ width: cfg.nubW, height: cfg.nubH }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
