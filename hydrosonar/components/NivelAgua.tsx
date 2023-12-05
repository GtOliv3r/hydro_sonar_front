import React from 'react';
import { View, Image, Text, StyleSheet, Platform } from 'react-native';

interface NivelAguaProps {
  percentagem: number;
  litrosRestantes: number;
}

const NivelAgua: React.FC<NivelAguaProps> = ({ percentagem, litrosRestantes }) => {
    percentagem = parseFloat(percentagem.toFixed(0)); // Ajuste para mostrar 2 casas decimais
    litrosRestantes = parseFloat(litrosRestantes.toFixed(2)); // Ajuste para mostrar 2 casas decimais
  
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
          <Text style={styles.litrosRestantes}>{litrosRestantes} Litros restantes</Text>
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
    color: 'blue',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 170,
    height: 64,
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
    color: 'blue',
  },
  texts: {
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default NivelAgua;
