import { useState } from "react";
import { useIsWebAdmin } from "@/hooks/useIsWebAdmin";

export const useAdminAccess = () => {
  const { isAdmin, loading } = useIsWebAdmin();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminAccess = () => {
    if (isAdmin) {
      setIsAdminAuthenticated(true);
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  return {
    loading,
    isAdmin,
    isAdminAuthenticated,
    handleAdminAccess,
    handleAdminLogout,
  };
};
