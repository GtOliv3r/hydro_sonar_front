import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";

interface LineChartProps {
  yAxisLabel: string;
  yAxisSuffix: string;
  chartTitle: string;
  data: number[];
  chartXData: string[];
  chartStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 0,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "2",
    strokeWidth: "2",
    stroke: "#3f51b5",
  },
  propsForVerticalLabels: {
    fontSize: 12,
  },
  propsForHorizontalLabels: {
    fontSize: 12,
  },
  propsForBackgroundLines: {
    strokeDasharray: "",
  },
};

const LineChartComponent: React.FC<LineChartProps> = ({
  yAxisLabel,
  yAxisSuffix,
  chartTitle,
  data,
  chartXData,
  chartStyle,
  titleStyle,
}) => {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    setChartData(data.slice(-12));
  }, [data]);

  // Extrai apenas o horário das strings de data
  const hours = chartXData.map((dateTime) => new Date(dateTime).toLocaleTimeString().slice(0, 5)).slice(-6);

  const convertedStyle = StyleSheet.flatten(chartStyle as StyleProp<ViewStyle>);
  const convertedTitleStyle = StyleSheet.flatten(titleStyle as StyleProp<TextStyle>);

  return (
    <View style={[styles.chartContainer, convertedStyle]}>
      <Text style={[styles.chartTitle, convertedTitleStyle]}>{chartTitle}</Text>
      <LineChart
        data={{
          labels: hours,
          datasets: [
            {
              data: chartData,
            },
          ],
        }}
        width={347}
        height={280}
        yAxisLabel={yAxisLabel}
        yAxisSuffix={yAxisSuffix}
        chartConfig={chartConfig}
        style={convertedStyle}
        withVerticalLines={false}
        bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3f51b5",
  },
});

export default LineChartComponent;
