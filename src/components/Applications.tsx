import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Siren, Heart, Wrench, Phone, Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApplicationsProps {
  user: any;
}

export const Applications = ({ user }: ApplicationsProps) => {
  const [selectedJob, setSelectedJob] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    motivation: "",
    availability: "",
    experience: "",
    discord: ""
  });
  const { toast } = useToast();

  const jobs = [
    {
      id: "politie",
      name: "Politie",
      icon: Siren,
      description: "Zorg voor orde en veiligheid in Roermond",
      requirements: ["Minimaal 18 jaar", "Goede communicatie", "Betrouwbaar"],
      color: "blue"
    },
    {
      id: "ambulance",
      name: "Ambulance",
      icon: Heart,
      description: "Red levens en zorg voor de gezondheid van burgers",
      requirements: ["Minimaal 16 jaar", "Medische kennis gewenst", "Stress bestendig"],
      color: "red"
    },
    {
      id: "kmar",
      name: "Kmar",
      icon: Siren,
      description: "Koninklijke Marechaussee - Speciale taken",
      requirements: ["Minimaal 21 jaar", "Politie ervaring", "Disciplinair"],
      color: "green"
    },
    {
      id: "anwb",
      name: "ANWB",
      icon: Wrench,
      description: "Technische ondersteuning en wegenwacht",
      requirements: ["Minimaal 16 jaar", "Technische kennis", "Servicegerichtheid"],
      color: "yellow"
    },
    {
      id: "taxi",
      name: "Taxi",
      icon: Car,
      description: "Vervoer burgers veilig door de stad",
      requirements: ["Minimaal 16 jaar", "Rijbewijs", "Klantvriendelijk"],
      color: "orange"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Inloggen vereist",
        description: "Je moet ingelogd zijn om te solliciteren.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedJob || !formData.name || !formData.age || !formData.motivation) {
      toast({
        title: "Incomplete gegevens",
        description: "Vul alle verplichte velden in.",
        variant: "destructive",
      });
      return;
    }

    // Here you would submit the application to your backend
    toast({
      title: "Sollicitatie verstuurd!",
      description: "Je sollicitatie is succesvol ingediend. Je hoort binnen 48 uur van ons.",
    });

    // Reset form
    setFormData({
      name: "",
      age: "",
      motivation: "",
      availability: "",
      experience: "",
      discord: ""
    });
    setSelectedJob("");
  };

  const selectedJobData = jobs.find(job => job.id === selectedJob);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Sollicitaties</h1>
          <p className="text-xl text-muted-foreground">
            Solliciteer voor een officiële functie binnen RoermondRP
          </p>
        </div>

        {!user && (
          <Card className="p-6 mb-8 border-destructive bg-destructive/10">
            <p className="text-center text-destructive font-semibold">
              Je moet ingelogd zijn om te kunnen solliciteren. Ga naar Dashboard om in te loggen.
            </p>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {jobs.map((job) => (
            <Card 
              key={job.id} 
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedJob === job.id ? 'ring-2 ring-primary border-primary' : ''
              }`}
              onClick={() => setSelectedJob(job.id)}
            >
              <div className="text-center">
                <job.icon className={`h-12 w-12 mx-auto mb-4 text-${job.color}-500`} />
                <h3 className="text-xl font-bold mb-2">{job.name}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{job.description}</p>
                <div className="space-y-1">
                  {job.requirements.map((req, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedJobData && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">
              Sollicitatie voor {selectedJobData.name}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Volledige Naam *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Jan Jansen"
                  />
                </div>
                
                <div>
                  <Label htmlFor="age">Leeftijd *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="18"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="discord">Discord Username</Label>
                <Input
                  id="discord"
                  value={formData.discord}
                  onChange={(e) => handleInputChange('discord', e.target.value)}
                  placeholder="gebruiker#1234"
                />
              </div>

              <div>
                <Label htmlFor="motivation">Motivatie *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  placeholder="Waarom wil je deze functie? Wat kun je bijdragen?"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="experience">Eerdere Ervaring</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="Heb je ervaring met vergelijkbare functies in andere servers?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="availability">Beschikbaarheid</Label>
                <Select onValueChange={(value) => handleInputChange('availability', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wanneer ben je beschikbaar?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dagdienst">Dagdienst (08:00 - 16:00)</SelectItem>
                    <SelectItem value="avonddienst">Avonddienst (16:00 - 00:00)</SelectItem>
                    <SelectItem value="nachtdienst">Nachtdienst (00:00 - 08:00)</SelectItem>
                    <SelectItem value="weekend">Weekend</SelectItem>
                    <SelectItem value="flexibel">Flexibel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Vereisten voor {selectedJobData.name}:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {selectedJobData.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={!user}
              >
                {user ? 'Sollicitatie Indienen' : 'Login Vereist'}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};