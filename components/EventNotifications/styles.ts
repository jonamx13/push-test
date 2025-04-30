/**
 * Hoja de estilos para el componente EventNotifications
 * 
 * Contiene todos los estilos necesarios para:
 * - Tarjetas de eventos
 * - Botones y elementos interactivos
 * - Estados de error y carga
 * - Diseño responsive y adaptable
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1, // Ocupa todo el espacio disponible
    padding: 16, // Espaciado interno general
  },

  // Título principal
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16, // Separación con elementos siguientes
  },

  // Tarjeta de evento individual
  eventCard: {
    width: '100%', // Ancho completo del contenedor padre
    padding: 16, // Espaciado interno generoso
    marginBottom: 12, // Separación entre tarjetas
    backgroundColor: '#f0f0f0', // Fondo gris claro
    borderRadius: 8, // Bordes redondeados
    flexDirection: 'row', // Disposición horizontal
    justifyContent: 'space-between', // Espacio entre elementos
    alignItems: 'center', // Centrado vertical
  },

  // Encabezado de la tarjeta (nombre + badge)
  eventHeader: {
    flexDirection: 'row', // Disposición horizontal
    alignItems: 'center', // Centrado vertical
    flexWrap: 'wrap', // Permite ajuste de línea
    marginBottom: 4, // Separación con fecha
  },

  // Contenedor del badge "Válido para Carnet"
  carnetBadge: {
    marginLeft: 8, // Separación del nombre del evento
  },

  // Texto del badge "Válido para Carnet"
  carnetText: {
    color: '#2196F3', // Azul material
    fontSize: 12,
    fontStyle: 'italic', // Cursiva para diferenciar
  },

  // Nombre del evento
  eventName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4, // Separación con badge
    flexShrink: 1, // Permite que el texto se ajuste
  },

  // Fecha del evento
  eventDate: {
    fontSize: 14,
    color: '#666', // Gris medio
  },

  // Botón de anclar/desanclar
  pinButton: {
    padding: 8,
    borderRadius: 4,
    minWidth: 60, // Ancho mínimo consistente
    alignItems: 'center', // Centrado horizontal
    marginLeft: 8, // Separación del contenido
  },

  // Texto para botones
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  // Encabezado de sección
  header: {
    marginBottom: 16, // Separación con contenido
  },

  // Texto de última actualización
  syncText: {
    fontSize: 12,
    color: '#666', // Gris medio
  },

  // Contenedor de error
  errorContainer: {
    backgroundColor: '#ffebee', // Rojo claro material
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },

  // Texto de error
  errorText: {
    color: '#c62828', // Rojo material
    marginBottom: 8,
  },

  // Botón de recargar
  refreshButton: {
    padding: 8,
    backgroundColor: '#2196F3', // Azul material
    borderRadius: 4,
    alignSelf: 'flex-start', // Alineado a la izquierda
  },

  // Contenedor para estado vacío
  emptyContainer: {
    flex: 1, // Ocupa todo el espacio disponible
    justifyContent: 'center', // Centrado vertical
    alignItems: 'center', // Centrado horizontal
    padding: 32, // Espaciado generoso
  },

  // Texto para estado vacío
  emptyText: {
    color: '#666', // Gris medio
    fontSize: 16,
  },

  // Contenedor de información del evento
  eventInfo: {
    flex: 1, // Ocupa todo el espacio disponible
  },

  // Ubicación del evento
  eventLocation: {
    fontSize: 14,
    color: '#666', // Gris medio
    marginTop: 4, // Separación con fecha
  },

  // Botón de prueba
  testButton: {
    padding: 12,
    backgroundColor: '#FF9800', // Naranja material
    borderRadius: 4,
    marginVertical: 8, // Margen vertical
    alignItems: 'center',
    width: '100%', // Ancho completo
  },
});