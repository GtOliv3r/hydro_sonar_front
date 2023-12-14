// Importações necessárias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import NivelAgua from "../../components/NivelAgua";
import EstadoValvula from "../../components/EstadoValvula";
import LineChartComponent from "../../components/LineChart/LineChartComponent";
import mockData from "../../Mock/mockData.json";
import nivelData from "../../Mock/nivelData.json";

// Definição dos tipos
interface Record {
  timestamp: string;
  percent: number;
  liters: number;
}

interface ApiData {
  timestamp: string;
  actual_level: {
    percent: number;
    liters: number;
  };
  valve_state: boolean;
}

// Função para obter os últimos dez registros
const getLastTenRecords = (data: Record[]) => data.slice(0, 10);

// Função para obter os últimos dados de nível
const getLastNivelData = (data: ApiData[]) => data.slice(0, 1)[0] || null;

// Componente principal
const IndexScreen: React.FC = () => {
  const [data, setData] = useState(getLastTenRecords(mockData));
  const [apiData, setApiData] = useState<ApiData | null>(getLastNivelData([nivelData]));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulando dados da API para teste
        const jsonData: ApiData = {
          timestamp: nivelData.timestamp,
          actual_level: {
            percent: nivelData.actual_level.percent,
            liters: nivelData.actual_level.liters,
          },
          valve_state: nivelData.valve_state,
        };

        // Simulando dados do mockData para teste
        const jsonData2: Record = {
          timestamp: mockData[0].timestamp,
          percent: mockData[0].percent,
          liters: mockData[0].liters,
        };

        setApiData((prevData) => ({
          ...prevData,
          timestamp: jsonData.timestamp,
          actual_level: {
            percent: jsonData.actual_level.percent,
            liters: jsonData.actual_level.liters,
          },
          valve_state: jsonData.valve_state,
        }));

        // Adicionando o novo registro aos dados existentes
        setData((prevData) => [
          ...prevData,
          {
            timestamp: jsonData2.timestamp,
            percent: jsonData2.percent,
            liters: jsonData2.liters,
          },
        ]);
      } catch (error) {
        console.error("Erro ao obter dados da API:", error);
      }
    };

    // Chamada inicial
    fetchData();

    // Configurando intervalo para buscar dados a cada 1 segundo
    const intervalId = setInterval(fetchData, 1500);

    // Limpando o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []); // O segundo parâmetro do useEffect deve ser um array vazio para garantir que o efeito só seja executado uma vez durante a montagem

  return (
    <View style={styles.container}>
      {apiData ? (
        <View>
          {apiData.actual_level && (
            <NivelAgua
              percentagem={apiData.actual_level.percent}
              litrosRestantes={apiData.actual_level.liters}
            />
          )}
          <LineChartComponent
            yAxisLabel=""
            yAxisSuffix=""
            chartTitle={"Gráfico"}
            data={data.map((record) => record.percent)}
            chartXData={data.map((record) => record.timestamp)}
            chartStyle={styles.chartStyle}
            titleStyle={styles.chartTitleStyle}
          />
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
  chartStyle: {
    backgroundColor: "white",
    // Defina o estilo do seu gráfico
  },
  chartTitleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3f51b5",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  toggleButton: {
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3f51b5",
    justifyContent: "center",
    textAlign: "center",
    width: "auto",
  },
});

export default IndexScreen;
