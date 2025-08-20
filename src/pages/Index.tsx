import { useState } from "react";
import { Header } from "@/components/Header";
import { HomePage } from "@/components/HomePage";
import { Store } from "@/components/Store";
import { Rules } from "@/components/Rules";
import { Applications } from "@/components/Applications";
import { Complaints } from "@/pages/Complaints";
import { Dashboard } from "@/components/Dashboard";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { useDiscordAuth } from "@/hooks/useDiscordAuth";
import { Loading as LoadingScreen, LoadingScreen as LoadingSpinner } from "@/components/ui/loading";
import { useAdminAccess } from "@/hooks/useAdminAccess";


const AppContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userBalance] = useState(1500);
  const { user, signOut, loading } = useAuth();
  const {
    isAdminAuthenticated,
    handleAdminAccess,
    handleAdminLogout
  } = useAdminAccess();
  
  // Check Discord membership for authenticated users
  const { isChecking } = useDiscordAuth();

  const handleLogout = async () => {
    await signOut();
    setActiveTab('home');
  };

  if (loading || isChecking) {
    return <LoadingSpinner text="Verifiëren van toegang..." />;
  }

  // If admin is authenticated, show admin panel
  if (isAdminAuthenticated) {
    return <AdminPanel onLogout={handleAdminLogout} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'store':
        return <Store user={user} userBalance={userBalance} />;
      case 'complaints':
        return <Complaints />;
      case 'rules':
        return <Rules />;
      case 'applications':
        return <Applications user={user} />;
      case 'dashboard':
        return <Dashboard userBalance={userBalance} />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
        onAdminAccess={handleAdminAccess}
      />
      {renderContent()}
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
