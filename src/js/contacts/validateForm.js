export function validateForm(event) {
  const form = event.target.closest('form')
  const inputName = form.querySelector('[data-input="name"]')
  const inputNameParent = inputName.closest('.form-block')
  const inputNameValue = inputName.value
  const inputPhone = form.querySelector('[data-input="phone"]')
  const inputPhoneParent = inputPhone.closest('.form-block')
  const inputPhoneValue = inputPhone.value

  let phone = false
  let name = false

  if (inputNameValue.length < 1) {
    inputNameParent.classList.add('form-block--error')
    name = false
  } else {
    inputNameParent.classList.remove('form-block--error')
    name = true
  }

  if (inputPhoneValue.length != 11) {
    inputPhoneParent.classList.add('form-block--error')
    phone = false
  } else {
    inputPhoneParent.classList.remove('form-block--error')
    phone = true
  }

  if (phone && name) {
    return true
  } else {
    return false
  }
}