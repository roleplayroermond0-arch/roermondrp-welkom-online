import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store as StoreIcon, ExternalLink } from "lucide-react";
import { TEBEX_STORE_URL } from "@/config/store";

interface StoreProps {
  user: any;
  userBalance: number;
}

export const Store = ({ user }: StoreProps) => {

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

      </div>
    </div>
  );
};
