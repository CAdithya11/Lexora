import { Navigate, Outlet } from 'react-router';
import { authService } from '../../../services/AuthService';
import { jwtDecode } from 'jwt-decode';

export const ProtectedRoute = ({ allowedRoles }) => {
  const user = authService.getCurrentUser();
  const decodedToken = user ? jwtDecode(user.token).role : null;
  if (!user || !user.token) {
    return <Navigate to="/signIn" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(decodedToken)) {
    console.log('ROle', user.role);
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};
