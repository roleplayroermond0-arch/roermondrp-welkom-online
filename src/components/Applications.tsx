import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Loader2 } from "lucide-react";
import { APPLICATIONS_ENABLED, JOBS, type Job, type Question } from "@/config/applications";

interface ApplicationsProps {
  user: any;
}

export const Applications: React.FC<ApplicationsProps> = ({ user }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Check if applications are enabled
  if (!APPLICATIONS_ENABLED) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Sollicitaties</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <AlertCircle className="h-6 w-6" />
              <p className="text-xl">Sollicitaties zijn momenteel uitgeschakeld.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const validateForm = () => {
    if (!selectedJob) return false;
    
    const requiredQuestions = selectedJob.questions.filter(q => q.isRequired);
    const missingFields = requiredQuestions.filter(q => !formData[q.id]?.trim());
    
    if (missingFields.length > 0) {
      toast({
        title: "Vul alle velden in",
        description: "Vul alle velden in om je sollicitatie te versturen.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const submitApplication = async () => {
    if (!user) {
      toast({
        title: "Authenticatie Vereist",
        description: "Log in om je sollicitatie te versturen.",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm()) return;

    setSubmitting(true);
    
    try {
      if (!selectedJob) return;
      
      const embed = {
        title: "🚀 Nieuwe Sollicitatie",
        description: `**Functie:** ${selectedJob.icon} ${selectedJob.name}`,
        color: 0x00ff7f,
        fields: [
          {
            name: "👤 Sollicitant",
            value: user.username || "Onbekend",
            inline: true
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "RoermondRP Sollicitaties"
        }
      };

      selectedJob.questions.forEach((question, index) => {
        const answer = formData[question.id] || "Niet ingevuld";
        embed.fields.push({
          name: `${index + 1}. ${question.questionText}`,
          value: answer.substring(0, 1024),
          inline: false
        });
      });

      const webhookPayload = {
        embeds: [embed],
        username: "Sollicitatie Bot",
        avatar_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      };

      // Send directly to Discord webhook
      const response = await fetch(selectedJob.webhookUrl!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload)
      });

      if (!response.ok) {
        throw new Error('Failed to send to Discord');
      }

      toast({
        title: "Sollicitatie verzonden!",
        description: "Je sollicitatie is succesvol verzonden en wordt binnenkort beoordeeld.",
      });

      setFormData({});
      setSelectedJob(null);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Fout bij verzenden",
        description: "Er ging iets mis bij het verzenden van je sollicitatie. Probeer het opnieuw.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderFormField = (question: Question) => {
    const value = formData[question.id] || '';
    
    switch (question.questionType) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder="Voer je antwoord in..."
            className="min-h-[100px]"
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="">Selecteer een optie...</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      default:
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder="Voer je antwoord in..."
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Sollicitaties</h1>
          <p className="text-xl text-muted-foreground">
            Solliciteer voor een functie bij RoermondRP
          </p>
        </div>

        {!selectedJob ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {JOBS.map((job) => (
              <Card
                key={job.id}
                className={`p-6 cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
                  job.isAcceptingApplications
                    ? 'hover:border-primary border-border'
                    : 'border-muted bg-muted/20 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (job.isAcceptingApplications) {
                    setSelectedJob(job);
                  }
                }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{job.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{job.name}</h3>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  
                  {job.isAcceptingApplications ? (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      Sollicitaties Open
                    </Badge>
                  ) : (
                    <div className="space-y-2">
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        Gesloten
                      </Badge>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4" />
                        <span>Sollicitaties voor deze functie zijn momenteel uitgeschakeld</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <div className="mb-6">
                <Button
                  variant="outline"
                  onClick={() => setSelectedJob(null)}
                  className="mb-4"
                >
                  ← Terug naar overzicht
                </Button>
                
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {selectedJob.icon}
                  </div>
                  <h2 className="text-2xl font-bold">
                    Sollicitatie: {selectedJob.name}
                  </h2>
                </div>
              </div>

              {selectedJob.questions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Er zijn nog geen vragen geconfigureerd voor deze functie.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); submitApplication(); }}>
                  <div className="space-y-6">
                    {selectedJob.questions.map((question, index) => (
                      <div key={question.id}>
                        <Label className="flex items-center gap-2 mb-2">
                          <span className="font-medium">
                            {index + 1}. {question.questionText}
                          </span>
                          {question.isRequired && (
                            <Badge variant="destructive" className="text-xs">
                              Verplicht
                            </Badge>
                          )}
                        </Label>
                        {renderFormField(question)}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedJob(null)}
                      className="flex-1"
                    >
                      Annuleren
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="flex-1"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verzenden...
                        </>
                      ) : (
                        'Sollicitatie Verzenden'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};