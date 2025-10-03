import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
  onLogout: () => void;
}

export const Header = ({ activeTab, setActiveTab, user, onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'store', label: 'Store', path: '/' },
    { id: 'complaints', label: 'Klachten', path: '/complaints' },
    { id: 'rules', label: 'Regels', path: '/rules' },
    { id: 'applications', label: 'Sollicitaties', path: '/' },
    { id: 'dashboard', label: 'Dashboard', path: '/' },
  ];

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
                  onClick={() => {
                    if (item.path === '/complaints' || item.path === '/rules') {
                      navigate(item.path);
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    (item.path === '/complaints' && location.pathname === '/complaints') ||
                    (item.path === '/rules' && location.pathname === '/rules') ||
                    (item.path === '/' && location.pathname === '/' && activeTab === item.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="h-6 w-6 rounded-full border"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
                <span className="text-sm">{user?.username}</span>
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
    </header>
  );
};