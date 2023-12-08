function postData() {
    const url = 'http://apisenai.pythonanywhere.com/sensor-data/';
  
    // Generate a random value between 0 and 8.5
    const randomValue = Math.random() * 8.5;
  
    const data = {
      value: randomValue,
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
  }
  
  // Call the postData function every second
  setInterval(postData, 1000);
  