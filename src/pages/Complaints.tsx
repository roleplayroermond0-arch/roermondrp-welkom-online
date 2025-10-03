import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { AlertTriangle, Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';

// Webhook color mapping
const COMPLAINT_COLORS: Record<string, number> = {
  staff: 0xFF0000, // rood
  overheid: 0x0000FF, // blauw
};

export const Complaints = () => {
  const [complaint, setComplaint] = useState('');
  const [evidenceLink, setEvidenceLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [target, setTarget] = useState<string>("staff"); // standaard naar staff
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Inloggen vereist",
        description: "Je moet ingelogd zijn om een klacht in te dienen.",
        variant: "destructive",
      });
      return;
    }

    if (!complaint.trim()) {
      toast({
        title: "Klacht vereist",
        description: "Voer een beschrijving van je klacht in.",
        variant: "destructive",
      });
      return;
    }

    const color = COMPLAINT_COLORS[target];
    if (!color) {
      toast({
        title: "Configuratiefout",
        description: "Geen webhook ingesteld voor dit type klacht.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the Supabase edge function
      const { data, error } = await supabase.functions.invoke('send-complaint', {
        body: {
          target: target,
          complaint: complaint,
          evidence: evidenceLink,
          user: {
            username: user.username || 'Onbekend',
            discordId: user.id || 'Onbekend', // This is already the Discord ID
            avatar: user.avatar
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Klacht ingediend",
        description: `Je klacht is succesvol doorgestuurd naar ${target}.`,
      });

      setComplaint("");
      setEvidenceLink("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast({
        title: "Fout bij indienen",
        description: "Er is een fout opgetreden bij het indienen van je klacht.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                Inloggen Vereist
              </CardTitle>
              <CardDescription>
                Je moet ingelogd zijn om een klacht in te kunnen dienen.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
              <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-destructive" />
              Klacht Indienen
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Dien hier je klacht in. Kies of deze naar Staff of Overheid moet worden gestuurd.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="target">Kies ontvanger *</Label>
                <Select onValueChange={setTarget} value={target}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kies ontvanger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">👮 Staff</SelectItem>
                    <SelectItem value="overheid">🏛️ Overheid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="complaint">Klacht Beschrijving *</Label>
                <Textarea
                  id="complaint"
                  placeholder="Beschrijf je klacht in detail..."
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidence">Bewijs Link (optioneel)</Label>
                <Input
                  id="evidence"
                  type="url"
                  placeholder="https://imgur.com/... of YouTube link"
                  value={evidenceLink}
                  onChange={(e) => setEvidenceLink(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Indienen..." : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Klacht Indienen
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
