import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { FileText, Send, User } from 'lucide-react';

export const Applications = () => {
  const [formData, setFormData] = useState({
    applicationType: '',
    fullName: '',
    age: '',
    experience: '',
    motivation: '',
    availability: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const applicationTypes = [
    { value: 'police', label: 'Politie Agent' },
    { value: 'ambulance', label: 'Ambulance Medewerker' },
    { value: 'fire', label: 'Brandweer' },
    { value: 'mechanic', label: 'Monteur' },
    { value: 'taxi', label: 'Taxi Chauffeur' },
    { value: 'admin', label: 'Administrator' },
    { value: 'moderator', label: 'Moderator' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Inloggen vereist",
        description: "Je moet ingelogd zijn om een sollicitatie in te dienen.",
        variant: "destructive",
      });
      return;
    }

    // Validate required fields
    if (!formData.applicationType || !formData.fullName || !formData.age || !formData.motivation) {
      toast({
        title: "Vereiste velden",
        description: "Vul alle vereiste velden in.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedType = applicationTypes.find(type => type.value === formData.applicationType);
      
      // Format the Discord message
      const discordMessage = {
        embeds: [{
          title: "📋 Nieuwe Sollicitatie",
          color: 3447003, // Blue color
          fields: [
            {
              name: "👤 Sollicitant",
              value: user.email,
              inline: true
            },
            {
              name: "📧 E-mail",
              value: user.email,
              inline: true
            },
            {
              name: "🎯 Functie",
              value: selectedType?.label || formData.applicationType,
              inline: true
            },
            {
              name: "👨‍💼 Volledige Naam",
              value: formData.fullName,
              inline: true
            },
            {
              name: "🎂 Leeftijd",
              value: formData.age,
              inline: true
            },
            {
              name: "⏰ Beschikbaarheid",
              value: formData.availability || "Niet opgegeven",
              inline: true
            },
            {
              name: "💼 Ervaring",
              value: formData.experience || "Geen ervaring opgegeven",
              inline: false
            },
            {
              name: "💭 Motivatie",
              value: formData.motivation,
              inline: false
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "RoermondRP Sollicitatie Systeem"
          }
        }]
      };

      if (formData.additionalInfo) {
        discordMessage.embeds[0].fields.push({
          name: "ℹ️ Aanvullende Informatie",
          value: formData.additionalInfo,
          inline: false
        });
      }

      // This would be sent to your Discord webhook
      console.log('Discord webhook payload:', discordMessage);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Sollicitatie ingediend",
        description: "Je sollicitatie is succesvol ingediend. Je hoort binnenkort van ons!",
      });

      // Reset form
      setFormData({
        applicationType: '',
        fullName: '',
        age: '',
        experience: '',
        motivation: '',
        availability: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Fout bij indienen",
        description: "Er is een fout opgetreden bij het indienen van je sollicitatie.",
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
                <User className="h-6 w-6 text-destructive" />
                Inloggen Vereist
              </CardTitle>
              <CardDescription>
                Je moet ingelogd zijn om een sollicitatie in te kunnen dienen.
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
              <FileText className="h-6 w-6 text-primary" />
              Sollicitatie Formulier
            </CardTitle>
            <CardDescription>
              Solliciteer voor een functie bij RoermondRP. Alle sollicitaties worden doorgestuurd naar het management team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="applicationType">Functie *</Label>
                <Select value={formData.applicationType} onValueChange={(value) => handleInputChange('applicationType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer een functie" />
                  </SelectTrigger>
                  <SelectContent>
                    {applicationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Volledige Naam *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Je echte naam"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Leeftijd *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="16"
                    max="99"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="18"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Beschikbaarheid</Label>
                <Input
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  placeholder="Bijv. Ma-Vr 18:00-22:00, Weekend flexibel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Ervaring</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="Beschrijf je relevante ervaring (bijv. andere RP servers, real-life ervaring)..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Motivatie *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  placeholder="Waarom wil je deze functie en wat kun je bijdragen aan RoermondRP?"
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Aanvullende Informatie</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Andere informatie die je graag wilt delen..."
                  className="min-h-[80px]"
                />
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
                    Sollicitatie Indienen
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