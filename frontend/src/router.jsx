import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';

export const router = createBrowserRouter([
  { path: '/', element: <ProductListPage /> },
  { path: '/product/:id', element: <ProductDetailPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/orders', element: <OrdersPage /> },
]);
