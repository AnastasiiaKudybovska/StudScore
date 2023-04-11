obtainUser().then(() => {
    let url = STUDENT_LINK;
    url+=`/${user_id}/marks`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }})
        .then((response) => {
          if (!response.ok) {
            return response.text().then((error) => {
              throw new Error(error);
            });
          }
          return response.json();
        })
        .then((data) => {
          const chartData = {
            labels: data.map((_, i) => ` `),
            datasets: [{
              label: 'Оцінка',
              data: data.map(item => item.mark),
              fill: false,
              borderColor: '#42BFDD',
              tension: 0.1,
              pointBackgroundColor: '#42BFDD',
              borderWidth: 3
    
            }]
            
          };
    
          Chart.defaults.font.size = 20;
          Chart.defaults.font.family = "'Lora', 'serif'";
          const ctx = document.getElementById('myChart').getContext('2d');
    
          const myChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                plugins: {
                  legend: {
                    
                    display: false
                  }
                }
                
              }
          });
        })
        .catch((error) => {
            showAlert(error.message);
    }); 
    
});