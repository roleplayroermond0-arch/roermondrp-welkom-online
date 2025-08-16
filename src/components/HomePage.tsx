import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, ShoppingCart, MessageCircle, Users, Clock, Shield, Heart } from "lucide-react";

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

export const HomePage = ({ setActiveTab }: HomePageProps) => {
  const handleJoinGame = () => {
    window.open('fivem://connect/your-server-ip', '_blank');
  };

  const handleDiscord = () => {
    window.open('https://discord.gg/your-discord', '_blank');
  };

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
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-7xl font-bold text-foreground mb-8">
            Welkom bij <span className="text-primary">Roermond Roleplay</span>
          </h1>
          <p className="text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto">
            Ervaar de meest realistische roleplay ervaring in FiveM. 
            Word onderdeel van onze gemeenschap en beleef jouw eigen verhaal in een professionele Nederlandse omgeving.
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          <div className="bg-card p-10 rounded-xl border border-border hover:border-primary transition-colors group">
            <div className="text-center">
              <ExternalLink className="h-16 w-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-6">Join Game</h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Verbind direct met onze server en begin je roleplay avontuur.
              </p>
              <Button 
                onClick={handleJoinGame}
                className="w-full"
                size="lg"
              >
                Speel Nu
              </Button>
            </div>
          </div>

          <div className="bg-card p-10 rounded-xl border border-border hover:border-primary transition-colors group">
            <div className="text-center">
              <ShoppingCart className="h-16 w-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-6">Store</h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Koop munten en upgrade je roleplay ervaring met premium items.
              </p>
              <Button 
                onClick={() => setActiveTab('store')}
                className="w-full"
                size="lg"
              >
                Naar Store
              </Button>
            </div>
          </div>

          <div className="bg-card p-10 rounded-xl border border-border hover:border-primary transition-colors group">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-6">Discord</h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Join onze Discord community voor support en updates.
              </p>
              <Button 
                onClick={handleDiscord}
                className="w-full"
                size="lg"
              >
                Join Discord
              </Button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6">Over Roermond Roleplay</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              RoermondRP is een Nederlandse FiveM roleplay server waar realisme en community centraal staan. 
              Wij bieden een unieke en uitgebreide roleplay ervaring voor spelers van alle niveaus.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:border-primary transition-colors">
                <div className="flex items-start space-x-6">
                  <feature.icon className="h-12 w-12 text-primary mt-2" />
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground text-lg">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* What is Roleplay & Jobs Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6">Wat is Roleplay?</h2>
            <div className="space-y-6 text-muted-foreground text-lg">
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

          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6">Beschikbare Jobs</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {jobs.map((job, index) => (
                <div key={index} className="bg-muted px-4 py-3 rounded-md text-center font-medium">
                  {job}
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Solliciteer via de Sollicitaties pagina voor officiële functies zoals Politie, Ambulance en ANWB.
            </p>
          </Card>
        </div>

        {/* Mission Statement */}
        <Card className="p-12 bg-primary/5 border-primary/20">
          <h2 className="text-4xl font-bold mb-6 text-center text-primary">Onze Missie</h2>
          <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
            "Wij streven ernaar om de beste Nederlandse FiveM roleplay ervaring te bieden, 
            waar elke speler zich welkom voelt en de kans krijgt om deel uit te maken van 
            meeslepende verhalen in een realistische omgeving."
          </p>
        </Card>
      </div>
    </div>
  );
};