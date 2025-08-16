import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Users, Gavel } from "lucide-react";

export const Rules = () => {
  const ruleCategories = [
    {
      icon: Shield,
      title: "Algemene Regels",
      color: "primary",
      rules: [
        "Respecteer alle spelers en staff members",
        "Geen toxic gedrag, pesten of discriminatie",
        "Nederlands spreken in de voice chat",
        "Geen cheats, hacks of exploits gebruiken",
        "Volg de aanwijzingen van staff op",
        "Geen spam in chat of voice"
      ]
    },
    {
      icon: Users,
      title: "Roleplay Regels",
      color: "secondary",
      rules: [
        "Blijf altijd in karakter (IC)",
        "Geen Random Death Match (RDM)",
        "Geen Vehicle Death Match (VDM)",
        "Geen metagaming (OOC informatie IC gebruiken)",
        "Geen powergaming (onrealistische acties forceren)",
        "Respecteer /me en /do commando's",
        "Geen fail roleplay",
        "Combat logging is verboden"
      ]
    },
    {
      icon: Gavel,
      title: "Server Regels",
      color: "accent",
      rules: [
        "Maximaal 1 karakter per persoon",
        "Geen alt accounts",
        "Rapporteer bugs via de juiste kanalen",
        "Geen adverteren van andere servers",
        "Staff beslissingen zijn finaal",
        "Ban evading resulteert in permanente ban"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Straffen",
      color: "destructive",
      rules: [
        "Waarschuwing: Eerste overtreding",
        "Kick: Herhaling van overtreding",
        "Tijdelijke ban: Ernstige overtredingen",
        "Permanente ban: Zeer ernstige overtredingen",
        "Alle straffen worden gelogd",
        "Appeals mogelijk via Discord ticket"
      ]
    }
  ];

  const importantNotes = [
    "Onwetendheid van de regels is geen excuus",
    "Regels kunnen zonder aankondiging worden aangepast",
    "Staff heeft het recht om naar eigen inzicht te handelen",
    "Bij twijfel: vraag het aan een staff member"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Server Regels</h1>
          <p className="text-xl text-muted-foreground">
            Deze regels zorgen voor een leuke en eerlijke ervaring voor iedereen op RoermondRP.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {ruleCategories.map((category, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <category.icon className={`h-6 w-6 text-${category.color}`} />
                <h2 className="text-xl font-bold">{category.title}</h2>
              </div>
              <div className="space-y-3">
                {category.rules.map((rule, ruleIndex) => (
                  <div key={ruleIndex} className="flex items-start space-x-2">
                    <span className="text-primary font-bold mt-1">{ruleIndex + 1}.</span>
                    <span className="text-muted-foreground">{rule}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <AlertTriangle className="h-6 w-6 text-destructive mr-2" />
            Belangrijke Opmerkingen
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {importantNotes.map((note, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Badge variant="destructive" className="text-xs">!</Badge>
                <span className="text-muted-foreground">{note}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h2 className="text-2xl font-bold mb-4 text-primary">Contact Staff</h2>
          <p className="text-muted-foreground mb-4">
            Heb je vragen over de regels of wil je een overtreding rapporteren?
          </p>
          <div className="space-y-2 text-sm">
            <p><strong>In-game:</strong> /report [speler] [reden]</p>
            <p><strong>Discord:</strong> Maak een ticket aan in #support</p>
            <p><strong>Forum:</strong> Post in de "Vragen & Support" sectie</p>
          </div>
        </Card>
      </div>
    </div>
  );
};