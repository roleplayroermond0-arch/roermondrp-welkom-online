import { useState } from "react";
import { Header } from "@/components/Header";
import { HomePage } from "@/components/HomePage";
import { Store } from "@/components/Store";
import { Info } from "@/components/Info";
import { Rules } from "@/components/Rules";
import { Dashboard } from "@/components/Dashboard";
import { Applications } from "@/components/Applications";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [userBalance, setUserBalance] = useState(1500);
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    // Here you would integrate with Supabase auth
    try {
      // Simulated login for now
      setUser({ email });
      toast({
        title: "Succesvol ingelogd",
        description: `Welkom terug, ${email}!`,
      });
    } catch (error) {
      toast({
        title: "Inloggen mislukt",
        description: "Controleer je gegevens en probeer opnieuw.",
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (email: string, password: string) => {
    // Here you would integrate with Supabase auth
    try {
      // Simulated registration for now
      setUser({ email });
      toast({
        title: "Account aangemaakt",
        description: `Welkom bij RoermondRP, ${email}!`,
      });
    } catch (error) {
      toast({
        title: "Registratie mislukt",
        description: "Er ging iets mis. Probeer opnieuw.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
    toast({
      title: "Uitgelogd",
      description: "Je bent succesvol uitgelogd.",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'store':
        return <Store user={user} userBalance={userBalance} />;
      case 'info':
        return <Info />;
      case 'rules':
        return <Rules />;
      case 'dashboard':
        return (
          <Dashboard 
            user={user} 
            userBalance={userBalance}
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
        );
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

export default Index;
