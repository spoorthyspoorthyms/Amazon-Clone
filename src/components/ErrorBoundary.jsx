import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div role="alert" style={{ padding: '2rem', color: 'red' }}>
        <h2>Something went wrong.</h2>
        <p>Please reload the page or contact support.</p>
      </div>;
    }
    return this.props.children;
  }
}
