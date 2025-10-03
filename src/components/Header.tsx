import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
  onLogout: () => void;
}

export const Header = ({ activeTab, setActiveTab, user, onLogout }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'store', label: 'Store', path: '/' },
    { id: 'complaints', label: 'Klachten', path: '/complaints' },
    { id: 'rules', label: 'Regels', path: '/rules' },
    { id: 'applications', label: 'Sollicitaties', path: '/' },
    { id: 'dashboard', label: 'Dashboard', path: '/' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="text-xl md:text-2xl font-bold text-primary">RoermondRP</div>
            <nav className="hidden lg:flex space-x-4 xl:space-x-6">
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
          
          <div className="flex items-center space-x-2 md:space-x-4">
            {user ? (
              <div className="hidden sm:flex items-center space-x-2">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="h-6 w-6 rounded-full border"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
                <span className="text-sm hidden md:inline">{user?.username}</span>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setActiveTab('dashboard')} className="hidden sm:flex">
                Inloggen
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {user && (
                    <div className="flex items-center space-x-2 pb-4 border-b border-border">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="h-8 w-8 rounded-full border"
                        />
                      ) : (
                        <User className="h-6 w-6" />
                      )}
                      <span className="text-sm font-medium">{user?.username}</span>
                    </div>
                  )}
                  
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`px-4 py-3 rounded-md text-left font-medium transition-colors ${
                        activeTab === item.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}

                  {user ? (
                    <Button variant="destructive" onClick={onLogout} className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Uitloggen
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => handleNavClick('dashboard')} className="w-full">
                      Inloggen
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};