import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Car, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      { id: 1, name: "Audi RS6", price: 2500, image: "🚗", category: "Luxury" },
      { id: 2, name: "BMW M5", price: 2200, image: "🚙", category: "Luxury" },
      { id: 3, name: "Mercedes AMG GT", price: 3000, image: "🏎️", category: "Sports" },
      { id: 4, name: "Tesla Model S", price: 2800, image: "⚡", category: "Electric" },
    ],
    items: [
      { id: 5, name: "Step", price: 150, image: "🛴", category: "Transport" },
      { id: 6, name: "Gouden Horloge", price: 500, image: "⌚", category: "Accessoires" },
      { id: 7, name: "Designer Pak", price: 300, image: "🤵", category: "Kleding" },
      { id: 8, name: "VIP Status (30 dagen)", price: 1000, image: "👑", category: "Premium" },
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">RoermondRP Store</h1>
          {user && (
            <div className="flex items-center gap-2 text-lg">
              <Coins className="h-5 w-5 text-primary" />
              <span className="font-semibold">{userBalance} munten</span>
            </div>
          )}
        </div>

        {/* Coin Packages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Koop Munten</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {coinPackages.map((pkg) => (
              <Card key={pkg.id} className="p-6 text-center">
                <Coins className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{pkg.amount.toLocaleString()} Munten</h3>
                {pkg.bonus > 0 && (
                  <Badge variant="secondary" className="mb-2">
                    +{pkg.bonus} Bonus!
                  </Badge>
                )}
                <p className="text-2xl font-bold text-primary mb-4">€{pkg.price}</p>
                <Button 
                  onClick={() => handlePurchaseCoins(pkg)}
                  className="w-full"
                >
                  Koop Nu
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

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {storeItems[selectedCategory as keyof typeof storeItems].map((item) => (
              <Card key={item.id} className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">{item.image}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Coins className="h-4 w-4 text-primary" />
                    <span className="font-bold">{item.price}</span>
                  </div>
                  <Button 
                    onClick={() => handlePurchaseItem(item)}
                    className="w-full"
                    disabled={!user || userBalance < item.price}
                  >
                    {!user ? 'Login Vereist' : userBalance < item.price ? 'Onvoldoende Munten' : 'Koop'}
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