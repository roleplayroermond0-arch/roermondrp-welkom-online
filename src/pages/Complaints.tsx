import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { AlertTriangle, Send } from 'lucide-react';

export const Complaints = () => {
  const [complaint, setComplaint] = useState('');
  const [evidenceLink, setEvidenceLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);

    try {
      // Format the Discord message
      const discordMessage = {
        embeds: [{
          title: "🚨 Nieuwe Klacht Ingediend",
          color: 15158332, // Red color
          fields: [
            {
              name: "👤 Gebruiker",
              value: user.email,
              inline: true
            },
            {
              name: "📝 Klacht",
              value: complaint,
              inline: false
            },
            {
              name: "🔗 Bewijs",
              value: evidenceLink || "Geen bewijs verstrekt",
              inline: false
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "RoermondRP Klachten Systeem"
          }
        }]
      };

      // This would be sent to your Discord webhook
      // For now, we'll simulate the webhook call
      console.log('Discord webhook payload:', discordMessage);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Klacht ingediend",
        description: "Je klacht is succesvol ingediend en wordt binnenkort behandeld.",
      });

      // Reset form
      setComplaint('');
      setEvidenceLink('');
    } catch (error) {
      console.error('Error submitting complaint:', error);
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
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              Klacht Indienen
            </CardTitle>
            <CardDescription>
              Dien hier je klacht in. Alle klachten worden doorgestuurd naar het moderatie team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <p className="text-sm text-muted-foreground">
                  Voeg een link toe naar screenshots, video's of ander bewijs (bijv. Imgur, YouTube).
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Indienen..."
                ) : (
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