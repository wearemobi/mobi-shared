import React, { Component, ErrorInfo, ReactNode } from 'react';
import { MobiLogo } from './MobiLogo';
import { MobiButton } from './MobiButton';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * M.O.B.I.™ System Guardian (Error Boundary).
 * Prevents application-wide crashes by catching component-level errors.
 */
export class MobiErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('M.O.B.I. System Error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.fallback) return this.fallback;

      return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-mobi-bg p-8 text-center animate-in fade-in duration-500">
          <div className="mb-6 rounded-none bg-rose-500/10 p-4 border border-rose-500/20">
            <MobiLogo size={40} className="text-rose-500" />
          </div>
          <h2 className="text-[14px] font-black tracking-tight text-mobi-text uppercase mb-2">System • Offline</h2>
          <p className="text-[11px] font-mono text-mobi-text-muted uppercase tracking-widest max-w-[200px] mb-8 leading-relaxed">
            A critical logic fault was detected in the widget core.
          </p>
          <MobiButton 
            variant="solid" 
            onClick={this.handleReset}
            className="bg-mobi-text text-mobi-bg hover:bg-mobi-text/90"
          >
            REBOOT SYSTEM
          </MobiButton>
          
          {this.state.error && (
            <div className="mt-8 w-full overflow-hidden border-t border-mobi-border pt-4">
              <p className="text-[8px] font-mono text-rose-500/60 uppercase truncate">
                {this.state.error.message}
              </p>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }

  private get fallback() {
    return this.props.fallback;
  }
}
