const saveBtn = document.querySelector('.button-update button');
saveBtn.disabled = true; // додаємо атрибут disabled при створенні кнопки
saveBtn.style.opacity = '0.8';


getProfile().then(() => {
    const firstNameInput = document.querySelector('input[aria-label="First name"]');
    const originalFirstName = firstNameInput.value;
    
    const lastNameInput = document.querySelector('input[aria-label="Last name"]');
    const originalLastName = lastNameInput.value;
    
    const usernameInput = document.querySelector('input[aria-label="User name"]');
    const originalUsername = usernameInput.value;
    
    const emailInput = document.querySelector('#inputEmail4');
    const originalEmail = emailInput.value;
    
    const phoneNumberInput = document.querySelector('input[aria-label="Phone number"]');
    const originalPhoneNumber = phoneNumberInput.value;
    

    [firstNameInput, lastNameInput, usernameInput, emailInput, phoneNumberInput].forEach(input => {
        input.addEventListener('input', () => {
          const isChanged = input.value !== input.dataset.originalValue;
          saveBtn.disabled = !isChanged;
          saveBtn.style.opacity = '1';
        });
    });
    
    // firstNameInput.addEventListener('input', () => {
    //   saveBtn.disabled = (firstNameInput.value === originalFirstName);
    // });
    // lastNameInput.addEventListener('input', () => {
    //   saveBtn.disabled = (lastNameInput.value === originalLastName);
    // });
    // usernameInput.addEventListener('input', () => {
    //   saveBtn.disabled = (usernameInput.value === originalUsername);
    // });
    // emailInput.addEventListener('input', () => {
    //   saveBtn.disabled = (emailInput.value === originalEmail);
    // });
    // phoneNumberInput.addEventListener('input', () => {
    //   saveBtn.disabled = (phoneNumberInput.value === originalPhoneNumber);
    // });

    saveBtn.addEventListener('click', () => {
        const new_first_name = firstNameInput.value;
        const new_last_name = lastNameInput.value;
        const new_username = usernameInput.value;
        const new_email = emailInput.value;
        const new_phone = phoneNumberInput.value;
    
      // перевіряємо, чи поля відрізняються від оригінальних значень
      const data = {};
        if (new_first_name !== originalFirstName) {
          data.first_name = new_first_name;
        }
        if (new_last_name !== originalLastName) {
          data.last_name = new_last_name;
        }
        if (new_username !== originalUsername) {
          data.username = new_username;
        }
        if (new_email !== originalEmail) {
          data.email = new_email;
        }
        if (new_phone !== originalPhoneNumber) {
          data.phone = new_phone;
        }
    
      let url = USER_LINK;
      url+=`/${decodedToken.username}`;
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((error) => {
            throw new Error(error);
          });
        }
        return response.json();
      })
        .then(data => console.log(data))
        .catch((error) => {
            showAlert(error.message);
          });
    });


    const form2 = document.querySelector('.file-upload2');
    const oldPasswordInput = form2.querySelector('#exampleInputPassword1');
    const newPasswordInput = form2.querySelector('#exampleInputPassword2');
    const confirmPasswordInput = form2.querySelector('#exampleInputPassword3');

    const changePassBtn = form2.querySelector('#changePassBtn');
    
    const checkFieldsValidity = () => {
    if (oldPasswordInput.value === '' || newPasswordInput.value === '' || confirmPasswordInput.value === '') {
      changePassBtn.disabled = true;
      changePassBtn.style.opacity = '0.9';
    } else {
      changePassBtn.disabled = false;
      changePassBtn.style.opacity = '1';
    }
    };
    checkFieldsValidity();
    oldPasswordInput.addEventListener('input', checkFieldsValidity);
    newPasswordInput.addEventListener('input', checkFieldsValidity);
    confirmPasswordInput.addEventListener('input', checkFieldsValidity);
   

    changePassBtn.addEventListener('click', () => {
      const oldPassword = oldPasswordInput.value;
      const newPassword = newPasswordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      // перевірка на співпадіння нового та підтвердженого паролів
      if (newPassword !== confirmPassword) {
        newPasswordInput.setCustomValidity('Паролі не співпадають');
        newPasswordInput.validity.valid = false;
        confirmPasswordInput.setCustomValidity('Паролі не співпадають');
        confirmPasswordInput.validity.valid = false;
        const error_login_textDiv = document.getElementById('error_changepass_text');;
        let output = ''
        output+=`<label">Паролі не співпадають</label>`;
        error_login_textDiv.innerHTML = output;
        return;
      }
      else {
        newPasswordInput.setCustomValidity('');
        newPasswordInput.validity.valid = true;
        confirmPasswordInput.setCustomValidity('');
        confirmPasswordInput.validity.valid = true;
      }
      let url = USER_LINK;
      url+=`/${decodedToken.username}/change_pass`;
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      old_password: oldPassword,
      password: newPassword
    })
  })
  .then((response) => {
    if (!response.ok) {
      if (response.status = 401){
        const error_login_textDiv = document.getElementById('error_changepass_text');;
        let output = ''
        output+=`<label>Неправильний пароль</label>`;
        error_login_textDiv.innerHTML = output;
        oldPasswordInput.setCustomValidity('Неправильний пароль');
        oldPasswordInput.validity.valid = false;
        newPasswordInput.setCustomValidity('Неправильний пароль');
        newPasswordInput.validity.valid = false;
        confirmPasswordInput.setCustomValidity('Неправильний пароль');
        confirmPasswordInput.validity.valid = false;
      }
      return response.text().then((error) => {
        throw new Error(error);
      });
    }
    oldPasswordInput.setCustomValidity('');
    oldPasswordInput.validity.valid = true;
    newPasswordInput.setCustomValidity('');
    newPasswordInput.validity.valid = true;
    confirmPasswordInput.setCustomValidity('');
    confirmPasswordInput.validity.valid = true;
    const error_login_textDiv = document.getElementById('error_changepass_text');;
    let output = ''
    output+=`<label class="ch_pass_ok">Пароль змінено</label>`;
    error_login_textDiv.innerHTML = output;
    return response.json();
  })
    .then(data => console.log("Пароль змінено"))
    .catch((error) => {
        showAlert(error.message);
      });
});
    
});




//// change password

// const form = document.querySelector('.file-upload2');
// const oldPasswordInput = form.querySelector('#exampleInputPassword1');
// const newPasswordInput = form.querySelector('#exampleInputPassword2');
// const confirmPasswordInput = form.querySelector('#exampleInputPassword3');
// const updateButton = form.querySelector('button');

// updateButton.addEventListener('click', () => {
//   const oldPassword = oldPasswordInput.value;
//   const newPassword = newPasswordInput.value;
//   const confirmPassword = confirmPasswordInput.value;

//   // перевірка на співпадіння нового та підтвердженого паролів
//   if (newPassword !== confirmPassword) {
//     alert('Паролі не співпадають');
//     return;
//   }

//   // відправка PUT запиту на сервер
//   fetch('/update-password', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       oldPassword: oldPassword,
//       newPassword: newPassword
//     })
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Сталася помилка при оновленні паролю');
//     }
//     alert('Пароль успішно оновлено');
//   })
//   .catch(error => {
//     alert(error.message);
//   });
// });