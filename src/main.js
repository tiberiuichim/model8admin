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
import { showError } from './errorlib'

// register globally
// Vue.component(Multiselect)

Vue.use(Vuex)
Vue.use(Quasar) // Install Quasar Framework

const store = new Vuex.Store({
  state: {
    models: [],
    service_url: 'http://localhost:6543/',
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
      console.log('add data to model', payload)
      axios.put(url, {
        text: payload.text,
        label: payload.label
      }).then(function (response) {
        context.commit({ type: 'set_connected' })
        context.commit({ type: 'set_models', models: response.data.models })
      }).catch(function (error) {
        showError('Error from server')
        console.log(error)
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
