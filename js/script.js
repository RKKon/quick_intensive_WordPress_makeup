window.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.popup_overlay');
  const contactForm = document.querySelector('#contactForm');
  const buttonTopPhone = document.querySelector('.button_join');
  const buttonBottomPhone = document.querySelector('.button_join_last');
  const cross = document.querySelector('.popup_close_cross');

  const openForm = () => {
    buttonTopPhone.addEventListener('click', () => overlay.style.display = 'block')
    buttonBottomPhone.addEventListener('click', () => overlay.style.display = 'block')
  }

  const closeFormCross = (closeBy) => closeBy.addEventListener('click', () => overlay.style.display = 'none')
  const closeForm = () => {
    overlay.classList.add('in_out');
    setTimeout(() => {
      overlay.style.display = 'none';
      overlay.classList.remove('in_out');
    }, 800);
  };

  const thanksMessage = () => {
    const div = document.createElement('div')
    const message = `<span class="modal_message">Спасибо, ваша заявка принята, скоро мы c вами свяжемся!</span>`
    div.innerHTML = `<h3 class="modal_message_thanks">${message}</h3>`;

    const crossThanks = cross.cloneNode(true);
    crossThanks.classList.add('thanks_modal_cross');
    div.querySelector('.modal_message_thanks').appendChild(crossThanks);

    document.body.append(div);

    crossThanks.addEventListener('click', () => div.remove())

    setTimeout(() => div.remove(), 3000);
  }

  const fillOutForm = () => {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault()
      let phone = contactForm.user_phone.value.trim();
      const checkPhone = /^\+375\s?(\d{2})\s?(\d{3})\s?(\d{2,3})\s?(\d{2})$/;
      const phoneErrorMessage = document.querySelector('.phone_error');
      if (checkPhone.test(phone)) {
        phoneErrorMessage.classList.remove('display_block')
        contactForm.user_phone.value = ''
        closeForm()
        thanksMessage()
      } else {
        phoneErrorMessage.classList.add('display_block')
      }
    })
  }

  let isMouseDown = false;
  overlay.addEventListener('mousedown', (e) => {
    if (e.target === overlay) {
      isMouseDown = true;
    }
  });

  overlay.addEventListener('mouseup', (e) => {
    if (isMouseDown && e.target === overlay) {
      closeForm()
    }
    isMouseDown = false;
  });

  fillOutForm()
  closeFormCross(cross)
  openForm()

})