
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Screening from '@/pages/Screening';
import Candidates from '@/pages/Candidates';
import Jobs from '@/pages/Jobs';
import Interviews from '@/pages/Interviews';
import UserManagement from '@/pages/UserManagement';
import RoleManagement from '@/pages/RoleManagement';
import Reports from '@/pages/Reports';
import Workflow from '@/pages/Workflow';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import Unauthorized from '@/pages/Unauthorized';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout title="Enterprise Dashboard">
                <Index />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/screening" element={
            <ProtectedRoute>
              <Layout title="Candidate Screening">
                <Screening />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/candidates" element={
            <ProtectedRoute>
              <Layout title="Candidates">
                <Candidates />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/jobs" element={
            <ProtectedRoute>
              <Layout title="Jobs">
                <Jobs />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/interviews" element={
            <ProtectedRoute>
              <Layout title="Interviews">
                <Interviews />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute requiredRole="hiring_manager">
              <Layout title="User Management">
                <UserManagement />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/roles" element={
            <ProtectedRoute requiredRole="admin">
              <Layout title="Role Management">
                <RoleManagement />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <Layout title="Reports">
                <Reports />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/workflow" element={
            <ProtectedRoute>
              <Layout title="Workflow">
                <Workflow />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout title="Settings">
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
