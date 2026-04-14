import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-black p-10 text-center">
          <div>
            <h2 className="text-white text-4xl font-black uppercase mb-4">Something went wrong.</h2>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
              The application encountered an unexpected rendering error. Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
