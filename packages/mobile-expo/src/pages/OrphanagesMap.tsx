import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import mapMarker from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();
  const handleShowOrphanage = useCallback((id: number) => {
    navigation.navigate('OrphanageDetails', { id });
  }, []);

  const handleCreateOrphanage = useCallback(() => {
    navigation.navigate('SelectMapPosition');
  }, []);

  const mapRegion = useMemo(() => ({
    latitude: -20.9985538,
    longitude: -47.655361,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  }), []);

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    api.get('orphanages').then(({ data }) => setOrphanages(data));
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={mapRegion}
        provider={PROVIDER_GOOGLE}
      >
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={mapMarker}
            coordinate={orphanage}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
          >
            <Callout tooltip onPress={() => handleShowOrphanage(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}

export default OrphanagesMap;
