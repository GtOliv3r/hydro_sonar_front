import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import BoxInfo from '../../components/AlertBox';

const MAX_ALERTS = 5;

const AlertsScreen: React.FC = () => {
  const [alerts, setAlerts] = useState<number[]>([]);
  const [percentagem, setPercentagem] = useState<number | null>(null);

  const removeAlert = (indexToRemove: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((_, index) => index !== indexToRemove));
  };

  // Limpa todos os alertas
  const clearAlerts = () => {
    setAlerts([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://apisenai.pythonanywhere.com/processed-data/');

        if (!response.ok) {
          throw new Error('Erro na requisição');
        }

        const jsonData = await response.json();

        const newPercentagem = jsonData.actual_level.percent;
        setPercentagem(newPercentagem);

        // Substitua isso pelas condições relevantes
        const shouldGenerateAlert = newPercentagem <= 20 || newPercentagem >= 80;

        if (shouldGenerateAlert) {
          // Adiciona um novo alerta à lista se não for repetição do último
          setAlerts((prevAlerts) => {
            const lastAlert = prevAlerts[prevAlerts.length - 1];
            const newAlert = Date.now();

            // Verifica se o novo alerta é diferente do último
            if (lastAlert !== newAlert) {
              // Remove o primeiro alerta se já houver 5
              if (prevAlerts.length >= MAX_ALERTS) {
                const [, ...remainingAlerts] = prevAlerts;
                return [...remainingAlerts, newAlert];
              }
              return [...prevAlerts, newAlert];
            }

            return prevAlerts;
          });
        }
      } catch (error) {
        console.error('Erro ao obter dados da API:', error.message);
      }
    };

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      {percentagem !== null && (
        <>
          {alerts.map((timestamp, index) => (
            <BoxInfo key={timestamp} percentagem={percentagem} onRemove={() => removeAlert(index)} />
          ))}
          <Button title="Limpar Alertas" onPress={clearAlerts} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
  },
});

export default AlertsScreen;
