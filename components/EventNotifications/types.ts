/**
 * Definiciones de tipos para el sistema de eventos y notificaciones
 */

/**
 * Interfaz base para eventos de la aplicación
 * @property {string} id - Identificador único del evento
 * @property {string} name - Nombre del evento
 * @property {string} date - Fecha en formato ISO
 * @property {string} [description] - Descripción opcional del evento
 * @property {string} [location] - Ubicación opcional del evento
 * @property {boolean} validForCarnet - Indica si el evento es válido para carnet
 */
export interface AppEvent {
    id: string;
    name: string;
    // formato ISO de fechas
    date: string;
    description?: string;
    location?: string;
    validForCarnet: boolean;
}

/**
 * Interfaz para eventos almacenados localmente
 * Extiende AppEvent con propiedades adicionales para manejo local
 * @property {boolean} pinned - Indica si el evento está anclado/guardado
 * @property {string} lastUpdated - Fecha de última actualización en formato ISO
 */
export interface LocalEvent extends AppEvent {
    pinned: boolean;
    lastUpdated: string; // string ISO
}

/**
 * Tipos de notificaciones programadas
 * - '24h-antes': Notificación 24 horas antes del evento
 * - '2h-antes': Notificación 2 horas antes del evento
 * - 'Ahora': Notificación al momento del evento
 */
export type NotificationTimeframe = '24h-antes' | '2h-antes' | 'Ahora';