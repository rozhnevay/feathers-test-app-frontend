
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(Antd)

router.beforeEach((to, from, next) => {
  const currentUser = store.state.auth.user
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)


  if (requiresAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})

// Auth first before loading the app
store.dispatch('auth/authenticate')
    .catch(() => {})
    // Render the app
    .then((response) => {
      // eslint-disable-next-line no-new
      store.commit('auth/setUser', response.user.email);
      new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')
    })
