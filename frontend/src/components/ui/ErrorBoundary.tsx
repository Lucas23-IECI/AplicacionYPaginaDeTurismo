import React from 'react';

interface Props { children: React.ReactNode; }
interface State { hasError: boolean; }

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-display text-stone-900 mb-3">Algo salió mal</h1>
            <p className="text-stone-500 mb-6">
              Ocurrió un error inesperado. Intenta recargar la página.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors"
              >
                Recargar Página
              </button>
              <a
                href="/"
                className="border border-stone-200 text-stone-700 px-6 py-3 rounded-xl font-semibold hover:bg-stone-50 transition-colors"
              >
                Ir al Inicio
              </a>
            </div>
          </div>
        </div>
      );
    }
    const { children } = this.props as Props;
    return children;
  }
}
