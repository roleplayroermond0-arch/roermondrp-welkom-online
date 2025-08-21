import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SecretAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SecretAdminModal: React.FC<SecretAdminModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      toast({
        title: "Velden vereist",
        description: "Vul alle velden in",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-auth", {
        body: { username, password }
      });

      if (error || !data?.success) {
        toast({
          title: "Ongeldige inloggegevens",
          description: "Gebruikersnaam of wachtwoord is onjuist",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succesvol ingelogd",
        description: "Welkom in het admin panel",
      });
      
      onSuccess();
      onClose();
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("Admin login error:", err);
      toast({
        title: "Login fout",
        description: "Er is een fout opgetreden",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setUsername("");
    setPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
            <Shield className="h-6 w-6 text-destructive" />
            Geheime Admin Toegang
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-6">
          <div className="space-y-2">
            <Label htmlFor="username">Gebruikersnaam</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Voer gebruikersnaam in"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Wachtwoord</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Voer wachtwoord in"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Inloggen..." : "Inloggen"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};