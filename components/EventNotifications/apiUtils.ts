/**
 * Utilidades para manejo de API y sincronización
 * 
 * Contiene:
 * - Conexión con API real (TODO)
 * - Mock de API para desarrollo
 * - Lógica de sincronización entre datos locales y remotos
 */
import { LocalEvent, AppEvent } from "./types";
import { fetchMockEvents } from "./mockApi";

const API_BASE_URL = 'https://apidelauach.com/eventos'; // Endpoint real (TODO implementar)

/**
 * TODO: Implementar conexión con API real
 * Actualmente usando mock para desarrollo
 */
export const fetchEventsFromAPI = async (): Promise<AppEvent[]> => {
    return fetchMockEvents();
}

/**
 * Sincroniza eventos locales con los de API
 * @param localEvents Eventos almacenados localmente
 * @param apiEvents Eventos obtenidos de API
 * @returns {Promise<LocalEvent[]>} Lista sincronizada de eventos
 */
export const syncEvents = async (
    localEvents: LocalEvent[],
    apiEvents: AppEvent[]
  ): Promise<LocalEvent[]> => {
    const now = new Date().toISOString();
    
    // 1. Mapea eventos de API a LocalEvent (formato con pinned)
    const apiEventMap = new Map<string, LocalEvent>();
    apiEvents.forEach(apiEvent => {
      apiEventMap.set(apiEvent.id, {
        ...apiEvent,
        pinned: false, // Valor por defecto
        lastUpdated: now
      });
    });
  
    // 2. Conserva estado 'pinned' de eventos locales
    localEvents.forEach(localEvent => {
      if (apiEventMap.has(localEvent.id)) {
        apiEventMap.set(localEvent.id, {
          ...apiEventMap.get(localEvent.id)!,
          pinned: localEvent.pinned,
          lastUpdated: now
        });
      }
    });
  
    // 3. Filtra solo eventos futuros
    return Array.from(apiEventMap.values()).filter(event => {
      return new Date(event.date) > new Date();
    });
};