import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import Layout from '../components/Layout/Layout';
import { Suspense } from 'react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

export function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner loading={true} />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SignUpPage />} />
            <Route path="welcome" element={<WelcomePage />} />
          </Route>
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
