export interface WeatherData {
  id: number;
  name: string;
  country: string;
  temperature: number;
  condition: string;
  icon: string;
  searchedAt: Date;
}
