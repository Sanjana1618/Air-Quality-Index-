import axios from 'axios';
import type { ForecastApiResponse } from '../types';

const apiBaseUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:8123' : '');

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
});

export async function getCitySupport() {
  const response = await api.get('/city-support');
  return response.data;
}

export async function getModelStatus() {
  const response = await api.get('/model-status');
  return response.data;
}

export async function submitForecast(history: number[], city = 'Delhi') {
  const response = await api.post<ForecastApiResponse>('/forecast', { city, history });
  return response.data;
}
