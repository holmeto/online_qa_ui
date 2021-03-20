import Vue from 'vue'
import Router from 'vue-router'
import QuestionView from '@/components/QuestionView'
import Login from '@/components/Login'
import Home from '@/components/Home'
import QuestionDetail from '@/components/QuestionDetail'
import Register from '@/components/Register'
import Exchange from '@/components/Exchange'
import Buy from '@/components/Buy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/question_view',
      name: 'QuestionView',
      component: QuestionView
    },
    {
      path: '/question_detail',
      name: 'QuestionDetail',
      component: QuestionDetail
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/exchange',
      name: 'Exchange',
      component: Exchange
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy
    }
  ]
})