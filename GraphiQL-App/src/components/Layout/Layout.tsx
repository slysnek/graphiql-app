import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import { FallbackRender } from '../FallbackRender/FallbackRender';

export default function Layout() {
  return (
    <>
      <ErrorBoundary fallbackRender={FallbackRender}>
        <Header />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallbackRender}>
        <Outlet />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallbackRender}>
        <Footer />
      </ErrorBoundary>
    </>
  );
}
