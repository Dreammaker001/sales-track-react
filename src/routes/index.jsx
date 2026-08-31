import { createBrowserRouter, Navigate } from 'react-router'
import SalesOrdersPage from '../pages/SalesOrdersPage.jsx'
import SalesOrderDetailPage from '../pages/SalesOrderDetailPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import AppLayout from '../components/layout/AppLayout.jsx'
import AdminUsersPage from '../pages/AdminUsersPage.jsx'
import CreateUserPage from '../pages/CreateUserPage.jsx'
import EditUserPage from '../pages/EditUserPage.jsx'
import PlaceholderPage from '../pages/PlaceholderPage.jsx'
import RequireAuth from '../components/auth/RequireAuth.jsx'
import RequireRole from '../components/auth/RequireRole.jsx'
import AdminPTDatabaseConfigsPage from '@/pages/AdminPTDatabaseConfigsPage.jsx'
import AdminCreatePTDatabaseConfigPage from '@/pages/AdminCreatePTDatabaseConfigPage.jsx'
import AdminEditPTDatabaseConfigPage from '@/pages/AdminEditPTDatabaseConfigPage.jsx'
import SalesInvoicesPage from '../pages/SalesInvoicesPage.jsx'

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
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to="sales-orders" replace /> },
      {
        path: 'admin/users',
        element: (
          <RequireRole roles={['admin']}>
            <AdminUsersPage />
          </RequireRole>
        ),
        handle: {
          title: 'Admin · Users',
          subtitle: 'Kelola akun pengguna sistem',
        },
      },
      {
        path: 'admin/users/create',
        element: (
          <RequireRole roles={['admin']}>
            <CreateUserPage />
          </RequireRole>
        ),
        handle: {
          title: 'Admin · Buat User',
          subtitle: 'Tambahkan akun pengguna baru',
        },
      },
      {
        path: 'admin/users/:id/edit',
        element: (
          <RequireRole roles={['admin']}>
            <EditUserPage />
          </RequireRole>
        ),
        handle: {
          title: 'Admin · Edit User',
          subtitle: 'Ubah data akun pengguna',
        },
      },
      {
        path: 'admin/pt-database-configs',
        element: <AdminPTDatabaseConfigsPage />,
        handle: {
          title: 'Admin · PT Database Configs',
          subtitle: 'Kelola konfigurasi database PT',
        },
      },
      {
        path: 'admin/pt-database-configs/create',
        element: <AdminCreatePTDatabaseConfigPage />,
        handle: {
          title: 'Admin · Buat PT Database Config',
          subtitle: 'Tambahkan konfigurasi database PT baru',
        },
      },
      {
        path: 'admin/pt-database-configs/:id/edit',
        element: <AdminEditPTDatabaseConfigPage />,
        handle: {
          title: 'Admin · Edit PT Database Config',
          subtitle: 'Ubah konfigurasi database PT',
        },
      },
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
      {
        path: 'sales-invoices',
        element: <SalesInvoicesPage />,
        handle: { title: 'Sales Invoices', subtitle: 'Status pengiriman & invoice' },
      },
    ],
  },
  { path: '*', element: <PlaceholderPage title="Halaman tidak ditemukan" /> },
])
