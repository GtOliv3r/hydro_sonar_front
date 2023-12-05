// src/screens/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import BoxInfo from '../../components/AlertBox';
import NivelAgua from '../../components/NivelAgua';
import EstadoValvula from '../../components/EstadoValvula';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <NivelAgua percentagem={60} litrosRestantes={10} />
      <EstadoValvula estado={false} />
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

export default HomeScreen;