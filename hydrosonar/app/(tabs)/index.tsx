import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NivelAgua from '../../components/NivelAgua';
import EstadoValvula from '../../components/EstadoValvula';

const HomeScreen: React.FC = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://apisenai.pythonanywhere.com/processed-data/');

        if (!response.ok) {
          throw new Error('Erro na requisição');
        }

        const jsonData = await response.json();
        setApiData(jsonData);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error.message);
      }
    };

    // Chama a função fetchData inicialmente e a cada 5 segundos
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    // Retorna uma função de limpeza para cancelar o setInterval ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      {apiData ? (
        <View>
          {/* Componente NivelAgua */}
          <NivelAgua
            percentagem={parseFloat(apiData.actual_level.percent)}
            litrosRestantes={apiData.actual_level.liters}
          />

          {/* Componente EstadoValvula */}
          <EstadoValvula estado={apiData.valve_state} />
        </View>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  rect: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#5900CB",
    height: 100,
    width: "100%",
    borderBottomLeftRadius: 70,
  },
  chartStyle: {
    backgroundColor: "white",
    maxWidth: windowWidth - 32,
    maxHeight: windowHeight - 32,
  },
  chartTitleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3f51b5",
  },
  chartMargin: {
    marginBottom: 10,
  },
});

export default HomeScreen;
