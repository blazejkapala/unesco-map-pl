export interface HeritageSite {
  nazwa: string;
  miejscowosc: string;
  ulica?: string;
  nrAdresowy?: string;
  wojewodztwo: string;
  numerWpisu: string;
  dataWpisu: string;
  n: string; // latitude
  e: string; // longitude
}

export interface HeritageSiteWithCoords extends HeritageSite {
  lat: number;
  lng: number;
  hasValidCoords: boolean;
} 