const token = authenticated();
const decodedToken = parseJwt(token)
console.log(decodedToken.username);
let user_id;

getRatingMark();

  function obtainUser() {
    
    let url = USER_LINK;
    url+=`/${decodedToken.username}`;
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
          const firstlastname = document.querySelector('#firstlastname');
          firstlastname.textContent = data.last_name + " " +  data.first_name
          user_id = data.id_user

        })
        .catch((error) => {
          showAlert(error.message);
        });
  }
  function getRatingMark(){
    let url = STUDENT_LINK;
    url+=`/${decodedToken.username}/rating`;
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
          // console.log(data)
          const firstlastname = document.querySelector('#rating-mark');
          firstlastname.textContent = data
        })
        .catch((error) => {
          showAlert(error.message);
        });
  }