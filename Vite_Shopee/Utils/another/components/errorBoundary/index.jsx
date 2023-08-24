/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '', stack: '' };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error);
    return { hasError: true, message: error?.message, stack: error?.stack };
  }

  render() {
    const { children } = this.props;
    const { hasError, message, stack } = this.state;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <div>Message: {message}</div>
          <br />
          <div>Stack: {stack}</div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
