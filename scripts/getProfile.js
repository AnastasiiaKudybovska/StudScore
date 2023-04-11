const inputFirstName = document.querySelector('input[aria-label="First name"]');
const inputLastName = document.querySelector('input[aria-label="Last name"]');
const inputUserName = document.querySelector('input[aria-label="User name"]');
const inputDateofbirthday = document.querySelector('input[aria-label="Date of birthday"]');
const inputEmail = document.querySelector('input#inputEmail4');
const inputPhone = document.querySelector('input[aria-label="Phone number"]');
const inputGroup = document.querySelector('input[aria-label="Group"]');
const inputDateofentry = document.querySelector('input[aria-label="Date of entry"]');
const inputDateofgraduation = document.querySelector('input[aria-label="Date of graduation"]');


// getProfile();
function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{2})(\d{2})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
    return null;
  }
  
// let initialFormData = null;
// function saveInitialFormData() {
//   initialFormData = new FormData(document.querySelector('.file-upload'));
// }
// saveInitialFormData();
obtainUser();            
function getProfile() {
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
            inputFirstName.value = data.first_name;
            inputLastName.value = data.last_name;
            inputUserName.value = data.username;
            inputEmail.value = data.email;
            let phone = data.phone;
            phone = phone.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
            inputPhone.value = phone;
            let url2 = STUDENT_LINK;
            url2+=`/${data.id_user}`;
            fetch(url2, {
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
                .then((student) => {
                    inputDateofbirthday.value = student.date_of_birthday;
                    inputGroup.value = student["group"].name;
                    inputDateofentry.value = student.date_of_entry;
                    inputDateofgraduation.value = student.date_of_graduation;
                    
                })
                .catch((error) => {
                  showAlert(error.message);
                });       
            
        })
        .catch((error) => {
          showAlert(error.message);
        });
}