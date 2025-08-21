import { useState, useCallback } from 'react';

export const useAdminAccess = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleHomeClick = useCallback(() => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowAdminModal(true);
        return 0; // Reset counter
      }
      return newCount;
    });

    // Reset counter after 3 seconds of inactivity
    setTimeout(() => {
      setClickCount(0);
    }, 3000);
  }, []);

  const closeAdminModal = () => {
    setShowAdminModal(false);
    setClickCount(0);
  };

  const handleAdminSuccess = () => {
    setIsAdminAuthenticated(true);
    setShowAdminModal(false);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  return {
    showAdminModal,
    isAdminAuthenticated,
    handleHomeClick,
    closeAdminModal,
    handleAdminSuccess,
    handleAdminLogout
  };
};