import { Card } from "@/components/ui/card";
import { Users, Clock, Shield, Heart } from "lucide-react";

export const Info = () => {
  const features = [
    {
      icon: Users,
      title: "Community Roleplay",
      description: "Word onderdeel van een hechte Nederlandse FiveM community waar roleplay centraal staat."
    },
    {
      icon: Clock,
      title: "24/7 Beschikbaar",
      description: "Onze server is altijd online, zodat je op elk moment van de dag kunt genieten van roleplay."
    },
    {
      icon: Shield,
      title: "Professionele Staff",
      description: "Ervaren moderators zorgen voor een eerlijke en veilige omgeving voor alle spelers."
    },
    {
      icon: Heart,
      title: "Realistische Ervaring",
      description: "Beleef het echte leven in GTA V met realistische jobs, economie en interacties."
    }
  ];

  const jobs = [
    "Politie", "Ambulance", "ANWB", "Taxi", "Mechaniker", 
    "Advocaat", "Rechter", "Ondernemer", "Crimineel", "Burger"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-6">Over Roermond Roleplay</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            RoermondRP is een Nederlandse FiveM roleplay server waar realisme en community centraal staan. 
            Wij bieden een unieke en uitgebreide roleplay ervaring voor spelers van alle niveaus.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4">
                <feature.icon className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Wat is Roleplay?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Roleplay betekent dat je een karakter speelt in een virtuele wereld. 
                Je creëert een achtergrondverhaal, kiest een beroep, en interacteert met andere spelers 
                alsof je echt in die wereld leeft.
              </p>
              <p>
                Bij RoermondRP nemen we roleplay serieus. We verwachten van alle spelers dat ze 
                hun karakter consistent spelen en realistische beslissingen maken.
              </p>
              <p>
                Of je nu politieagent, crimineel, ondernemer of gewoon een burger wilt zijn - 
                er zijn eindeloze mogelijkheden om je eigen verhaal te schrijven.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Beschikbare Jobs</h2>
            <div className="grid grid-cols-2 gap-2">
              {jobs.map((job, index) => (
                <div key={index} className="bg-muted px-3 py-2 rounded-md text-center">
                  {job}
                </div>
              ))}
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              Solliciteer via de Sollicitaties pagina voor officiële functies zoals Politie, Ambulance en ANWB.
            </p>
          </Card>
        </div>

        <Card className="p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Onze Missie</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
            "Wij streven ernaar om de beste Nederlandse FiveM roleplay ervaring te bieden, 
            waar elke speler zich welkom voelt en de kans krijgt om deel uit te maken van 
            meeslepende verhalen in een realistische omgeving."
          </p>
        </Card>
      </div>
    </div>
  );
};