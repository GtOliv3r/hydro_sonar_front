import React from 'react';
import { View, Image, Text, StyleSheet, Platform } from 'react-native';

interface NivelAguaProps {
  percentagem: number;
  litrosRestantes: number;
}

const NivelAgua: React.FC<NivelAguaProps> = ({ percentagem, litrosRestantes }) => {
  return (
    <View style={styles.card}>
      {/* Título "Nível de Água" */}
      <Text style={styles.title}>Nível de Água</Text>

      {/* Conteúdo Centralizado: Ícone, Porcentagem e Litros Restantes */}
      <View style={styles.content}>
        {/* Ícone do Caminhão */}
        <Image source={require('../assets/images/caminhao.png')} style={styles.icon} />

        <View style={styles.texts}>
          {/* Porcentagem no Centro */}
          <Text style={styles.percentagem}>{percentagem}%</Text>

          {/* Litros Restantes na Parte Direita */}
          <Text style={styles.litrosRestantes}>{litrosRestantes} Litros restante</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
    margin: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 200,
    height: 75,
    marginRight: 10,
  },
  percentagem: {
    fontSize: 55,
    fontWeight: 'bold',
    color: 'blue', // Cor da porcentagem, ajuste conforme necessário
  },
  litrosRestantes: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  texts: {
    alignItems: 'center',
  },
});

export default NivelAgua;
