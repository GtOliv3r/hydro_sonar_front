import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import BoxInfo, { Alert } from '../../components/AlertBox';

interface ApiData {
  timestamp: string;
  actual_level: {
    percent: number;
    liters: number;
  };
  valve_state: boolean;
}

const MAX_ALERTS = 5;

const AlertsScreen: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const removeAlert = (timestamp: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.timestamp !== timestamp));
  };

  const removeOldestAlert = () => {
    setAlerts((prevAlerts) => {
      const [, ...remainingAlerts] = prevAlerts;
      return remainingAlerts;
    });
  };

  const addNewAlert = (apiData: ApiData) => {
    const newTimestamp = Date.parse(apiData.timestamp);
    const newPercentagem = apiData.actual_level.percent;
    const newAlert: Alert = {
      timestamp: newTimestamp,
      percentagem: newPercentagem,
      message: `Nova mensagem de alerta: ${newPercentagem}%`,
    };

    setAlerts((prevAlerts) => {
      // Verificar se a alerta já existe antes de adicioná-la
      if (!prevAlerts.some((alert) => alert.timestamp === newTimestamp)) {
        return [...prevAlerts, newAlert];
      }
      return prevAlerts;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://apisenai.pythonanywhere.com/processed-data/');

        if (!response.ok) {
          throw new Error('Erro na requisição');
        }

        const jsonData: ApiData = await response.json();
        addNewAlert(jsonData);

        if (alerts.length >= MAX_ALERTS) {
          removeOldestAlert();
        }
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };

    // Simulando a busca de dados da API a cada 5 segundos
    const intervalId = setInterval(fetchData, 5000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, [alerts]);

  return (
    <View style={styles.container}>
      {alerts.map((alert) => (
        <BoxInfo
          key={alert.timestamp.toString()}
          alert={alert}
          onRemove={() => removeAlert(alert.timestamp)}
        />
      ))}
      <Button title="Limpar Alertas" onPress={() => setAlerts([])} color="#8a2be2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default AlertsScreen;
