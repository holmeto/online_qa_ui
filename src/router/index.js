import Vue from 'vue'
import Router from 'vue-router'
import QuestionView from '@/components/QuestionView'
import Login from '@/components/Login'
import Home from '@/components/Home'
import QuestionDetail from '@/components/QuestionDetail'

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
    }
  ]
})