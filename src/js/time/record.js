export function compareRecord() {
  const disableTime = document.querySelectorAll('[data-record-avialable="false"]')
  const avialableTime = document.querySelectorAll('[data-record-avialable="true"]')

  disableTime.forEach(element => {
    element.disabled = true
    element.closest('.time__record').classList.add('time__record--disabled')
  })

  avialableTime.forEach(element => {
    const elementLable = element.closest('.time__record')
    const timeAction = document.querySelector('.time__action')

    elementLable.addEventListener('click', () => {
      // false all
      avialableTime.forEach(element => {
        const elementParent = element.closest('.time__record')
        element.checked = false
        elementParent.classList.remove('time__record--active')
      })
      // active this
      const elementParent = element.closest('.time__record')
      element.checked = true
      elementParent.classList.add('time__record--active')
      timeAction.classList.add('time__action--active')
    })
  })
}