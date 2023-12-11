import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

interface EstadoValvulaProps {
  estado: boolean;
}

const EstadoValvula: React.FC<EstadoValvulaProps> = ({ estado }) => {
  // Lógica para determinar a cor das bolas com base no estado da válvula
  const bolaVerdeStyle = estado ? styles.bolaVerdeAcesa : styles.bolaVerdeApagada;
  const bolaVermelhaStyle = estado ? styles.bolaVermeApagada : styles.bolaVermeAcesa;

  return (
    <View style={styles.container}>
      {/* Título "Estado da Válvula" */}
      <Text style={styles.title}>Estado da Válvula</Text>

      {/* Conteúdo Centralizado: Imagem, ON, OFF e Bolas */}
      <View style={styles.content}>
        {/* Imagem da Válvula */}
        <Image source={require('../assets/images/valvula.png')} style={styles.image} />
        <View style={styles.direita}>
          <View style={styles.on}>
            <Text style={styles.estadoText}>ON</Text>
            <View style={[styles.bola, bolaVerdeStyle]} />
          </View>
          
          <View style={styles.off}>
            {/* Texto "OFF" */}
            <Text style={styles.estadoText}>OFF</Text>

            {/* Bola Vermelha (representando estado OFF) */}
            <View style={[styles.bola, bolaVermelhaStyle]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
    alignItems: 'center',
    backgroundColor: '#fff', // Cor de fundo, ajuste conforme necessário
    padding: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom:50,
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'auto',
    
  },
  image: {
    width: 85,
    height: 80,
    marginRight: 10,
  },
  estadoText: {
    fontSize: 25,
    marginRight:10,
    marginLeft: 70,
    fontWeight: 'bold',
    color: 'blue',
  },
  bola: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginLeft: 5,
  },
  on: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7
  },
  off: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  direita: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  bolaVermeAcesa: {
    backgroundColor: 'rgba(255, 0, 0, 1)',
  },
  bolaVermeApagada: {
    backgroundColor: 'rgba(150, 0, 0, 1)',
  },
  bolaVerdeAcesa: {
    backgroundColor: 'rgba(0, 255, 0, 1)',
  },
  bolaVerdeApagada: {
    backgroundColor: 'rgba(0, 90, 0, 1)',
  },
});

export default EstadoValvula;
