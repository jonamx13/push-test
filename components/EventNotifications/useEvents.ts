/**
 * Hook personalizado para manejar la lógica de eventos
 * 
 * Funcionalidades:
 * - Sincronización con API
 * - Almacenamiento local
 * - Gestión de estados (loading, error)
 * - Anclaje/desanclaje de eventos
 */
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalEvent, AppEvent } from './types';
import { scheduleEventNotifications, cancelEventNotifications } from './notificationUtils';
import { fetchEventsFromAPI, syncEvents } from './apiUtils';

const STORAGE_KEY = 'pinned_events';

export const useEvents = () => {
  // Estados del hook
  const [events, setEvents] = useState<LocalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carga eventos desde AsyncStorage
   * @returns {Promise<LocalEvent[]>} Lista de eventos almacenados localmente
   */
  const loadLocalEvents = async (): Promise<LocalEvent[]> => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load events', error);
      return [];
    }
  };

  /**
   * Sincroniza eventos locales con la API
   * - Carga eventos locales
   * - Obtiene eventos de API
   * - Combina y actualiza el estado
   */
  const syncWithAPI = async () => {
    try {
      setLoading(true);
      const localEvents = await loadLocalEvents();
      console.log('Eventos locales:', localEvents);
      
      const apiEvents = await fetchEventsFromAPI();
      console.log('Eventos de API:', apiEvents);
      
      const syncedEvents = await syncEvents(localEvents, apiEvents);
      console.log('Eventos sincronizados:', syncedEvents);
      
      setEvents(syncedEvents);
      setLastSync(new Date().toISOString());
      setError(null);
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(syncedEvents));
      
      // Reprograma notificaciones para eventos anclados
      await Promise.all(
        syncedEvents
          .filter(event => event.pinned)
          .map(event => scheduleEventNotifications(event))
      );
    } catch (error) {
      console.error('Error en sync:', error);
      setError('Error al sincronizar');
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial y sincronización periódica
  useEffect(() => {
    syncWithAPI();
    
    // Sincroniza cada 5 minutos mientras la app está activa
    const interval = setInterval(syncWithAPI, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Alterna el estado anclado/desanclado de un evento
   * @param {LocalEvent} event Evento a anclar/desanclar
   */
  const togglePin = async (event: LocalEvent) => {
    const updatedEvents = events.map(e => 
      e.id === event.id ? { ...e, pinned: !e.pinned } : e
    );
    setEvents(updatedEvents);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));

    if (!event.pinned) {
      await scheduleEventNotifications(event);
    } else {
      await cancelEventNotifications(event.id);
    }
  };

  return {
    events,
    loading,
    error,
    lastSync,
    togglePin,
    refresh: syncWithAPI,
  };
};