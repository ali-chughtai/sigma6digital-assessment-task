import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Root from './Root.tsx';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import ParentCategories from './pages/ParentCategories/ParentCategories.tsx';
import { HomeProductPageContent, RealEstatePageContent } from './components/data.ts';
import VendorsPage from './pages/Vendors/VendorsPage.tsx';
import Contact from './pages/Contact/Contact.tsx';
import RealEstateProductDetail from './pages/RealEstateProductDetail/RealEstateProductDetail.tsx';
import HomeProductDetail from './pages/HomeProductDetail/HomeProductDetail.tsx';
import VendorRegistration from './pages/VendorRegistration/VendorRegistration.tsx';
import VendorDashboard from './pages/VendorDashboard/VendorDashboard.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import Login from './pages/Login/Login.tsx';
import AddToCart from './pages/Cart/AddToCart.tsx';
import Checkout from './pages/Checkout/Checkout.tsx';

// Utility function to check authentication
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Checks if a token exists in localStorage
};

// ProtectedRoute component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

// RedirectIfLoggedIn component
const RedirectIfLoggedIn = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? <Navigate to="/vendor-dashboard" /> : element;
};

const hasProductsInCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  return cart.length > 0;
};

// CheckoutRoute component
const CheckoutRoute = ({ element }: { element: JSX.Element }) => {
  return hasProductsInCart() ? element : <Navigate to="/" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/home-products',
        element: <ParentCategories pageContent={HomeProductPageContent} />,
      },
      {
        path: '/real-estate',
        element: <ParentCategories pageContent={RealEstatePageContent} />,
      },
      {
        path: '/vendors',
        element: <VendorsPage />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/cart',
        element: <AddToCart />,
      },
      {
        path: '/checkout',
        element: <CheckoutRoute element={<Checkout />} />,
      },
      {
        path: '/products/real-estate/:slug',
        element: <RealEstateProductDetail />,
      },
      {
        path: '/products/home-products/:slug',
        element: <HomeProductDetail />,
      },
      {
        path: '/vendor-registration',
        element: <VendorRegistration />,
      },
      {
        path: '/login',
        element: <RedirectIfLoggedIn element={<Login />} />,
      },
      {
        path: '/vendor-dashboard',
        element: <ProtectedRoute element={<Navigate to="/vendor-dashboard/overview" />} />,
      },
      {
        path: '/vendor-dashboard/*',
        element: <ProtectedRoute element={<VendorDashboard />} />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
