import { useState } from "react";
import { useIsWebAdmin } from "@/hooks/useIsWebAdmin";


export const useAdminAccess = () => {
  const { isAdmin, loading } = useIsWebAdmin();

  const [clickCount, setClickCount] = useState(0);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleHomeClick = () => {
    if (!isAdmin) return; // alleen admins kunnen "unlocken"

    setClickCount(prev => {
      const newCount = prev + 1;

      if (newCount >= 5) {
        setShowAdminModal(true);
        return 0;
      }

      return newCount;
    });
  };

  const closeAdminModal = () => setShowAdminModal(false);

  const handleAdminSuccess = () => {
    setIsAdminAuthenticated(true);
    setShowAdminModal(false);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  return {
    loading,
    isAdmin,
    clickCount,
    showAdminModal,
    isAdminAuthenticated,
    handleHomeClick,
    closeAdminModal,
    handleAdminSuccess,
    handleAdminLogout,
  };
};
