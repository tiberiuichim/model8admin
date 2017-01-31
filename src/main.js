// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Quasar from 'quasar'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import { showError, showInfo } from './errorlib'

// register globally
// Vue.component(Multiselect)

Vue.use(Vuex)
Vue.use(Quasar) // Install Quasar Framework

const store = new Vuex.Store({
  state: {
    models: [],
    service_url: '',
    connected: false
  },
  mutations: {
    set_models: function (state, payload) {
      state.models = payload.models
    },
    set_service_url: function (state, payload) {
      state.service_url = payload.service_url
    },
    set_connected: function (state) {
      state.connected = true
    }
  },
  actions: {

    // TODO: refactor actions, too much code duplication
    reconnect: function (context, payload) {
      const url = payload.service_url
      console.log('connecting', url)
      context.commit('set_service_url', payload)
      axios.get(url).then(function (response) {
        context.commit({ type: 'set_connected' })
        context.commit({ type: 'set_models', models: response.data.models })
      }).catch(function (error) {
        showError('Error from server')
        console.log(error)
      })
    },
    addModel: function (context, payload) {
      const url = context.state.service_url
      console.log('add model to', url, payload)
      axios.post(url, {name: payload.name}).then(function (response) {
        context.commit({ type: 'set_connected' })
        context.commit({ type: 'set_models', models: response.data.models })
      }).catch(function (error) {
        showError('Error from server')
        console.log(error)
      })
    },
    addDataToModel: function (context, payload) {
      const url = payload.url
      return new Promise((resolve, reject) => {
        axios.put(url, {
          text: payload.text,
          label: payload.label
        }).then(function (response) {
          if (response.data.models) {
            context.commit({ type: 'set_connected' })
            context.commit({ type: 'set_models', models: response.data.models })
            showInfo('Labeled data has been added.')
            resolve(response)
          }
          else {
            showError('Error: ' + response.data.error)
          }
        }).catch(function (error) {
          showError('Error from server')
          console.log(error)
        })
      })
    },
    trainModel: function (context, payload) {
      const url = payload.url
      axios.post(url, {}).then(function (response) {
        if (response.data.error) {
          showError('Error: ' + response.data.error)
        }
        else {
          showInfo('Model trained, it will become available soon')
        }
      }).catch(function (error) {
        showError('Error from server')
        console.log(error)
      })
    },
    useModel: function (context, payload) {
      const url = payload.url + '/prophet'
      const text = payload.text

      return new Promise((resolve, reject) => {
        axios.post(url, { text }).then(function (response) {
          if (response.data.error) {
            showError('Error: ' + response.data.error)
          }
          else {
            resolve(response.data)
          }
        }).catch(function (error) {
          showError('Error from server')
          console.log(error)
        })
      })
    },
    getStats: function (context, payload) {
      const url = payload.url + '/prophet'

      return new Promise((resolve, reject) => {
        axios.get(url, {}).then(function (response) {
          if (response.data.error) {
            showError('Error: ' + response.data.error)
          }
          else {
            resolve(response.data)
          }
        }).catch(function (error) {
          showError('Error from server')
          console.log(error)
        })
      })
    }

  }
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    axios,
    store,
    router,
    render: h => h(require('./App'))
  })
})
