import { StyleSheet, Dimensions, Text, View } from "react-native";
import { useState, useEffect } from "react";
import LineChartComponent from "../../components/LineChart/LineChartComponent";
import mockData from "../../Mock/mockData.json";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface Record {
  created_at: string;
  actual_level: {
    percent: string;
    liters: string;
  };
  valve_state: boolean;
}

const getLastTenRecords = (data: Record[]) => data.slice(0, 7);

export default function TabOneScreen() {
  const [showServoVertical, setShowServoVertical] = useState(true);
  const [data, setData] = useState(getLastTenRecords(mockData));
  const [chartComponentKey, setChartComponentKey] = useState(1);

  const chartData = data.map((record) =>
    showServoVertical
      ? parseFloat(record.actual_level.percent)
      : parseFloat(record.actual_level.liters)
  );

  const timeData = data.map((record) => record.created_at);
  const chartXData = timeData.slice(0, 7); // Pegando os últimos 7 registros como exemplo

  const fetchDataFromJson = () => {
    const newData = getLastTenRecords(mockData);
    setData(newData);
    setChartComponentKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    setChartComponentKey((prevKey) => prevKey + 1);
  }, [data]);

  const checkForMockDataUpdate = () => {
    const mockDataString = JSON.stringify(mockData);
    const dataString = JSON.stringify(data);

    if (mockDataString !== dataString) {
      fetchDataFromJson();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkForMockDataUpdate, 3600000); // Atualiza a cada hora

    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.rect} />
      <View style={[styles.chartMargin]}>
        <LineChartComponent
          key={chartComponentKey}
          yAxisLabel={""}
          yAxisSuffix={"L"}
          chartTitle={"Nível"}
          data={chartData}
          chartXData={chartXData}
          chartStyle={styles.chartStyle}
          titleStyle={styles.chartTitleStyle}
        />
      </View>
    </View>
  );
}

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
