const fs = require('fs');
const fetch = require('node-fetch');

const fetchDataAndSaveToFile = async () => {
  try {
    const response = await fetch('http://apisenai.pythonanywhere.com/graphic-data/');

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const jsonData = await response.json();
    
    // Salva os dados obtidos no arquivo mockData.json
    const jsonString = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync('mockData.json', jsonString, 'utf-8');

    console.log('Dados obtidos e salvos em mockData.json');
  } catch (error) {
    console.error('Erro ao obter dados da API:', error.message);
  }
};

// Chama a função fetchDataAndSaveToFile a cada segundo
setInterval(() => {
  fetchDataAndSaveToFile();
}, 10000);