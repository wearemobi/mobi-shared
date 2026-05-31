import React from 'react';
import { MobiHamburgerMenu, MobiHamburgerMenuProps } from './MobiHamburgerMenu';

export interface MobiMoreMenuProps extends Omit<MobiHamburgerMenuProps, 'triggerIcon' | 'activeTriggerIcon'> {
  /** 
   * Whether to use the horizontal more icon (3 dots horizontally).
   * @default false
   */
  horizontal?: boolean;
}

/**
 * MobiMoreMenu
 * A streamlined dropdown menu triggered by a 3-dots "more" icon.
 * Wraps MobiHamburgerMenu with specific icon defaults.
 */
export const MobiMoreMenu: React.FC<MobiMoreMenuProps> = ({
  horizontal = false,
  variant = 'ghost',
  ...props
}) => {
  const iconName = horizontal ? 'more-horizontal' : 'more-vertical';
  
  return (
    <MobiHamburgerMenu 
      variant={variant}
      triggerIcon={iconName}
      activeTriggerIcon={iconName} // You could use 'close' here too, but 'more' menus often keep the dots or use a distinct active state
      {...props}
    />
  );
};

export default MobiMoreMenu;
