import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/api';

export default function ProtectedRoute({ children, requiredRole }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} replace />;
  }

  return children;
}
