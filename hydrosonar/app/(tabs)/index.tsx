import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import NivelAgua from "../../components/NivelAgua";
import EstadoValvula from "../../components/EstadoValvula";
import LineChartComponent from "../../components/LineChart/LineChartComponent";
import mockData from "../../Mock/mockData.json"
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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

const getLastTenRecords = (data: Record[]) => data.slice(0, 7);

const IndexScreen: React.FC = () => {
  const [data, setData] = useState(getLastTenRecords(mockData));
  const [chartComponentKey, setChartComponentKey] = useState(1);
  const [apiData, setApiData] = useState<ApiData | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://apisenai.pythonanywhere.com/processed-data");

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }

      const jsonData: ApiData = await response.json();
      setApiData(jsonData);

      setData((prevData) => [
        ...prevData,
        {
          timestamp: jsonData.timestamp,
          percent: jsonData.actual_level.percent,
          liters: jsonData.actual_level.liters,
        },
      ]);
    } catch (error) {
      console.error("Erro ao obter dados da API:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      {apiData ? (
        <View>
          {apiData && apiData.actual_level && (
            <NivelAgua
              percentagem={apiData.actual_level.percent}
              litrosRestantes={apiData.actual_level.liters}
            />
          )}
          <LineChartComponent
            yAxisLabel=""
            yAxisSuffix=""
            chartTitle={"Gráfico"}
            data={data.map((record) => (record.percent))}
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
    maxWidth: windowWidth - 32,
    maxHeight: windowHeight - 32,
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
