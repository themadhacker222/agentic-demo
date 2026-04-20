export interface Member {
  id: number;
  name: string;
  email: string;
  country: string;
}

export interface TravelItem {
  id: number;
  memberId: number;
  category: string;      // e.g. "Hotel", "Flight", "Activity"
  title: string;         // name of the travel product
  score: number;         // e.g. 0‑1 score based on popularity
  categoryOrder: number; // used to order categories when sorting
}

export interface PartnerConfig {
  partnerId: number;
  name: string;
  // key = category name, value = { max: #, exclusions: string[] }
  caps: Record<string, { max: number; exclusions: string[] }>;
}