import { Component } from 'react';
import appStyles from './App.module.css';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <header className={appStyles.app_header}>
          <h1>Oops...🐌</h1>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              location.reload();
            }}
          >
            Restart
          </a>
        </header>
      );
    }
    return this.props.children;
  }
}
