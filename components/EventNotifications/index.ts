/**
 * Punto de entrada principal para el módulo de EventNotifications
 * 
 * Exporta:
 * - Componente principal EventList
 * - Funciones de utilidad para notificaciones
 * - Tipos de datos relacionados
 */

export { EventList } from './EventList';
export { configureNotifications, requestNotificationPermissions } from './notificationUtils';
export type { AppEvent, LocalEvent } from './types';