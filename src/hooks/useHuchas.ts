// hooks/useHuchas.ts
import { useEffect, useState } from 'react';
import { Hucha, Movimiento } from '../types/types';
import { fetchHuchas, fetchMovimientos } from '../services/api';

export const useHuchas = (userId: number) => {
  const [huchas, setHuchas] = useState<Hucha[]>([]);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [huchasData, movimientosData] = await Promise.all([
          fetchHuchas(userId),
          fetchMovimientos(userId)
        ]);
        setHuchas(huchasData);
        setMovimientos(movimientosData);
      } catch (err) {
        setError('Failed to load mock data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  // Add these functions for local updates
  const updateHucha = (updatedHucha: Hucha) => {
    setHuchas(prev => prev.map(h => 
      h.hucha_id === updatedHucha.hucha_id ? updatedHucha : h
    ));
  };

  const addMovimiento = (newMovimiento: Movimiento) => {
    setMovimientos(prev => [newMovimiento, ...prev]);
  };

  return { 
    huchas, 
    movimientos, 
    loading, 
    error,
    updateHucha,
    addMovimiento
  };
};