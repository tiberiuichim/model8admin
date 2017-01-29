import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  // tibi:
  // [vue-router] Named Route 'mainpage' has a default child route. When
  // navigating to this named route (:to="{name: 'mainpage'"), the default
  // child route will not be rendered. Remove the name from this route and use
  // the name of the default child route for named links instead.

  routes: [
    {
      path: '/',
      component: load('Home')
    }, // Default
    {
      path: '/models',
      name: 'models',
      component: load('Models'),
      children: [
        { path: 'all', name: 'models_list', component: load('ModelsList') },
        { path: 'add_model', name: 'models_add_model', component: load('ModelAdd') }
      ]
    },
    {
      path: '/model/:model',
      name: 'model',
      component: load('Model'),
      children: [
        { path: '/model/:model/view', name: 'modelview', component: load('ModelView') },
        { path: '/model/:model/build', name: 'modelbuild', component: load('ModelBuild') }
      ]
    },
    { path: '*', component: load('Error404') } // Not found
  ]
})
