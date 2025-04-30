/**
 * Proveedor de contexto para configurar notificaciones globalmente
 * 
 * Funcionalidades:
 * - Configura el manejo de notificaciones en primer plano
 * - Solicita permisos para notificaciones al montarse
 * - Envuelve la aplicación para proveer funcionalidad de notificaciones
 */

import { useEffect } from 'react';
import { configureNotifications, requestNotificationPermissions } from '../components/EventNotifications';

interface NotificationProviderProps {
  children: React.ReactNode;
}

/**
 * Componente proveedor de notificaciones
 * @param {React.ReactNode} children - Componentes hijos a envolver
 */
export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  useEffect(() => {
    // Configura el manejo de notificaciones
    configureNotifications();
    
    // Solicita permisos al cargar el componente
    requestNotificationPermissions();
  }, []);

  return <>{children}</>;
};