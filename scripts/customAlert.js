function showAlert(message, success = false) {
    const alert = document.createElement('div');
    alert.textContent = message;
    alert.style.position = 'fixed';
    alert.style.bottom = '20px';
    alert.style.right = '20px';
    alert.style.padding = '20px';
    alert.style.backgroundColor = success ? '#2EE59D': '#b7094c';
    alert.style.color = 'white';
    alert.style.borderRadius = '20px';
    alert.style.boxShadow = 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px';
    alert.style.opacity = '0';
    alert.style.transition = 'opacity 0.5s ease-in-out';
    alert.style.animation = 'showAlertAnimation 0.5s ease-in-out forwards';
    document.body.appendChild(alert);
  
    const timer = document.createElement('div');
    timer.style.height = '5px';
    timer.style.backgroundColor = 'white';
    timer.style.borderRadius = '20px';
    timer.style.position = 'absolute';
    timer.style.bottom = '0';
    timer.style.left = '10px';
    timer.style.width = '95%';
    alert.appendChild(timer);
  
    const intervalId = setInterval(() => {
      const remainingTime = parseFloat(timer.style.width) - 1;
      if (remainingTime < 0) {
        clearInterval(intervalId);
        alert.remove();
      } else {
        timer.style.width = `${remainingTime}%`;
      }
    }, 50);
  
    setTimeout(() => {
      alert.style.opacity = '1';
    }, 10);
  }

