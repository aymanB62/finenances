// services/api.ts
import { Hucha, Movimiento } from '../types/types';

// Mock Data matching your database schema
const mockHuchas: Hucha[] = [
  {
    hucha_id: 1,
    user_id: 1,
    name: "Emergency Fund",
    meta: 5000,
    saldo_actual: 1500,
    completa: false,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    hucha_id: 2,
    user_id: 1,
    name: "Vacation Fund",
    meta: 2000,
    saldo_actual: 300,
    completa: false,
    created_at: "2024-02-01T00:00:00Z"
  }
];

const mockMovimientos: Movimiento[] = [
  {
    transaction_id: 1,
    hucha_id: 1,
    cantidad: 500,
    fecha: "2024-03-01T14:30:00Z"
  },
  {
    transaction_id: 2,
    hucha_id: 2,
    cantidad: 200,
    fecha: "2024-03-05T09:15:00Z"
  }
];

// Simulated API calls
export const fetchHuchas = async (userId: number): Promise<Hucha[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
  return mockHuchas.filter(h => h.user_id === userId);
};

export const fetchMovimientos = async (userId: number): Promise<Movimiento[]> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
  return mockMovimientos.filter(m => 
    mockHuchas.some(h => h.hucha_id === m.hucha_id && h.user_id === userId)
  );
};