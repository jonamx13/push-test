/**
 * Mock de API para desarrollo que simula la obtención de eventos
 * 
 * Genera eventos de prueba con diferentes tiempos para probar:
 * - Notificación inmediata (3 segundos)
 * - Notificación "2h antes" (6 segundos)
 * - Notificación "24h antes" (9 segundos)
 * - Eventos normales con fechas aleatorias
 */

import { AppEvent } from './types';

/**
 * Genera una fecha futura en minutos a partir de ahora
 * @param {number} minutes - Minutos a agregar a la fecha actual
 * @returns {string} Fecha en formato ISO
 */
const minutesToFutureDate = (minutes: number) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
};

/**
 * Genera una fecha futura en horas a partir de ahora
 * @param {number} hours - Horas a agregar a la fecha actual
 * @returns {string} Fecha en formato ISO
 */
const hoursToFutureDate = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date.toISOString();
};

/**
 * Genera una fecha futura en días a partir de ahora
 * @param {number} days - Días a agregar a la fecha actual
 * @returns {string} Fecha en formato ISO
 */
const daysToFutureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

/**
 * Obtiene eventos mockeados para desarrollo
 * @returns {Promise<AppEvent[]>} Lista de eventos de prueba
 */
export const fetchMockEvents = async (): Promise<AppEvent[]> => {
    // Simula retraso de red
    await new Promise(resolve => setTimeout(resolve, 300));
  
    // Evento para notificación "Ahora" (3 segundos)
    const eventNow: AppEvent = {
      id: 'event-now',
      name: '[PRUEBA] Evento YA',
      date: new Date(Date.now() + 3000).toISOString(),
      description: 'Notificación "Ahora" en 3 segundos',
      validForCarnet: true, // Siempre válido para carnet
    };
  
    // Evento para notificación "2h antes" (6 segundos)
    const event2hBefore: AppEvent = {
      id: 'event-2h',
      name: '[PRUEBA] Evento en 2 Horas',
      date: new Date(Date.now() + 6000).toISOString(),
      description: 'Notificación "2h antes" en 6 segundos',
      validForCarnet: true,
    };
  
    // Evento para notificación "24h antes" (9 segundos)
    const event24hBefore: AppEvent = {
      id: 'event-24h',
      name: '[PRUEBA] Evento Mañana',
      date: new Date(Date.now() + 9000).toISOString(),
      description: 'Notificación "24h antes" en 9 segundos',
      validForCarnet: true,
    };

    // Eventos normales de ejemplo
    const sampleEvents: AppEvent[] = [
      {
        id: '4',
        name: 'Concierto de OSUACH',
        date: daysToFutureDate(7),
        location: 'Teatro Principal',
        validForCarnet: Math.random() > 0.5, // Aleatorio
      },
      {
        id: '5',
        name: 'Exposición Bellas Artes',
        date: daysToFutureDate(14),
        description: 'Obras de artistas locales',
        validForCarnet: Math.random() > 0.5, // Aleatorio
      }
    ];
  
    return [eventNow, event2hBefore, event24hBefore, ...sampleEvents];
};