const fs = require('fs');
const fetch = require('node-fetch');

const maxQueueSize = 24; // Defina o tamanho máximo da fila conforme necessário

const updateQueueFile = (data) => {
  try {
    let queue = [];

    // Tenta ler o arquivo existente
    if (fs.existsSync('mockData.json')) {
      const fileContent = fs.readFileSync('mockData.json', 'utf-8');
      queue = JSON.parse(fileContent);

      // Remove o último elemento se a fila atingir o tamanho máximo
      if (queue.length >= maxQueueSize) {
        queue.pop();
      }
    }

    // Adiciona o novo dado à fila
    queue.unshift(data);

    // Salva a fila atualizada no arquivo
    const jsonString = JSON.stringify(queue, null, 2);
    fs.writeFileSync('mockData.json', jsonString, 'utf-8');

    console.log('Dado adicionado à fila e arquivo atualizado');
  } catch (error) {
    console.error('Erro ao atualizar o arquivo de fila:', error.message);
  }
};

const fetchDataAndSaveToQueue = async () => {
  try {
    const response = await fetch('http://apisenai.pythonanywhere.com/graphic-data/');

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const jsonData = await response.json();
    
    // Adiciona os dados à fila e atualiza o arquivo
    updateQueueFile(jsonData);
  } catch (error) {
    console.error('Erro ao obter dados da API:', error.message);
  }
};

// Chama a função fetchDataAndSaveToQueue a cada segundo
setInterval(() => {
  fetchDataAndSaveToQueue();
}, 1000);
