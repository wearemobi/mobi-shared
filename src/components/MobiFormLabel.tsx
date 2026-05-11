import React from 'react';

export interface MobiFormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The text label.
   */
  label: string;
  /**
   * Optional helper or descriptive text displayed beneath the label or title.
   */
  description?: string;
  /**
   * If true, displays a red asterisk indicator.
   * @default false
   */
  required?: boolean;
  /**
   * If true, displays a subtle (optional) suffix next to the label.
   * @default false
   */
  optional?: boolean;
  /**
   * The visual size/role of this label.
   * - `label`: Standard input field description
   * - `title`: Major form header
   * - `section`: Secondary subsection divider
   * @default 'label'
   */
  variant?: 'label' | 'title' | 'section';
}

/**
 * M.O.B.I.™ Form Typography System.
 * Standardizes form titles, section dividers, field labels, and assistant descriptions.
 * Uses a highly refined, premium font pairing with dynamic theme configurations.
 * 
 * @example
 * ```tsx
 * <MobiFormLabel label="Operator Email" required description="Must be your official mobi address" />
 * <MobiFormLabel variant="title" label="System Authentication" description="Please supply authorization tokens" />
 * ```
 */
export const MobiFormLabel: React.FC<MobiFormLabelProps> = ({
  label,
  description,
  required = false,
  optional = false,
  variant = 'label',
  className = '',
  ...props
}) => {
  if (variant === 'title') {
    const { htmlFor: _hf, form: _f, defaultChecked: _dc, defaultValue: _dv, ...divProps } = props;
    const safeProps = divProps as React.HTMLAttributes<HTMLDivElement>;
    return (
      <div className={`mb-6 ${className}`} {...safeProps}>
        <h2 className="text-xl font-black tracking-tight font-sans text-mobi-text uppercase">
          {label}
        </h2>
        {description && (
          <p className="text-xs text-mobi-text-muted mt-1 leading-relaxed font-sans font-medium">
            {description}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'section') {
    const { htmlFor: _hf, form: _f, defaultChecked: _dc, defaultValue: _dv, ...divProps } = props;
    const safeProps = divProps as React.HTMLAttributes<HTMLDivElement>;
    return (
      <div className={`mb-4 mt-6 border-b border-mobi-border/50 pb-2 ${className}`} {...safeProps}>
        <h3 className="text-sm font-black tracking-widest font-sans text-mobi-text uppercase">
          {label}
        </h3>
        {description && (
          <p className="text-[11px] text-mobi-text-muted mt-1 leading-relaxed font-sans font-medium">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`mb-1.5 flex flex-col ${className}`}>
      <label 
        className="text-[11px] font-black uppercase tracking-[0.15em] font-sans text-mobi-text flex items-center gap-1.5 cursor-pointer"
        {...props}
      >
        <span>{label}</span>
        {required && <span className="text-red-500 font-black">*</span>}
        {optional && (
          <span className="text-[9px] font-bold text-mobi-text-muted lowercase tracking-normal font-sans italic">
            (optional)
          </span>
        )}
      </label>
      {description && (
        <span className="text-[10px] text-mobi-text-muted font-medium mb-1 leading-normal font-sans">
          {description}
        </span>
      )}
    </div>
  );
};
export default MobiFormLabel;
