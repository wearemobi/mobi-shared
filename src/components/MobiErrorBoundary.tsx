import { Component, ErrorInfo, ReactNode } from 'react';
import { MobiLogo } from './MobiLogo';
import { MobiButton } from './MobiButton';

interface Props {
  children: ReactNode;
  /** Optional custom fallback UI. If provided, replaces the default error screen. */
  fallback?: ReactNode;
  /** Optional callback for error reporting (e.g. Sentry, Datadog). */
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * M.O.B.I.™ System Guardian (Error Boundary).
 * Prevents application-wide crashes by catching component-level errors.
 * Supports a custom `fallback` UI and an `onError` reporting hook.
 *
 * @example
 * ```tsx
 * <MobiErrorBoundary onError={(err) => Sentry.captureException(err)}>
 *   <App />
 * </MobiErrorBoundary>
 * ```
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
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

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
              {this.state.errorInfo && (
                <details className="mt-2 text-left">
                  <summary className="text-[8px] font-mono text-mobi-text-muted/40 uppercase cursor-pointer">Component Stack</summary>
                  <pre className="text-[7px] font-mono text-mobi-text-muted/30 mt-1 overflow-auto max-h-24 whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
