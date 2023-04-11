const form = document.querySelector('.form');
const sendMsgBtn = document.querySelector('#submitButton');
const subjectInput = form.querySelector('input[name="subject"]');
const messageInput = form.querySelector('textarea[name="message"]');

const checkFieldsValidity = () => {
    if (subjectInput.value === '' || messageInput.value === '') {
      sendMsgBtn.disabled = true;
      sendMsgBtn.style.opacity = '0.8';
    } else {
      sendMsgBtn.disabled = false;
      sendMsgBtn.style.opacity = '1';
    }
 };
 checkFieldsValidity();
subjectInput.addEventListener('input', checkFieldsValidity);
messageInput.addEventListener('input', checkFieldsValidity);
sendMsgBtn.addEventListener('click', (event) => {
  event.preventDefault(); 
  let url = USER_LINK;
  url+=`/${decodedToken.username}/send_msg`;
  const data = {
    subject: subjectInput.value,
    text: messageInput.value,
  };
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    },
    })
    .then((response) => {
    if (!response.ok) {
        return response.text().then((error) => {
            throw new Error(error);
        });
    }
    showAlert("Повідомлення успішно надіслане", true);
    return response.json();
    })
    .then(data => console.log(data))
    .catch((error) => {
        showAlert(error.message);
    });
});
