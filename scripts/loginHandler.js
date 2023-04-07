function login(username, password) {
    fetch(AUTH_LINK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
        .then((response) => {
            console.log(response)
          if (response.ok) {
            
            return response.json();
          } else {
            // if (response.status = 404){
            //     const error_login_textDiv = document.getElementById('error_login_text')
            //     let output = ''
            //     output+=`<h2>Користувача не знайдено</h2>`;

            //     error_login_textDiv.innerHTML = output;
            // }
            return response.text().then((error) => {
              throw new Error(error);
            });
          }
        })
        .then((data) => {
          
          document.cookie = `token=${data.token}; path=/`;
          window.location.href = '../statistics.html';
        })
        .catch((error) => {
     
          console.log(error.message)
          showAlert(JSON.parse(error.message).error.message);
        });
  }
  