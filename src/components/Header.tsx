import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings } from "lucide-react";
import { useIsWebAdmin } from "@/hooks/useIsWebAdmin";
import { SecretAdminModal } from "@/components/SecretAdminModal";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
  onLogout: () => void;
  onAdminAccess?: () => void;
}

export const Header = ({ activeTab, setActiveTab, user, onLogout, onAdminAccess }: HeaderProps) => {
  const { isAdmin } = useIsWebAdmin();
  const [clickCount, setClickCount] = useState(0);
  const [showSecretModal, setShowSecretModal] = useState(false);
  
  const baseNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'store', label: 'Store' },
    { id: 'complaints', label: 'Klachten' },
    { id: 'rules', label: 'Regels' },
    { id: 'applications', label: 'Sollicitaties' },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  // Add admin tab if user has WebAdmin role
  const navItems = isAdmin 
    ? [...baseNavItems, { id: 'admin', label: 'Admin', icon: Settings }]
    : baseNavItems;

  const handleNavClick = (tabId: string) => {
    if (tabId === 'admin' && onAdminAccess) {
      onAdminAccess();
    } else if (tabId === 'home') {
      setClickCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 5) {
          setShowSecretModal(true);
          return 0;
        }
        // Reset after 3 seconds
        setTimeout(() => setClickCount(0), 3000);
        return newCount;
      });
      setActiveTab(tabId);
    } else {
      setActiveTab(tabId);
    }
  };

  const handleSecretAdminSuccess = () => {
    if (onAdminAccess) {
      onAdminAccess();
    }
  };



  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-primary">RoermondRP</div>
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {'icon' in item && item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="text-sm">{<span>{user?.username}</span>}</span>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setActiveTab('dashboard')}>
                Inloggen
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <SecretAdminModal
        isOpen={showSecretModal}
        onClose={() => setShowSecretModal(false)}
        onSuccess={handleSecretAdminSuccess}
      />
    </header>
  );
};