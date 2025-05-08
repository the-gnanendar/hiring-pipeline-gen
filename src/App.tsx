
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Toaster } from './components/ui/toaster';

// Pages
import IndexPage from './pages/Index';
import CandidatesPage from './pages/Candidates';
import JobsPage from './pages/Jobs';
import InterviewsPage from './pages/Interviews';
import AIAssistantPage from './pages/AIAssistant';
import LoginPage from './pages/Login';
import UnauthorizedPage from './pages/Unauthorized';
import NotFoundPage from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          } />
          
          <Route path="/candidates" element={
            <ProtectedRoute requiredPermissions={[{ action: 'read', subject: 'candidates' }]}>
              <CandidatesPage />
            </ProtectedRoute>
          } />
          
          <Route path="/jobs" element={
            <ProtectedRoute requiredPermissions={[{ action: 'read', subject: 'jobs' }]}>
              <JobsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/interviews" element={
            <ProtectedRoute requiredPermissions={[{ action: 'read', subject: 'interviews' }]}>
              <InterviewsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/ai-assistant" element={
            <ProtectedRoute>
              <AIAssistantPage />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
