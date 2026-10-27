export type ForecastApiResponse = {
  city: string;
  model: string;
  history_length: number;
  forecast_horizon_days: number;
  predictions: number[];
};

export type CityCard = {
  name: string;
  status: 'Operational' | 'Preview';
  range: string;
  description: string;
};
