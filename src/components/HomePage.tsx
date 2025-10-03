import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, ShoppingCart, MessageCircle, Users, Clock, Shield, Heart } from "lucide-react";

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

export const HomePage = ({ setActiveTab }: HomePageProps) => {
  const handleJoinGame = () => {
    window.open('https://cfx.re/join/arj7ez', '_blank');
  };

  const handleDiscord = () => {
    window.open('https://discord.gg/roermondrp', '_blank');
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
    "Politie", "Ambulance", "Brandweer (Soon)", "KMAR", "Taxi", "Wegenwacht", "Tuinier",
    "Elektricien", "Kledingmaker", "Loodgieter", "Vuilnisman", "Duiker", "Cryptoloods Eigenaar", "Advocaat", "Crimineel", "Burger"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4 py-8 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 md:mb-8">
            Welkom bij <span className="text-primary">Roermond Roleplay</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-16 max-w-4xl mx-auto px-2">
            Ervaar de meest realistische roleplay ervaring in FiveM. 
            Word onderdeel van onze gemeenschap en beleef jouw eigen verhaal in een professionele Nederlandse omgeving.
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto mb-12 md:mb-20">
          <div className="bg-card p-6 md:p-10 rounded-xl border border-border hover:border-primary transition-colors group">
            <div className="text-center">
              <ExternalLink className="h-12 w-12 md:h-16 md:w-16 text-primary mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-6">Join Game</h3>
              <p className="text-muted-foreground mb-4 md:mb-8 text-sm md:text-lg">
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

          <div className="bg-card p-6 md:p-10 rounded-xl border border-border hover:border-primary transition-colors group">
  <div className="text-center">
    <ShoppingCart className="h-12 w-12 md:h-16 md:w-16 text-primary mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform" />
    <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-6">Store</h3>
    <p className="text-muted-foreground mb-4 md:mb-8 text-sm md:text-lg">
      Koop munten en upgrade je roleplay ervaring met premium items.
    </p>
    <a 
      href="https://roermond-roleplay.tebex.io/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-full block"
    >
      <Button 
        className="w-full"
        size="lg"
      >
        Naar Store
      </Button>
    </a>
  </div>
</div>


          <div className="bg-card p-6 md:p-10 rounded-xl border border-border hover:border-primary transition-colors group sm:col-span-2 md:col-span-1">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 md:h-16 md:w-16 text-primary mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-6">Discord</h3>
              <p className="text-muted-foreground mb-4 md:mb-8 text-sm md:text-lg">
                Join onze Discord community voor support en de nieuwste updates.
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
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Over Roermond Roleplay</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto px-2">
              RoermondRP is een Nederlandse FiveM roleplay server waar realisme en community centraal staan. 
              Wij bieden een unieke en uitgebreide roleplay ervaring voor spelers van alle niveaus.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="p-4 md:p-8 hover:border-primary transition-colors">
                <div className="flex items-start space-x-3 md:space-x-6">
                  <feature.icon className="h-8 w-8 md:h-12 md:w-12 text-primary mt-1 md:mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-lg">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* What is Roleplay & Jobs Section */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-16">
          <Card className="p-4 md:p-8">
            <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Wat is Roleplay?</h2>
            <div className="space-y-3 md:space-y-6 text-muted-foreground text-sm md:text-lg">
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

          <Card className="p-4 md:p-8">
            <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Beschikbare Jobs</h2>
            <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
              {jobs.map((job, index) => (
                <div key={index} className="bg-muted px-2 md:px-4 py-2 md:py-3 rounded-md text-center font-medium text-xs md:text-base">
                  {job}
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-xs md:text-sm">
              Solliciteer via de Sollicitaties pagina voor officiële functies zoals Politie, Ambulance en ANWB.
            </p>
          </Card>
        </div>

        {/* Mission Statement */}
        <Card className="p-6 md:p-12 bg-primary/5 border-primary/20">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center text-primary">Onze Missie</h2>
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
            "Wij streven ernaar om de beste Nederlandse FiveM roleplay ervaring te bieden, 
            waar elke speler zich welkom voelt en de kans krijgt om deel uit te maken van 
            meeslepende verhalen in een realistische omgeving."
          </p>
        </Card>
      </div>
    </div>
  );
};