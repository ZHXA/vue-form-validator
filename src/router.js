import Vue from 'vue'
import Router from 'vue-router'
import Form from './views/From.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'form',
      component: Form
    }
    // , {
    //   path: '/formitem',
    //   name: 'formitem',
    //   component: FromItem
    // }
  ]
})
