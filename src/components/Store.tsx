import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Car, Package, Store as StoreIcon, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import audiRs6 from "@/assets/audi-rs6.jpg";
import bmwM5 from "@/assets/bmw-m5.jpg";
import mercedesAmg from "@/assets/mercedes-amg.jpg";
import teslaModelS from "@/assets/tesla-models.jpg";
import stepScooter from "@/assets/step-scooter.jpg";
import goldenWatch from "@/assets/golden-watch.jpg";
import designerSuit from "@/assets/designer-suit.jpg";
import vipCrown from "@/assets/vip-crown.jpg";

interface StoreProps {
  user: any;
  userBalance: number;
}

export const Store = ({ user, userBalance }: StoreProps) => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('vehicles');

  const coinPackages = [
    { id: 1, amount: 1000, price: 5, bonus: 0 },
    { id: 2, amount: 2500, price: 10, bonus: 250 },
    { id: 3, amount: 5000, price: 20, bonus: 750 },
    { id: 4, amount: 10000, price: 35, bonus: 2000 },
  ];

  const storeItems = {
    vehicles: [
      { id: 1, name: "Audi RS6", price: 2500, image: audiRs6, category: "Luxury" },
      { id: 2, name: "BMW M5", price: 2200, image: bmwM5, category: "Luxury" },
      { id: 3, name: "Mercedes AMG GT", price: 3000, image: mercedesAmg, category: "Sports" },
      { id: 4, name: "Tesla Model S", price: 2800, image: teslaModelS, category: "Electric" },
    ],
    items: [
      { id: 5, name: "Step", price: 150, image: stepScooter, category: "Transport" },
      { id: 6, name: "Gouden Horloge", price: 500, image: goldenWatch, category: "Accessoires" },
      { id: 7, name: "Designer Pak", price: 300, image: designerSuit, category: "Kleding" },
      { id: 8, name: "VIP Status (30 dagen)", price: 1000, image: vipCrown, category: "Premium" },
    ]
  };

  const handlePurchaseCoins = (packageItem: any) => {
    if (!user) {
      toast({
        title: "Inloggen vereist",
        description: "Je moet ingelogd zijn om munten te kopen.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would integrate with your payment system (Stripe)
    toast({
      title: "Betaling wordt verwerkt",
      description: `${packageItem.amount + packageItem.bonus} munten worden toegevoegd na betaling.`,
    });
  };

  const handlePurchaseItem = (item: any) => {
    if (!user) {
      toast({
        title: "Inloggen vereist",
        description: "Je moet ingelogd zijn om items te kopen.",
        variant: "destructive",
      });
      return;
    }

    if (userBalance < item.price) {
      toast({
        title: "Onvoldoende munten",
        description: "Je hebt niet genoeg munten voor dit item.",
        variant: "destructive",
      });
      return;
    }

    // Here you would process the purchase
    toast({
      title: "Aankoop succesvol",
      description: `Je hebt ${item.name} gekocht voor ${item.price} munten.`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <StoreIcon className="h-8 w-8" />
            RoermondRP Store
          </h1>
          <p className="text-muted-foreground mb-6">
            Ontdek alle beschikbare pakketten en items voor RoermondRP
          </p>
          
          {/* Tebex Store Button */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Officiële Tebex Store</CardTitle>
              <CardDescription>
                Bezoek onze officiële store voor alle beschikbare pakketten, voertuigen en items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg"
                className="w-full"
                onClick={() => window.open('https://tebex.io/roermondRP', '_blank')}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Open Tebex Store
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Coin Packages - Compact Design */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Koop Munten</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {coinPackages.map((pkg) => (
              <Card key={pkg.id} className="p-4 text-center hover:border-primary transition-colors">
                <div className="flex items-center justify-center mb-2">
                  <Coins className="h-6 w-6 text-primary mr-1" />
                  <span className="font-bold text-lg">{pkg.amount.toLocaleString()}</span>
                </div>
                {pkg.bonus > 0 && (
                  <Badge variant="secondary" className="mb-2 text-xs">
                    +{pkg.bonus}
                  </Badge>
                )}
                <p className="text-xl font-bold text-primary mb-3">€{pkg.price}</p>
                <Button 
                  onClick={() => window.open('https://roermondrp.tebex.io/', '_blank')}
                  size="sm"
                  className="w-full hover-scale"
                >
                  Koop
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Store Items */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Store Items</h2>
          
          <div className="flex gap-4 mb-6">
            <Button
              variant={selectedCategory === 'vehicles' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('vehicles')}
            >
              <Car className="h-4 w-4 mr-2" />
              Voertuigen
            </Button>
            <Button
              variant={selectedCategory === 'items' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('items')}
            >
              <Package className="h-4 w-4 mr-2" />
              Items
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeItems[selectedCategory as keyof typeof storeItems].map((item, index) => (
              <Card key={item.id} className="p-6 hover:border-primary transition-colors hover-scale animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <Badge variant="secondary" className="mb-3">{item.category}</Badge>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Coins className="h-5 w-5 text-primary" />
                    <span className="font-bold text-lg">{item.price}</span>
                  </div>
                  <Button 
                    onClick={() => handlePurchaseItem(item)}
                    className="w-full"
                    size="lg"
                    disabled={!user || userBalance < item.price}
                  >
                    {!user ? 'Login Vereist' : userBalance < item.price ? 'Onvoldoende Munten' : 'Koop Nu'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};