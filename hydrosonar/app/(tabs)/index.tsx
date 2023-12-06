import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import NivelAgua from '../../components/NivelAgua';
import EstadoValvula from '../../components/EstadoValvula';
import LineChartComponent from '../../components/LineChart/LineChartComponent';
import mockData from "../../Mock/mockData.json";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface ApiData {
  timestamp: string;
  actual_level: {
    percent: number;
    liters: number;
  };
  valve_state: boolean;
}

interface CustomRecord {
  created_at: string;
  actual_level: {
    percent: string;
    liters: string;
  };
  valve_state: boolean;
}

const getLastTenRecords = (data: CustomRecord[]) => data.slice(0, 7);

const IndexScreen: React.FC = () => {
  const [showServoVertical, setShowServoVertical] = useState(true);
  const [data, setData] = useState<CustomRecord[]>(getLastTenRecords(mockData));
  const [chartComponentKey, setChartComponentKey] = useState(1);
  const [apiData, setApiData] = useState<ApiData | null>(null);

  const chartData = data.map((record) =>
    showServoVertical
      ? parseFloat(record.actual_level.percent)
      : parseFloat(record.actual_level.liters)
  );

  const timeData = data.map((record) => record.created_at);
  const chartXData = timeData.slice(0, 7); // Pegando os últimos 7 registros como exemplo

  useEffect(() => {
    const fetchDataFromJson = () => {
      const newData = getLastTenRecords(mockData);
      setData(newData);
      setChartComponentKey((prevKey) => prevKey + 1);
    };

    setChartComponentKey((prevKey) => prevKey + 1);

    const checkForMockDataUpdate = () => {
      const mockDataString = JSON.stringify(mockData);
      const dataString = JSON.stringify(data);

      if (mockDataString !== dataString) {
        fetchDataFromJson();
      }
    };

    const intervalId = setInterval(checkForMockDataUpdate, 30000); // Atualiza a cada hora

    return () => clearInterval(intervalId);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://apisenai.pythonanywhere.com/processed-data');

        if (!response.ok) {
          throw new Error('Erro na requisição');
        }

        const jsonData: ApiData = await response.json();
        setApiData(jsonData);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error.message);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      {apiData ? (
        <View>
          <NivelAgua
            percentagem={parseFloat(apiData.actual_level.percent)}
            litrosRestantes={apiData.actual_level.liters}
          />
          {/* <LineChartComponent
            key={chartComponentKey}
            yAxisLabel="%"
            yAxisSuffix=""
            chartTitle="Nível de Água"
            data={apiData ? [apiData.actual_level.percent] : []}
            chartXData={apiData ? [apiData.timestamp] : []}
            chartStyle={styles.chartStyle}
            titleStyle={styles.chartTitleStyle}
          /> */}
          <EstadoValvula estado={apiData.valve_state} />
        </View>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 100,
    marginLeft: 140,
  },
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

export default IndexScreen;
