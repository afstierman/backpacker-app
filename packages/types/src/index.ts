export interface Destination {
  id: string;
  city: string;
  country: string;
  dailyCostUSD: number;
  lat: number;
  lng: number;
}

export interface BudgetSearchParams {
  budgetUSD: number;
  durationDays: number;
  region?: string;
}

export interface BudgetSearchResult {
  destination: Destination;
  estimatedTotalCost: number;
  affordabilityScore: number;
}
