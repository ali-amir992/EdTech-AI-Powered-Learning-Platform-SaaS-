import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: ReactNode;
  isAuthenticated: boolean;
  requiredRole?: string;
  userRole?: string;
}

const ProtectedRoute = ({ element, isAuthenticated, requiredRole, userRole }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;
