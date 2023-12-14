const fs = require('fs');
const fetch = require('node-fetch');

const fetchDataAndSaveToFile = async () => {
  try {
    const response = await fetch('http://apisenai.pythonanywhere.com/processed-data');

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const jsonData = await response.json();

    // Salva os dados obtidos no arquivo nivelData.json
    const jsonString = JSON.stringify({
      timestamp: jsonData.timestamp,
      actual_level: {
        percent: jsonData.actual_level.percent,
        liters: jsonData.actual_level.liters
      },
      valve_state: jsonData.valve_state
    }, null, 2);

    fs.writeFileSync('nivelData.json', jsonString, 'utf-8');

    console.log('Dados obtidos e salvos em nivelData.json');
  } catch (error) {
    console.error('Erro ao obter dados da API:', error);
  }
};

// Chama a função fetchDataAndSaveToFile a cada segundo
setInterval(() => {
  fetchDataAndSaveToFile();
}, 1000);
