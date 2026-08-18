import { createBrowserRouter, Navigate } from 'react-router'
import AppLayout from '../components/layout/AppLayout.jsx'
import AdminUsersPage from '../pages/AdminUsersPage.jsx'
import CreateUserPage from '../pages/CreateUserPage.jsx'
import PlaceholderPage from '../pages/PlaceholderPage.jsx'

/**
 * Konfigurasi route terpusat.
 * handle.title/subtitle dibaca Topbar via useMatches().
 */
export const router = createBrowserRouter([
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
        path: 'admin/users/:username/change-password',
        element: <PlaceholderPage title="Ganti Password" />,
        handle: {
          title: 'Admin · Ganti Password',
          subtitle: 'Atur ulang password akun pengguna',
        },
      },
      {
        path: 'dashboard',
        element: <PlaceholderPage title="Dashboard" />,
        handle: { title: 'Dashboard', subtitle: 'Ringkasan aktivitas penjualan' },
      },
      {
        path: 'sales-orders',
        element: <PlaceholderPage title="Sales Orders" />,
        handle: { title: 'Sales Orders', subtitle: 'Kelola pesanan penjualan' },
      },
      {
        path: 'invoices',
        element: <PlaceholderPage title="Invoices" />,
        handle: { title: 'Invoices', subtitle: 'Status pengiriman & invoice' },
      },
      { path: '*', element: <PlaceholderPage title="Halaman tidak ditemukan" /> },
    ],
  },
])
