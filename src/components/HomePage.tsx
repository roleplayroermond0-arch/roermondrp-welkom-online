import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingCart, MessageCircle } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-foreground mb-6">
            Welkom bij <span className="text-primary">Roermond Roleplay</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Ervaar de meest realistische roleplay ervaring in FiveM. 
            Word onderdeel van onze gemeenschap en beleef jouw eigen verhaal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-card p-8 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="text-center">
              <ExternalLink className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Join Game</h3>
              <p className="text-muted-foreground mb-6">
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

          <div className="bg-card p-8 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="text-center">
              <ShoppingCart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Store</h3>
              <p className="text-muted-foreground mb-6">
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

          <div className="bg-card p-8 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Discord</h3>
              <p className="text-muted-foreground mb-6">
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

        <div className="mt-16 text-center">
          <div className="bg-card p-8 rounded-lg border border-border max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Waarom RoermondRP?</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div>
                <h4 className="font-semibold text-primary mb-2">Realistische Roleplay</h4>
                <p className="text-sm text-muted-foreground">
                  Ervaar het echte leven in een virtuele wereld met realistische jobs en interacties.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Actieve Community</h4>
                <p className="text-sm text-muted-foreground">
                  Word onderdeel van een vriendelijke en actieve Nederlandse community.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Professioneel Beheer</h4>
                <p className="text-sm text-muted-foreground">
                  Ervaren staff zorgt voor een eerlijke en leuke spelervaring voor iedereen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};