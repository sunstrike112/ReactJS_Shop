/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react'
import { TextNormal } from '../text'

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log('======> errors: ', error, errorInfo)
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state
    if (hasError) {
      // You can render any custom fallback UI
      return <TextNormal>Some thing went Wrong</TextNormal>
    }

    return children
  }
}

export default ErrorBoundary
