import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, User, Mail, Calendar, ExternalLink, ShoppingBag, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Loading as LoadingScreen } from "@/components/ui/loading";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import DiscordLoginButton from "@/components/DiscordLoginButton";

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
                    onClick={() => window.location.href = '/forgot-password'}
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

  // Logged in user dashboard - Clean and minimal
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
        
        <div className="space-y-6">
          {/* Account Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Status
                </span>
                {user.email_confirmed_at ? (
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Geverifieerd
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="mr-1 h-3 w-3" />
                    Niet Geverifieerd
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">E-mail:</span>
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Lid sinds:</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString('nl-NL')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Snelle Acties</CardTitle>
              <CardDescription>
                Direct toegang tot belangrijke functies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open('https://tebex.io/roermondRP', '_blank')}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Open Tebex Shop
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            onClick={signOut}
            variant="destructive"
          >
            Uitloggen
          </Button>
        </div>
      </div>
    </div>
  );
};