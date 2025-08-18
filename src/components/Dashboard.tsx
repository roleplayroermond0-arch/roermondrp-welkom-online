import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, CheckCircle, XCircle, ShoppingBag } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase"; // zorg dat dit klopt

export const Dashboard = () => {
  const { user, signOut } = useAuth();

  // Als er geen gebruiker is -> laat login zien
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Log in met je Discord account om verder te gaan
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              className="w-full"
              onClick={() =>
                supabase.auth.signInWithOAuth({
                  provider: "discord",
                  options: {
                    redirectTo: "http://localhost:8080", // verander dit naar je echte URL
                  },
                })
              }
            >
              Inloggen met Discord
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Als gebruiker wél ingelogd is -> dashboard tonen
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

        <div className="space-y-6">
          {/* Account Status */}
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
                    {new Date(user.created_at).toLocaleDateString("nl-NL")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
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
                onClick={() => window.open("https://tebex.io/roermondRP", "_blank")}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Open Tebex Shop
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Uitloggen */}
        <div className="mt-8 text-center">
          <Button onClick={signOut} variant="destructive">
            Uitloggen
          </Button>
        </div>
      </div>
    </div>
  );
};
