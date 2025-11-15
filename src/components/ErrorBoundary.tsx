import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RefreshCw, RotateCcw } from 'lucide-react';
import { trackEvent } from '@/components/Analytics';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorCount: number;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Track error in analytics
    trackEvent('exception', 'Error', error.message);

    // Update state
    this.setState((prevState) => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Auto-redirect to home after multiple errors
    if (this.state.errorCount >= 2) {
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    });
  };

  render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.DEV;

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-lg w-full bg-card rounded-xl shadow-2xl p-8 border border-border">
            <div className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-destructive/10 p-4 rounded-full">
                  <AlertCircle className="w-12 h-12 text-destructive" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-foreground mb-3">
                Oups ! Une erreur est survenue
              </h1>

              {/* Description */}
              <p className="text-muted-foreground mb-8">
                Ne vous inquiétez pas, nous avons enregistré l'erreur et travaillons pour la corriger.
              </p>

              {/* Dev Mode Error Details */}
              {isDev && this.state.error && (
                <details className="text-left mb-6 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <summary className="cursor-pointer text-destructive font-semibold mb-2 select-none">
                    🔍 Détails de l'erreur (Mode Développement)
                  </summary>
                  <div className="mt-3 space-y-2">
                    <div className="text-sm">
                      <strong className="text-foreground">Message :</strong>
                      <pre className="mt-1 text-xs overflow-auto bg-muted p-2 rounded">
                        {this.state.error.toString()}
                      </pre>
                    </div>
                    {this.state.errorInfo?.componentStack && (
                      <div className="text-sm">
                        <strong className="text-foreground">Stack :</strong>
                        <pre className="mt-1 text-xs overflow-auto bg-muted p-2 rounded max-h-48">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={this.handleReset}
                  className="w-full"
                  size="lg"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Réessayer
                </Button>

                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Rafraîchir la page
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="w-full"
                  size="lg"
                >
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                  </Link>
                </Button>
              </div>

              {/* Auto-redirect warning */}
              {this.state.errorCount >= 2 && (
                <div className="mt-6 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    ⏱️ Plusieurs erreurs détectées. Redirection automatique vers l'accueil dans 5 secondes...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
