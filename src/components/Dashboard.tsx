import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Coins, ShoppingBag, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  user: any;
  userBalance: number;
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string) => void;
}

export const Dashboard = ({ user, userBalance, onLogin, onRegister }: DashboardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Fout",
        description: "Vul alle velden in.",
        variant: "destructive",
      });
      return;
    }
    onLogin(email, password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Fout",
        description: "Vul alle velden in.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Fout",
        description: "Wachtwoorden komen niet overeen.",
        variant: "destructive",
      });
      return;
    }
    onRegister(email, password);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">RoermondRP Dashboard</h1>
            
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Inloggen</TabsTrigger>
                <TabsTrigger value="register">Registreren</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="je@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Wachtwoord</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Inloggen
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="reg-email">E-mail</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="je@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-password">Wachtwoord</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Bevestig Wachtwoord</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Registreren
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    );
  }

  const recentPurchases = [
    { id: 1, item: "Audi RS6", amount: -2500, date: "2024-01-15" },
    { id: 2, item: "Munten gekocht", amount: +1000, date: "2024-01-14" },
    { id: 3, item: "Step", amount: -150, date: "2024-01-13" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Dashboard</h1>
          <p className="text-muted-foreground">Welkom terug, {user.email}!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <User className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Account Status</h3>
                <p className="text-sm text-muted-foreground">Actief</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <Coins className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Huidige Munten</h3>
                <p className="text-2xl font-bold text-primary">{userBalance}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Totaal Gekocht</h3>
                <p className="text-sm text-muted-foreground">3 items</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recente Aankopen</h2>
            <div className="space-y-3">
              {recentPurchases.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{purchase.item}</p>
                    <p className="text-sm text-muted-foreground">{purchase.date}</p>
                  </div>
                  <div className={`font-bold ${purchase.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {purchase.amount > 0 ? '+' : ''}{purchase.amount} munten
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Account Informatie</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">E-mail:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lid sinds:</span>
                <span>Januari 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-green-500">Actief</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Totaal gespendeerd:</span>
                <span>€25</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};