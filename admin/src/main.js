import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// import './assets/scss/highlight.css'

import './assets/scss/style.scss'

Vue.config.productionTip = false

Vue.mixin({
  computed: {
    uploadUrl() {
      return 'http://127.0.0.1:8000/admin/uploads'
    }
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
