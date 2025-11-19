import { useCurrentUserQuery } from "@/features/profile/hooks/useUserProfile";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

import { Navigate } from "react-router-dom";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data: user, isLoading } = useCurrentUserQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/auth/login" replace />;

  return children;
};

export default ProtectedRoute;