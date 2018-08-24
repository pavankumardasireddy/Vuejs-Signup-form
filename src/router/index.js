import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage';
import SignUp from '@/components/SignUp';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/register',
      name: 'Register',
      component: SignUp
    }
  ]
})
