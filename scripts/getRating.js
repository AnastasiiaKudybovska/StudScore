
getRatingContent();

function getRatingContent(){
  obtainUser().then(() => {
    const buttons = document.querySelectorAll('.button-block button');
    const ratings = document.querySelectorAll('.rating');

    let my_rating_mark;
    let my_average_mark;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {

        const target = button.dataset.target;

        buttons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
    
        ratings.forEach((rating) => {
          rating.classList.remove('active');
          if (rating.id === target.substring(1)) {
            rating.classList.add('active');
          }
        });
      });
    });
    const group_id = async () => {
      const a = await getGroupId(user_id);
      getGroupStudentRating(a);        
      getPlaceInGroupRating(user_id, a);
    };
    group_id();
    getSteamStudentRating();
    getPlaceInSteamRating(user_id);
  });
}

  function getGroupId(student_id){
    let url = STUDENT_LINK;
    url+=`/${student_id}/groups`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }})
        .then((response) => {
          if (!response.ok) {
            return response.text().then((error) => {
              throw new Error(error);
            });
          }
          return response.json();
        })
        .catch((error) => {
          showAlert(error.message);
        });
  }
  
  

  function getGroupStudentRating(group_id){
    let url = STUDENT_LINK;
    url+=`/groups/${group_id}/rating`;
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
          let output = '<ol>';
          data.forEach(student =>{
            output += `
            <div class="self-stud-rat">
            <li class="${student.student["user"].id_user == user_id ? 'fw-bold' : ''}">${student.student["user"].last_name} ${student.student["user"].first_name}</li>
            <div class="mark-div">
                <p class="${student.student["user"].id_user == user_id ? 'rating-mark-block3' : 'rating-mark-block0'}">${student.average_mark !== 0 ? student.average_mark : '0.0'} <i class="fas fa-gem" aria-hidden="true"></i></p>            
                <div  class="rating_mark_in_r  ${student.student["user"].id_user == user_id ? 'rating-mark-block2' : 'rating-mark-block0'}">
                <p>${student.rating_mark !== 0 ? student.rating_mark : '0.000'} </p>  
                <i class="fa fa-star" aria-hidden="true"></i>
                </div>
            </div>    
            </div>`;
            if (student.student["user"].id_user == user_id){
              my_average_mark = student.average_mark;
              my_rating_mark = student.rating_mark;
            } 
          });
          output += `</ol>`;      
          document.getElementById('group-rating').innerHTML = output;
          console.log(my_rating_mark, my_average_mark)
          const output2 = `<p class="rating-mark-block">${my_rating_mark} <i class="fa fa-star" aria-hidden="true"></i></p>
          <p class="rating-mark-block">${my_average_mark} <i class="fas fa-gem" aria-hidden="true"></i></p>`
          document.getElementById('stat-chart-mark-id').innerHTML = output2;

        })
        .catch((error) => {
          showAlert(error.message);
        });
  }
  
  function getSteamStudentRating(){
    let url = STUDENT_LINK;
    url+=`/rating`;
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
          let output = '<ol>';
          data.forEach(student =>{
            output += `
            <div class="self-stud-rat">
            <li class="${student.student["user"].id_user == user_id ? 'fw-bold' : ''}">${student.student["user"].last_name} ${student.student["user"].first_name}</li>
            <div class="mark-div">
            <p class="${student.student["user"].id_user == user_id ? 'rating-mark-block3' : 'rating-mark-block0'}">${student.average_mark !== 0 ? student.average_mark : '0.0'} <i class="fas fa-gem" aria-hidden="true"></i></p>
            <div  class="rating_mark_in_r  ${student.student["user"].id_user == user_id ? 'rating-mark-block2' : 'rating-mark-block0'}">
            <p>${student.rating_mark !== 0 ? student.rating_mark : '0.000'} </p>  
            <i class="fa fa-star" aria-hidden="true"></i>
            </div>
            </div>    
            </div>`;
          });
          output += `</ol>`;      
          document.getElementById('stream-rating').innerHTML = output;
        })
        .catch((error) => {
          showAlert(error.message);
        });
  }

  function getPlaceInGroupRating(student_id, group_id){
    let url = STUDENT_LINK;
    url+=`/${student_id}/groups/${group_id}/rating/place`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
          let place = document.querySelector('#placeInGroupRating');
          place.textContent = data + 1;

        })
        .catch((error) => {
          showAlert(error.message);
        });
  }

  function getPlaceInSteamRating(student_id){
    let url = STUDENT_LINK;
    url+=`/${student_id}/rating/place`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
          let place = document.querySelector('#placeInSteamRating');
          place.textContent = data + 1;
        })
        .catch((error) => {
          showAlert(error.message);
        });
  }