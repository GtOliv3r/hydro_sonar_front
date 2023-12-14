function postData() {
  const url = 'http://apisenai.pythonanywhere.com/sensor-data/';

  let value = 0;
  let isIncrementing = true;  // Adicionamos uma variável para controlar se estamos incrementando ou decrementando

  const generateRandomValue = () => Math.random() / 10;

  const updateValue = () => {
    const randomValue = generateRandomValue();

    if (isIncrementing) {
      value += randomValue;
      if (value >= 8) {
        isIncrementing = false;  // Alterna para decrementar quando atinge 8
      }
    } else {
      value -= randomValue;
      if (value <= 1) {
        isIncrementing = true;  // Alterna para incrementar quando atinge 1
      }
    }

    const data = {
      value: value,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(jsonData => {
        console.log('Data sent successfully:', jsonData);
      })
      .catch(error => {
        console.error('Error sending data:', error.message);
      });
  };

  setInterval(updateValue, 1000);
}

postData();
