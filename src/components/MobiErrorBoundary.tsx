import { Component, ErrorInfo, ReactNode } from 'react';
import { MobiCard } from './MobiCard';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { MobiButton } from './MobiButton';

export interface MobiErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class MobiErrorBoundary extends Component<MobiErrorBoundaryProps, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('M.O.B.I. ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <MobiCard variant="error" className="w-full max-w-md mx-auto my-4 border-error/20 bg-error/5">
          <MobiCard.Header>
            <div className="flex items-center gap-2 text-error">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-bold tracking-tight">Something went wrong</span>
            </div>
          </MobiCard.Header>
          <MobiCard.Content>
            <div className="text-sm text-error/80 mb-4 bg-background/50 p-3 rounded-lg overflow-x-auto font-mono text-xs border border-error/10">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </div>
            <MobiButton 
              variant="outline" 
              onClick={this.handleReset}
              className="w-full border-error/20 text-error hover:bg-error/10"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try again
            </MobiButton>
          </MobiCard.Content>
        </MobiCard>
      );
    }

    return this.props.children;
  }
}
