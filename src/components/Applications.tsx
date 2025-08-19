import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Siren, Heart, Wrench, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Webhooks + kleuren (pas de URLs aan naar jouw echte Discord webhooks)
const JOB_WEBHOOKS: Record<
  string,
  { url: string; color: number; textColor: string }
> = {
  politie: {
    url: "https://discord.com/api/webhooks/1407128666512687114/SDr0d-AEUDgaJkjCEOTNyLAfXmqJMn7jMhibZWwPz5nLQeXPu9SX-Ujj6f81ST_wWdrQ",
    color: 0x00bfff, // lichtblauw embed
    textColor: "text-sky-500", // Tailwind class
  },
  ambulance: {
    url: "https://discord.com/api/webhooks/1407133137900933210/1kg8qT7_ocSPPBgXuw01TDfdl433uJzcIWJniidR1bVkeJ8DCvKNScqZMbLWE9ygCzVg",
    color: 0xffd700, // geel embed
    textColor: "text-yellow-500",
  },
  kmar: {
    url: "https://discord.com/api/webhooks/1407133248949059764/zoTEsp8PtumWA_HwAY-wtS_JaPKzl7Zpn0NDpAl1cYtsZPlLfbGXhPdKGK0l5mE_JAQ9",
    color: 0x00008b, // donkerblauw embed
    textColor: "text-blue-900",
  },
  anwb: {
    url: "https://discord.com/api/webhooks/1407133360572207155/N7tFTeYOH4QeqAbK2-TcGCQdtCaG-iynMy-4IE805FiqI5kffMjRWM6WLoKHC6F1AxCA",
    color: 0xffffff, // wit embed
    textColor: "text-gray-200",
  },
  taxi: {
    url: "https://discord.com/api/webhooks/1407133444323938486/AeOIlDUT6HW5D8gKE_KZxCAcuiDVZIC4HT9owDuN2_pj_cGLqikeMqN08MvjLLFHMG_8",
    color: 0x000000, // zwart embed
    textColor: "text-black",
  },
};

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
    discord: "",
  });
  const { toast } = useToast();

  const jobs = [
    {
      id: "politie",
      name: "Politie",
      icon: Siren,
      description: "Zorg voor orde en veiligheid in Roermond",
      requirements: ["Minimaal 18 jaar", "Goede communicatie", "Betrouwbaar"],
    },
    {
      id: "ambulance",
      name: "Ambulance",
      icon: Heart,
      description: "Red levens en zorg voor de gezondheid van burgers",
      requirements: [
        "Minimaal 16 jaar",
        "Medische kennis gewenst",
        "Stress bestendig",
      ],
    },
    {
      id: "kmar",
      name: "Kmar",
      icon: Siren,
      description: "Koninklijke Marechaussee - Speciale taken",
      requirements: ["Minimaal 21 jaar", "Politie ervaring", "Disciplinair"],
    },
    {
      id: "anwb",
      name: "ANWB",
      icon: Wrench,
      description: "Technische ondersteuning en wegenwacht",
      requirements: [
        "Minimaal 16 jaar",
        "Technische kennis",
        "Servicegerichtheid",
      ],
    },
    {
      id: "taxi",
      name: "Taxi",
      icon: Car,
      description: "Vervoer burgers veilig door de stad",
      requirements: ["Minimaal 16 jaar", "Rijbewijs", "Klantvriendelijk"],
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    const jobData = jobs.find((job) => job.id === selectedJob);
    const webhook = JOB_WEBHOOKS[selectedJob];
    if (!webhook || !jobData) {
      toast({
        title: "Fout",
        description: "Geen webhook of job gevonden.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      embeds: [
        {
          title: `Nieuwe sollicitatie - ${jobData.name}`,
          color: webhook.color,
          fields: [
            { name: "Naam", value: formData.name, inline: true },
            { name: "Leeftijd", value: formData.age, inline: true },
            {
              name: "Discord",
              value: formData.discord || "Niet ingevuld",
              inline: false,
            },
            {
              name: "Beschikbaarheid",
              value: formData.availability || "Niet ingevuld",
              inline: false,
            },
            {
              name: "Ervaring",
              value: formData.experience || "Niet ingevuld",
              inline: false,
            },
            {
              name: "Motivatie",
              value: formData.motivation || "Niet ingevuld",
              inline: false,
            },
            {
              name: "Ingediend door",
              value: user?.username || "Onbekend",
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      await fetch(webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      toast({
        title: "Sollicitatie verstuurd!",
        description: `Je sollicitatie voor ${jobData.name} is succesvol ingediend.`,
      });

      setFormData({
        name: "",
        age: "",
        motivation: "",
        availability: "",
        experience: "",
        discord: "",
      });
      setSelectedJob("");
    } catch (err) {
      toast({
        title: "Fout",
        description: "Er ging iets mis bij het versturen naar Discord.",
        variant: "destructive",
      });
    }
  };

  const selectedJobData = jobs.find((job) => job.id === selectedJob);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Sollicitaties
          </h1>
          <p className="text-xl text-muted-foreground">
            Solliciteer voor een officiële functie binnen RoermondRP
          </p>
        </div>

        {!user && (
          <Card className="p-6 mb-8 border-destructive bg-destructive/10">
            <p className="text-center text-destructive font-semibold">
              Je moet ingelogd zijn om te kunnen solliciteren. Ga naar Dashboard
              om in te loggen.
            </p>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {jobs.map((job) => {
            const webhook = JOB_WEBHOOKS[job.id];
            return (
              <Card
                key={job.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedJob === job.id ? "ring-2 ring-primary border-primary" : ""
                }`}
                onClick={() => setSelectedJob(job.id)}
              >
                <div className="text-center">
                  <job.icon
                    className={`h-12 w-12 mx-auto mb-4 ${
                      webhook?.textColor || "text-primary"
                    }`}
                  />
                  <h3 className="text-xl font-bold mb-2">{job.name}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {job.description}
                  </p>
                  <div className="space-y-1">
                    {job.requirements.map((req, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
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
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Jan Jansen"
                  />
                </div>

                <div>
                  <Label htmlFor="age">Leeftijd *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="18"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="discord">Discord Username</Label>
                <Input
                  id="discord"
                  value={formData.discord}
                  onChange={(e) => handleInputChange("discord", e.target.value)}
                  placeholder="gebruiker#1234"
                />
              </div>

              <div>
                <Label htmlFor="motivation">Motivatie *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange("motivation", e.target.value)}
                  placeholder="Waarom wil je deze functie? Wat kun je bijdragen?"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="experience">Eerdere Ervaring</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                  placeholder="Heb je ervaring met vergelijkbare functies in andere servers?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="availability">Beschikbaarheid</Label>
                <Select
                  onValueChange={(value) => handleInputChange("availability", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wanneer ben je beschikbaar?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dagdienst">
                      Dagdienst (08:00 - 16:00)
                    </SelectItem>
                    <SelectItem value="avonddienst">
                      Avonddienst (16:00 - 00:00)
                    </SelectItem>
                    <SelectItem value="nachtdienst">
                      Nachtdienst (00:00 - 08:00)
                    </SelectItem>
                    <SelectItem value="weekend">Weekend</SelectItem>
                    <SelectItem value="flexibel">Flexibel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">
                  Vereisten voor {selectedJobData.name}:
                </h3>
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
                {user ? "Sollicitatie Indienen" : "Login Vereist"}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};
