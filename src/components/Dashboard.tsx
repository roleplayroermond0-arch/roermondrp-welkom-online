import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Coins, ShoppingBag, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { LoadingScreen } from "@/components/ui/loading";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";


interface DashboardProps {
  userBalance: number;
}

export const Dashboard = ({ userBalance }: DashboardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const { user, loading, signUp, signIn, signOut, verifyOtp, updatePassword } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("access_token");
  

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Fout",
        description: "Vul alle velden in.",
        variant: "destructive",
      });
      return;
    }
    try {
      await signIn(email, password);
    } catch (error) {
      // Error handling is done in the useAuth hook
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
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
    try {
      await signUp(email, password);
      setPendingEmail(email);
      setShowOtpVerification(true);
    } catch (error) {
      // Error handling is done in the useAuth hook
    }
  };

  const handleOtpVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp || !pendingEmail) {
      toast({
        title: "Fout",
        description: "Vul de verificatiecode in.",
        variant: "destructive",
      });
      return;
    }
    try {
      await verifyOtp(pendingEmail, otp);
      setShowOtpVerification(false);
      setPendingEmail("");
      setOtp("");
    } catch (error) {
      // Error handling is done in the useAuth hook
    }
  };

  if (loading) {
    return <LoadingScreen text="Laden..." />;
  }
if (accessToken) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center animate-fade-in">
      <Card className="max-w-md mx-auto p-6 animate-scale-in">
        <div className="text-center mb-6">
          <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Reset je wachtwoord</h1>
          <p className="text-muted-foreground mt-2">
            Kies een nieuw wachtwoord voor je account.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!password || !confirmPassword) {
              toast({
                title: "Fout",
                description: "Vul beide velden in.",
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
            try {
              await updatePassword(password, accessToken);
              toast({
                title: "Succes",
                description: "Je wachtwoord is aangepast.",
              });
            } catch {
              toast({
                title: "Fout",
                description: "Reset mislukt.",
                variant: "destructive",
              });
            }
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="password">Nieuw wachtwoord</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full">
            Wachtwoord resetten
          </Button>
        </form>
      </Card>
    </div>
  );
}

  if (showOtpVerification) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center animate-fade-in">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto p-6 animate-scale-in">
            <div className="text-center mb-6">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold">E-mail Verificatie</h1>
              <p className="text-muted-foreground mt-2">
                We hebben een verificatiecode naar {pendingEmail} gestuurd.
              </p>
            </div>
            
            <form onSubmit={handleOtpVerification} className="space-y-4">
              <div>
                <Label htmlFor="otp">Verificatiecode</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                Verifiëer Account
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => setShowOtpVerification(false)}
              >
                Terug naar inloggen
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center animate-fade-in">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto p-6 animate-scale-in">
            <h1 className="text-2xl font-bold text-center mb-6">RoermondRP Dashboard</h1>
            
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Inloggen</TabsTrigger>
                <TabsTrigger value="register">Registreren</TabsTrigger>
              </TabsList>
              
              
                            <TabsContent value="login" className="animate-fade-in">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="je@email.com"
                      className="transition-all duration-200 focus:scale-105"
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
                      className="transition-all duration-200 focus:scale-105"
                    />
                  </div>
                  <Button type="submit" className="w-full hover-scale" disabled={loading}>
                    Inloggen
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-sm text-muted-foreground hover:text-primary transition-all"
                    onClick={() => {
                      toast({
                        title: "Wachtwoord resetten",
                        description: "Deze functie is nog niet geïmplementeerd.",
                      });
                    }}
                  >
                    Wachtwoord vergeten?
                  </Button>
                </form>
              </TabsContent>

              
              <TabsContent value="register" className="animate-fade-in">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="reg-email">E-mail</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="je@email.com"
                      className="transition-all duration-200 focus:scale-105"
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
                      className="transition-all duration-200 focus:scale-105"
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
                      className="transition-all duration-200 focus:scale-105"
                    />
                  </div>
                  <Button type="submit" className="w-full hover-scale" disabled={loading}>
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
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 animate-slide-in-right">Dashboard</h1>
          <p className="text-muted-foreground">Welkom terug, {user.email}!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 hover-scale animate-scale-in">
            <div className="flex items-center space-x-4">
              <User className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Account Status</h3>
                <p className="text-sm text-muted-foreground">
                  {user.email_confirmed_at ? 'Geverifieerd' : 'Niet geverifieerd'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover-scale animate-scale-in">
            <div className="flex items-center space-x-4">
              <Coins className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Huidige Munten</h3>
                <p className="text-2xl font-bold text-primary">{userBalance}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover-scale animate-scale-in">
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
          <Card className="p-6 animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Recente Aankopen</h2>
            <div className="space-y-3">
              {recentPurchases.map((purchase, index) => (
                <div 
                  key={purchase.id} 
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover-scale"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
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

          <Card className="p-6 animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Account Informatie</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">E-mail:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lid sinds:</span>
                <span>{new Date(user.created_at).toLocaleDateString('nl-NL')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={user.email_confirmed_at ? 'text-green-500' : 'text-yellow-500'}>
                  {user.email_confirmed_at ? 'Actief' : 'In afwachting'}
                </span>
              </div>
              <div className="flex justify-between">
                
              </div>
            </div>
            <div className="mt-6">
              <Button 
                onClick={signOut} 
                variant="outline" 
                className="w-full hover-scale"
                disabled={loading}
              >
                Uitloggen
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};