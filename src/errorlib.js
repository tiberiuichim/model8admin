import { Toast } from 'quasar'

const showError = function (msg) {
  Toast.create({
    html: msg,
    icon: 'warning',
    timeout: 2500,
    color: 'white',
    bgColor: 'red'
  })
}

export { showError }
