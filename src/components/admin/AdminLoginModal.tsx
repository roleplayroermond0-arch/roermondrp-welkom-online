import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Shield, Lock, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import supabase from '@/lib/supabase';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [totpCode, setTotpCode] = useState('');
  const [adminId, setAdminId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await supabase.functions.invoke('admin-auth', {
        body: {
          action: 'verify_credentials',
          username: credentials.username,
          password: credentials.password
        }
      });

      if (response.error) throw response.error;

      if (response.data.success) {
        setAdminId(response.data.adminId);
        setStep('2fa');
        toast({
          title: "Credentials verified",
          description: "Please enter your 2FA code from Google Authenticator"
        });
      } else {
        toast({
          title: "Invalid credentials",
          description: "Username or password is incorrect",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Credentials verification error:', error);
      toast({
        title: "Authentication error",
        description: "An error occurred during authentication",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await supabase.functions.invoke('admin-auth', {
        body: {
          action: 'verify_totp',
          adminId,
          totpCode
        }
      });

      if (response.error) throw response.error;

      if (response.data.success) {
        // Log successful admin login
        await supabase.functions.invoke('admin-logger', {
          body: {
            action: 'ADMIN_LOGIN',
            details: { username: credentials.username },
            adminId
          }
        });

        toast({
          title: "Login successful",
          description: "Welcome to the admin panel"
        });
        onSuccess();
        onClose();
        resetForm();
      } else {
        toast({
          title: "Invalid 2FA code",
          description: "Please check your Google Authenticator app",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('2FA verification error:', error);
      toast({
        title: "Authentication error",
        description: "An error occurred during 2FA verification",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('credentials');
    setCredentials({ username: '', password: '' });
    setTotpCode('');
    setAdminId(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-background to-background/95 border-border/50">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
            <Shield className="h-6 w-6 text-primary" />
            Admin Panel Access
          </DialogTitle>
        </DialogHeader>

        {step === 'credentials' && (
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2">
                <Lock className="h-5 w-5" />
                Authentication
              </CardTitle>
              <CardDescription>
                Enter your admin credentials to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    required
                    className="mt-1"
                    placeholder="Enter admin username"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="mt-1"
                    placeholder="Enter admin password"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === '2fa' && (
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2">
                <Smartphone className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Enter the 6-digit code from your Google Authenticator app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handle2FASubmit} className="space-y-4">
                <div>
                  <Label htmlFor="totpCode">Authentication Code</Label>
                  <Input
                    id="totpCode"
                    type="text"
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    className="mt-1 text-center text-lg tracking-widest font-mono"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep('credentials')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={loading || totpCode.length !== 6}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};