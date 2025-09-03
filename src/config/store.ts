// Store Configuration
// Configure coin packages and their purchase links here

export interface CoinPackage {
  id: number;
  amount: number;
  price: number;
  bonus: number;
  purchaseUrl: string;
}

export const COIN_PACKAGES: CoinPackage[] = [
  {
    id: 1,
    amount: 1000,
    price: 5,
    bonus: 0,
    purchaseUrl: 'https://roermond-roleplay.tebex.io/package/1000-coins'
  },
  {
    id: 2,
    amount: 2500,
    price: 10,
    bonus: 250,
    purchaseUrl: 'https://roermond-roleplay.tebex.io/package/2500-coins'
  },
  {
    id: 3,
    amount: 5000,
    price: 20,
    bonus: 750,
    purchaseUrl: 'https://roermond-roleplay.tebex.io/package/5000-coins'
  },
  {
    id: 4,
    amount: 10000,
    price: 35,
    bonus: 2000,
    purchaseUrl: 'https://roermond-roleplay.tebex.io/package/10000-coins'
  }
];

export const TEBEX_STORE_URL = 'https://roermond-roleplay.tebex.io/';