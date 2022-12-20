import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ExpensesView from '../views/ExpensesView.vue'
import AddExpenseView from '../views/AddExpenseView.vue'
import IncomeView from '../views/IncomeView.vue'
import AddIncomeView from '../views/AddIncomeView.vue'

import { auth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  const user = auth.currentUser
  console.log('current user in auth guard: ', user)

  if(!user) {
    next({ name: 'login' })
  } else {
    next()
  }

}
const requireNoAuth = (to, from, next) => {
  const user = auth.currentUser
  if(user) {
    next({ name: 'home' })
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: requireAuth
    },
    {
      path: '/income',
      name: 'income',
      component: IncomeView,
      beforeEnter: requireAuth
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: ExpensesView,
      beforeEnter: requireAuth
    },
    {
      path: '/add-expense',
      name: 'addExpense',
      component: AddExpenseView,
      beforeEnter: requireAuth
    },
    {
      path: '/add-income',
      name: 'addIncome',
      component: AddIncomeView,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: requireNoAuth
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      beforeEnter: requireNoAuth
    },
    
  ]
})

export default router
