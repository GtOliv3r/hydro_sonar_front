const fs = require('fs');

function generateRandomData(length) {
  const data = [];

  for (let i = 0; i < length; i++) {
    const percent = Math.random() * 100;
    const liters = Math.random() * 10;
    const valve_state = Math.random() < 0.5 ? false : true;

    // Geração de uma data aleatória entre 2022 e 2023
    const randomDate = new Date(
      Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000) // Data dentro do último ano
    );
    const formattedDate = randomDate.toISOString().slice(0, 19).replace('T', ' ');

    data.push({
      created_at: formattedDate,
      actual_level: {
        percent: percent.toFixed(2),
        liters: liters.toFixed(4)
      },
      valve_state: valve_state
    });
  }

  return data;
}

function generateJSONFile(fileName, data) {
  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFileSync(fileName, jsonString, 'utf-8');
  console.log('Mock data generated and saved to ' + fileName);
}

const jsonData = generateRandomData(30);
generateJSONFile('mockData.json', jsonData);
