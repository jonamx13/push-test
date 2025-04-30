/**
 * Componente principal que muestra la lista de eventos y maneja la UI
 * 
 * Muestra:
 * - Botón de prueba de notificaciones
 * - Lista de eventos con capacidad de anclar/desanclar
 * - Estados de carga y error
 * - Opción para recargar los eventos
 */
import { FlatList, Pressable, View, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { format, formatDistanceToNow } from 'date-fns';
import { useEvents } from './useEvents';
import { styles } from './styles';
import { LocalEvent } from './types';
import { scheduleEventNotifications } from './notificationUtils'; 

export const EventList = () => {
  // Obtiene estados y funciones del hook useEvents
  const { events, loading, error, lastSync, togglePin, refresh } = useEvents();

  /**
   * Función para probar notificaciones inmediatas
   * Crea un evento de prueba que se activa en 1 segundo
   */
  const testNotification = async () => {
    const testEvent: LocalEvent = {
      id: 'test-' + Date.now(),
      name: 'Evento de prueba',
      date: new Date(Date.now() + 1000).toISOString(), // 1 segundo
      validForCarnet: true,
      pinned: true,
      lastUpdated: new Date().toISOString(),
    };

    await scheduleEventNotifications(testEvent);
    alert('Notificación de prueba te saluda :D')
  }

  return (
    <View style={styles.container}>
      {/* Botón para probar notificaciones */}
      <Pressable style={styles.testButton} onPress={testNotification}>
        <Text style={styles.buttonText}>Probar notificación</Text>
      </Pressable>

      {/* Encabezado con título y última actualización */}
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Events</Text>
        {lastSync && (
          <Text style={styles.syncText}>
            Updated {formatDistanceToNow(new Date(lastSync))} ago
          </Text>
        )}
      </View>

      {/* Mensaje de error con opción para recargar */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.refreshButton} onPress={refresh}>
            <Text style={styles.buttonText}>Retry</Text>
          </Pressable>
        </View>
      )}

      {/* Lista de eventos */}
      <FlatList
        style={{ flex: 1}}
        data={events}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {loading ? 'Cargando eventos...' : 'No hay eventos próximos'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <View style={styles.eventInfo}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventName}>{item.name}</Text>
                {/* Badge para eventos válidos para carnet */}
                {item.validForCarnet && (
                  <View style={styles.carnetBadge}>
                    <Text style={styles.carnetText}>Válido para Carnet</Text>
                  </View>
                )}
              </View>
              <Text style={styles.eventDate}>
                {format(new Date(item.date), 'MMM dd, yyyy - h:mm a')}
              </Text>
              {item.location && (
                <Text style={styles.eventLocation}>{item.location}</Text>
              )}
            </View>
            {/* Botón para anclar/desanclar evento */}
            <Pressable
              onPress={() => togglePin(item)}
              style={[
                styles.pinButton,
                { backgroundColor: item.pinned ? '#ff4444' : '#4CAF50' }
              ]}
            >
              <Text style={styles.buttonText}>
                {item.pinned ? 'Unpin' : 'Pin'}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};