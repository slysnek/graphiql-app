import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from '../pages/home';
import NotFound from '../pages/notFound';

export function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
