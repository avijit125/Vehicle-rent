import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  // const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  return children;
};
