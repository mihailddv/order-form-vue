export function contactsInputs() {
  const inputText = document.querySelectorAll('[data-input="name"]');
  const inputPhone = document.querySelectorAll('[data-input=phone]');
  const formInputs = document.querySelectorAll('.contacts__form input')

  inputText.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^а-яА-ЯёЁa-zA-Z]/, '');
    });
  });

  inputPhone.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9]/, '');
    });
  });

  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.closest('.form-block').classList.remove('form-block--error')
    })
  })
}