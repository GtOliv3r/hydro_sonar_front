import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { format, parseISO } from 'date-fns';

interface ApiData {
  timestamp: string;
  actual_level: {
    percent: number;
    liters: number;
  };
  valve_state: boolean;
}

interface LineChartProps {
  yAxisLabel: string;
  yAxisSuffix: string;
  chartTitle: string;
  data: number[];  
  chartXData: string[];  // Alterado para string[]
  chartStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 0,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#3f51b5',
  },
  propsForVerticalLabels: {
    fontSize: 10,
  },
  propsForHorizontalLabels: {
    fontSize: 10,
  },
  propsForBackgroundLines: {
    strokeDasharray: '',
  },
  yAxis: {
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    suffix: '%',
    min: 0,
    max: 100,
  },
};

const LineChartComponent: React.FC<LineChartProps> = ({ yAxisLabel, yAxisSuffix, chartTitle, chartXData, chartStyle, titleStyle }) => {
  const [chartData, setChartData] = useState<number[]>([]);
  const hours = chartXData.map((timestamp) => format(parseISO(timestamp), 'HH:mm'));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://apisenai.pythonanywhere.com/processed-data/');

        if (!response.ok) {
          throw new Error('Erro na requisição');
        }

        const jsonData: ApiData[] = await response.json();
        const timestamps = jsonData.map((data) => data.timestamp);
        const formattedTimes = timestamps.map((timestamp) =>
          format(parseISO(timestamp), 'HH:mm')
        );
        
        setChartData(jsonData.map((item) => item.actual_level.percent));
      } catch (error) {
        console.error('Erro ao obter dados da API:', error.message);
      }
    };

    // Atualize os dados a cada intervalo (por exemplo, a cada 5 minutos)
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);

    // Execute a atualização inicial
    fetchData();

    // Limpeza do intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

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
        width={310}
        height={180}
        yAxisLabel={yAxisLabel}
        yAxisSuffix={yAxisSuffix}
        chartConfig={chartConfig}
        style={convertedStyle}
        withVerticalLines={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    paddingHorizontal: 15,
    elevation: 3,
    marginLeft: 25,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3f51b5',
  },
});

export default LineChartComponent;
