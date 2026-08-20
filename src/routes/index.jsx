import { createBrowserRouter, Navigate } from 'react-router'
import SalesOrdersPage from '../pages/SalesOrdersPage.jsx'
import SalesOrderDetailPage from '../pages/SalesOrderDetailPage.jsx'
import AppLayout from '../components/layout/AppLayout.jsx'
import AdminUsersPage from '../pages/AdminUsersPage.jsx'
import CreateUserPage from '../pages/CreateUserPage.jsx'
import EditUserPage from '../pages/EditUserPage.jsx'
import PlaceholderPage from '../pages/PlaceholderPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'

/**
 * Konfigurasi route terpusat.
 * handle.title/subtitle dibaca Topbar via useMatches().
 */
export const router = createBrowserRouter([
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/users" replace /> },
      {
        path: 'admin/users',
        element: <AdminUsersPage />,
        handle: {
          title: 'Admin · Users',
          subtitle: 'Kelola akun pengguna sistem',
        },
      },
      {
        path: 'admin/users/create',
        element: <CreateUserPage />,
        handle: {
          title: 'Admin · Buat User',
          subtitle: 'Tambahkan akun pengguna baru',
        },
      },
      {
        path: 'admin/users/:id/edit',
        element: <EditUserPage />,
        handle: {
          title: 'Admin · Edit User',
          subtitle: 'Ubah data akun pengguna',
        },
      },
      // {
      //   path: 'dashboard',
      //   element: <PlaceholderPage title="Dashboard" />,
      //   handle: { title: 'Dashboard', subtitle: 'Ringkasan aktivitas penjualan' },
      // },
      {
        path: 'sales-orders',
        element: <SalesOrdersPage />,
        handle: { title: 'Sales Orders', subtitle: 'Kelola pesanan penjualan' },
      },
      {
        path: 'sales-orders/:id',
        element: <SalesOrderDetailPage />,
        handle: { title: 'Sales Orders Detail', subtitle: 'Detail pesanan penjualan' },
      },
      // {
      //   path: 'invoices',
      //   element: <PlaceholderPage title="Invoices" />,
      //   handle: { title: 'Invoices', subtitle: 'Status pengiriman & invoice' },
      // },
    ],
  },
  { path: '*', element: <PlaceholderPage title="Halaman tidak ditemukan" /> },
])
