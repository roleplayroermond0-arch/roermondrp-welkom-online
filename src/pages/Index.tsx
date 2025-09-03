import { useState } from "react";
import { Header } from "@/components/Header";
import { HomePage } from "@/components/HomePage";
import { Store } from "@/components/Store";
import { Rules } from "@/components/Rules";
import { Applications } from "@/components/Applications";
import { Complaints } from "@/pages/Complaints";
import { Dashboard } from "@/components/Dashboard";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { useDiscordAuth } from "@/hooks/useDiscordAuth";
import { Loading as LoadingScreen } from "@/components/ui/loading";


const AppContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userBalance] = useState(1500);
  const { user, signOut, loading } = useAuth();
  
  // Check Discord membership for authenticated users
  useDiscordAuth();

  const handleLogout = async () => {
    await signOut();
    setActiveTab('home');
  };

  if (loading) {
    return <LoadingScreen text="Laden..." />;
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
