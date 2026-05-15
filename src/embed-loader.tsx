import React from 'react';
import { createRoot } from 'react-dom/client';
import { MobiChatEdge } from './components/MobiChatEdge';
import './styles.css';

/**
 * M.O.B.I.™ Global Embed Loader
 * This script exposes the MobiEdge interface to non-React environments.
 */
const initMobiChat = (config: any = {}) => {
  // 0. Inject CSS if not already present
  if (!document.getElementById('mobi-edge-styles')) {
    const link = document.createElement('link');
    link.id = 'mobi-edge-styles';
    link.rel = 'stylesheet';
    link.href = config.cssUrl || 'https://shared.wearemobi.com/mobi-embed.css';
    document.head.appendChild(link);
  }

  // 1. Create a container for the widget if it doesn't exist
  let container = document.getElementById('mobi-edge-widget-container');
  
  if (!container) {
    container = document.createElement('div');
    container.id = 'mobi-edge-widget-container';
    document.body.appendChild(container);
  }

  // 2. Render the MobiChatEdge component into the container
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <MobiChatEdge 
        {...config}
        isInitiallyOpen={config.isInitiallyOpen ?? false}
      />
    </React.StrictMode>
  );

  console.log('🚀 M.O.B.I.™ Edge Sentinel Initialized');
};

// Expose to the global window object
(window as any).MobiEdge = {
  init: initMobiChat
};
