import React, { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';

interface Position {
  latitude: number;
  longitude: number;
}

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState<Position>();

  const handleNextStep = useCallback(() => {
    navigation.navigate('OrphanageData', { ...position });
  }, []);

  const handleSelectMapPosition = useCallback((event: MapEvent) => {
    setPosition(event.nativeEvent.coordinate);
  }, []);

  const mapRegion = useMemo(() => ({
    latitude: -20.9985538,
    longitude: -47.655361,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  }), []);

  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={mapRegion}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position ? (
          <Marker 
            icon={mapMarkerImg}
            coordinate={position}
          />
        ) : null}
      </MapView>

      {position ? (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})