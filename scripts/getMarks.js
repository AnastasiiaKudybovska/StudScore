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
        let output = ''
        let output2 = ''
        let prevDate = null;
        data.forEach(mark =>{
            let dateString = mark.date;
            let parts = dateString.split('-');
            let formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
            output += `
                <div class="stud-mark-day">
                `;
            if (formattedDate !== prevDate) {
                output += `
                <h2>${formattedDate}</h2>
                `;
                
                
                prevDate = formattedDate;
            } 
                output += `
                <div class="mark-day-box" id="mark-day-box">
                <div class="mark-day-box-text">
                    <p>${mark["subject"].name}</p>
                    <p>${mark["teacher"]["user"].last_name} ${mark["teacher"]["user"].first_name}</p>
                </div>
                <p class="rating-mark-block ${mark.mark < 3 ? 'bad-m-icon' : mark.mark === 3 ? 'middle-m-icon' : ''}">
                  ${mark.mark}.0<i class="fas fa-gem" aria-hidden="true"></i>
                </p>
                </div>
                </div>
                `;         
        })
        document.getElementById('myMarks').innerHTML = output;
      })
      .catch((error) => {
        showAlert(error.message);
      });

});


