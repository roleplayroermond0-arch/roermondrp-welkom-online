import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Store as StoreIcon, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { COIN_PACKAGES, TEBEX_STORE_URL } from "@/config/store";

interface StoreProps {
  user: any;
  userBalance: number;
}

export const Store = ({ user }: StoreProps) => {
  const { toast } = useToast();

  const handlePurchaseCoins = (purchaseUrl: string) => {
    // Open the specific purchase URL for this package
    window.open(purchaseUrl, "_blank");
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
            Koop je munten of bezoek onze officiële Tebex store
          </p>

          {/* Tebex Store Button */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Officiële Tebex Store</CardTitle>
              <CardDescription>
                Bezoek onze officiële store voor pakketten en extra opties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                className="w-full"
                onClick={() => window.open(TEBEX_STORE_URL, "_blank")}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Open Tebex Store
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Coin Packages */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Koop Munten</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {COIN_PACKAGES.map((pkg) => (
              <Card
                key={pkg.id}
                className="p-4 text-center hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-center mb-2">
                  <Coins className="h-6 w-6 text-primary mr-1" />
                  <span className="font-bold text-lg">
                    {pkg.amount.toLocaleString()}
                  </span>
                </div>
                {pkg.bonus > 0 && (
                  <Badge variant="secondary" className="mb-2 text-xs">
                    +{pkg.bonus}
                  </Badge>
                )}
                <p className="text-xl font-bold text-primary mb-3">
                  €{pkg.price}
                </p>
                <Button
                  onClick={() => handlePurchaseCoins(pkg.purchaseUrl)}
                  size="sm"
                  className="w-full hover-scale"
                >
                  Koop
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
