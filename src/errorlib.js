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

const showInfo = function (msg) {
  Toast.create({
    html: msg,
    icon: 'info',
    timeout: 2500,
    color: 'white',
    bgColor: 'green'
  })
}

export { showError, showInfo }
