
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";

interface RequireAuthProps {
  children: JSX.Element;
  allowedRoles?: Array<UserRole>;
}

const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page, but save the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required, check if the user has one of them
  // But admins should always have access regardless of the specified roles
  if (allowedRoles && user && user.role !== "admin" && !allowedRoles.includes(user.role)) {
    // User is authenticated but doesn't have the required role and is not an admin
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RequireAuth;
