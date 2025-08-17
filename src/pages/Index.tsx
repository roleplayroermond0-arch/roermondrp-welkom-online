import { useState } from "react";
import { Header } from "@/components/Header";
import { HomePage } from "@/components/HomePage";
import { Store } from "@/components/Store";
import { Rules } from "@/components/Rules";
import { Dashboard } from "@/components/Dashboard";
import { Applications } from "@/components/Applications";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { LoadingScreen } from "@/components/ui/loading";
import { BrowserRouter } from "react-router-dom";


const AppContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userBalance] = useState(1500);
  const { user, signOut, loading } = useAuth();

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
      case 'rules':
        return <Rules />;
      case 'dashboard':
        return <Dashboard userBalance={userBalance} />;
      case 'applications':
        return <Applications user={user} />;
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
