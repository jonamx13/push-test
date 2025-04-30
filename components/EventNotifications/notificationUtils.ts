/**
 * Módulo para manejo de notificaciones push
 * 
 * Funcionalidades:
 * - Configuración inicial
 * - Programación de notificaciones
 * - Manejo de permisos
 * - Limpieza de notificaciones
 */
import * as Notifications from 'expo-notifications';
import { format } from 'date-fns';
import { LocalEvent, NotificationTimeframe } from './types';

/**
 * Configura el manejo de notificaciones en primer plano
 */
export const configureNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

/**
 * Solicita permisos para notificaciones
 * @returns {Promise<boolean>} True si se otorgaron permisos
 */
export const requestNotificationPermissions = async (): Promise<boolean> => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

/**
 * Programa una notificación individual para un evento
 * @param event Evento para notificar
 * @param timeframe Tipo de notificación (24h-antes, 2h-antes, Ahora)
 */
const scheduleSingleNotification = async (
  event: LocalEvent,
  timeframe: NotificationTimeframe
) => {
  const eventDate = new Date(event.date);
  let triggerDate = new Date(eventDate);
  let body = '';

  // Modo prueba (acelera tiempos de notificación)
  const TEST_MODE = true;

  switch (timeframe) {
    case '24h-antes':
      triggerDate.setHours(triggerDate.getHours() - (TEST_MODE ? 0.01 : 24));
      body = `${event.name} es mañana a ${format(eventDate, 'h:mm a')}`;
      break;
    case '2h-antes':
      triggerDate.setHours(triggerDate.getHours() - (TEST_MODE ? 0.005 : 2));
      body = `${event.name} comienza en 2 horas`;
      break;
    case 'Ahora':
      body = `${event.name} está pasando ahora!`;
      break;
  }

  // Añade indicador de validez para carnet si aplica
  if (event.validForCarnet) {
    body += ' (Válido para Carnet)';
  }

  if (triggerDate > new Date()) {
    await Notifications.scheduleNotificationAsync({
      identifier: `${event.id}-${timeframe}`,
      content: {
        title: 'Recordatorio de Evento',
        body,
        data: { eventId: event.id },
      },
      trigger: {
        type: 'date',
        date: triggerDate },
    });

    console.log(`Notificacion agendada para ${event.name} el ${triggerDate}`);
  }
};

/**
 * Elimina notificaciones de eventos pasados
 */
export const cleanPastEventNotifications = async () => {
  const now = new Date();
  const allScheduled = await Notifications.getAllScheduledNotificationsAsync();
  
  const pastNotifications = allScheduled.filter(notif => {
    const trigger = notif.trigger as { type: 'date'; date?: Date };
    return trigger.type === 'date' && trigger.date && trigger.date < now;
  });
  
  await Promise.all(
    pastNotifications.map(notif => 
      Notifications.cancelScheduledNotificationAsync(notif.identifier)
    )
  );
};

/**
 * Programa todas las notificaciones para un evento (24h, 2h y ahora)
 * @param event Evento a notificar
 */
export const scheduleEventNotifications = async (event: LocalEvent) => {
  await cancelEventNotifications(event.id);
  await cleanPastEventNotifications();
  
  // Solo programa si el evento es futuro
  if (new Date(event.date) > new Date()) {
    await Promise.all([
      scheduleSingleNotification(event, '24h-antes'),
      scheduleSingleNotification(event, '2h-antes'),
      scheduleSingleNotification(event, 'Ahora'),
    ]);
  }
};

/**
 * Cancela todas las notificaciones de un evento
 * @param eventId ID del evento
 */
export const cancelEventNotifications = async (eventId: string) => {
  const allScheduled = await Notifications.getAllScheduledNotificationsAsync();
  const toCancel = allScheduled.filter(notif => 
    notif.identifier.startsWith(`${eventId}-`)
  );
  
  await Promise.all(
    toCancel.map(notif => 
      Notifications.cancelScheduledNotificationAsync(notif.identifier)
    )
  );
};