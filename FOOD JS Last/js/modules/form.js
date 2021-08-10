import {closeModal,openModal} from './modal';

function form(formSelector, modalTimerId) {
      // Forms

      const forms = document.querySelectorAll(formSelector);
      const message = {
          loading: 'Загрузка...',
          success: 'Спасибо! Скоро мы с вами свяжемся',
          failure: 'Что-то пошло не так...'
      };
     
      forms.forEach(item => {
          postData(item);
      });
  
      function postData(form) {
          form.addEventListener('submit', (e) => {
              e.preventDefault();
  
              let statusMessage = document.createElement('div');
              statusMessage.classList.add('status');
              statusMessage.textContent = message.loading;
              form.appendChild(statusMessage);
          
              const request = new XMLHttpRequest();
              request.open('POST', 'https://script.google.com/macros/s/AKfycbxeocNsXroSjsISMNzMJkGphJH979r_HTFa3sZ1JA/exec');
              
              const formData = new FormData(form);
  
              request.send(formData);
  
              request.addEventListener('load', () => {
                  if (request.status === 200) {
                      statusMessage.textContent = message.success;
                      form.reset();
                      setTimeout(() => {
                          statusMessage.remove();
                          closeModal('.modal');
                      }, 3000);
                  } else {
                      statusMessage.textContent = message.failure;
                  }
              });
          });
      }
}

export default form;